import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Banner1 from '../../assets/thumbnails/blogs/banner-blog-01.jpg';

interface BlogPost {
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
}

interface BlogSectionProps {
  isDarkMode: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode }) => {
  const blogPosts: BlogPost[] = [
    {
      title: 'Spring Boot: Export Excel File from MySQL Database with User Selected Fields',
      description: 'Learn how to export data to Excel files using Spring Boot and Apache POI.',
      image: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=400',
      url: 'https://seaumsiddiqui.com/post/74be4540-93c7-4dcd-91c1-1729e5001d83',
      date: '2025'
    },
    {
      title: 'Storing Bengali Enum Values in Database with JPA Converters',
      description: 'Implementing Bengali language enums with Java Persistence API in Spring Boot.',
      image: Banner1,
      url: 'https://seaumsiddiqui.com/post/80649cb4-ce0a-4849-9b8b-a195dbe8af2b',
      date: '2025'
    }
  ];

  return (
    <section id="blogs" className="mb-16 scroll-mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Blog
        </h2>
      </div>

      <div>
        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="group relative grid gap-3 pb-1 transition-all sm:grid-cols-8 sm:gap-4 md:gap-3 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -inset-x-3 -inset-y-2 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-4 lg:block lg:group-hover:bg-white/5 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg"
              />

              <div className="z-10 sm:col-span-2">
                {post.image && (
                  <div className="relative w-full aspect-video rounded overflow-hidden border border-light-border/20 dark:border-dark-border/20">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div className="z-10 sm:col-span-6 flex flex-col justify-center">
                <header className="mb-1 text-xs font-semibold uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary">
                  {post.date}
                </header>
                <h3 className="font-semibold leading-snug">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link"
                  >
                    <span className={`inline-flex items-baseline text-sm font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                      isDarkMode ? 'text-dark-text' : 'text-light-text'
                    }`}>
                      <span className="absolute -inset-x-3 -inset-y-2 hidden rounded md:-inset-x-4 md:-inset-y-3 lg:block" />
                      <span>{post.title}</span>
                      <ExternalLink className="ml-1.5 w-3.5 h-3.5 inline-block flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </a>
                </h3>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-6">
          <Link
            to="/blogs"
            className={`group inline-flex items-center space-x-2 text-sm font-semibold transition-colors duration-300 ${
              isDarkMode
                ? 'text-primary-400 hover:text-primary-300'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
