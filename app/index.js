import express from "express";
import { router as api } from "./api/v1/index.js";

export const app = express();

// Parse JSON
app.use(express.json());

// Setup router and routes
app.use("/api/v1", api);
app.use("/api", api);

// No route found handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Error. Route not found",
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message } = err;

  res.status(status);
  res.json({
    error: { status, message },
  });
});
