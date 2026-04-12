require("dotenv").config();
const mongoose = require("mongoose");

const projects = [
  {
    title: "Task Manager App",
    description:
      "A simple productivity app that manages tasks, categories, and progress tracking.",
    tech: ["React", "Node.js", "Express"],
    link: "#projects",
  },
  {
    title: "Portfolio API",
    description:
      "A fullstack API that powers a portfolio website and handles contact form submissions.",
    tech: ["Node.js", "Express"],
    link: "#contact",
  },
  {
    title: "E-commerce Store Clone",
    description:
      "A polished e-commerce clone demo with responsive product browsing, modern UI styling, and a live Vercel preview.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://exclusive-woad.vercel.app/",
  },
  {
    title: "Flylo Portfolio Clone",
    description:
      "A modern portfolio clone inspired by Flylo, featuring sleek design, smooth animations, and responsive layout hosted on Netlify.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://ayodeji-me.netlify.app/",
  },
];

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tech: [String],
  link: String,
});

const Project = mongoose.model("Project", projectSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing to avoid duplicates in case of rerun
    await Project.deleteMany({});
    console.log("Cleared existing projects...");

    await Project.insertMany(projects);
    console.log("Successfully seeded projects to MongoDB!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
