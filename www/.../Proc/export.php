<?

# Proc::export
# ---------------------------------------------------------------------------------------------------------
   $export = function($defn,$boot=false,$mime=null)
   {
      if (isPathText($defn) && !is_readable($defn))
      { $defn = (file_exists($defn) ? 403 : 404); }

      if (is_int($defn))
      {
         $code = $defn;
         $stat = Proc::get("code.$code");

         if ($stat)
         {
            $uatp = Proc::get('user.args.Anon.userType');
            $path = Proc::get('user.path');

            Dbug::fail
            ([
               "$code - $stat",
               [
                  "It appears that `$path` is: $stat.",
                  "The server responded with status code: $code.",
               ]
            ],$code,$stat,$uatp);
         }

         echo $defn;
         exit;
      }


      if (isPathText($defn))
      {
         ob_get_clean();

         $path = $defn;
         $extn = extnOf($path);
         $mime = ($mime ? $mime : Proc::get('mime.'.$extn));

         if (!$mime)
         { throw new Exception("no mime-type defined for file-extension: `$extn`"); }

         if (!$boot)
         { $size = filesize($path); }
         else
         {
            $path = str_replace(['./.pub'],'',$path);
            $mime = 'text/html';
            $uatp = Proc::get('user.args.Anon.userType');
            $dlim = '<!-- % -->';
            $html = readPath('./.pub/doc/'.(($uatp=='surfer') ? 'init.htm' : 'bots.htm'));
            $html = explode($dlim,$html);  array_pop($html);
            $conf = Proc::get('conf.userView');  $conf->landPage = $path;
            $conf = json_encode($conf,JSON_UNESCAPED_SLASHES);
            $html[] = "<script>window.INITVIEW={$conf};window.SITEMODE='".SITEMODE."';</script>";
            $html = implode($html,$dlim);
            $html = str_replace('<!-- DOMAIN -->',$_SERVER['SERVER_NAME'],$html);
            $size = mb_strlen($html);
         }

         header("HTTP/1.0 200 OK");
         header("Content-Type: $mime; charset=".strtolower(Proc::get('conf.encoding')));
         header("Content-Length: $size");

         if (!$boot)
         { readfile($path); }
         else
         { echo $html; }

         exit;
      }


      dump($defn);
   }
# ---------------------------------------------------------------------------------------------------------

?>
