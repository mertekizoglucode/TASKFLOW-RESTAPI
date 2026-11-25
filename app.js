const express = require("express");
const logger = require("./src/middleware/logger");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`TASKFLOW sunucusu çalışıyor. Port: ${PORT}`);
});
