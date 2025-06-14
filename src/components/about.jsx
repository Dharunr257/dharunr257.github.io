import React, { useEffect, useState } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import profileImage from "../assets/profile.jpg";

const roles = ["Junior Full Stack Web Developer", "AI & ML Enthusiast"];

function Typewriter() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      const updatedText = isDeleting
        ? current.substring(0, text.length - 1)
        : current.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="text-xl sm:text-2xl font-semibold text-light-3 dark:text-dark-3 h-10">
      <span className="whitespace-nowrap border-r-2 border-light-3 dark:border-dark-3 pr-1">
        {text}
      </span>
    </div>
  );
}

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="about"
      className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-24 bg-light-2 text-light-1 dark:bg-dark-2 dark:text-dark-1 gap-10 transition-colors duration-300"
    >
      {/* Text Content */}
      <div
        className="w-full md:w-1/2 text-center md:text-left"
        data-aos="fade-right"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Hi, I'm Dharun R
        </h1>

        <Typewriter />

        <p className="text-lg leading-relaxed max-w-xl mx-auto md:mx-0 my-6 text-light-1 dark:text-dark-1">
          I'm a passionate Full Stack Web Developer and AI/ML Enthusiast with a
          strong foundation in real-time systems, deep learning, and embedded
          development. I enjoy building modern, performant, and intelligent
          solutions that make an impact.
        </p>

        {/* Resume & GitHub buttons */}
        <div className="flex justify-center md:justify-start gap-4 mt-4">
          <a
            href="/Dharun Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-light-4 text-white dark:bg-dark-4 dark:text-white font-semibold px-5 py-2 rounded-md shadow-md transition transform duration-300
             hover:bg-light-5 dark:hover:bg-dark-5 hover:scale-105"
          >
            My Resume
          </a>
          <a
            href="https://github.com/Dharunr257"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-light-4 text-white dark:bg-dark-4 dark:text-white font-semibold px-5 py-2 rounded-md shadow-md transition transform duration-300
             hover:bg-light-5 dark:hover:bg-dark-5 hover:scale-105 flex items-center gap-2"
          >
            <FiGithub size={20} />
            GitHub
          </a>
        </div>

        {/* Social Links with tooltips */}
        <div className="flex justify-center md:justify-start gap-6 mt-6">
          {/* LinkedIn */}
          <div className="relative group">
            <a
              href="https://linkedin.com/in/dharun-r-aba105278"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-3 dark:text-dark-3 hover:text-light-4 dark:hover:text-dark-4 transition"
            >
              <FaLinkedin size={28} />
            </a>
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-light-2 dark:bg-dark-2 text-light-1 dark:text-dark-1 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              LinkedIn
            </span>
          </div>

          {/* Email */}
          <div className="relative group">
            <a
              href="mailto:dhurundharun257@gmail.com"
              className="text-light-3 dark:text-dark-3 hover:text-light-4 dark:hover:text-dark-4 transition"
            >
              <FaEnvelope size={28} />
            </a>
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-light-2 dark:bg-dark-2 text-light-1 dark:text-dark-1 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Email
            </span>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div
        className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-light-5 dark:border-dark-5 shadow-xl"
        data-aos="fade-left"
      >
        <img
          src={profileImage}
          alt="Dharun R"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
}
