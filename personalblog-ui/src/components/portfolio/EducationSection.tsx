import React from 'react';

interface EducationSectionProps {
  isDarkMode: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ isDarkMode }) => {
  return (
    <section id="education" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-opacity-75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Education
        </h2>
      </div>

      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary-900/10 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg" />

        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary sm:col-span-2">
          2022 — Present
        </header>

        <div className="z-10 sm:col-span-6">
          <h3 className={`font-medium leading-snug transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text' : 'text-light-text'
          }`}>
            Bachelor of Science in Computer Science
          </h3>

          <p className={`mt-1 text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>
            State University · Dhaka, Bangladesh
          </p>

          <p className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>
            Major in Computer Science with GPA of 3.6+/4.0. Focused on software engineering, system design,
            and backend development.
          </p>
        </div>
      </div>
    </section>
  );
};
