require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
