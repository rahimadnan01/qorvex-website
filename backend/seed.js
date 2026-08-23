import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Service from './models/Service.js';
import TeamMember from './models/TeamMember.js';
import Project from './models/Project.js';
import Testimonial from './models/Testimonial.js';
import User from './models/User.js';
import { defaultServices, defaultTeam, defaultProjects, defaultTestimonials } from './data/defaultData.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log('[SEED] Clearing existing collections...');
    await Service.deleteMany({});
    await TeamMember.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await User.deleteMany({});

    console.log('[SEED] Inserting default Admin user...');
    await User.create({
      name: 'Qorvex Admin',
      email: 'admin@qorvex.com',
      password: 'admin123456',
      role: 'admin'
    });

    console.log('[SEED] Inserting default Services...');
    const servicesToInsert = defaultServices.map(({ _id, ...rest }) => rest);
    await Service.insertMany(servicesToInsert);

    console.log('[SEED] Inserting default Team Members...');
    const teamToInsert = defaultTeam.map(({ _id, ...rest }) => rest);
    await TeamMember.insertMany(teamToInsert);

    console.log('[SEED] Inserting default Projects...');
    const projectsToInsert = defaultProjects.map(({ _id, ...rest }) => rest);
    await Project.insertMany(projectsToInsert);

    console.log('[SEED] Inserting default Testimonials...');
    const testimonialsToInsert = defaultTestimonials.map(({ _id, ...rest }) => rest);
    await Testimonial.insertMany(testimonialsToInsert);

    console.log('[SEED SUCCESS] Database populated with Qorvex studio default content & Admin user!');
    process.exit(0);
  } catch (error) {
    console.error('[SEED ERROR]', error);
    process.exit(1);
  }
};

seedData();
