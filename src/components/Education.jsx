import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const education = [
  {
    degree: 'B.Tech – Artificial Intelligence & Data Science',
    institution: 'Er. Perumal Manimekalai College of Engineering',
    period: 'August 2022 – June 2026',
    location: 'Hosur, India',
    highlights: [
      'Current GPA: 8.4/10',
      'Final-year project: AI-based NFC Attendance System with ESP32 + Face Recognition.',
    ],
  },
  {
    degree: 'Higher Secondary (Class 12) – CBSE',
    institution: 'Advaith International Academy',
    period: 'June 2020 – May 2022',
    location: 'Hosur, India',
    highlights: ['Scored 64% overall in Computer Science stream.'],
  },
  {
    degree: 'Secondary School (Class 10) – CBSE',
    institution: 'Eden Garden English School',
    period: 'June 2019 – March 2020',
    location: 'Krishnagiri, India',
    highlights: ['Scored 81% overall in final board exam.'],
  },
];

export default function Education() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="education"
      className="py-20 px-4 md:px-16 bg-light-2 text-light-1 dark:bg-dark-2 dark:text-dark-1 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-16 text-light-1 dark:text-dark-1">
        Education
      </h2>

      <div className="relative border-l-4 border-light-3 dark:border-dark-3 pl-6">
        {education.map((edu, idx) => (
          <div
            key={idx}
            className="mb-12 relative"
            data-aos="fade-up"
            data-aos-delay={idx * 200}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-light-3 dark:bg-dark-3 border-4 border-light-2 dark:border-dark-2 z-10"></div>

            {/* Education Card */}
            <div className="bg-light-4 dark:bg-dark-4 text-light-1 dark:text-dark-1 p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_theme(colors.light.5)] dark:hover:shadow-[0_0_20px_theme(colors.dark.5)] transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-light-2 dark:text-dark-3">{edu.institution}</p>
                </div>
                <span className="text-sm text-light-3 dark:text-dark-3 mt-2 md:mt-0">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm italic text-light-2 dark:text-dark-3 mt-1">
                {edu.location}
              </p>

              <ul className="list-disc mt-4 ml-6 space-y-1">
                {edu.highlights.map((point, i) => (
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
