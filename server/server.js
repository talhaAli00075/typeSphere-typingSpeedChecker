// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// dotenv.config();
// const port = process.env.PORT || 3000;
// const uri = process.env.MONGODB_URI;
// const routes = require('./routes/routes');

// connectDB(uri);

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', routes);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

dotenv.config();
const port = process.env.PORT || 4000;
const routes = require("./routes/routes");

connectDB(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
