const express = require("express");
const connectDB = require("./config/db");

const app = express();
//Connect to DataBase:
connectDB();

app.use( express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

//import routes:
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));


app.listen(PORT, () => {
    console.log(`Server is Working at ${PORT} port`);
})