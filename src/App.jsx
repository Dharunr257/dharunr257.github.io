import React from "react";
import About from "./components/about";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <section id="about" className="hover:text-lightAccent dark:hover:text-darkAccent transition">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="Experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}

export default App;
