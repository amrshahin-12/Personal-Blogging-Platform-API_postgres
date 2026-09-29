exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("articles", {
    id: "id",
    title: { type: "varchar(255)", notNull: true, unique: true },
    content: { type: "text", notNull: true },
    author: { type: "varchar(255)", notNull: true },
    tags: { type: "text[]", notNull: false, default: pgm.func("'{}'::text[]") },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("articles");
};
