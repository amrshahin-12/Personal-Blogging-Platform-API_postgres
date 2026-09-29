const express = require("express");
const articleRouter = require("./articles/article.routes");
const { errorMiddleware } = require("./middleware/errorController");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/articles", articleRouter);

app.use(errorMiddleware);

module.exports = app;
