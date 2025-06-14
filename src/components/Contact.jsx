import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-16 bg-light-4 text-light-1 dark:bg-dark-4 dark:text-dark-1 transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold text-center mb-10">
        Contact
      </h2>

      <div
        className="bg-light-2 dark:bg-dark-2 max-w-3xl mx-auto rounded-xl p-8 shadow-lg transition-colors duration-300"
        data-aos="fade-up"
      >
        <form
          action="mailto:dhurundharun257@gmail.com"
          method="POST"
          encType="text/plain"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-4 py-2 bg-light-2 text-light-1 dark:bg-dark-2 dark:text-dark-1 border border-light-1 dark:border-dark-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-5 dark:focus:ring-dark-5 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="w-full px-4 py-2 bg-light-2 text-light-1 dark:bg-dark-2 dark:text-dark-1 border border-light-1 dark:border-dark-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-5 dark:focus:ring-dark-5 transition"
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Your message"
              className="w-full px-4 py-2 bg-light-2 text-light-1 dark:bg-dark-2 dark:text-dark-1 border border-light-1 dark:border-dark-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-5 dark:focus:ring-dark-5 resize-none transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-light-4 text-light-1 dark:bg-dark-4 dark:text-dark-1 hover:bg-light-5 dark:hover:bg-dark-5 px-6 py-2 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
