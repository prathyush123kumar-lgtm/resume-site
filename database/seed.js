/**
 * seed.js — Database Seeder
 * Populates the Project table with Prathyush Kumar's real projects.
 * Run: node database/seed.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projects = [
  {
    title:           'Document Conversion Web App',
    slug:            'document-converter',
    description:     'A full-featured web application built with Python and Flask that enables users to convert documents between Word and PDF formats, and compress files — consolidating the most common document-handling tasks into a single, accessible browser interface.',
    shortDescription:'A web application for converting documents between formats and compressing files.',
    techStack:       JSON.stringify(['Python', 'Flask', 'HTML5', 'CSS3']),
    category:        'python',
    status:          'in-progress',
    featured:        true,
    githubUrl:       'https://github.com/prathyush123kumar-lgtm/document-converter', // TODO: Replace with actual link
    liveUrl:         null,
    imageUrl:        '/assets/images/project-document-converter.webp',
    highlights:      JSON.stringify([
      'Backend built with Python and Flask for file processing',
      'Supports Word-to-PDF and PDF-to-Word conversion',
      'File compression to reduce upload/download sizes',
      'Clean, minimal browser interface for ease of use'
    ]),
    sortOrder:       1
  },
  {
    title:           'Lectures Website',
    slug:            'lectures-website',
    description:     'A static website designed and built to centralise and organise lecture content for university students. Provides a clear, intuitive navigation structure so classmates can quickly locate course materials, notes, and resources.',
    shortDescription:'A structured static website organising university lecture content for easy student access.',
    techStack:       JSON.stringify(['HTML5', 'CSS3']),
    category:        'web',
    status:          'completed',
    featured:        true,
    githubUrl:       'https://github.com/prathyush123kumar-lgtm/lectures-website', // TODO: Replace with actual link
    liveUrl:         'https://prathyush123kumar-lgtm.github.io/lectures-website',  // TODO: Replace with actual link
    imageUrl:        '/assets/images/project-lectures-website.webp',
    highlights:      JSON.stringify([
      'Organised lecture content into easily navigable sections',
      'Mobile-responsive layout for access on any device',
      'Clean, distraction-free design focused on readability',
      'Used by classmates for quick resource lookup'
    ]),
    sortOrder:       2
  },
  {
    title:           'Personal Resume Website',
    slug:            'resume-website',
    description:     'A personal portfolio and resume website designed and built to present professional skills, educational background, and project work in a modern, recruiter-friendly layout. Features dark/light mode, dynamic data loading, and a working contact form.',
    shortDescription:'A personal portfolio site presenting skills, education, and projects in a recruiter-friendly layout.',
    techStack:       JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express']),
    category:        'web',
    status:          'completed',
    featured:        true,
    githubUrl:       'https://github.com/prathyush123kumar-lgtm/resume-site', // TODO: Replace with actual link
    liveUrl:         'https://prathyushkumar.vercel.app',                      // TODO: Replace with actual link
    imageUrl:        '/assets/images/project-resume-website.webp',
    highlights:      JSON.stringify([
      'Built with vanilla HTML, CSS, and JavaScript — no heavy frameworks',
      'Dark/Light mode toggle with localStorage persistence',
      'Fully responsive across mobile, tablet, and desktop',
      'Working contact form with backend validation and rate limiting'
    ]),
    sortOrder:       3
  }
];

async function main() {
  console.log('🌱 Seeding database with projects...');

  // Clear existing data before seeding
  await prisma.project.deleteMany({});

  for (const project of projects) {
    const created = await prisma.project.create({ data: project });
    console.log(`  ✓ Created: ${created.title}`);
  }

  console.log('\n✅ Database seeded successfully!');
  console.log(`   ${projects.length} projects inserted.\n`);
}

main()
  .catch(function (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  })
  .finally(async function () {
    await prisma.$disconnect();
  });
