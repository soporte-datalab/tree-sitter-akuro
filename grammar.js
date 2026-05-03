module.exports = grammar({
  name: "akuro",

  rules: {
    // Un archivo es una repetición de instrucciones
    source_file: ($) => repeat($._instruction),

    _instruction: ($) => choice($.keyword, $.specification, $.string, $.dot),

    keyword: ($) =>
      choice("create", "add", "to", "new", "link", "of", "purge", "as"),

    dot: ($) => ".",

    // Aquí usamos el mismo Regex de tu VS Code
    specification: ($) => /[A-Z][a-z0-9_]*( [A-Z][a-z0-9_]*)*/,

    string: ($) => /"[^"]*"/,
  },
});
