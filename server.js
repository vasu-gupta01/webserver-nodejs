const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3002;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(bodyParser.json());

app.use(
  "/api",
  createProxyMiddleware({
    target: "http://127.0.0.1:5000",
    changeOrigin: true,
  })
);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
