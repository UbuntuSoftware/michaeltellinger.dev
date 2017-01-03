<?

   $vl = get_defined_vars();
   $zo = ob_get_clean();

   foreach ($vl as $vn => $vd)
   { unset($$vn); }

   unset($vl,$zo,$vn,$vd);

?>
