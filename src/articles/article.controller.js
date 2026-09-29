const articleService = require("./article.service");
const catchAsync = require("../utils/catchAsync");

exports.createArticle = catchAsync(async (req, res, next) => {
  const article = await articleService.createArticle(req.body);
  res.status(201).json({
    status: "success",
    data: { data: article },
  });
});

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await articleService.getAllArticles();
  res.status(200).json({
    status: "success",
    results: articles.length,
    data: { data: articles },
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const article = await articleService.getArticleById(req.params.id);
  res.status(200).json({
    status: "success",
    data: { data: article },
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const updatedArticle = await articleService.updateArticle(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: "success",
    data: { data: updatedArticle },
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  await articleService.deleteArticle(req.params.id);
  res.status(204).send();
});
