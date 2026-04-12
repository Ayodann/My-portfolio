require("dotenv").config();
const express = require("express");
const path = require("path");
const { sendContactEmail } = require("./emailService");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = process.env.PORT || 3000;

const projects = [
  {
    id: 1,
    title: "Task Manager App",
    description:
      "A simple productivity app that manages tasks, categories, and progress tracking.",
    tech: ["React", "Node.js", "Express"],
    link: "#projects",
  },
  {
    id: 2,
    title: "Portfolio API",
    description:
      "A fullstack API that powers a portfolio website and handles contact form submissions.",
    tech: ["Node.js", "Express"],
    link: "#contact",
  },
  {
    id: 3,
    title: "E-commerce Store Clone",
    description:
      "A polished e-commerce clone demo with responsive product browsing, modern UI styling, and a live Vercel preview.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://exclusive-woad.vercel.app/",
  },
  {
    id: 4,
    title: "Flylo Portfolio Clone",
    description:
      "A modern portfolio clone inspired by Flylo, featuring sleek design, smooth animations, and responsive layout hosted on Netlify.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://ayodeji-me.netlify.app/",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Rate limiting for the contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: "Too many messages sent from this IP, please try again after 15 minutes." },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.post("/api/contact", contactLimiter, async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
