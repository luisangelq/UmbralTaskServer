const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
//Connect to DataBase:
connectDB();

//Enable cors
app.use(cors());

app.use( express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

//import routes:
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));


app.listen(PORT, () => {
    console.log(`Server is Working at ${PORT} port`);
})