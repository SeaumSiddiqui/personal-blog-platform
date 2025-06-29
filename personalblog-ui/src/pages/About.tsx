import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from '../components/ThemeToggle';
import { UserMenu } from '../components/UserMenu';
import { Footer } from '../components/Footer';
import { 
  ArrowLeft, 
  LogIn, 
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Award,
  Server,
  Database,
  Cloud,
  GitBranch,
  CheckCircle,
  ExternalLink,
  Download
} from 'lucide-react';

export const About: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, login } = useAuth();

  const experiences = [
    {
      title: "Senior Backend Developer",
      company: "TechCorp Solutions",
      location: "Remote",
      period: "2022 - Present",
      description: "Leading backend development for microservices architecture serving 1M+ users. Designed and implemented scalable REST APIs using Spring Boot, reducing response times by 40%.",
      technologies: ["Spring Boot", "Java 17", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
      achievements: [
        "Architected microservices handling 10K+ requests/second",
        "Reduced deployment time by 60% with CI/CD pipelines",
        "Mentored 3 junior developers"
      ]
    },
    {
      title: "Backend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      period: "2020 - 2022",
      description: "Developed core backend services for a fintech startup. Built secure payment processing systems and implemented real-time data synchronization.",
      technologies: ["Spring Boot", "Java 11", "MySQL", "RabbitMQ", "Docker", "Jenkins"],
      achievements: [
        "Built payment system processing $1M+ monthly",
        "Implemented OAuth2 security framework",
        "Achieved 99.9% uptime for critical services"
      ]
    },
    {
      title: "Junior Java Developer",
      company: "Enterprise Corp",
      location: "Boston, MA",
      period: "2019 - 2020",
      description: "Started career developing enterprise applications. Worked on legacy system modernization and API development.",
      technologies: ["Spring Framework", "Java 8", "Oracle DB", "Maven", "Git"],
      achievements: [
        "Migrated 5 legacy applications to Spring Boot",
        "Improved code coverage from 40% to 85%",
        "Reduced bug reports by 30%"
      ]
    }
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Tech University",
      period: "2017 - 2019",
      description: "Specialized in Software Engineering and Distributed Systems"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      school: "State University",
      period: "2013 - 2017",
      description: "Graduated Magna Cum Laude, Dean's List"
    }
  ];

  const skills = [
    {
      category: "Backend Technologies",
      icon: Server,
      items: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "Java 17", "Kotlin"]
    },
    {
      category: "Databases",
      icon: Database,
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"]
    },
    {
      category: "Cloud & DevOps",
      icon: Cloud,
      items: ["AWS", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform"]
    },
    {
      category: "Tools & Practices",
      icon: GitBranch,
      items: ["Git", "Maven", "Gradle", "JUnit", "Mockito", "SonarQube"]
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Oracle Certified Professional Java SE",
    "Spring Professional Certification",
    "Kubernetes Application Developer"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]' 
        : 'bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]'
    }`}>
      {/* Floating Theme Toggle */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? 'hover:bg-slate-700 text-slate-300'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
              
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Seaum Siddiqui
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={login}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            About Seaum Siddiqui
          </h1>
          <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Backend Spring Boot Developer with 5+ years of experience building 
            scalable, high-performance applications that serve millions of users.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors duration-200 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}>
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </button>
            <a
              href="mailto:seaum.siddiqui@example.com"
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors duration-200 ${
                isDarkMode
                  ? 'border-slate-600 hover:bg-slate-700 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span>Get In Touch</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Professional Experience
            </h2>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              My journey in backend development and system architecture
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-8 top-0 bottom-0 w-0.5 transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
            }`} />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start space-x-8">
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-800 border-blue-500' 
                      : 'bg-white border-blue-500'
                  }`}>
                    <Building className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-8 rounded-2xl shadow-lg border transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-white/70 border-slate-200'
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {exp.title}
                        </h3>
                        <p className={`text-lg font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className={`mb-6 leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                              isDarkMode
                                ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
                                : 'bg-blue-100 text-blue-800 border border-blue-300'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className={`flex items-start space-x-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`} />
                            <span className="text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Technical Skills
            </h2>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Technologies and tools I work with
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className={`p-8 rounded-2xl shadow-lg border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-slate-800/50 border-slate-700'
                  : 'bg-white/70 border-slate-200'
              }`}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'
                  }`}>
                    <skillGroup.icon className={`w-6 h-6 transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors duration-300 ${
                        isDarkMode
                          ? 'bg-slate-700 text-slate-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className={`p-6 rounded-xl border transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-white/70 border-slate-200'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${
                        isDarkMode ? 'bg-green-900/20' : 'bg-green-100'
                      }`}>
                        <GraduationCap className={`w-5 h-5 transition-colors duration-300 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {edu.degree}
                        </h3>
                        <p className={`font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {edu.school}
                        </p>
                        <p className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {edu.period}
                        </p>
                        <p className={`text-sm mt-2 transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className={`text-3xl font-bold mb-8 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-700'
                      : 'bg-white/70 border-slate-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Award className={`w-5 h-5 transition-colors duration-300 ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                      }`} />
                      <span className={`font-medium transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {cert}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className={`mt-8 p-6 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-slate-800/50 border-slate-700'
                  : 'bg-white/70 border-slate-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      5+
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      50+
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Projects Delivered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      1M+
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Users Served
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-orange-400' : 'text-orange-600'
                    }`}>
                      99.9%
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Uptime Achieved
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};