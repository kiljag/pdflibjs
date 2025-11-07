/**
 * Professional Resume/CV Example
 * Demonstrates creating a beautiful, modern resume PDF
 */

import * as Tree from '../src/tree';
import { createTextBlock } from '../src/blocks/ops/textBlockOps';
import type { BlockLayout } from '../src/blocks/models/Block';
import { generatePDFFile } from '../src/pdf/generator';

const defaultLayout = (overrides: Partial<BlockLayout> = {}): BlockLayout => ({
  x: 0,
  y: 0,
  width: 480,
  height: 24,
  ...overrides,
});

async function createResume() {
  console.log('Creating professional resume...');

  // Initialize PDF tree
  let tree = Tree.createPDFTree();

  // Set document metadata
  tree = Tree.setTitle(tree, 'Resume - Sarah Johnson');
  tree = Tree.setAuthor(tree, 'Sarah Johnson');
  tree = Tree.setSubject(tree, 'Software Engineer Resume');
  tree = Tree.setCreator(tree, 'PDFLibJS Example');

  // Configure an additional page (optional customization)
  tree = Tree.addPage(tree, {
    width: 595.28,
    height: 841.89,
    unit: 'pt'
  });

  // Header Section - Name
  tree = Tree.addElement(tree, createTextBlock({
    id: 'name',
    text: 'SARAH JOHNSON',
    layout: defaultLayout({ y: 0, height: 64 }),
    style: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1a365d',
      textAlign: 'center'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'title',
    text: 'Senior Full-Stack Software Engineer',
    layout: defaultLayout({ y: 42, height: 28 }),
    style: {
      fontSize: 14,
      color: '#2d3748',
      textAlign: 'center'
    }
  }));

  // Contact Information
  tree = Tree.addElement(tree, createTextBlock({
    id: 'contact',
    text: 'San Francisco, CA | (555) 987-6543 | sarah.johnson@email.com | linkedin.com/in/sarahjohnson',
    layout: defaultLayout({ y: 63, height: 22 }),
    style: {
      fontSize: 9,
      color: '#4a5568',
      textAlign: 'center'
    }
  }));

  // Separator
  tree = Tree.addElement(tree, createTextBlock({
    id: 'separator-1',
    text: '='.repeat(95),
    layout: defaultLayout({ y: 82, height: 16 }),
    style: {
      fontSize: 8,
      color: '#cbd5e0',
      textAlign: 'center'
    }
  }));

  // Professional Summary
  tree = Tree.addElement(tree, createTextBlock({
    id: 'summary-header',
    text: '> PROFESSIONAL SUMMARY',
    layout: defaultLayout({ y: 100, height: 26 }),
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'summary-content',
    text: 'Results-driven Senior Software Engineer with 8+ years of experience building scalable\nweb applications and microservices. Proven expertise in React, Node.js, and cloud\narchitecture. Led development teams to deliver high-impact projects, improving system\nperformance by 40% and reducing deployment time by 60%. Passionate about clean code,\nagile methodologies, and mentoring junior developers.',
    layout: defaultLayout({ y: 118, height: 120 }),
    style: {
      fontSize: 10,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Technical Skills
  tree = Tree.addElement(tree, createTextBlock({
    id: 'skills-header',
    text: '> TECHNICAL SKILLS',
    layout: defaultLayout({ y: 198, height: 26 }),
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'skills-content',
    text: 'Languages:        JavaScript, TypeScript, Python, Java, SQL, HTML/CSS\n' +
          'Frameworks:       React, Node.js, Express, Next.js, Django, Spring Boot\n' +
          'Databases:        PostgreSQL, MongoDB, Redis, MySQL\n' +
          'Cloud/DevOps:     AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD, Terraform\n' +
          'Tools:            Git, Jest, Webpack, GraphQL, REST APIs, Microservices',
    layout: defaultLayout({ y: 216, height: 120 }),
    style: {
      fontSize: 9,
      fontFamily: 'Courier',
      lineHeight: 1.6,
      color: '#2d3748'
    }
  }));

  // Professional Experience
  tree = Tree.addElement(tree, createTextBlock({
    id: 'experience-header',
    text: '> PROFESSIONAL EXPERIENCE',
    layout: defaultLayout({ y: 300, height: 26 }),
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d'
    }
  }));

  // Job 1
  tree = Tree.addElement(tree, createTextBlock({
    id: 'job1-title',
    text: 'Senior Software Engineer',
    layout: defaultLayout({ y: 320, height: 24 }),
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job1-company',
    text: 'TechCorp Solutions, San Francisco, CA                                   Jan 2020 - Present',
    layout: defaultLayout({ y: 335, height: 20 }),
    style: {
      fontSize: 9,
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
    layout: defaultLayout({ y: 350, height: 140 }),
    style: {
      fontSize: 9,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Job 2
  tree = Tree.addElement(tree, createTextBlock({
    id: 'job2-title',
    text: 'Full-Stack Developer',
    layout: defaultLayout({ y: 425, height: 24 }),
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job2-company',
    text: 'StartupLabs Inc., San Francisco, CA                                     Jun 2017 - Dec 2019',
    layout: defaultLayout({ y: 440, height: 20 }),
    style: {
      fontSize: 9,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job2-details',
    text: '* Developed real-time analytics dashboard using React, D3.js, and WebSockets\n' +
          '* Built RESTful APIs with Node.js/Express, handling 1M+ requests daily\n' +
          '* Implemented automated testing suite, increasing code coverage from 45% to 85%\n' +
          '* Collaborated with product team using Agile/Scrum methodologies',
    layout: defaultLayout({ y: 455, height: 120 }),
    style: {
      fontSize: 9,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Job 3
  tree = Tree.addElement(tree, createTextBlock({
    id: 'job3-title',
    text: 'Junior Software Developer',
    layout: defaultLayout({ y: 518, height: 24 }),
    style: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job3-company',
    text: 'Digital Innovations, Austin, TX                                         Aug 2015 - May 2017',
    layout: defaultLayout({ y: 533, height: 20 }),
    style: {
      fontSize: 9,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'job3-details',
    text: '* Developed responsive web applications using JavaScript, HTML5, and CSS3\n' +
          '* Integrated third-party APIs and payment gateways (Stripe, PayPal)\n' +
          '* Maintained legacy codebase and fixed critical bugs in production environment',
    layout: defaultLayout({ y: 548, height: 100 }),
    style: {
      fontSize: 9,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Education
  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-header',
    text: '> EDUCATION',
    layout: defaultLayout({ y: 598, height: 26 }),
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-degree',
    text: 'Bachelor of Science in Computer Science',
    layout: defaultLayout({ y: 616, height: 24 }),
    style: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#2d3748'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-school',
    text: 'University of Texas at Austin                                                    2011 - 2015',
    layout: defaultLayout({ y: 631, height: 20 }),
    style: {
      fontSize: 9,
      color: '#4a5568'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'education-details',
    text: 'GPA: 3.8/4.0 | Deans List | Relevant Coursework: Data Structures, Algorithms, Databases',
    layout: defaultLayout({ y: 645, height: 20 }),
    style: {
      fontSize: 9,
      color: '#4a5568'
    }
  }));

  // Certifications & Awards
  tree = Tree.addElement(tree, createTextBlock({
    id: 'certs-header',
    text: '> CERTIFICATIONS & AWARDS',
    layout: defaultLayout({ y: 670, height: 26 }),
    style: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1a365d'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'certs-content',
    text: '* AWS Certified Solutions Architect - Associate (2023)\n' +
          '* Employee of the Year - TechCorp Solutions (2022)\n' +
          '* Certified Scrum Master (CSM) - Scrum Alliance (2021)',
    layout: defaultLayout({ y: 688, height: 80 }),
    style: {
      fontSize: 9,
      lineHeight: 1.5,
      color: '#2d3748'
    }
  }));

  // Footer
  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer',
    text: '_'.repeat(95),
    layout: defaultLayout({ y: 735, height: 16 }),
    style: {
      fontSize: 8,
      color: '#cbd5e0',
      textAlign: 'center'
    }
  }));

  tree = Tree.addElement(tree, createTextBlock({
    id: 'footer-text',
    text: 'References available upon request',
    layout: defaultLayout({ y: 748, height: 20 }),
    style: {
      fontSize: 8,
      textAlign: 'center',
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
