const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
//Connect to DataBase:
connectDB();

//Enable cors
app.use(cors());

app.use( express.json({ extended: true }));

const port = process.env.port || 4000;

//import routes:
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));


app.listen(port, "0.0.0.0", () => {
    console.log(`Server is Working at ${port} port`);
})