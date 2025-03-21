const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const certificateRoutes = require("./routes/certificateRoute");

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  }));
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true })); 

app.use("/api/certificates", certificateRoutes);
app.get("/", (req, res) => {
    res.send("Hello World");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
