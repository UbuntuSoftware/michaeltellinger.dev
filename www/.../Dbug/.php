<?

# tree :: Dbug : debugging
# ---------------------------------------------------------------------------------------------------------
   class Dbug
   {
   # self :: aspects
   # ------------------------------------------------------------------------------------------------------
      public static $code;
      public static $vrsn;
      public static $info;
      public static $time;
   # ------------------------------------------------------------------------------------------------------




   # func :: fail
   # ------------------------------------------------------------------------------------------------------
      public static function fail($defn=null, $code=500, $stat='Internal Server Error', $uatp='surfer')
      {
         if (defined('DBUGFAIL'))
         { return; }

         $tosh = ob_get_clean();

         define('DBUGFAIL','1');
         header("HTTP/1.0 $code $stat");

         if ($uatp == 'spider')
         { exit; }

         $path = PUBDIR.'/doc/init.htm';

         if (!is_readable($path))
         {
            if (function_exists('exec') && (exec('echo EXEC') == 'EXEC'))
            { $user = exec('whoami'); }
            else
            { $user = 'web-server'; }

            echo "<pre>\n",
                 ".: EPIC FAIL :.\n\n",
                 "Invalid read privileges in the folder structure of `".$_SERVER['SERVER_NAME']."`.\n",
                 "Make sure the `$user` user can read everything `recursively` in: `".WWWDIR."`.\n",
                 "</pre>";

            exit;
         }

         $html = file_get_contents($path);

         if (!$defn)
         {
            echo $html;
            exit;
         }

         if (class_exists('Proc',false))
         {
            if (($code === 500) && defined('SITEMODE') && (SITEMODE !== 'DEVL'))
            {
               $html.= "<script>document.getElementsByName('liveFail')[0].className = 'FailNode';</script>";
               $html.= "<script>document.getElementsByName('devlFail')[0].className = 'hide';</script>";

               echo $html;
               exit;
            }
         }

         foreach ($defn[1] as $indx => $item)
         { $defn[1][$indx] = '<li>'.$item.'</li>'; }

         $defn[1] = implode($defn[1],'');
         $defn[2] = (isset($defn[2]) ? $defn[2] : '');

         $list = explode('<!-- % -->', $html);
         $html = $list[0].$list[1].$defn[0].$list[3].$defn[1].$list[5].$defn[2].$list[7].$list[8].$list[9];

         $hist = '<div class="dbugProc"><pre>';
         $stac = debug_backtrace();

         if ((count($stac) === 2) && isset($stac[1]['args'][0]))
         { $stac = $stac[1]['args'][0]->getTrace(); }

         foreach ($stac as $item)
         {
            if (!isset($item['class']) || !isset($item['file']) || !isset($item['line']) || !isset($item['function']))
            { continue; }

            if (($item['class'] == 'Dbug'))
            { continue; }

            if (in_array($item['function'],['__callStatic','call_user_func_array','spl_autoload_call']))
            { continue; }

            $hist.= $item['class'].'::'.$item['function'].'    '.str_replace(WWWDIR,'',$item['file']);
            $hist.= '    ('.$item['line'].")\n";
         }

         $hist.= '</pre></div>';

         $html = str_replace('<!--- DEVLDBUG --->',$hist,$html);

         echo $html;
         exit;
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: init
   # ------------------------------------------------------------------------------------------------------
      public static function init()
      {
         $path = './.../Dbug/vrsn.txt';
         $vrsn = phpversion();
         $need = '5.5.14'; # PHP 5.5.14 at least

         define('WWWDIR',getcwd());
         define('SYSDIR',WWWDIR.'/...');
         define('PUBDIR',WWWDIR.'/.pub');

         if (!is_readable($path) || !is_writable($path) || version_compare($vrsn, $need, '<'))
         { self::fail(); }

         self::$time = microtime(true);
         self::$code = array
         (
            0 => 'usage',
            1 => 'fatal',
            2 => 'warning',
            4 => 'parse',
            8 => 'notice',
            16 => 'core',
            32 => 'warning',
            64 => 'compile',
            128 => 'warning',
            256 => 'coding',
            512 => 'warning',
            1024 => 'notice',
            2048 => 'strict',
            4096 => 'recoverable',
            8192 => 'deprecated',
            16384 => 'deprecated'
         );

         $lvsn = file_get_contents($path);
         $info = new stdClass;
         $list = explode("\n",trim(file_get_contents('./.../Dbug/info.txt')));

         foreach ($list as $line => $text)
         {
            $text = explode(':',$text);

            if (strpos($text[1],','))
            { $text[1] = explode(',',$text[1]); }

            $info->{$text[0]} = $text[1];
         }

         function dump()
         { call_user_func_array(array('Dbug','dump'),func_get_args()); }


         $dubl = false;
         $clst = scandir(SYSDIR);
         $rlst = array_diff(scandir(WWWDIR),['index.html']);


         foreach ($clst as $cval)
         {
            if ($cval[0] == '.')
            { continue; }

            define($cval,$cval);

            foreach ($rlst as $rval)
            {
               if ($rval[0] == '.')
               { continue; }

               $ctst = strtolower($cval);
               $rtst = strtolower($rval);

               if ($ctst == $rtst)
               {
                  $dubl = $rval;
                  break;
               }
            }
         }


         if ($dubl)
         {
            $defn = array
            (
               'Global name conflict',
               array
               (
                  'The "root" folder name: `'.$dubl.'` is already in use.',
                  'Root (tree) folder-names are used as class-names and global constants.'
               ),
               'Keep in mind that PHP class-names are case-insensitive.'
            );

            self::fail($defn);
         }


         foreach ($rlst as $rval)
         {
            if ($rval[0] == '.')
            { continue; }

            define($rval,$rval);
         }


         if ($lvsn === $vrsn)
         { return; }



         if (version_compare($vrsn,$info->needsPHP[0],'<') || version_compare($vrsn,$info->needsPHP[1],'>'))
         {
            $defn = array
            (
               'PHP version conflict',
               array
               (
                  'The installed PHP version on this server is not supported by this framework version',
                  'This framework version supports PHP versions ranging from: '.implode($info,' to ')
               ),
               'Integrated software version conflicts may cause unexpected results -or serious issues.<br>'.
               'The runtime process-flow was halted to prevent any sporadic side-effects.<br>'
            );

            self::fail($defn);
         }

         self::$vrsn = $vrsn;
         self::$info = $info;

         file_put_contents($path,$vrsn);
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: test
   # ------------------------------------------------------------------------------------------------------
      public static function test()
      {
         $args = func_get_args();
         $call = Meta(['dbug'=>false]);

         foreach ($args as $indx => $cond)
         {
            if ($cond)
            {
               $call->dbug = true;
               break;
            }
         }

         $call->fail = function($self,$args)
         {
            if ($self->dbug)
            { self::fail($args); }
         };

         return $call;
      }
   # ------------------------------------------------------------------------------------------------------




   # func :: dump
   # ------------------------------------------------------------------------------------------------------
      public static function dump()
      {
         $stac = debug_backtrace();

         foreach ($stac as $item)
         {
            if (isset($item['file']) && isset($item['line']) && !isset($item['class']))
            {
               if (isset($item['function']) && ($item['function'] == 'dump'))
               {
                  $stac = str_replace(WWWDIR,'',$item['file']).'    ('.$item['line'].')';
                  break;
               }
            }
         }

         $stac = (is_string($stac) ? $stac : '');
         $args = func_get_args();
         $elap = round((microtime(true) - self::$time),4);
         $dlim = "\n------------------------------------\n";
         $line = "\n====================================\n\n";

         echo "<style>body{background:#2e3133;color:#AAA;}</style>\n<pre>\n";
         echo "Dbug::dump    $stac\n\n";

         foreach ($args as $indx => $defn)
         {
            if ($defn === null)
            { $defn = 'NULL'; }

            if ($defn === true)
            { $defn = 'TRUE'; }

            if ($defn === false)
            { $defn = 'FALSE'; }


            echo $dlim;
            print_r($defn);
            echo $line;
         }

         echo "\ntook: ".$elap." sec";
         echo "\n<pre>";
         exit;
      }
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------
   Dbug::init();  # run initial debug
# ---------------------------------------------------------------------------------------------------------





# evnt :: listen : fail
# ---------------------------------------------------------------------------------------------------------
   set_error_handler(function()
   {
      $args = func_get_args();
      $name = ucwords(Dbug::$code[$args[0]]);
      $mesg = str_replace("'", '`', $args[1]);
      $file = $args[2];
      $line = $args[3];

      Dbug::fail(array("$name Fail",array($mesg, "in file: $file", "on line: $line")));
   });
# ---------------------------------------------------------------------------------------------------------





# evnt :: listen : throw
# ---------------------------------------------------------------------------------------------------------
   set_exception_handler(function($e)
   {
      $name = ucwords(Dbug::$code[$e->getCode()]);
      $mesg = str_replace("'", '`', $e->getMessage());
      $file = $e->getFile();
      $line = $e->getLine();

      Dbug::fail(array("$name Fail",array($mesg, "in file: $file", "on line: $line")));
   });
# ---------------------------------------------------------------------------------------------------------





# evnt :: listen : halt - debug if fail
# ---------------------------------------------------------------------------------------------------------
   register_shutdown_function(function()
   {
      $e = error_get_last();

      if ($e === null)
      { return; }

      $name = ucwords(Dbug::$code[$e['type']]);
      $mesg = str_replace("'", '`', $e['message']);
      $file = $e['file'];
      $line = $e['line'];

      Dbug::fail(array("$name Fail",array($mesg, "in file: $file", "on line: $line")));
   });
# ---------------------------------------------------------------------------------------------------------

?>
