import express from "express";
import { routes } from "./routes.js";

const app = express();
const port = 3000;

app.use(express.json());
// Define a route handler for the root URL
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
