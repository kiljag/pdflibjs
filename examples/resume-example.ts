/**
 * Professional Resume/CV Example
 * Demonstrates creating a beautiful, modern resume PDF
 */

import * as Tree from '../src/tree';
import { createTextBlock } from '../src/blocks/ops/textBlockOps';
import { generatePDFFile } from '../src/pdf/generator';

async function createResume() {
  console.log('Creating professional resume...');

  // Initialize PDF tree
  let tree = Tree.createPDFTree();

  // Set document metadata
  tree = Tree.setTitle(tree, 'Resume - Sarah Johnson');
  tree = Tree.setAuthor(tree, 'Sarah Johnson');
  tree = Tree.setSubject(tree, 'Software Engineer Resume');
  tree = Tree.setCreator(tree, 'PDFLibJS Example');

  // Configure page with margins
  tree = Tree.addPage(tree, {
    size: 'A4',
    margins: '36pt'
  });

  // Header Section - Name
  tree = Tree.addElement(tree, createTextBlock({
    id: 'name',
    text: 'SARAH JOHNSON',
    style: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1a365d',
      textAlign: 'center',
      y: 0
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'title',
    text: 'Senior Full-Stack Software Engineer',
    style: {
      fontSize: 14,
      color: '#2d3748',
      textAlign: 'center',
      y: 42
    }
  }));

  // Contact Information
  tree = Tree.addElement(tree, createTextBlock({
    id: 'contact',
    text: 'San Francisco, CA | (555) 987-6543 | sarah.johnson@email.com | linkedin.com/in/sarahjohnson',
    style: {
      fontSize: 9,
      color: '#4a5568',
      textAlign: 'center',
      y: 63
    }
  }));

  // Separator
  tree = Tree.addElement(tree, createTextBlock({
    id: 'separator-1',
    text: '='.repeat(95),
    style: {
      fontSize: 8,
      color: '#cbd5e0',
      textAlign: 'center',
      y: 82
    }
  }));

  // Professional Summary
  tree = Tree.addElement(tree, createTextBlock({
    id: 'summary-header',
    text: '> PROFESSIONAL SUMMARY',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d',
      y: 100
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'summary-content',
    text: 'Results-driven Senior Software Engineer with 8+ years of experience building scalable\nweb applications and microservices. Proven expertise in React, Node.js, and cloud\narchitecture. Led development teams to deliver high-impact projects, improving system\nperformance by 40% and reducing deployment time by 60%. Passionate about clean code,\nagile methodologies, and mentoring junior developers.',
    style: {
      fontSize: 10,
      y: 118,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Technical Skills
  tree = Tree.addElement(tree, createTextBlock({
    id: 'skills-header',
    text: '> TECHNICAL SKILLS',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d',
      y: 198
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'skills-content',
    text: 'Languages:        JavaScript, TypeScript, Python, Java, SQL, HTML/CSS\n' +
          'Frameworks:       React, Node.js, Express, Next.js, Django, Spring Boot\n' +
          'Databases:        PostgreSQL, MongoDB, Redis, MySQL\n' +
          'Cloud/DevOps:     AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, Terraform\n' +
          'Tools:            Git, Jest, Webpack, GraphQL, REST APIs, Microservices',
    style: {
      fontSize: 9,
      fontFamily: 'Courier',
      y: 216,
      lineHeight: 1.6,
      color: '#2d3748'
    }
  }));

  // Professional Experience
  tree = Tree.addElement(tree, createTextBlock({
    id: 'experience-header',
    text: '> PROFESSIONAL EXPERIENCE',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d',
      y: 300
    }
  }));

  // Job 1
  tree = Tree.addElement(tree, createTextBlock({
    id: 'job1-title',
    text: 'Senior Software Engineer',
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      y: 320,
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job1-company',
    text: 'TechCorp Solutions, San Francisco, CA                                   Jan 2020 - Present',
    style: {
      fontSize: 9,
      y: 335,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job1-details',
    text: '* Led team of 5 engineers to rebuild customer platform using React and Node.js,\n' +
          '  serving 500K+ daily active users\n' +
          '* Architected microservices infrastructure on AWS, reducing deployment time from\n' +
          '  2 hours to 15 minutes using Docker and Kubernetes\n' +
          '* Improved API response times by 40% through database optimization and caching\n' +
          '* Mentored 3 junior developers, conducting code reviews and technical training',
    style: {
      fontSize: 9,
      y: 350,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Job 2
  tree = Tree.addElement(tree, createTextBlock({
    id: 'job2-title',
    text: 'Full-Stack Developer',
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      y: 425,
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job2-company',
    text: 'StartupLabs Inc., San Francisco, CA                                     Jun 2017 - Dec 2019',
    style: {
      fontSize: 9,
      y: 440,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job2-details',
    text: '* Developed real-time analytics dashboard using React, D3.js, and WebSockets\n' +
          '* Built RESTful APIs with Node.js/Express, handling 1M+ requests daily\n' +
          '* Implemented automated testing suite, increasing code coverage from 45% to 85%\n' +
          '* Collaborated with product team using Agile/Scrum methodologies',
    style: {
      fontSize: 9,
      y: 455,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Job 3
  tree = Tree.addElement(tree, createTextBlock({
    id: 'job3-title',
    text: 'Junior Software Developer',
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      y: 518,
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job3-company',
    text: 'Digital Innovations, Austin, TX                                         Aug 2015 - May 2017',
    style: {
      fontSize: 9,
      y: 533,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job3-details',
    text: '* Developed responsive web applications using JavaScript, HTML5, and CSS3\n' +
          '* Integrated third-party APIs and payment gateways (Stripe, PayPal)\n' +
          '* Maintained legacy codebase and fixed critical bugs in production environment',
    style: {
      fontSize: 9,
      y: 548,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Education
  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-header',
    text: '> EDUCATION',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d',
      y: 598
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-degree',
    text: 'Bachelor of Science in Computer Science',
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      y: 616,
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-school',
    text: 'University of Texas at Austin                                                    2011 - 2015',
    style: {
      fontSize: 9,
      y: 631,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-details',
    text: 'GPA: 3.8/4.0 | Deans List | Relevant Coursework: Data Structures, Algorithms, Databases',
    style: {
      fontSize: 9,
      y: 645,
      color: '#4a5568'
    }
  }));

  // Certifications & Awards
  tree = Tree.addElement(tree, createTextBlock({
    id: 'certs-header',
    text: '> CERTIFICATIONS & AWARDS',
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d',
      y: 670
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'certs-content',
    text: '* AWS Certified Solutions Architect - Associate (2023)\n' +
          '* Employee of the Year - TechCorp Solutions (2022)\n' +
          '* Certified Scrum Master (CSM) - Scrum Alliance (2021)',
    style: {
      fontSize: 9,
      y: 688,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Footer
  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer',
    text: '_'.repeat(95),
    style: {
      fontSize: 8,
      color: '#cbd5e0',
      textAlign: 'center',
      y: 735
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer-text',
    text: 'References available upon request',
    style: {
      fontSize: 8,
      textAlign: 'center',
      y: 748,
      color: '#718096'
    }
  }));

  // Generate PDF
  const outputPath = './files/resume-professional.pdf';
  await generatePDFFile(tree, outputPath);
  console.log(`✓ Resume created successfully: ${outputPath}`);
}

// Run the example
createResume().catch(console.error);
