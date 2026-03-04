import { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../hooks/useTheme';

interface ContributionDay {
  date: string;
  count: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  count: number;
  formattedDate: string;
}

export default function GitHubHeatmap() {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, count: 0, formattedDate: '' });

  const GITHUB_USERNAME = 'SeaumSiddiqui';

  useEffect(() => {
    fetchGitHubContributions();
  }, []);

  const fetchGitHubContributions = async () => {
    try {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch contributions');
      }

      const result = await response.json();

      if (result && result.contributions && Array.isArray(result.contributions)) {
        const contributions = result.contributions.map((day: { date: string; count: number }) => ({
          date: day.date,
          count: day.count,
        }));
        setData(contributions);
      } else {
        setData(generateMockData());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
      setData(generateMockData());
      setLoading(false);
    }
  };

  const generateMockData = (): ContributionDay[] => {
    const mockData: ContributionDay[] = [];
    const today = new Date();

    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const randomCount = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
      mockData.push({
        date: date.toISOString().split('T')[0],
        count: randomCount,
      });
    }
    return mockData;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const { weeks, monthLabels, yearLabels } = useMemo(() => {
    if (data.length === 0) return { weeks: [], monthLabels: [], yearLabels: [] };

    const weeksArr: (ContributionDay | null)[][] = [];
    const monthLabelsArr: { month: string; weekIndex: number }[] = [];
    const yearLabelsArr: { year: string; weekIndex: number }[] = [];

    let currentWeek: (ContributionDay | null)[] = [];
    let lastMonth = -1;
    let lastYear = -1;

    const firstDate = new Date(data[0].date);
    const startDayOfWeek = firstDate.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    data.forEach((day, index) => {
      const date = new Date(day.date);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (year !== lastYear) {
        yearLabelsArr.push({ year: year.toString(), weekIndex: weeksArr.length });
        lastYear = year;
      }

      if (month !== lastMonth) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        monthLabelsArr.push({ month: months[month], weekIndex: weeksArr.length });
        lastMonth = month;
      }

      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }

      if (index === data.length - 1 && currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeksArr.push(currentWeek);
      }
    });

    return { weeks: weeksArr, monthLabels: monthLabelsArr, yearLabels: yearLabelsArr };
  }, [data]);

  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent<SVGRectElement>) => {
    const cellKey = `${day.date}`;
    setHoveredCell(cellKey);

    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipX = rect.left + rect.width / 2;
    const tooltipY = rect.top - 8;

    setTooltip({
      visible: true,
      x: tooltipX,
      y: tooltipY,
      count: day.count,
      formattedDate: formatDate(day.date),
    });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
    setTooltip({ ...tooltip, visible: false });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
          isDarkMode ? 'border-slate-400' : 'border-slate-600'
        }`} />
      </div>
    );
  }

  const cellSize = 8;
  const cellGap = 2;
  const weekdayLabelWidth = 22;
  const yearLabelHeight = 12;
  const monthLabelHeight = 12;

  const totalWidth = weekdayLabelWidth + weeks.length * (cellSize + cellGap);
  const totalHeight = yearLabelHeight + monthLabelHeight + 7 * (cellSize + cellGap) + 4;

  const emptyFill = isDarkMode ? 'rgba(51, 65, 85, 0.2)' : 'rgba(148, 163, 184, 0.15)';
  const emptyStroke = isDarkMode ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.5)';
  const fillStroke = isDarkMode ? 'rgba(163, 180, 90, 0.8)' : 'rgba(120, 140, 60, 0.7)';
  const textColor = isDarkMode ? 'rgba(148, 163, 184, 0.5)' : 'rgba(100, 116, 139, 0.5)';
  const hoverStroke = isDarkMode ? 'rgba(163, 180, 90, 1)' : 'rgba(120, 140, 60, 1)';

  return (
    <div className="w-full relative">
      <div className={`text-[10px] font-mono tracking-widest mb-2 ${
        isDarkMode ? 'text-slate-500' : 'text-slate-400'
      }`}>
        — COMMITS
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <svg
          width={totalWidth}
          height={totalHeight}
          className="block"
          style={{ minWidth: totalWidth }}
        >
          <defs>
            <pattern
              id="hatch"
              patternUnits="userSpaceOnUse"
              width="3"
              height="3"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="3"
                stroke={fillStroke}
                strokeWidth="1.2"
              />
            </pattern>
            <pattern
              id="hatch-hover"
              patternUnits="userSpaceOnUse"
              width="3"
              height="3"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="3"
                stroke={hoverStroke}
                strokeWidth="1.2"
              />
            </pattern>
          </defs>

          {yearLabels.map((label, i) => {
            const nextYear = yearLabels[i + 1];
            const endWeek = nextYear ? nextYear.weekIndex : weeks.length;
            const startX = weekdayLabelWidth + label.weekIndex * (cellSize + cellGap);
            const endX = weekdayLabelWidth + endWeek * (cellSize + cellGap);
            const x = startX + (endX - startX) / 2;

            return (
              <text
                key={`year-${label.year}`}
                x={x}
                y={8}
                fontSize="8"
                fontFamily="ui-monospace, monospace"
                fill={textColor}
                textAnchor="middle"
              >
                {label.year}
              </text>
            );
          })}

          {monthLabels.map((label, i) => {
            const nextMonth = monthLabels[i + 1];
            const endWeek = nextMonth ? nextMonth.weekIndex : weeks.length;
            const startX = weekdayLabelWidth + label.weekIndex * (cellSize + cellGap);
            const endX = weekdayLabelWidth + endWeek * (cellSize + cellGap);
            const x = startX + (endX - startX) / 2;

            return (
              <text
                key={`month-${i}`}
                x={x}
                y={yearLabelHeight + 9}
                fontSize="7"
                fontFamily="ui-monospace, monospace"
                fill={textColor}
                textAnchor="middle"
              >
                {label.month}
              </text>
            );
          })}

          {[1, 3, 5].map((dayIdx) => (
            <text
              key={`weekday-${dayIdx}`}
              x={weekdayLabelWidth - 4}
              y={yearLabelHeight + monthLabelHeight + dayIdx * (cellSize + cellGap) + cellSize - 1}
              fontSize="7"
              fontFamily="ui-monospace, monospace"
              fill={textColor}
              textAnchor="end"
            >
              {dayIdx === 1 ? 'Mon' : dayIdx === 3 ? 'Wed' : 'Fri'}
            </text>
          ))}

          {weeks.map((week, weekIndex) => (
            week.map((day, dayIndex) => {
              if (day === null) return null;

              const x = weekdayLabelWidth + weekIndex * (cellSize + cellGap);
              const y = yearLabelHeight + monthLabelHeight + dayIndex * (cellSize + cellGap);
              const hasCommits = day.count > 0;
              const isHovered = hoveredCell === day.date;

              return (
                <rect
                  key={`${weekIndex}-${dayIndex}`}
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx={1.5}
                  ry={1.5}
                  fill={hasCommits ? (isHovered ? 'url(#hatch-hover)' : 'url(#hatch)') : emptyFill}
                  stroke={isHovered ? hoverStroke : (hasCommits ? fillStroke : emptyStroke)}
                  strokeWidth={isHovered ? 1.2 : 0.8}
                  strokeDasharray={hasCommits || isHovered ? '0' : '1.5 1'}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => handleMouseEnter(day, e)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })
          ))}
        </svg>
      </div>

      {tooltip.visible && createPortal(
        <div
          className={`fixed z-[9999] px-2 py-1 text-[9px] font-mono tracking-wider whitespace-nowrap pointer-events-none ${
            isDarkMode
              ? 'bg-slate-800 text-slate-300'
              : 'bg-slate-100 text-slate-600'
          }`}
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            boxShadow: isDarkMode
              ? '0 2px 8px rgba(0, 0, 0, 0.4)'
              : '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          {tooltip.count > 0 ? (
            <>
              <span className="font-bold">{tooltip.count} COMMIT{tooltip.count > 1 ? 'S' : ''}</span>
              {' '}ON {tooltip.formattedDate}
            </>
          ) : (
            <>NO COMMITS ON {tooltip.formattedDate}</>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
