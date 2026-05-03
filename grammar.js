module.exports = grammar({
  name: "akuro",

  // Ignoramos los espacios en blanco y los saltos de línea por defecto
  extras: ($) => [/\s/, $.comment],

  rules: {
    // Un archivo es un montón de declaraciones
    source_file: ($) => repeat($._statement),

    // Tipos de declaraciones
    _statement: ($) =>
      choice($.create_statement, $.add_statement, $.import_statement),

    // Ej: create new Transactional Information System as Enterprise Online Sales.
    create_statement: ($) =>
      seq(
        "create",
        optional("new"),
        $.specification, // Lo que se crea
        "as",
        $.specification, // El alias o nombre
        ".",
      ),

    // Ej: add Inyection Code, Inyection Seo Title to Fields of Seo Inyection.
    // Ej: add Def Lifetime1 to Lifetime of Enterprise Online Sales.
    // Ej: add Profile Picture in Rbac to Picture Field of Enterprise Admin Pane.
    add_statement: ($) =>
      seq(
        "add",
        // Puede haber uno o varios elementos separados por coma
        $.specification,
        repeat(seq(",", $.specification)),

        // La preposición opcional "in"
        optional(seq("in", $.specification)),

        "to",
        optional("link"),
        $.specification, // A dónde se añade
        "of",
        $.specification, // De quién es
        ".",
      ),

    // Ej: import "specs/rbac_Enterprise.akuro" as Rbac.
    import_statement: ($) =>
      seq("import", $.string, "as", $.specification, "."),

    // Una "specification" es una o más palabras que empiezan con Mayúscula
    // Regex: Empieza con mayúscula, seguida de minúsculas/números/guiones bajos,
    // y puede tener más palabras separadas por espacio que también empiezan con mayúscula.
    specification: ($) => /[A-Z][a-z0-9_]*( [A-Z][a-z0-9_]*)*/,

    // Cadenas de texto entre comillas dobles
    string: ($) => /"[^"]*"/,

    // Comentarios
    comment: ($) =>
      choice(
        token(seq("//", /.*/)),
        token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
});
