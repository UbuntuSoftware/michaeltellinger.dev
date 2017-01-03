<?

# info :: warn : read this
# ---------------------------------------------------------------------------------------------------------
# This file is very important as it is the "handler" which initializes the basic expected necessities.
# It also initializes debug (for PHP version change -or access permission); auto-loading and security.
# The methods used in the initial startup files is compatible with old PHP versions for graceful fail.
# ---------------------------------------------------------------------------------------------------------





# load :: essentials
# ---------------------------------------------------------------------------------------------------------
   require('./.../Dbug/.php');
   require('./.../Util/.php');
# ---------------------------------------------------------------------------------------------------------





# tree :: Proc : process
# ---------------------------------------------------------------------------------------------------------
   class Proc
   {
      public static $meta;

      public static function __callStatic($func,$args)
      { return call(__CLASS__.'::'.$func,$args); }
   }
# ---------------------------------------------------------------------------------------------------------





# init :: process-flow
# ---------------------------------------------------------------------------------------------------------
   init(Proc);
# ---------------------------------------------------------------------------------------------------------

?>
