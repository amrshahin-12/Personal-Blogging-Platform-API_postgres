const express = require("express");
const articleController = require("./article.controller");

const router = express.Router();

router
  .route("/")
  .get(articleController.getAllArticles)
  .post(articleController.createArticle);

router
  .route("/:id")
  .get(articleController.getArticle)
  .delete(articleController.deleteArticle)
  .patch(articleController.updateArticle);

module.exports = router;
