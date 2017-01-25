
// glob :: View : manager
// --------------------------------------------------------------------------------------------------------
   Extend(Main)
   ({
      View:
      {
         Grid:36,

         Init:function()
         {
         // vars :: define
         // -----------------------------------------------------------------------------------------------
            var head,node,text,vcfg,grid,gtxt,htxt,vtxt;
         // -----------------------------------------------------------------------------------------------



         // vars :: prepare : base CSS + grid
         // -----------------------------------------------------------------------------------------------
            head = document.getElementsByTagName('head')[0];
            node = document.createElement('style');
            text = '';
            vcfg = document.getElementsByName('viewconf')[0];
            vcfg = (vcfg || '');
            vcfg = ((vcfg.indexOf('grid:')<0)?('grid:'+View.Grid+'; '+vcfg):vcfg).split('   ').join(' ').split('  ').join(' ');
            vcfg = vcfg.split(' ;').join(';').split('; ').join(';').split(';');

            for ((grid = vcfg.shift()); (grid.indexOf('grid:') < 0); (grid = vcfg.shift()));
            grid = (grid.split(':')[1] *1);

            gtxt = '\n.wrap-horz{display:inline-block !important;}';
            gtxt+= '\n.wrap-vert{display:block !important;}\n';

            htxt = '@media all and (orientation: landscape)\n{';
            vtxt = '@media all and (orientation: portrait)\n{';
         // -----------------------------------------------------------------------------------------------



         // each :: grid number : define CSS classes for horizontal & vertical grid
         // -----------------------------------------------------------------------------------------------
            for (var i=0; i<=grid; i++)
            {
               var unit = ((i < 10) ? ('0'+i) : (''+i));
               // var grat = +(1 + (grid / 100)).toFixed(2);
               var emsz = +((i < 1) ? 0.5 : (1 + (i * (grid / 100)))).toFixed(2);
               var span = +((100 / grid) * i).toFixed(3);

               gtxt += '\n.text-size-'+unit+'{font-size:'+emsz+'rem !important; line-height:'+emsz+'rem !important;}\n';

               gtxt += '\n.mrgn-horz-'+unit+'{margin-left:'+emsz+'rem !important; margin-right:'+emsz+'rem !important;}';
               gtxt += '\n.mrgn-vert-'+unit+'{margin-top:'+emsz+'rem !important; margin-bottom:'+emsz+'rem !important;}\n';

               gtxt += '\n.padn-horz-'+unit+'{padding-left:'+emsz+'rem !important; padding-right:'+emsz+'rem !important;}';
               gtxt += '\n.padn-vert-'+unit+'{padding-top:'+emsz+'rem !important; padding-bottom:'+emsz+'rem !important;}\n';

               gtxt += '\n.size-horz-'+unit+'{position:relative !important; width:'+emsz+'rem !important;}';
               gtxt += '\n.size-vert-'+unit+'{position:relative !important; height:'+emsz+'rem !important;}\n';

               gtxt += '\n.span-horz-'+unit+'{display:inline-block !important; position:relative !important; width:'+span+'% !important;}';
               gtxt += '\n.span-vert-'+unit+'{display:block !important; position:relative !important; height:'+span+'% !important;}';

               for (var t=0; t<=grid; t++)
               {
                  var tunt = ((t < 10) ? ('0'+t) : (''+t));
                  var tems = +((t < 1) ? 0.5 : (1 + (t * (grid / 100)))).toFixed(2);
                  var tspn = +((100 / grid) * t).toFixed(3);

                  htxt += '\n.tilt-horz-span-x'+unit+'-y'+tunt+'{display:inline-block !important; position:relative !important; width:'+span+'% !important; height:'+tspn+'% !important;}';
                  vtxt += '\n.tilt-vert-span-x'+unit+'-y'+tunt+'{display:block !important; position:relative !important; width:'+span+'% !important; height:'+tspn+'% !important;}';
               }
            }

            text += gtxt;
            text += (htxt+'\n}\n');
            text += (vtxt+'\n}\n');
         // -----------------------------------------------------------------------------------------------



         // done :: apply base CSS + grid
         // -----------------------------------------------------------------------------------------------
            node.name = 'viewGrid';
            node.type = 'text/css';

            if (node.styleSheet)
            { node.styleSheet.cssText = text; }
            else
            { node.appendChild(document.createTextNode(text)); }

            head.appendChild(node);
         // -----------------------------------------------------------------------------------------------
         },
      }
   });
// --------------------------------------------------------------------------------------------------------
