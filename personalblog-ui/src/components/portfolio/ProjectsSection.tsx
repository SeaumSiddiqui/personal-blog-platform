import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import qcharitybdThumbnail from '../../assets/thumbnails/projects/qcharitybd.png';
import personalblogThumbnail from '../../assets/thumbnails/projects/personalblog.png';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

interface ProjectsSectionProps {
  isDarkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDarkMode }) => {
  const projects: Project[] = [
    {
      title: 'QCharity BD Portal',
      description: 'A comprehensive charity management platform for QCharity BD that streamlines donations, beneficiary management, and day-to-day operations. Features document workflow, payment tracking, and role-based access control.',
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak'],
      image: qcharitybdThumbnail,
      link: 'https://qcharitybd.com'
    },
    {
      title: 'Blog Writing Platform',
      description: 'A full-stack blog management system with authentication, role-based access control, and modern UI. Features markdown editor, image uploads, and responsive design with a clean, elegant interface.',
      technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'Docker'],
      image: personalblogThumbnail,
      link: 'https://seaumsiddiqui.com/blogs'
    }
  ];

  return (
    <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-opacity-75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Projects
        </h2>
      </div>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/5 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg"
              />
            )}
            {!project.link && (
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary-900/10 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg" />
            )}

            <div className="z-10 sm:col-span-3">
              <img
                src={project.image}
                alt={project.title}
                className="rounded-lg border-2 border-light-border dark:border-dark-border transition-all duration-300 group-hover:border-primary-400 dark:group-hover:border-primary-500"
              />
            </div>

            <div className="z-10 sm:col-span-5">
              <h3 className="font-semibold leading-snug">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                      isDarkMode ? 'text-dark-text' : 'text-light-text'
                    }`}>
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      <span>{project.title}</span>
                      <ExternalLink className="ml-2 w-4 h-4 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </a>
                ) : (
                  <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                    isDarkMode ? 'text-dark-text' : 'text-light-text'
                  }`}>
                    {project.title}
                  </span>
                )}
              </h3>

              <p className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
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
        <Link
          to="/projects"
          className={`group inline-flex items-center text-sm font-semibold transition-colors duration-300 ${
            isDarkMode
              ? 'text-primary-400 hover:text-primary-300'
              : 'text-primary-600 hover:text-primary-700'
          }`}
        >
          <span>View Full Project Archive</span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};
