module.exports = grammar({
  name: "akuro",
  extras: ($) => [/\s/, $.comment],
  rules: {
    source_file: ($) => repeat($._statement),
    _statement: ($) =>
      choice($.create_statement, $.add_statement, $.import_statement),

    create_statement: ($) =>
      seq(
        "create",
        optional("new"),
        field("spec_type", $.specification), // Lo que se crea (Ej: Domain Class)
        "as",
        field("spec_name", $.specification), // El alias (Ej: Enterprise Online Sales)
        ".",
      ),

    add_statement: ($) =>
      seq(
        "add",
        field("added_item", $.specification), // Lo que se añade
        repeat(seq(",", field("added_item", $.specification))),
        optional(seq("in", field("context_item", $.specification))),
        "to",
        optional("link"),
        field("target_type", $.specification), // A qué tipo va (Ej: Fields, Group)
        "of",
        field("target_owner", $.specification), // De quién es (Ej: Seo Inyection)
        ".",
      ),

    import_statement: ($) =>
      seq("import", $.string, "as", field("alias", $.specification), "."),

    specification: ($) => /[A-Z][a-z0-9_]*( [A-Z][a-z0-9_]*)*/,
    string: ($) => /"[^"]*"/,
    comment: ($) =>
      choice(
        token(seq("//", /.*/)),
        token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
});
