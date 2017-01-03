<?

# func :: redirect
# ---------------------------------------------------------------------------------------------------------
   function redirect($path)
   {
      $conf = Proc::get('conf.redirect');
      $resl = false;

      if (!$path || !is_string($path))
      { return false; }

      foreach ($conf->fromTo as $from => $dest)
      {
         if (!$dest)
         { continue; }

         if ($from === $path)
         {

            $resl = $dest;
            break;
         }

         if (strlen($from) > 1)
         {
            $flcp = flChar($from);

            if ($flcp[0] == '.')
            { $from = '*'.$from; }

            if ($flcp[1] == '/')
            { $from.= '*'; }

            if (findIn($path,$from))
            {
               $resl = $dest;
               break;
            }
         }
      }

      if (!$resl)
      {
         unset($from,$dest);

         foreach ($conf->toFrom as $dest => $from)
         {
            if (!$from)
            { continue; }

            $from = (is_string($from) ? [$from] : $from);

            foreach ($from as $i => $freq)
            {
               if (strlen($freq) > 1)
               {
                  $flcp = flChar($freq);

                  if ($flcp[0] == '.')
                  { $freq = '*'.$freq; }

                  if ($flcp[1] == '/')
                  { $freq.= '*'; }

                  $from[$i] = $freq;
               }

               if (findIn($path,$freq))
               { $resl = $dest.$path; }
            }
         }
      }

      $path = ($resl ? $resl : $path);

      if (!is_int($path))
      {
         $path = str_replace('//','/',$path);
         $path = (($path[0] !== '/') ? "/$path" : $path);
         $path = (($path[0] !== '.') ? ".$path" : $path);
         $part = explode('/',$path)[1];

         if ((!file_exists("./$part")) || (substr($path,0,3) == '../') || (substr($path,0,6) == './.../'))
         { $path = 404; }
         elseif (!is_readable("./$part") || file_exists("./.../$part"))
         { $path = 403; }
      }

      return $path;
   }
# ---------------------------------------------------------------------------------------------------------





# func :: operOf
# ---------------------------------------------------------------------------------------------------------
   function operOf($path)
   {
      $auto = 'Proc::export';

      if (is_int($path))
      { return $auto; }

      $extn = (isPathText($path) ? extnOf($path) : $path);

      if (($extn == 'FOLD') && locate($path,'/'))
      {
         $prts = explode('/',$path);
         $tree = $prts[1];
         $func = ((isset($prts[2]) && (strlen($prts[2]) > 0)) ? $prts[2] : 'init');

         if (is_dir("./$tree"))
         { return "$tree::$func"; }
      }

      $conf = Proc::get('conf.mimeCast');

      foreach ($conf as $tree => $list)
      {
         $list = (is_string($list) ? [$list] : $list);

         if (!is_array($list))
         { throw new Exception('expecting dataKind: ListTupl'); }

         if (in_array($extn,$list))
         { return "$tree::export"; }
      }

      return $auto;
   }
# ---------------------------------------------------------------------------------------------------------





# Proc::init
# ---------------------------------------------------------------------------------------------------------
   $export = function()
   {
   # proc :: conf
   # ------------------------------------------------------------------------------------------------------
      init(Vamp);
      Proc::$meta = Meta(['conf'=>Vamp::import('./.../Proc/conf.vmp')]);
      $conf = Proc::get('conf');
      $conf->mimeCast->Vamp = ['v','vmp'];
      Proc::$meta->conf = $conf;

      $cnst = 'DEVL,TEST,LIVE,AUTO,VOID,NONE,BOTH,CHAR,KEYS,VALS,PUSH,PULL,BFOR,AFTR,FRST,LAST';
      $cnst = explode(',',$cnst);

      foreach ($cnst as $name)
      { define($name,$name); }

      define('SITEMODE',$conf->siteMode);
      define('CleanScope',SYSDIR.'/Util/CleanScope.php');
   # ------------------------------------------------------------------------------------------------------




   # proc :: flow
   # ------------------------------------------------------------------------------------------------------
      mb_internal_encoding($conf->encoding);
      spl_autoload_register('Import');
   # ------------------------------------------------------------------------------------------------------




   # cond :: mode : dbug
   # ------------------------------------------------------------------------------------------------------
      if ($conf->siteMode !== LIVE)
      {
         $addr = $_SERVER['SERVER_ADDR'];
         $live = true;

         foreach ($conf->devlAddr as $indx => $devl)
         {
            $find = (strpos($devl,'*') ? substr($devl,0,strpos($devl,'*')) : $devl);

            if (substr($addr,0,strlen($find)) == $find)
            {
               $live = false;
               break;
            }
         }

         Dbug::test($live)->fail
         ([
            'Software upgrade in progress',
            [
               'The web application you are trying to access is temporarily unavailable.',
               'This not a fault and should be resolved quickly.'
            ],
            'Kindly visit here again in a few minutes.'
         ]);
      }
   # ------------------------------------------------------------------------------------------------------




   # vars :: user
   # ------------------------------------------------------------------------------------------------------
      $uatx = $_SERVER['HTTP_USER_AGENT'];
      $uatp = ((preg_match('/'.$conf->crawlers->match.'/', $uatx) > 0) ? 'spider' : 'surfer');
      $rpth = explode('?',$_SERVER['REQUEST_URI'])[0];
      $path = redirect($rpth);
      $vars = Meta($_REQUEST);
      $args = Meta(getallheaders());

      $args->Anon = (!$args->Anon ? Meta() : Vamp::rathe($args->Anon));

      if ($args->Anon->initView === null)
      { $args->Anon->initView = true; }

      if (!$args->Anon->userType)
      { $args->Anon->userType = $uatp; }  # TODO :: userAuth

      if (!$args->Anon->operator)
      { $args->Anon->operator = operOf($path); }
   # ------------------------------------------------------------------------------------------------------




   # proc :: user
   # ------------------------------------------------------------------------------------------------------
      Proc::set
      ([
         'user'=>
         [
            'args'=>$args,
            'path'=>$rpth,
            'vars'=>$vars,
            'data'=>Meta($_FILES),
         ]
      ]);
   # ------------------------------------------------------------------------------------------------------



   # init :: preStart
   # ------------------------------------------------------------------------------------------------------
      $init = $conf->preStart;

      if (count($init) > 0)
      {
         foreach ($init as $tree)
         { Import($tree); }
      }
   # ------------------------------------------------------------------------------------------------------



   # mime :: serve
   # ------------------------------------------------------------------------------------------------------
      call($args->Anon->operator, [$path]);
      exit;
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------

?>
