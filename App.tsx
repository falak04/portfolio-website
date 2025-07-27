import React, { useState, useEffect } from 'react';
import homeLogo from "./assets/home-main.svg"
// Typewriter Component
const Typewriter = ({ titles }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (isDeleting) {
      if (subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % titles.length);
      } else {
        const timeoutId = setTimeout(() => {
          setText(titles[index].substring(0, subIndex - 1));
          setSubIndex(subIndex - 1);
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    } else {
      if (subIndex === titles[index].length) {
        const timeoutId = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timeoutId);
      } else {
        const timeoutId = setTimeout(() => {
          setText(titles[index].substring(0, subIndex + 1));
          setSubIndex(subIndex + 1);
        }, 150);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [subIndex, isDeleting, index, titles]);

  return (
    <span>
      {text}
      <span className="inline-block w-1 h-6 ml-1 bg-violet-400 animate-pulse" />
    </span>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle smooth scrolling
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Effect to update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'publications', 'certifications', 'contact'];
      let currentActive = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = sections[i];
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-4 px-6 md:px-12 flex justify-center">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="text-2xl font-bold text-indigo-700">Falak Shah</div>
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'projects', 'skills', 'publications', 'certifications', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-lg font-medium hover:text-indigo-600 transition-colors duration-300 ${
                  activeSection === section ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-600'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-15">
        {/* Enhanced Hero Section with About Content */}
        <section id="home" className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6">
          <div className="container mx-auto max-w-6xl">
            {/* Hero Introduction */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
              {/* Left side - Text content */}
              <div className="lg:w-1/2 text-center lg:text-left animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Hi There! <span className="inline-block animate-bounce">👋</span>
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  I'm <span className="text-yellow-300">FALAK SHAH</span>
                </h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl text-yellow-300 font-semibold mb-8 h-12">
                  <Typewriter titles={["Aspiring Full-Stack Developer", "MERN Stack Developer", "Problem Solver"]} />
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View My Work
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="border-2 border-white hover:bg-white hover:text-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>

              {/* Right side - Profile image with animated blob */}
              <div className="lg:w-1/2 flex justify-center items-center relative animate-fade-in">
                <div className="relative">
                  {/* Animated background blob */}
                  <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30 animate-spin" style={{animationDuration: '20s'}}>
                      <path fill="#FEF08A" d="M49.6,-59.9C64.5,-48.9,76.8,-34.2,79.5,-18.2C82.2,-2.2,75.3,15.2,65.3,29.9C55.3,44.7,42.2,56.8,27.1,65.2C12,73.6,-5,78.3,-21.2,74.7C-37.5,71.1,-53,59.3,-63.3,45C-73.6,30.7,-78.7,13.9,-77.3,-2.1C-75.9,-18.1,-68,-33.4,-56.3,-45.3C-44.6,-57.2,-29.1,-65.7,-13.2,-69.1C2.7,-72.5,18.6,-70.9,34.8,-66.6C41.3,-64.1,44.5,-65.4,49.6,-59.9Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  {/* Profile image */}
                  <img 
                    src={homeLogo}
                    alt="Falak Shah"
                    className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl"
                  />
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>

            {/* Quick Stats/Highlights */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-yellow-300 mb-2">8.95</div>
                <div className="text-sm text-gray-200">CGPA</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-yellow-300 mb-2">4+</div>
                <div className="text-sm text-gray-200">Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-yellow-300 mb-2">1</div>
                <div className="text-sm text-gray-200">Publication</div>
              </div>
            </div> */}

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto max-w-4xl">
            {/* <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">About Me</h2> */}
            <div className="flex flex-col md:flex-row items-center md:space-x-10">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <img
                  src="https://placehold.co/300x300/E0E7FF/4F46E5?text=About+Me"
                  alt="About Falak"
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
              <div className="md:w-2/3 text-lg leading-relaxed text-gray-700">
                <p className="mb-4">
                  Hello! I'm Falak Shah, a Bachelor of Technology student in Information Technology at Dwarkadas J. Sanghvi College of Engineering, passionate about building impactful web applications. With a CGPA of 8.95/10, I have a strong academic foundation in Data Structures & Algorithms, Operating Systems, Object-Oriented Programming, and Database Management Systems.
                </p>
                <p className="mb-4">
                  My journey in web development has led me to gain hands-on experience in full-stack development, specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). I thrive on solving complex problems and am always eager to learn new technologies.
                </p>
                <p>
                  I'm proficient in creating secure user authentication systems, implementing robust REST APIs, and designing responsive, user-friendly interfaces. My projects demonstrate my ability to develop scalable solutions, from e-commerce platforms to attendance management systems. I am a self-learner with strong problem-solving, presentation, adaptability, and teamwork skills.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6 md:px-12 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Experience</h2>
            <div className="bg-white rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">Web Development Intern</h3>
                  <p className="text-indigo-600 text-lg">Intern Pro</p>
                </div>
                <p className="text-gray-600 text-md">June 2025 - July 2025</p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                <li>Developed a full-stack e-commerce platform with distinct roles for Customers and Sellers.</li>
                <li>Built secure user authentication using Passport.js, session handling, and access control.</li>
                <li>Implemented product listing, cart, order tracking, and seller dashboards using React.js and Tailwind CSS.</li>
                <li>Created REST APIs with Node.js, Express.js, and MongoDB for order and inventory management.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12 relative">
              My Projects
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-violet-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project 1: Full Stack Attendance Management System */}
              <div className="bg-gray-800/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-violet-500/50 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">Full Stack Attendance Management System</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">Backend API for intelligent attendance tracking.</p>
                <ul className="list-none space-y-3 text-gray-700 mb-6 flex-grow">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Built scalable backend using <strong className="font-semibold text-violet-600">Node.js</strong>, <strong className="font-semibold text-violet-600">Express.js</strong>, and <strong className="font-semibold text-violet-600">MongoDB</strong> with modular routing and file upload via <strong className="font-semibold text-violet-600">Multer</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Configured <strong className="font-semibold text-violet-600">CORS</strong> and <strong className="font-semibold text-violet-600">dotenv</strong> for a secure environment and cross-origin access.</span>
                  </li>
                </ul>
                <a href="https://github.com/falak04/Attendance-.git" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline flex items-center gap-2 text-sm font-medium self-start mt-auto pt-2 transition-colors">
                  <i className="fab fa-github w-4 h-4"></i>
                  View on GitHub
                  <i className="fas fa-external-link-alt w-4 h-4"></i>
                </a>
              </div>

              {/* Project 2: Wanderlust Travel Platform */}
              <div className="bg-gray-800/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-violet-500/50 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">Wanderlust Travel Platform</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">Travel accommodation listing app with authentication, image uploads, and reviews.</p>
                <ul className="list-none space-y-3 text-gray-700 mb-6 flex-grow">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Built backend with <strong className="font-semibold text-violet-600">Node.js</strong>, <strong className="font-semibold text-violet-600">Express.js</strong>, and <strong className="font-semibold text-violet-600">MongoDB Atlas</strong>; templated views with <strong className="font-semibold text-violet-600">EJS</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Integrated <strong className="font-semibold text-violet-600">Cloudinary</strong> for image storage and <strong className="font-semibold text-violet-600">Passport.JS</strong> for session-based authentication.</span>
                  </li>
                </ul>
                <a href="https://github.com/falak04/wanderlust.git" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline flex items-center gap-2 text-sm font-medium self-start mt-auto pt-2 transition-colors">
                  <i className="fab fa-github w-4 h-4"></i>
                  View on GitHub
                  <i className="fas fa-external-link-alt w-4 h-4"></i>
                </a>
              </div>

              {/* Project 3: Classroom Booking Management System */}
              <div className="bg-gray-800/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-violet-500/50 flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">Classroom Booking Management System</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">Full-stack web app for institutional classroom/lab scheduling.</p>
                <ul className="list-none space-y-3 text-gray-700 mb-6 flex-grow">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Implemented role-based booking logic (admin, HOD, teacher, lab assistant) with <strong className="font-semibold text-violet-600">JWT</strong> auth and approval workflow.</span>
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Built REST API using <strong className="font-semibold text-violet-600">Node.js</strong>, <strong className="font-semibold text-violet-600">Express.js</strong>, and <strong className="font-semibold text-violet-600">MongoDB</strong>; frontend in <strong className="font-semibold text-violet-600">React.js</strong> and <strong className="font-semibold text-violet-600">Material-UI</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-violet-500 mt-1.5 text-xs">●</span>
                    <span className="flex-1">Added data export to PDF and Excel via <strong className="font-semibold text-violet-600">jsPDF</strong> and <strong className="font-semibold text-violet-600">ExcelJS</strong>.</span>
                  </li>
                </ul>
                <a href="https://github.com/falak04/Booking-System.git" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline flex items-center gap-2 text-sm font-medium self-start mt-auto pt-2 transition-colors">
                  <i className="fab fa-github w-4 h-4"></i>
                  View on GitHub
                  <i className="fas fa-external-link-alt w-4 h-4"></i>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 md:px-12 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Technical Skills */}
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-code text-indigo-600 mr-3"></i> Technical Skills
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg mb-2">Languages:</h4>
                    <div className="flex flex-wrap gap-3">
                      {['C', 'Java', 'Python', 'Javascript', 'HTML+CSS'].map(skill => (
                        <span key={skill} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-md font-medium shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg mb-2">Libraries:</h4>
                    <div className="flex flex-wrap gap-3">
                      {['NumPy', 'Pandas', 'Matplotlib', 'ReactJs'].map(skill => (
                        <span key={skill} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-md font-medium shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg mb-2">Web Dev Tools:</h4>
                    <div className="flex flex-wrap gap-3">
                      {['VScode', 'Git', 'Postman'].map(skill => (
                        <span key={skill} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-md font-medium shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg mb-2">Frameworks:</h4>
                    <div className="flex flex-wrap gap-3">
                      {['ReactJs'].map(skill => (
                        <span key={skill} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-md font-medium shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg mb-2">Cloud/Databases:</h4>
                    <div className="flex flex-wrap gap-3">
                      {['MongoDB', 'MySQL'].map(skill => (
                        <span key={skill} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-md font-medium shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-users text-indigo-600 mr-3"></i> Soft Skills
                </h3>
                <div className="space-y-4">
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                    {['Problem Solving', 'Self-learning', 'Presentation', 'Adaptability', 'TeamWork'].map(skill => (
                      <li key={skill} className="flex items-center">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-6 flex items-center">
                  <i className="fas fa-book-open text-indigo-600 mr-3"></i> Relevant Coursework
                </h3>
                <div className="space-y-4">
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                    {['Data Structures & Algorithms', 'Operating Systems', 'Object-Oriented Programming', 'Database Management System', 'Software Engineering'].map(course => (
                      <li key={course} className="flex items-center">
                        <i className="fas fa-graduation-cap text-blue-500 mr-2"></i> {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-20 px-6 md:px-12 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Publications</h2>
            <div className="bg-gray-50 rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Enhanced Color Image Security Using Chaotic Maps and Genetic Algorithm-Optimized Symmetric Key Encryption
              </h3>
              <p className="text-gray-700 text-lg mb-4">
                Under Review, 2025 5th Asian Conference on Innovation in Technology.
              </p>
              <p className="text-gray-600 text-md">
                This publication explores advanced encryption techniques for color images, combining chaotic maps with genetic algorithms to optimize symmetric key encryption, aiming to enhance image security.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-6 md:px-12 bg-gray-100">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="fas fa-certificate text-green-600 mr-3"></i> Apna College Delta Full Stack Web Development
                </h3>
                <p className="text-gray-700 text-lg">
                  Completed a comprehensive course covering full-stack web development fundamentals, including HTML, CSS, JavaScript, Node.js, and React.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8 transition-transform transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="fas fa-certificate text-green-600 mr-3"></i> Generative AI Foundations
                </h3>
                <p className="text-gray-700 text-lg">
                  Built a strong foundation in generative AI and applied concepts to real-world scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 md:px-12 bg-indigo-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
            <p className="text-xl mb-8">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 mb-12">
              <div className="flex items-center text-lg">
                <i className="fas fa-envelope text-yellow-300 mr-3 text-2xl"></i>
                <a href="mailto:falakshah4956@gmail.com" className="hover:underline">falakshah4956@gmail.com</a>
              </div>
              <div className="flex items-center text-lg">
                <i className="fas fa-phone-alt text-yellow-300 mr-3 text-2xl"></i>
                <span>+91-7021060346</span>
              </div>
            </div>
            <div className="flex justify-center space-x-8 text-4xl">
              <a
                href="https://github.com/falak04"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/falak-shah-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center text-sm">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Falak Shah. All rights reserved.</p>
          <p className="mt-2">Designed with <i className="fas fa-heart text-red-500 mx-1"></i> by Falak Shah</p>
        </div>
      </footer>

      {/* Custom CSS for Animations and general Styling */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes wave {
          0%, 20%, 60%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          40% { transform: rotate(14deg); }
          50% { transform: rotate(-4deg); }
          70% { transform: rotate(10deg); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-wave {
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>
    </div>
  );
};

export default App;