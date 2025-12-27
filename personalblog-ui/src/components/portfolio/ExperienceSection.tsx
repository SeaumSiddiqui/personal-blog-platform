import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  link?: string;
}

interface ExperienceSectionProps {
  isDarkMode: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDarkMode }) => {
  const experiences: Experience[] = [
    {
      company: 'QCharity BD',
      position: 'Full-Stack Developer (Freelance)',
      duration: '2025 — Present',
      description: 'Built and launched a charity management portal for QCharity BD that helps the team manage donations, beneficiaries, and day-to-day operations more efficiently.',
      achievements: [
        'Built a custom platform to replace manual spreadsheets for donor, orphan, and operational records',
        'Integrated Keycloak authentication with role-based access for staff and administrators',
        'Developed a document workflow for uploading files, tracking applications, and managing approvals',
        'Created a dashboard to track sponsorship payments and record status in real time',
        'Handled deployment at qcharitybd.com and provided ongoing technical support to staff'
      ],
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'AWS'],
      link: 'https://qcharitybd.com'
    }
  ];

  return (
    <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-opacity-75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Experience
        </h2>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50`}
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/5 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg" />

            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary sm:col-span-2">
              {exp.duration}
            </header>

            <div className="z-10 sm:col-span-6">
              <h3 className="font-semibold leading-snug">
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                      isDarkMode ? 'text-dark-text' : 'text-light-text'
                    }`}>
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      <span>{exp.position} · {exp.company}</span>
                      <ExternalLink className="ml-2 w-4 h-4 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </a>
                ) : (
                  <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                    isDarkMode ? 'text-dark-text' : 'text-light-text'
                  }`}>
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>{exp.position} · {exp.company}</span>
                  </span>
                )}
              </h3>

              <p className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                {exp.description}
              </p>

              <ul className="mt-2 space-y-1">
                {exp.achievements.map((achievement, achIndex) => (
                  <li
                    key={achIndex}
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}
                  >
                    • {achievement}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <li
                    key={techIndex}
                    className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-primary-900/30 text-primary-300'
                        : 'bg-primary-100 text-primary-700'
                    }`}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center text-sm font-semibold transition-colors duration-300 ${
            isDarkMode
              ? 'text-primary-400 hover:text-primary-300'
              : 'text-primary-600 hover:text-primary-700'
          }`}
        >
          <span>View Full Resume</span>
          <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </section>
  );
};
