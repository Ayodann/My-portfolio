require("dotenv").config();
const express = require("express");
const path = require("path");
const { sendContactEmail } = require("./emailService");
const app = express();
const PORT = process.env.PORT || 3000;

// Sample projects data (you can replace these with your actual projects)
const projects = [
  {
    id: 1,
    title: "E-commerce Landing Page",
    description:
      "Responsive product showcase with modern UI, smooth animations, and checkout demo flows.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#projects",
  },
  {
    id: 2,
    title: "Task Manager App",
    description:
      "A simple productivity app that manages tasks, categories, and progress tracking.",
    tech: ["React", "Node.js", "Express"],
    link: "#projects",
  },
  {
    id: 3,
    title: "Portfolio API",
    description:
      "A fullstack API that powers a portfolio website and handles contact form submissions.",
    tech: ["Node.js", "Express"],
    link: "#contact",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Please provide name, email, and message." });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address." });
    }

    // Sanitize input
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    };

    // Send email
    await sendContactEmail(sanitizedData);

    return res.json({
      status: "success",
      message: `Thanks ${sanitizedData.name}! Your message has been sent successfully. I'll get back to you soon.`,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error:
        "Sorry, there was an error sending your message. Please try again later or contact me directly.",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel
module.exports = app;
