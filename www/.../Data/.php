<?

# tree :: Data
# ---------------------------------------------------------------------------------------------------------
   class Data
   {
   # self :: meta : aspects
   # ------------------------------------------------------------------------------------------------------
      public static $meta;
   # ------------------------------------------------------------------------------------------------------



   # func :: auto : call - static
   # ------------------------------------------------------------------------------------------------------
      public static function __callStatic($defn,$args)
      {
         // return Call::{__CLASS__."::$defn"}($args);
         return null;
      }
   # ------------------------------------------------------------------------------------------------------
   }
# ---------------------------------------------------------------------------------------------------------




# func :: Data
# ---------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------

?>
