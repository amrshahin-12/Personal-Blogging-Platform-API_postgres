const articleRepository = require("./article.repository");
const AppError = require("../utils/appError");

async function getAllArticles() {
  return articleRepository.findAll();
}

async function getArticleById(id) {
  const article = await articleRepository.findById(id);
  if (!article) throw new AppError("No article found with that ID", 404);
  return article;
}

async function createArticle({ title, content, author, tags }) {
  if (!title) throw new AppError("An article must have a title!", 400);
  if (!content) throw new AppError("An article must have content!", 400);
  if (!author) throw new AppError("An article must have an author!", 400);

  const existing = await articleRepository.findByTitle(title);
  if (existing)
    throw new AppError("An article with that title already exists", 400);

  return articleRepository.create({ title, content, author, tags });
}

async function updateArticle(id, changes) {
  const updated = await articleRepository.update(id, changes);
  if (!updated) throw new AppError("No document found with that ID", 404);
  return updated;
}

async function deleteArticle(id) {
  const deleted = await articleRepository.remove(id);
  if (!deleted) throw new AppError("No document found with that ID", 404);
  return deleted;
}

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
