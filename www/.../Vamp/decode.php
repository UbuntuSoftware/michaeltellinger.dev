<?

# Vamp::cast
# ---------------------------------------------------------------------------------------------------------
   $export = function($defn,$vars=null)
   {
   # dbug
   # ------------------------------------------------------------------------------------------------------
      if (!is_string($defn))
      { throw new Exception('expecting dataType: `Text`'); }

      $vc = trim($defn);
      $vs = strlen($vc);
      $zi = ($vs -1);

      if ($vs < 1)
      { return null; }
   # ------------------------------------------------------------------------------------------------------



   # cond :: quick parse
   # ------------------------------------------------------------------------------------------------------
      $tp = substr(kindOf($vc),0,4);

      if ($tp != 'Calc')
      {
         if ($tp == 'Void')
         { return null; }

         if ($tp == 'Bool')
         { return (in_array($vc,['true','yes','on','done','+','positive']) ? true : false); }

         if ($tp == 'Unit')
         { return ($vc *1); }

         if (($tp == 'Quot') && !strpos($vc,'\\'))
         { return substr($vc,1,($vs -2)); }
      }

      $ol = Vamp::$oper;
      $ok = keysOf($ol); # oper keys
      $ov = valsOf($ol); # oper vals

      if (!locate($vc,$ok))
      { return $vc; }
   # ------------------------------------------------------------------------------------------------------



   # vars
   # ------------------------------------------------------------------------------------------------------
      if (dataType($vars) != 'object')
      { $vars = (is_assoc_array($vars) ? Meta($vars) : Meta()); }

      $il = Vamp::$omit;   # ignr list
      $ql = Vamp::$quot;   # quot list
      $el = Vamp::$escp;   # escp List

      $is = keysOf($il);
      $qs = keysOf($ql);
      $dl = keysOf(Vamp::$dlim);   # dlim list
      $ml = keysOf(Vamp::$mopr);   # multilevl

      $xi = 0;    # cntx ignr
      $xq = 0;    # cntx quot

      $bt = '';   # bufr text
      $kn = '';   # keys name
      $kv = '';   # keys valu
      $co = '';   # crnt oper
      $po = '';   # prev oper
      $rd = [];   # resl data
      $rl = [];   # refr list
      $ri = 0;    # refr indx
      $ph = '⋖□⋗';

      $vc.= "\n";
      $vs+= 1;

      $rl[] =& $rd;
      $rp =& $rl[$ri];
   # ------------------------------------------------------------------------------------------------------



   # each :: char : walk through code, char by char
   # ------------------------------------------------------------------------------------------------------
      for ($i = 0; $i < $vs; $i++)
      {
      # vars :: chars
      # ---------------------------------------------------------------------------------------------------
         $c0 = (($i > 0) ? $vc[$i-1] : '');
         $c1 = $vc[$i];
         $c2 = ((($i+1) < $vs) ? $c1.$vc[$i+1] : '');
         $c3 = ((($i+2) < $vs) ? $c2.$vc[$i+2] : '');
         $c4 = ((($i+3) < $vs) ? $c3.$vc[$i+3] : '');

         $xi = ($xq ? null : locate($is,[$c0.$c1,$c0.$c2,$c0.$c3,$c2,$c3,$c4]));

         if ($xi)
         {
            $x = $xi[1];
            $e = $il[$x];
            $p = locate($vc,$e,($i+2));
            $p = ($p ? $p : [$zi,"\n"]);
            $i = (($p[1] === "\n") ? ($p[0] -1) : ($p[0] + strlen($p[1])));
            continue;
         }

         $ws = ($xq ? 0 : (in_array($c0.$c1,["\n\n",'  ']) ? 1 : (in_array($c1,["\t","\r"]) ? 1 : 0)));

         if ($ws)
         {
            $i = ((strlen($ws) > 1) ? ($i+1) : $i);
            continue;
         }


         $cl = [$c4,$c3,$c2,$c1];

         $bo = ($xq ? null : locate($ok,$cl));
         $eo = ($bo ? null : locate($ov,$cl));
         $to = ($bo ? $bo[1] : ($eo ? $eo[1] : null));


         if ($to)
         {
            $po = $co;  $co = $to;
            $bo = ($bo ? $to : null);
            $eo = ($eo ? $to : null);

            if ($bo && in_array($bo,$qs))
            { $xq = $bo; }
            elseif($eo  && in_array($eo,$ql))
            { $xq = null; }
         }
         else
         {
            if (!$xq || ($xq && ($c1 != '\\')))
            { $bt.= $c1;  continue; }

            if ($c2 == '\\')
            { $bt.= $c2;  $i++;  continue; }

            $nb = (strpos($vc,'\\',$i) || ($i +1));
            $tl = ($nb - $i);
            $et = substr($vc,$i,$tl);
            $i += $tl;

            if (($tl < 2) && isset($ec[$et]))
            { $rt = $ec[$et]; }
            elseif (preg_match('/^[A-F0-9]{4,4}+$/',$et))
            { $rt = charOf($et); }
            elseif(isset($vars->$et))
            { $rt = $vars->$et; }
            else
            { $rt = '□'; }

            $bt.= $rt;  continue;
         }
      # ---------------------------------------------------------------------------------------------------


      # cond :: parse : bgn
      # ---------------------------------------------------------------------------------------------------
         if (in_array($to,$ml))
         {
            $bt = trim($bt);

            if ($c1 == ':')
            {
               $kn = $bt;
               $bt = '';

               if (is_array($rp))
               { $rp[$kn] = $ph; }
               else
               { $rp->$kn = $ph; }

               continue;
            }

            if (in_array($c1,['[','{']))
            {
               $kn = ($kn ? $kn : $bt);
               $kn = array_search($ph,((array)$rp));
               $kn = ($kn ? $kn : keysOf($rp,-1));
               $tv = (($c1 == '[') ? [] : Meta());
               $bt = '';

               if (is_array($rp))
               { $rp[$kn] = $tv; }
               else
               { $rp->$kn = $tv; }

               if (is_array($rp))
               { $rl[] =& $rp[$kn]; }
               else
               { $rl[] =& $rp->$kn; }

               $ri++;
               $rp =& $rl[$ri];

               continue;
            }

         }
      # ---------------------------------------------------------------------------------------------------


      # cond :: parse : end
      # ---------------------------------------------------------------------------------------------------
         if (in_array($c1,$dl) || in_array($c1,[']','}']) || ($i == $zi))
         {
            $kn = array_search($ph,((array)$rp));
            $kn = ($kn ? $kn : keysOf($rp,-1));
            $kv = trim($bt);
            $kv = (in_array($po,$ql) ? "`$kv`" : $kv);
            $kv = Vamp::decode($kv);

            if ($kv)
            {
               if (is_array($rp))
               {
                  if (is_seqnum_array($rp))
                  { $rp[] = $kv; }
                  else
                  { $rp[$kn] = $kv; }
               }
               else
               { $rp->$kn = $kv; }
            }

            if (in_array($c1,[']','}']))
            {
               array_pop($rl);
               $ri--;
               $rp =& $rl[$ri];
            }

            $bt = '';
            $kn = '';
         }
      # ---------------------------------------------------------------------------------------------------
      }
   # ------------------------------------------------------------------------------------------------------


   # done
   # ------------------------------------------------------------------------------------------------------
      if (spanOf($rd) > 0)
      { return (is_assoc_array($rd) ? Meta($rd) : $rd); }

      return null;
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------

?>
