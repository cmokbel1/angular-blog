const mongoose = require("mongoose");
const Blog = require("./models/Blog");
// Sample blog data
const sampleBlogs = [
  {
    title: "Getting Started with Angular 20",
    content:
      "Angular 20 introduces exciting new features including standalone components, improved SSR, and enhanced performance optimizations. In this comprehensive guide, we'll explore how to leverage these new capabilities to build modern web applications.",
    excerpt:
      "Discover the latest features in Angular 20 and how to build modern web applications with improved performance.",
    author: "Claude Mokbel",
  },
  {
    title: "MongoDB Integration Best Practices",
    content:
      "When building full-stack applications, proper database integration is crucial. This article covers best practices for integrating MongoDB with Node.js applications, including connection pooling, error handling, and performance optimization.",
    excerpt:
      "Learn the best practices for integrating MongoDB with your Node.js applications for optimal performance.",
    author: "Claude Mokbel",
  },
  {
    title: "Building Responsive UI with PrimeNG",
    content:
      "PrimeNG offers a comprehensive suite of UI components for Angular applications. This tutorial demonstrates how to create responsive, accessible user interfaces using PrimeNG components and best practices for component customization.",
    excerpt:
      "Create beautiful, responsive user interfaces with PrimeNG components in your Angular applications.",
    author: "Claude Mokbel",
  },
  {
    title: "Server-Side Rendering with Angular Universal",
    content:
      "Server-Side Rendering (SSR) improves SEO and initial page load times. Learn how to implement Angular Universal for SSR, including setup, configuration, and deployment strategies for production applications.",
    excerpt:
      "Improve your Angular app's SEO and performance with Server-Side Rendering using Angular Universal.",
    author: "Claude Mokbel",
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/angular-blog";
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing blogs (optional - remove this line if you want to keep existing data)
    await Blog.deleteMany({});
    console.log("Existing blogs cleared");
    // Insert sample blogs
    const createdBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`${createdBlogs.length} sample blogs created`);

    // Display created blogs
    createdBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (ID: ${blog._id})`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();
