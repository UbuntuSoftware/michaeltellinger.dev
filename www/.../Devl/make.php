<?

# Devl::make
# ---------------------------------------------------------------------------------------------------------
   $export = function($fold,$tree=null,$func=null)
   {
      if (SITEMODE != 'DEVL')
      { return false; }

      if (!is_writable($fold))
      { throw new Exception("`$fold` is not writable"); }

      if (!is_dir($fold))
      { throw new Exception("`$fold` is not a folder"); }


      if ($tree && !$func)
      {
         $text = readPath("./.../Devl/.src/tree.php");
         $text = str_replace('treeName',$tree,$text);
         $done = file_put_contents("$fold/.php",$text);
         chmod("$fold/.php", 0777);

         $text = readPath("./.../Devl/.src/conf.vmp");
         $text = str_replace('treeName',$tree,$text);
         $done = file_put_contents("$fold/conf.vmp",$text);
         chmod("$fold/conf.vmp", 0777);

         return true;
      }


      if ($tree && $func)
      {
         $text = readPath("./.../Devl/.src/func.php");
         $text = str_replace('treeName',$tree,$text);
         $text = str_replace('funcName',$func,$text);
         $done = file_put_contents("$fold/$func.php",$text);
         chmod("$fold/$func.php", 0777);

         return true;
      }


      return false;
   }
# ---------------------------------------------------------------------------------------------------------

?>
