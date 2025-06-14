import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const experiences = [
  {
    title: 'Intern - ZIDIO DEVELOPMENT',
    period: 'June 2025 – July 2025',
    location: 'Remote',
    description: [
      'Built responsive web applications with modern frontend/backend tech.',
      'Collaborated with UI/UX designers to enhance usability and aesthetics.',
      'Integrated third-party APIs and scalable backend services.',
      'Participated in agile practices like code reviews and documentation.',
    ],
  },
  {
    title: 'Freelancer - Full Stack Developer',
    period: 'Ongoing',
    location: 'Remote',
    description: [
      'Developed full-stack web solutions for client requirements.',
      'Built custom admin panels, e-commerce components, and dashboards.',
      'Used React, Node.js, Express, MongoDB, and Tailwind CSS.',
    ],
  },
];

export default function Experience() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="experience"
      className="py-20 px-4 md:px-16 bg-light-2 text-light-1 dark:bg-dark-2 dark:text-dark-1 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-16 text-light-1 dark:text-dark-1">
        Experience
      </h2>

      <div className="relative border-l-4 border-light-3 dark:border-dark-3 pl-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="mb-16 relative"
            data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
          >
            {/* Dot on the timeline */}
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-light-3 dark:bg-dark-3 border-4 border-light-2 dark:border-dark-2 z-10"></div>

            <div className="bg-light-4 dark:bg-dark-4 text-light-1 dark:text-dark-1 rounded-xl p-6 shadow-md hover:shadow-[0_0_20px_theme(colors.light.5)] dark:hover:shadow-[0_0_20px_theme(colors.dark.5)] transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold">{exp.title}</h3>
                  <p className="text-sm text-light-3 dark:text-dark-3">{exp.location}</p>
                </div>
                <span className="text-sm text-light-3 dark:text-dark-3 mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>

              <ul className="list-disc mt-4 ml-6 space-y-1">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
