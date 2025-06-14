import React, { useEffect, useState } from "react";
import projects from "../data/projects";
import AOS from "aos";
import "aos/dist/aos.css";

const filters = ["All", "Web", "AI/ML"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.type === activeFilter);

  return (
    <section
      id="projects"
      className="py-20 px-4 md:px-16 bg-light-4 text-light-1 dark:bg-dark-4 dark:text-dark-1 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-light-1 dark:text-dark-1">
        Projects
      </h2>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full border font-medium transition duration-200 ${
                isActive
                  ? "bg-light-3 text-white dark:bg-dark-3 dark:text-white border-transparent"
                  : "border-light-3 text-light-3 dark:border-dark-3 dark:text-dark-3 hover:bg-light-3/20 dark:hover:bg-dark-3/20 hover:text-light-1 dark:hover:text-dark-1"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Projects */}
      <div>
        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-auto flex gap-4 pb-4">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="min-w-[85%] bg-light-2 dark:bg-dark-2 text-light-1 dark:text-dark-1 rounded-xl overflow-hidden shadow-lg flex-shrink-0 transition-colors duration-300"
              data-aos="fade-up"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-light-3/20 text-light-3 dark:bg-dark-3/20 dark:text-dark-3 text-xs px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:text-light-5 dark:hover:text-dark-5"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-light-2 dark:bg-dark-2 text-light-1 dark:text-dark-1 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300"
              data-aos="fade-up"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-light-3/20 text-light-3 dark:bg-dark-3/20 dark:text-dark-3 text-xs px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:text-light-5 dark:hover:text-dark-5"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
