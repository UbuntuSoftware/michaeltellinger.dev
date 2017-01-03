<?

# Vamp::init
# ---------------------------------------------------------------------------------------------------------
   $export = function()
   {
      // Vamp::$meta = Meta();
      Vamp::$extn = ['v','vmp'];

      Vamp::$expr = # expression operators
      [
         '.'=>'/a-zA-Z0-9_\(/',
         '+'=>null,
         '-'=>null,
         '*'=>null,
         '/'=>null,
         '%'=>null,
         '='=>null,
         '~'=>null,
         '<'=>null,
         '>'=>null,
         '&'=>null,
         '|'=>null,
         '?'=>null,
         '!'=>null,
      ];

      Vamp::$mopr = # multi-level operators
      [
         ':'=>["\n",';',',',')',']','}'],
         '('=>')',
         '['=>']',
         '{'=>'}',
      ];

      Vamp::$dlim = # delimiter operators
      [
         "\n"=>null,
         ';' =>null,
         ',' =>null,
      ];

      Vamp::$quot = # plain text operators
      [
         '`' => '`',
         '"' => '"',
         "'" => "'",
         '[|'=> '|]',
      ];

      Vamp::$omit = # comment operators
      [
         '# '   => "\n",
         '##'   => "\n",
         '#! '  => "\n",
         '!# '  => "\n",
         '.: '  => "\n",
         ':: '  => "\n",
         ':::'  => "\n",
         '---'  => "\n",
         '==='  => "\n",
         '/*'   => '*/',
         '//'   => "\n",
         '\\\\ '=> "\n",
         "\n-- "=> ["\n-- ","\n:: "],
      ];


      Vamp::$oper = array_merge(Vamp::$mopr, Vamp::$dlim, Vamp::$quot, Vamp::$omit, Vamp::$expr);


      # escape characters in quoted-string :: must begin & end with `\` :: escape-backslash: `\\`
      Vamp::$escp = # single-chars & var-names in lowercase :: unicode-number (4-char-hex in uppercase)
      [             # e.g :: variable: `\(foo)\`   |   unicode: `\0076\`
         'n'=>"\n", # new line e.g: `on\n\three\n\lines`
         't'=>"\t", # tab
      ];
   }
# ---------------------------------------------------------------------------------------------------------

?>
