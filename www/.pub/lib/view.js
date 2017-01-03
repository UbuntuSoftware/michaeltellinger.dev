
// glob :: View : manager
// --------------------------------------------------------------------------------------------------------
   Extend(Main)
   ({
      View:
      {
         Init:function()
         {
         // vars :: define
         // -----------------------------------------------------------------------------------------------
            var head,node,text,vcfg,grid,gtxt;
         // -----------------------------------------------------------------------------------------------



         // vars :: prepare : base CSS + grid
         // -----------------------------------------------------------------------------------------------
            head = document.getElementsByTagName('head')[0];
            node = document.createElement('style');
            text = '';
            vcfg = document.getElementsByName('viewconf')[0];
            vcfg = (vcfg || '');
            vcfg = ((vcfg.indexOf('grid:')<0)?('grid:36; '+vcfg):vcfg).split('   ').join(' ').split('  ').join(' ');
            vcfg = vcfg.split(' ;').join(';').split('; ').join(';').split(';');

            for ((grid = vcfg.shift()); (grid.indexOf('grid:') < 0); (grid = vcfg.shift()));
            grid = (grid.split(':')[1] *1);

            gtxt = '\n.wrap-horz{display:inline-block !important;}';
            gtxt+= '\n.wrap-vert{display:block !important;}\n';
         // -----------------------------------------------------------------------------------------------



         // each :: grid number : define CSS classes for horizontal & vertical grid
         // -----------------------------------------------------------------------------------------------
            for (var i=0; i<=grid; i++)
            {
               var unit = ((i < 10) ? ('0'+i) : (''+i));
               var grat = +(1 + (grid / 100)).toFixed(2);
               var emsz = +((i < 1) ? 0.5 : (1 + (i * (grid / 100)))).toFixed(2);
               var span = +((100 / grid) * i).toFixed(3);

               gtxt += '\n.size-'+unit+'{font-size:'+emsz+'rem !important; line-height:'+grat+'rem !important;}\n';

               gtxt += '\n.mrgn-'+unit+'{margin:'+emsz+'rem !important;}';
               gtxt += '\n.mrgn-horz-'+unit+'{margin-left:'+emsz+'rem !important; margin-right:'+emsz+'rem !important;}';
               gtxt += '\n.mrgn-vert-'+unit+'{margin-top:'+emsz+'rem !important; margin-bottom:'+emsz+'rem !important;}\n';

               gtxt += '\n.padn-'+unit+'{padding:'+emsz+'rem !important;}';
               gtxt += '\n.padn-horz-'+unit+'{padding-left:'+emsz+'rem !important; padding-right:'+emsz+'rem !important;}';
               gtxt += '\n.mrgn-vert-'+unit+'{padding-top:'+emsz+'rem !important; padding-bottom:'+emsz+'rem !important;}\n';

               gtxt += '\n.area-'+unit+'{position:absolute !important; width:'+emsz+'rem !important; height:'+emsz+'rem !important;}';
               gtxt += '\n.area-horz-'+unit+'{position:relative !important; width:'+emsz+'rem !important;}';
               gtxt += '\n.area-vert-'+unit+'{position:relative !important; height:'+emsz+'rem !important;}\n';

               gtxt += '\n.span-'+unit+'{position:absolute !important; width:'+span+'% !important; height:'+span+'% !important;}';
               gtxt += '\n.span-horz-'+unit+'{display:inline-block !important; position:relative !important; width:'+span+'% !important;}';
               gtxt += '\n.span-vert-'+unit+'{display:block !important; position:relative !important; height:'+span+'% !important;}';
            }

            text += gtxt;
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
