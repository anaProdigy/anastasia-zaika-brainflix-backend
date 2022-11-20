const express = require("express");
const cors = require("cors");
const path = require("node:path"); //before line 5
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

// initialize express server instance
const app = express();
//route
const videoRoutes = require("./routes/videos");
const commentRoute = require("./routes/comments");

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/videos", videoRoutes);
app.use("/videos", commentRoute);

// app.use("/images", express.static(path.join(__dirname, "public/imagex")))
app.get("/", (_req, res) => {
  res.send("Good bye");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
