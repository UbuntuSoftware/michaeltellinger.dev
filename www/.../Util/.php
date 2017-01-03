<?

# func :: typeOf : identify contents
# ---------------------------------------------------------------------------------------------------------
   function dataType($d)
   {
      $t = strtolower(gettype($d));
      $t = (in_array($t,['integer','double','float']) ? 'number' : $t);
      $t = ((($t == 'object') && ($d instanceof Closure)) ? 'function' : $t);
      $t = ((($t=='string')&&(mb_strlen($d)>256)&&(preg_match('~[^\x20-\x7E\t\r\n]~',$d)>0))?'binary':$t);
      $t = (($d instanceof DateTime) ? 'datetime' : $t);

      return $t;
   }
# ---------------------------------------------------------------------------------------------------------





# func :: unitSize
# ---------------------------------------------------------------------------------------------------------
   function unitSize($size,$form='MB')
   {
      if (!is_int($size))
      { return false; }

      if ($form == 'GB')
      { return number_format($size / 1073741824, 2); }

      if ($form == 'MB')
      { return number_format($size / 1048576, 2); }

      if ($form == 'KB')
      { return number_format($size / 1024, 2); }

      return $size;
   }
# ---------------------------------------------------------------------------------------------------------





# tree :: glob : global references
# ---------------------------------------------------------------------------------------------------------
   class Glob
   {
   # self :: meta : aspects
   # ------------------------------------------------------------------------------------------------------
      public static $meta = [];
   # ------------------------------------------------------------------------------------------------------




   # func :: auto : call - static
   # ------------------------------------------------------------------------------------------------------
      public static function __callStatic($defn,$args)
      {
         if (isset(self::$meta[$defn]))
         {
            $defn = self::$meta[$defn];
            $type = dataType($defn);

            if ($type == 'function')
            { return call_user_func_array($defn,$args); }

            if ((($type == 'array') || ($type == 'object')) && isset($args[0]))
            {
               if (($type == 'array') && isset($defn[$args[0]]))
               { return $defn[$args[0]]; }

               if (($type == 'object') && isset($defn->{$args[0]}))
               { return $defn->{$args[0]}; }

               return null;
            }

            return $defn;
         }


         if (isset($args[0]))
         {
            if ((dataType($args[0]) == 'array') && isset($args[0]['call']))
            {
               $args = ((object)$args[0]);
               self::$meta[$defn] = $args->call;

               if (isset($args->init))
               { call_user_func_array($args->init,[]); }

               return true;
            }

            self::$meta[$defn] = $args[0];
            return true;
         }

         return null;
      }
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------





# glob :: type
# ---------------------------------------------------------------------------------------------------------
   Glob::type
   ([
      'call' => function($data)
      {
         return Glob::dataType(substr(dataType($data),0,4));
      },

      'init' => function()
      {
         $list = // list
         [
            'null' => 'Void',
            'bool' => 'Bool',
            'numb' => 'Unit',
            'stri' => 'Text',
            'bina' => 'Blob',
            'arra' => 'Tupl',
            'obje' => 'Tupl',
            'func' => 'Func',
            'date' => 'Time',
         ];

         Glob::dataType($list);

         foreach ($list as $indx => $item)
         {
            if (!defined($item))
            { define($item,$item); }
         }

         function typeOf($defn)
         { return Glob::type($defn); }

         function isVoid($d){ return (typeOf($d) == Void); }
         function isBool($d){ return (typeOf($d) == Bool); }
         function isUnit($d){ return (typeOf($d) == Unit); }
         function isText($d){ return (typeOf($d) == Text); }
         function isBlob($d){ return (typeOf($d) == Blob); }
         function isTupl($d){ return (typeOf($d) == Tupl); }
         function isFunc($d){ return (typeOf($d) == Func); }
         function isTime($d){ return (typeOf($d) == Time); }
      },
   ]);
# ---------------------------------------------------------------------------------------------------------





# glob :: kind
# ---------------------------------------------------------------------------------------------------------
   Glob::kind
   ([
      'call' => function($data)
      {
         $type = Glob::type($data);
         $list = Glob::dataKind($type);

         foreach ($list as $kind => $func)
         {
            if ($func($data))
            { return $kind.$type; }
         }
      },


      'init' => function()
      {
         $list = // list
         [
            'Void' =>
            [
               'None' => function(){ return 1; }
            ],

            'Bool' =>
            [
               'Posi' => function($data)
               { if ($data === true){ return 1; } },

               'Nega' => function($data)
               { return 1; },
            ],

            'Unit' =>
            [
               'Flat' => function($data)
               { if (is_int($data)){ return 1; } },

               'Frac' => function($data)
               { return 1; }
            ],

            'Text' =>
            [
               'Void' => function($data)
               {
                  if (!$data || in_array($data,['null','none','void','deleted','removed','undefined']))
                  { return 1; }
               },

               'Bool' => function($data)
               {
                  if (in_array($data,['true','yes','on','done','+','positive']))
                  { return 1; }

                  if (in_array($data,['fals','no','off','fail','-','negative','false']))
                  { return 1; }
               },

               'Unit' => function($data)
               { if (is_numeric($data)){ return 1; } },

               'Char' => function($data)
               { if (strlen($data) < 2){ return 1; } },

               'Name' => function($data)
               { if ((strlen($data) < 26) && preg_match('/^[a-zA-Z0-9_]+$/', $data)){ return 1; } },

               'Quot' => function($data)
               {
                  $flcp = substr($data,0,1).substr($data,-1,1);

                  if (in_array($flcp,['``','""',"''"]))
                  {
                     $temp = str_replace('\\'.$flcp[0], '', $data);

                     if (substr_count($temp,$flcp[0]) < 3)
                     { return 1; }
                  }
               },

               'Tupl' => function($data)
               { if (in_array(substr($data,0,1).substr($data,-1,1),['[]','{}'])){ return 1; } },

               'Path' => function($data)
               {
                  if
                  (
                     (strlen($data) > 2) &&
                     (strpos($data,'/') !== false) &&
                     preg_match('/^[a-zA-Z0-9-\/\.⁄_]+$/', $data)
                  )
                  { return 1; }
               },

               'Vmap' => function($data)
               {
                  if
                  (
                     (strlen($data) > 2) &&
                     (strpos($data,'.') !== false) &&
                     preg_match('/^[a-zA-Z0-9-._]+$/', $data)
                  )
                  { return 1; }
               },

               'Regx' => function($data)
               {
                  if
                  (
                     (strlen($data) > 3) &&
                     preg_match('/^\/[\s\S]+\/$/', $data)
                  )
                  { return 1; }
               },

               'Mail' => function($data)
               {
                  if (filter_var($data, FILTER_VALIDATE_EMAIL))
                  { return 1; }
               },

               'Lead' => function($data)
               {
                  if ((strlen($data) < 50) && strpos($data,'::') && preg_match('/^[a-zA-Z0-9_\:]+$/',$data))
                  {
                     $data = explode('::',$data);

                     if ((strlen($data[0]) > 1) && (strlen($data[1]) > 1))
                     { return 1; }
                  }
               },

               'Calc' => function($data)
               {
                  $calc = [':','(','[','{','//','\\','# ','.: ','/*','+','*','|','%','^','=','~','<','>'];

                  if ((strlen($data) > 2) && locate($data,$calc))
                  { return 1; }
               },

               'Norm' => function($data)
               { return 1; },
            ],

            'Blob' =>
            [
               'Tiny' => function($data)
               { if (unitSize(strlen($data),'MB') < 4){ return 1; } },

               'Norm' => function($data)
               { if (unitSize(strlen($data),'MB') < 16){ return 1; } },

               'Phat' => function($data)
               { if (unitSize(strlen($data),'MB') < 64){ return 1; } },

               'Huge' => function($data)
               { if (unitSize(strlen($data),'MB') < 256){ return 1; } },

               'Mega' => function($data)
               { return 1; },
            ],

            'Tupl' =>
            [
               'List' => function($data)
               { if (dataType($data) == 'array'){ return 1; } },

               'Data' => function($data)
               { return 1; },
            ],

            'Func' =>
            [
               'Meta' => function(){ return 1; }
            ],

            'Time' =>
            [
               'Date' => function(){ return 1; }
            ],
         ];

         Glob::dataKind($list);

         foreach ($list as $type => $item)
         {
            foreach ($item as $kind => $func)
            { define($kind.$type, $kind.$type); }
         }

         function kindOf($defn)
         { return Glob::kind($defn); }

         function isNoneVoid($d){ return (kindOf($d) == NoneVoid); }

         function isPosiBool($d){ return (kindOf($d) == PosiBool); }
         function isNegaBool($d){ return (kindOf($d) == NegaBool); }

         function isFlatUnit($d){ return (kindOf($d) == FlatUnit); }
         function isFracUnit($d){ return (kindOf($d) == FracUnit); }

         function isVoidText($d){ return (kindOf($d) == VoidText); }
         function isBoolText($d){ return (kindOf($d) == BoolText); }
         function isUnitText($d){ return (kindOf($d) == UnitText); }
         function isNameText($d){ return (kindOf($d) == NameText); }
         function isQuotText($d){ return (kindOf($d) == QuotText); }
         function isTuplText($d){ return (kindOf($d) == TuplText); }
         function isPathText($d){ return (kindOf($d) == PathText); }
         function isVmapText($d){ return (kindOf($d) == VmapText); }
         function isRegxText($d){ return (kindOf($d) == RegxText); }
         function isLeadText($d){ return (kindOf($d) == LeadText); }
         function isCalcText($d){ return (kindOf($d) == CalcText); }
         function isNormText($d){ return (kindOf($d) == NormText); }

         function isTinyBlob($d){ return (kindOf($d) == TinyBlob); }
         function isNormBlob($d){ return (kindOf($d) == NormBlob); }
         function isPhatBlob($d){ return (kindOf($d) == PhatBlob); }
         function isHugeBlob($d){ return (kindOf($d) == HugeBlob); }
         function isMegaBlob($d){ return (kindOf($d) == MegaBlob); }

         function isListTupl($d){ return (kindOf($d) == ListTupl); }
         function isDataTupl($d){ return (kindOf($d) == DataTupl); }

         function isMetaFunc($d){ return (kindOf($d) == MetaFunc); }
         function isDateTime($d){ return (kindOf($d) == DateTime); }
      },
   ]);
# ---------------------------------------------------------------------------------------------------------





# func :: spanOf : count anything
# ---------------------------------------------------------------------------------------------------------
   function spanOf($defn)
   {
      $type = dataType($defn);

      if (($defn === null) || ($type == 'boolean'))
      { return (($defn === true) ? 1 : 0); }

      if ($type == 'number')
      {
         $info = explode('.', trim($defn.'', '-'));
         return strlen((isset($info[1]) ? $info[1] : $info[0]));
      }

      if (($type == 'string') || ($type == 'binary'))
      { return mb_strlen($defn); }

      if ($type == 'array')
      { return count($defn); }

      if ($type == 'object')
      { return count((array)$defn); }

      if ($type == 'function')
      {
         $info = new ReflectionFunction($defn);
         return $info->getNumberOfParameters();
      }

      if ($type == 'datetime')
      { return date('U',$defn); }

      return 0;
   }
# ---------------------------------------------------------------------------------------------------------





# func :: kvList : keys or vals list - from anything
# ---------------------------------------------------------------------------------------------------------
   function kvList($defn,$kovr=null,$indx=null)
   {
      $type = dataType($defn);
      $resl = [];

      if (($type != 'array') && ($type != 'object'))
      {
         if ($type == 'null')
         { return $resl; }

         if (($type == 'string') || ($type == 'number'))
         { $defn = str_split($defn.''); }
         elseif ($type == 'datetime')
         {
            $secs = date('U',$defn);
            $defn = // list
            [
               'd' => ((($secs / 60) / 60) / 24),
               'h' => (($secs / 60) / 60),
               'm' => ($secs / 60),
               's' => $secs,
            ];
         }
         else
         { $defn = [$defn]; }
      }

      foreach ($defn as $name => $data)
      {
         if ($kovr == 'KEYS')
         { $resl[] = $name; continue; }

         if ($kovr == 'VALS')
         { $resl[] = $data; continue; }

         $resl[$name] = $data;
      }

      if (($indx === null) || ($indx === ''))
      { return $resl; }

      $span = count($resl);
      $indx = (($indx == 'LAST') ? (0 -1) : $indx);
      $indx = (($indx < 0) ? ($span + $indx) : $indx);
      $none = (($kovr == 'KEYS') ? 0 : null);

      return (array_key_exists($indx,$resl) ? $resl[$indx] : $none);
   }


   function keysOf($defn,$indx=null)
   { return kvList($defn,'KEYS',$indx); }

   function valsOf($defn,$indx=null)
   { return kvList($defn,'VALS',$indx); }
# ---------------------------------------------------------------------------------------------------------





# func :: is_seqnum_array : check if array keys are numeric & sequential
# ---------------------------------------------------------------------------------------------------------
   function is_seqnum_array($arr)
   {
      if (!is_array($arr))
      { return false; }

      return (array_keys($arr) === range(0, (count($arr) -1)));
   }
# ---------------------------------------------------------------------------------------------------------





# func :: is_assoc_array : check if array is associative
# ---------------------------------------------------------------------------------------------------------
   function is_assoc_array($arr)
   {
      if (!is_array($arr))
      { return false; }

      return (count(array_filter(array_keys($arr), 'is_string')) > 0);
   }
# ---------------------------------------------------------------------------------------------------------





# func :: charOf : get character from int -or- hex
# ---------------------------------------------------------------------------------------------------------
   function charOf($defn)
   {
      if (spanOf($defn) < 4)
      { return chr(intval($defn)); }

      $defn = (is_int($defn) ? $defn : hexdec($defn));

      return mb_convert_encoding("&#{$defn};",'UTF-8','HTML-ENTITIES');
   }
# ---------------------------------------------------------------------------------------------------------





# func :: mb_trim : multibyte trim
# ---------------------------------------------------------------------------------------------------------
   function mb_trim($dfn,$sub=null)
   {
      if ($sub === null)
      { return preg_replace("/(^\s+)|(\s+$)/us", '', $dfn); }

      $dfn = mb_ltrim($dfn,$sub);
      $dfn = mb_rtrim($dfn,$sub);

      return $dfn;
   }


   function mb_ltrim($dfn,$sub=null)
   {
      if ($sub === null)
      { return preg_replace("/(^\s+)/us", '', $dfn); }

      $sub = (!is_array($sub) ? [$sub] : $sub);

      foreach ($sub as $str)
      {
         $ssl = mb_strlen($str);
         $dsl = mb_strlen($dfn);
         $bgn = mb_substr($dfn,0,$ssl);

         if ($bgn === $str)
         { $dfn = mb_substr($dfn,$ssl,$dsl); }
      }

      return $dfn;
   }


   function mb_rtrim($dfn,$sub=null)
   {
      if ($sub === null)
      { return preg_replace("/(\s+$)/us", '', $dfn); }

      $sub = (!is_array($sub) ? [$sub] : $sub);

      foreach ($sub as $str)
      {
         $ssl = mb_strlen($str);
         $dsl = mb_strlen($dfn);
         $end = mb_substr($dfn,(0-$ssl),$dsl);

         if ($end === $str)
         { $dfn = mb_substr($dfn,0,(0-$ssl)); }
      }

      return $dfn;
   }
# ---------------------------------------------------------------------------------------------------------





# func :: flChar : first-and-last characters in string
# ---------------------------------------------------------------------------------------------------------
   function flChar($text)
   {
      if (!isText($text))
      { throw new Exception('expecting dataType: `Text`'); }

      if (spanOf($text) < 1)
      { return null; }

      return substr($text,0,1).substr($text,-1,1);
   }
# ---------------------------------------------------------------------------------------------------------





# func :: readPath : get contents of file or folder :: folder returns list of names
# ---------------------------------------------------------------------------------------------------------
   function readPath($path)
   {
      if (!isPathText($path))
      { throw new Exception('expecting dataType: `PathText`'); }

      if ($path[0] == '/')
      { $path = (file_exists(SYSDIR.$path) ? SYSDIR.$path : WWWDIR.$path); }

      if (!is_readable($path))
      { throw new Exception("`$path` is ".(!file_exists($path) ? 'undefined' : 'forbidden')); }

      if (is_dir($path))
      { return array_diff(scandir($path),['.','..']); }

      return file_get_contents($path);
   }
# ---------------------------------------------------------------------------------------------------------





# func :: extnOf : file-extension of path
# ---------------------------------------------------------------------------------------------------------
   function extnOf($path,$witc='LAST')
   {
      if (!isPathText($path))
      { throw new Exception('expecting dataType: `PathText`'); }

      if ((strpos($path,'.') === false) || (substr($path,-1,1) == '/') || is_dir($path))
      { return 'FOLD'; }

      $prts = explode('.',$path);
      $extn = array_pop($prts);

      if ($witc == 'LAST')
      { return $extn; }

      if (count($prts) < 2)
      { return null; }

      $subx = array_pop($prts);

      if ($witc == 'FRST')
      { return $subx; }

      if ($witc == 'BOTH')
      { return "$subx.$extn"; }

      return null;
   }
# ---------------------------------------------------------------------------------------------------------





# func :: locate
# ---------------------------------------------------------------------------------------------------------
   function locate($hf,$nf,$sa=0)
   {
      $tp = substr(gettype($hf),0,2).substr(gettype($nf),0,2);
      $tl = ['stst','star','arst','arar'];

      if (!in_array($tp,$tl) || empty($hf) || empty($nf))
      { return false; }

      if ($tp == 'stst')
      {
         $fn = strpos($hf,$nf,$sa);
         return (($fn !== false) ? [$fn,$nf] : false);
      }

      if ($tp == 'star')
      {
         foreach ($nf as $nv)
         {
            $fn = strpos($hf,$nv,$sa);

            if ($fn !== false)
            { return [$fn,$nv]; }
         }

         return false;
      }

      if ($tp == 'arst')
      {
         $fn = array_search($nf,$hf,true);
         return (($fn !== false) ? [$fn,$nf] : false);
      }

      if ($tp == 'arar')
      {
         foreach ($nf as $nv)
         {
            $fn = array_search($nv,$hf,true);

            if ($fn !== false)
            { return [$fn,$nv]; }
         }

         return false;
      }
   }
# ---------------------------------------------------------------------------------------------------------





# func :: findIn
# ---------------------------------------------------------------------------------------------------------
   function findIn($hays,$nedl,$bool=false,$find=true,$omit=[])
   {
      if (!$find)
      {
         $resl = locate($hays,$nedl);
         return (!$bool ? $resl : (($resl === false) ? false : true));
      }

      if (!$hays || !$nedl)
      { return ($bool ? false : null); }

      $type = typeOf($hays).typeOf($nedl);

      if (!is_array($omit))
      { $omit = [$omit]; }

      if ($type == 'TextText')
      {
         if ($hays === $nedl)
         { return ($bool ? true : $nedl); }

         if ($find)
         {
            if (strpos($nedl,'*') === false)
            {
               if (strpos($hays,$nedl) !== false)
               { return ($bool ? true : $hays); }
            }

            if (in_array($nedl,$omit,true))
            { return ($bool ? false : null); }

            $flcp = flChar($nedl);
            $nedl = str_replace('*','',$nedl);
            $nlen = strlen($nedl);

            if (!$nedl)
            { return ($bool ? true : $hays); }

            if (($flcp == '**') && (strpos($hays,$nedl) !== false))
            { return ($bool ? true : $hays); }

            if (substr($hays, (($flcp[1] == '*') ? 0 : (0 - $nlen)), $nlen) == $nedl)
            { return ($bool ? true : $hays); }
         }

         return ($bool ? false : null);
      }


      if ($type == 'TuplText')
      {
         foreach ($hays as $hidx => $hdat)
         {
            $resl = findIn($hdat,$nedl,$bool,$find,$omit);

            if ($resl)
            { return $resl; }
         }

         return ($bool ? false : null);
      }


      if ($type == 'TextTupl')
      {
         foreach ($nedl as $nidx => $ndat)
         {
            $resl = findIn($hays,$ndat,$bool,$find,$omit);

            if ($resl)
            { return $resl; }
         }

         return ($bool ? false : null);
      }


      if ($type == 'TuplTupl')
      {
         foreach ($nedl as $nidx => $ndat)
         {
            foreach ($hays as $hidx => $hdat)
            {
               $resl = findIn($hdat,$ndat,$bool,$find,$omit);

               if ($resl)
               { return $resl; }
            }
         }
      }

      return ($bool ? false : null);
   }
# ---------------------------------------------------------------------------------------------------------





# tree :: Vmap : value-map
# ---------------------------------------------------------------------------------------------------------
   class Vmap
   {
   # func :: get
   # ------------------------------------------------------------------------------------------------------
      public static function get($o, $m, $t=null)
      {
      # dbug
      # ---------------------------------------------------------------------------------------------------
         if (!isVmapText($m))
         {
            if (is_object($o) && isset($o->$m))
            { return $o->$m; }
            elseif (is_array($o) && isset($c[$k]))
            { return $o[$m]; }
            else
            { return null; }
         }

         if (!isTupl($o))
         { throw new Exception('expecting dataType: Tupl'); }
      # ---------------------------------------------------------------------------------------------------


      # vars
      # ---------------------------------------------------------------------------------------------------
         $p = explode('.',$m);
         $x =& $o;
      # ---------------------------------------------------------------------------------------------------


      # each
      # ---------------------------------------------------------------------------------------------------
         foreach ($p as $k)
         {
            if (is_numeric($k))
            { $k = intval($k); }

            if (is_object($x) && isset($x->$k))
            { $x = $x->$k; }
            elseif (is_array($x) && isset($x[$k]))
            { $x = $x[$k]; }
            else
            { return null; }
         }
      # ---------------------------------------------------------------------------------------------------


      # done
      # ---------------------------------------------------------------------------------------------------
         return $x;
      # ---------------------------------------------------------------------------------------------------
      }
   # ------------------------------------------------------------------------------------------------------



   # func :: set
   # ------------------------------------------------------------------------------------------------------
      public static function set(&$o, $m, $v=null)
      {
      # dbug
      # ---------------------------------------------------------------------------------------------------
         if (!isVmapText($m))
         {
            if (is_object($o))
            {
               if ($v == 'VOID')
               { unset($o->$m); }
               else
               { $o->$m = $v; }
            }
            elseif (is_array($o))
            {
               if ($v == 'VOID')
               { unset($o[$m]); }
               else
               { $o[$m] = $v; }
            }

            return $o;
         }

         if (!isTupl($o))
         { throw new Exception('expecting dataType: Tupl'); }
      # ---------------------------------------------------------------------------------------------------


      # vars
      # ---------------------------------------------------------------------------------------------------
         $p = explode('.',$m);
         $l = (count($p) -1);
         $x =& $o;
      # ---------------------------------------------------------------------------------------------------


      # each
      # ---------------------------------------------------------------------------------------------------
         foreach ($p as $i => $k)
         {
            if (($i == $l) && ($v == 'VOID'))
            {
               if (is_object($x))
               { unset($x->$k); }
               elseif (is_array($o))
               { unset($x[$k]); }

               continue;
            }

            if (is_numeric($k))
            { $k = intval($k); }

            if (is_object($x))
            {
               if (!isset($x->$k))
               { $x->$k = Meta(); }

               $x =& $x->$k;
            }
            elseif (is_array($x))
            {
               if (!isset($x[$k]))
               { $x[$k] = []; }

               $x =& $x[$k];
            }
         }
      # ---------------------------------------------------------------------------------------------------


      # done
      # ---------------------------------------------------------------------------------------------------
         $x = $v;
         return $o;
      # ---------------------------------------------------------------------------------------------------
      }
   # ------------------------------------------------------------------------------------------------------



   # func :: rip
   # ------------------------------------------------------------------------------------------------------
      public static function rip(&$o, $m, $t=null)
      {
         if (isNameText($m) || is_int($m))
         {
            if (is_object($o))
            { unset($o->$m); }
            elseif (is_array($o))
            {
               unset($o[$m]);

               if (is_seqnum_array($o))
               { $o = array_values($o); }
            }

            return $o;
         }

         $o = Vmap::set($o,$m,'VOID');

         return $o;
      }
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------





# tree :: Meta : versatile meta-object structure
# ---------------------------------------------------------------------------------------------------------
   class Meta
   {
   # func :: auto : make - instance
   # ------------------------------------------------------------------------------------------------------
      function __construct($defn=null)
      {
         if (is_assoc_array($defn) || (dataType($defn) == 'object'))
         {
            foreach ($defn as $name => $data)
            {
               $name = str_replace('-','',$name);
               $name = str_replace(' ','_',$name);

               if (!$name)
               { continue; }

               if (is_assoc_array($data) || (dataType($data) == 'object'))
               { $this->$name = new Meta($data); }
               else
               { $this->$name = $data; }
            }
         }
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: auto : find - instance
   # ------------------------------------------------------------------------------------------------------
      public function __get($find)
      {
         if (isset($this->$find))
         { return $this->$find; }

         return findIn($this,$find);
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: auto : call - instance
   # ------------------------------------------------------------------------------------------------------
      public function __call($find, $args)
      {
         if (isset($this->$find) && isFunc($this->$find))
         {
            array_unshift($args,$this);
            return call_user_func_array($this->$find, $args);
         }

         $resl = findIn($this,$find);

         if ($resl)
         {
            if (count($args) < 1)
            { return $resl; }

            return findIn($resl,$args);
         }

         return null;
      }
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------





# func :: Meta : object
# ---------------------------------------------------------------------------------------------------------
   function Meta($defn=[])
   {
      return (new Meta($defn));
   }
# ---------------------------------------------------------------------------------------------------------





# func :: treePath
# ---------------------------------------------------------------------------------------------------------
   function treePath($tree)
   {
      return (file_exists("./.../$tree") ? "./.../$tree" : "./$tree");
   }
# ---------------------------------------------------------------------------------------------------------





# func :: Import : tree -or- path
# ---------------------------------------------------------------------------------------------------------
   function Import($defn,$args=null,$opti=false)
   {
   # cond :: dbug
   # ------------------------------------------------------------------------------------------------------
      if (!isText($defn))
      { throw new Exception('expecting dataType: `string`'); }
   # ------------------------------------------------------------------------------------------------------



   # cond :: kind : PathText - import path
   # ------------------------------------------------------------------------------------------------------
      if (isPathText($defn))
      {
         $path = $defn;

         if ($path[0] == '/')
         { $path = (file_exists(SYSDIR.$path) ? SYSDIR.$path : WWWDIR.$path); }

         if (!is_readable($path))
         { throw new Exception("path: `$path` is ".(file_exists($path) ? 'forbidden' : 'undefined')); }

         if (is_dir($path))
         { return array_diff(scandir($path),['.','..']); }

         $extn = extnOf($path);

         if ($extn == 'php')
         {
            $export = Meta();
            require_once($path);
            ob_get_clean();
            return $export;
         }

         if ($extn == 'json')
         {
            $text = trim(file_get_contents($path));
            $data = json_decode($text);

            if (($data === null) && (strlen($text) > 2))
            { throw new Exception("json syntax error in: `$path`"); }

            return $data;
         }

         $tree = explode('::',operOf($path))[0];

         if (!class_exists($tree,false))
         { Import($tree); }

         return $tree::import($path,$args,$opti);
      }
   # ------------------------------------------------------------------------------------------------------



   # cond :: kind : LeadText - import tree and/or tree-method
   # ------------------------------------------------------------------------------------------------------
      if (isNameText($defn) || isLeadText($defn))
      {
      # vars
      # ---------------------------------------------------------------------------------------------------
         $prts = explode('::',$defn);
         $tree = $prts[0];
         $func = (isset($prts[1]) ? $prts[1] : null);
         $path = (file_exists("./.../$tree") ? "./.../$tree" : "./$tree");
      # ---------------------------------------------------------------------------------------------------


      # cond :: debug
      # ---------------------------------------------------------------------------------------------------
         if (!file_exists("./.../$tree") && !file_exists("./$tree"))
         { throw new Exception("undefined tree folder-name: `$tree`"); }

         if (file_exists("./.../$tree") && file_exists("./$tree"))
         { throw new Exception("duplicate tree folder-name: `$tree`"); }

         if (!is_dir($path))
         { throw new Exception("expecting `$path` as folder"); }

         if (!is_readable($path))
         { throw new Exception("path `$path` is forbidden"); }

         if (class_exists($tree,false) && !Glob::imported($tree))
         { throw new Exception("class-name `$tree` conflict"); }
      # ---------------------------------------------------------------------------------------------------


      # cond :: tree : make/load if not loaded
      # ---------------------------------------------------------------------------------------------------
         if (!class_exists($tree,false))
         {
            $tpth = "$path/.php";

            if (!is_readable("$path/.php"))
            {
               if (SITEMODE != 'DEVL')
               { throw new Exception("`$tpth` is ".(!file_exists($tpth) ? 'undefined' : 'forbidden')); }

               Devl::make($path,$tree);
            }

            require_once($tpth);
            ob_get_clean();

            if (!class_exists($tree,false))
            { throw new Exception("class `$tree` expected in `$path/.php`"); }

            if (!property_exists($tree,'meta'))
            { throw new Exception('`'.$tree.'::$meta` is undefined'); }

            if (!is_object($tree::$meta))
            { $tree::$meta = Meta($tree::$meta); }

            if (file_exists("$path/conf.vmp"))
            {
               if (!is_readable("$path/conf.vmp"))
               { throw new Exception("`$path/conf.vmp` is forbidden"); }

               $tree::$meta->conf = Import("$path/conf.vmp");
            }

            Glob::imported($tree,true);
         }
      # ---------------------------------------------------------------------------------------------------


      # cond :: tree.func : make/load if not loaded
      # ---------------------------------------------------------------------------------------------------
         if ($func)
         {
            $fpth = "$path/$func.php";

            if (method_exists($tree,$func) || isset($tree::$meta->$func))
            { return true; }

            if (!is_readable($fpth))
            {
               if (SITEMODE != 'DEVL')
               { throw new Exception("`$fpth` is ".(!file_exists($fpth) ? 'undefined' : 'forbidden')); }

               Devl::make($path,$tree,$func);
            }

            if (!is_object($tree::$meta))
            { $tree::$meta = Meta($tree::$meta); }

            $tree::$meta->$func = Import($fpth);
         }
      # ---------------------------------------------------------------------------------------------------
      }
   # ------------------------------------------------------------------------------------------------------



   # done
   # ------------------------------------------------------------------------------------------------------
      return true;
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------





# func :: init
# ---------------------------------------------------------------------------------------------------------
   function init()
   {
      $args = func_get_args();

      foreach ($args as $indx => $tree)
      {
         Import($tree);
         $tree::init();
      }
   }
# ---------------------------------------------------------------------------------------------------------





# func :: call
# ---------------------------------------------------------------------------------------------------------
   function call($lead,$args=[])
   {
      if (isFunc($lead) || (isNameText($lead) && function_exists($lead)))
      { return call_user_func_array($lead,$args); }

      if (!isLeadText($lead))
      { return null; }


      $prts = explode('::',$lead);
      $tree = $prts[0];
      $func = $prts[1];


      if (!in_array($func,['has','get','rip','run','set']))
      {
         if (!class_exists($tree,false) || !method_exists($tree,$func) || !isset($tree::$meta->$func))
         { Import($lead); }

         if (method_exists($tree,$func))
         { return call_user_func_array([$tree,$func],$args); }

         if (isset($tree::$meta->$func) && isFunc($tree::$meta->$func))
         { return call_user_func_array($tree::$meta->$func,$args); }
      }


      if ($func == 'get')
      {
         $args[1] = (!isset($args[1]) ? true : $args[1]); # for `has`
         $resl = Vmap::get($tree::$meta,$args[0],$tree);

         if ($resl !== null)
         { return ($args[1] ? $resl : true); }

         $prts = explode('.',$args[0]);
         $tpth = treePath($tree);
         $base = array_shift($prts);
         $dpth = "$tpth/$base";

         if (is_dir($dpth))
         {
            $file = array_shift($prts);
            $fpth = "$tpth/$base/$file.php";
            $cpth = "$tpth/$base/$file.vmp";
            $vmap = "$base.$file";
         }
         else
         {
            $fpth = "$tpth/$base.php";
            $cpth = "$tpth/$base.vmp";
            $vmap = $base;
         }

         $path = (file_exists($fpth) ? $fpth : (file_exists($cpth) ? $cpth : null));

         if ($path)
         {
            if (isset($tree::$meta->$base))
            { throw new Exception("attribute-name: `$base` already assigned without `$path`"); }

            if (!$args[1])
            { return true; }

            $tree::set($vmap,Import($path));
            return Vmap::get($tree::$meta,$args[0],$tree);
         }

         return null;
      }

      if ($func == 'has')
      { return $tree::get($args[0],false); }

      if ($func == 'rip')
      { return Vmap::rip($tree::$meta,$args[0],$tree); }


      if ($func == 'run')
      {
         $func = $tree::get($args[0]);

         if (!$func || !isFunc($func))
         { throw new Exception("`$tree::".$args[0]."` is ".(!$func ? 'undefined' : 'not a function')); }

         return $func($args[1]);
      }


      if ($func == 'set')
      {
         if (!isset($args[1]))
         { $args[1] = null; }

         if (is_string($args[0]))
         { return Vmap::set($tree::$meta,$args[0],$args[1]); }

         $defn = (is_assoc_array($args[0]) ? Meta($args[0]) : $args[0]);

         if (isDataTupl($defn))
         {
            foreach ($defn as $name => $data)
            {
               if (!isset($tree::$meta->$name) || !$args[1]) # create -or- replace
               {
                  $tree::$meta->$name = $data;
                  continue;
               }

               if (isTupl($tree::$meta->$name) && isTupl($data))  # update existing
               {
                  foreach ($data as $indx => $valu)
                  {
                     if (is_int($indx) && is_seqnum_array($tree::$meta->$name))
                     {
                        $tree::$meta->$name[count($tree::$meta->$name)] = $valu;
                        continue;
                     }

                     if (!$indx || !is_string($indx))
                     { continue; }

                     if (is_assoc_array($tree::$meta->$name) && !isset($tree::$meta->$name[$indx]))
                     {
                        $tree::$meta->$name[$indx] = $valu;
                        continue;
                     }

                     if (isDataTupl($tree::$meta->$name) && !isset($tree::$meta->$name->$indx))
                     {
                        $tree::$meta->$name->$indx = $valu;
                        continue;
                     }
                  }
               }
            }
         }

         return false;
      }
   }
# ---------------------------------------------------------------------------------------------------------





# tree :: Util : utilities
# ---------------------------------------------------------------------------------------------------------
   class Util
   {
      public static $meta;
      public static function __callStatic($func,$args)
      { return call(__CLASS__.'::'.$func,$args); }
   }
# ---------------------------------------------------------------------------------------------------------

?>
