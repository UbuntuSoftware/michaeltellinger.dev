<?

# tree :: Vamp
# ---------------------------------------------------------------------------------------------------------
   class Vamp
   {
   # self :: meta : aspects
   # ------------------------------------------------------------------------------------------------------
      public static $meta;
      public static $extn; # file extensions

      public static $oper; # all operators
      public static $dlim; # delimiter
      public static $quot; # plain text
      public static $mopr; # multi-level
      public static $omit; # comment omit
      public static $expr; # expression
      public static $escp; # escape chars
   # ------------------------------------------------------------------------------------------------------




   # func :: calc : calculate text expression
   # ------------------------------------------------------------------------------------------------------
      public static function calc($defn,$vars)
      {
         throw new Exception('Vamp::calc() - is not fully developed yet - make it happen!!');
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: markup : create HTML from markdown
   # ------------------------------------------------------------------------------------------------------
      public static function markup($defn,$vars)
      {
         throw new Exception('Vamp::markup() - is not fully developed yet - make it happen!!');
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: rathe : quickly parse - for large/simple config files
   # ------------------------------------------------------------------------------------------------------
      public static function rathe($defn)
      {
         $omit = array_merge(keysOf(self::$omit), ['(','[','{',';',',','\\']);

         if (locate($defn,$omit))
         { return null; }

         $defn = explode("\n",$defn);
         $resl = Meta();

         foreach ($defn as $indx => $line)
         {
            $line = trim($line);

            if (!$line)
            { continue; }

            if (!strpos($line,':'))
            { return null; }

            $prts = explode(':',$line);
            $name = str_replace(['`','"',"'"],'',trim($prts[0]));
            $data = self::decode($prts[1]);

            $resl->$name = $data;
         }

         return $resl;
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: import : load & parse vamp file
   # ------------------------------------------------------------------------------------------------------
      public static function import($path,$vars=null)
      {
         $defn = readPath($path);   # throws if not TextPath

         if (!in_array(extnOf($path),self::$extn))
         { throw new Exception('expected file-extensions: `'.implode(self::$extn,', ').'`'); }

         $resl = self::rathe($defn,$vars);

         if (!$resl)
         { $resl = self::decode($defn,$vars); }

         return $resl;
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: encode : transpile into mime-type
   # ------------------------------------------------------------------------------------------------------
      public static function encode($defn,$subx)
      {
         if (!self::has("make.$subx"))
         { throw new Exception("Vamp has no mime encoder for: `$subx`"); }

         if (spanOf($defn) < 1)
         { return ''; }

         return self::run("make.$subx",$defn);
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: export : load, parse, encode & output vamp files
   # ------------------------------------------------------------------------------------------------------
      public static function export($path,$vars=null)
      {
         Proc::export($path,Proc::get('user.args.Anon.initView'),'text/plain');
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: auto : call
   # ------------------------------------------------------------------------------------------------------
      public static function __callStatic($func,$args)
      { return call(__CLASS__.'::'.$func,$args); }
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------
   Vamp::init();
# ---------------------------------------------------------------------------------------------------------

?>
