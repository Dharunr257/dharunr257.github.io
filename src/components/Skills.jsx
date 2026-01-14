import React from 'react';
import {
  FaPython, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaReact,
  FaGitAlt, FaGithub, FaAws
} from 'react-icons/fa';
import {
  SiMongodb, SiMysql, SiPostgresql, SiExpress, SiAngular, SiTensorflow,
  SiPytorch, SiNumpy, SiPandas, SiOpencv, SiTailwindcss, SiBootstrap,
  SiPostman, SiVite, SiNetlify
} from 'react-icons/si';

const skillData = [
  {
    category: "Cloud Platform (AWS)",
    skills: [
      { name: "AWS", icon: <FaAws size={30} /> },
      { name: "EC2", icon: <FaAws size={30} /> },
      { name: "S3", icon: <FaAws size={30} /> },
      { name: "RDS", icon: <FaAws size={30} /> },
      { name: "IAM", icon: <FaAws size={30} /> },
      { name: "VPC", icon: <FaAws size={30} /> },
      { name: "Route 53", icon: <FaAws size={30} /> },
    ],
  },

  {
    category: "Cloud Architecture & Reliability",
    skills: [
      { name: "High Availability", icon: <FaAws size={30} /> },
      { name: "Fault Tolerance", icon: <FaAws size={30} /> },
      { name: "Auto Scaling", icon: <FaAws size={30} /> },
      { name: "Load Balancing", icon: <FaAws size={30} /> },
      { name: "Disaster Recovery", icon: <FaAws size={30} /> },
    ],
  },

  {
    category: "Security, Monitoring & Cost",
    skills: [
      { name: "IAM & Least Privilege", icon: <FaAws size={30} /> },
      { name: "CloudWatch", icon: <FaAws size={30} /> },
      { name: "CloudTrail", icon: <FaAws size={30} /> },
      { name: "AWS Budgets", icon: <FaAws size={30} /> },
      { name: "Cost Optimization", icon: <FaAws size={30} /> },
    ],
  },

  {
    category: "Automation & DevOps Basics",
    skills: [
      { name: "Linux", icon: <FaGitAlt size={30} /> },
      { name: "Docker", icon: <FaNodeJs size={30} /> },
      { name: "Git", icon: <FaGitAlt size={30} /> },
      { name: "GitHub Actions", icon: <FaGithub size={30} /> },
      { name: "Shell Scripting", icon: <FaGitAlt size={30} /> },
    ],
  },

  {
    category: "Programming & Scripting",
    skills: [
      { name: "Python", icon: <FaPython size={30} /> },
      { name: "JavaScript", icon: <FaJs size={30} /> },
      { name: "Bash", icon: <FaGitAlt size={30} /> },
    ],
  },

  {
    category: "Full Stack (Supportive)",
    skills: [
      { name: "React", icon: <FaReact size={30} /> },
      { name: "Node.js", icon: <FaNodeJs size={30} /> },
      { name: "Express.js", icon: <SiExpress size={30} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={30} /> },
    ],
  },

  {
    category: "Databases & Storage",
    skills: [
      { name: "MongoDB", icon: <SiMongodb size={30} /> },
      { name: "MySQL", icon: <SiMysql size={30} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={30} /> },
    ],
  },

  {
    category: "Tools & Platforms",
    skills: [
      { name: "GitHub", icon: <FaGithub size={30} /> },
      { name: "Postman", icon: <SiPostman size={30} /> },
      { name: "Vite", icon: <SiVite size={30} /> },
      { name: "Netlify", icon: <SiNetlify size={30} /> },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 px-4 md:px-16 bg-light-4 text-light-1 dark:bg-dark-4 dark:text-dark-1 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-light-1 dark:text-dark-1">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {skillData.map((group, index) => (
          <div
            key={index}
            className="bg-light-2 dark:bg-dark-2 text-light-1 dark:text-dark-1 rounded-2xl p-6 shadow-md hover:shadow-[0_0_20px_theme(colors.light.5)] dark:hover:shadow-[0_0_20px_theme(colors.dark.5)] transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-4 text-light-3 dark:text-dark-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {group.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:scale-105 transform transition duration-300"
                >
                  <span>{skill.icon}</span>
                  <span className="text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
