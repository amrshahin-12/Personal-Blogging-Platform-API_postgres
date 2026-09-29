exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("articles", {
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn("articles", "updated_at");
};
