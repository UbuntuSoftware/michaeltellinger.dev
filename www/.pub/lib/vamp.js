// mode :: strict
// --------------------------------------------------------------------------------------------------------
   'use strict';
// --------------------------------------------------------------------------------------------------------




// glob :: Vamp : language support
// --------------------------------------------------------------------------------------------------------
   Define('Vamp')
   ({
   // func :: init
   // -----------------------------------------------------------------------------------------------------
      Init:function()
      {
         Path.Read.mimeCast.Join(Vamp.oprlib.extn);
      },
   // -----------------------------------------------------------------------------------------------------





   // func :: minify : remove comments & extra white-space
   // -----------------------------------------------------------------------------------------------------
      minify:function(vt)
      {
      // dbug & vars
      // --------------------------------------------------------------------------------------------------
         if (!isText(vt))
         { throw 'expecting typeOf: TEXT'; }

         var md,ol,ql,ob,qb,qp,qr,vs,zi,rt,mo,ln,xx;

         md = '!# minified\n';   // mini done
         ol = Vamp.oprlib.omit;  // omit list
         ql = Vamp.oprlib.quot;  // quot list
         ob = Keys(ol);          // omit begn
         qb = Keys(ql);          // quot begn
         qp = '‷‴';              // quot pair (triple prime)
         qr = '';                // quot CRLF
         vt = vt.trim();         // vamp text
         rt = '';                // resl text
         ln = 0;

         if
         (
            (vt.length < 1) || (vt.substr(0,md.length) == md) ||
            (!vt.Has(',',':','(','[','{') && !vt.Has(ob) && !vt.Has(qb) && !vt.Has('\n'))
         )
         { return vt.split(md).join(''); } // nothing to do

         vt = ('\n'+vt.Swap({'\r\n':'\n', '\t':'   ',})+'\n');  // fix white-space
         // vt = ('\n'+(vt.split('\r\n').join('\n').split('\t').join('   '))+'\n');
         vs = vt.length;
         zi = (vs -1);

         mo = Vamp.oprlib.swap;

         var ci,c1,c2,c3,c4,cl;     // char-pairs & char-list
         var ox,qx      ;        // omit-contxt & quot-contxt
         var os,qs,qt,pc,nc,tv,bt,dc,co;

         bt = '';
         dc = Vamp.oprlib;
         co = Keys({}.Join(dc.expr).Join(dc.dlim).Join(dc.mopr)).Join(Vals(dc.mopr[':']));
      // --------------------------------------------------------------------------------------------------




      // each :: char : walk through each char to avoid quot-&-omit issues -- jump ahead on omit -or- quot
      // --------------------------------------------------------------------------------------------------
         for (ci=0; ci<vs; ci++)
         {
         // char pairs
         // -----------------------------------------------------------------------------------------------
            c1 = vt[ci];                              // 1 char
            c2 = (((ci+1) < vs) ? c1+vt[ci+1] : '');  // 2 chars
            c3 = (((ci+2) < vs) ? c2+vt[ci+2] : '');  // 3 chars
            c4 = (((ci+3) < vs) ? c3+vt[ci+3] : '');  // 4 chars
            cl = [c4,c3,c2,c1];                       // char list

            ln = ((c1 == `\n`) ? (ln + 1) : ln);
         // -----------------------------------------------------------------------------------------------



         // omit :: comment
         // -----------------------------------------------------------------------------------------------
            ox = cl.Find(ob);

            if (ox)
            {
               ox = ol[ox[1]];
               ox = vt.Find(ox, ci+2);
               os = ox[1].length;
               ci = (ox[0]+ci+os);

               continue;
            }
         // -----------------------------------------------------------------------------------------------



         // quot :: strings
         // -----------------------------------------------------------------------------------------------
            qx = cl.Find(qb);

            if (qx)
            {
               qs = ql[qx[1]];
               tv = ('⋖'+(qs.length<2 ? '□' : '□□')+'⋗');
               vt = vt.split('\\'+qs+'\\').join(tv);
               qx = vt.Find(qs,ci+1); qx[0]+=ci;
               vt = vt.split(tv).join('\\'+qs+'\\');
               qs = qx[1].length;
               qt = vt.substr(ci+qs, ((qx[0]+1) - (ci+qs)));
               ci = (qx[0] + qs);

               if ((qx[1] == '|]') && qt.Has('\n'))
               {
                  qs = qt.split('\n');
                  tv = (qs.length -1);
                  qt = [];

                  qs.Each = function(lt,li)
                  {
                     lt = lt.trim();

                     if ((lt.length < 1) && ((li < 1) || (li == tv)))
                     { return NEXT; }

                     qt.Insert(lt);
                  };

                  qt = qt.join('↵');
               }

               rt+= (qp[0] + qt + qp[1]);

               continue;
            }
         // -----------------------------------------------------------------------------------------------



         // resl :: apnd : non-quoted
         // -----------------------------------------------------------------------------------------------
            pc = ((ci < 1) ? '' : vt[ci -1]);
            nc = ((ci < zi) ? vt[ci +1] : '');

            if
            (
               ((pc+c1) == '  ') || (c2 == '  ') || (c2 == '\n\n') ||
               ([' ','\n'].Has(c1) && ((ci < 1) || (ci == zi)))
            )
            { continue; }

            if (co.Has(c1))
            { bt = ((c1 != '.') ? '' : bt); }
            else
            { bt+= c1; }

            if (c1 == ':'){ xx = 1; }

            if (xx && ('}])'.Has(c1)) && !(',;\n'.Has(pc)))
            {
               xx = 0;
               rt+= '﹐';
            }


            if ((c1 == '\n') && vt.Find(['{','['],ci))
            {
               if ((')}'.Has(pc)) && ('{['.Has(nc))){ continue; }

               var nx = vt.Find(['{','['],ci);
               var ws = vt.substr(ci, nx[0]);
               var ni = ((ci + ws.length) -1);

               if (ws.trim().length < 1)
               {
                  ci = ni;
                  continue;
               }
            }


            if (mo[c2] || (mo[c1] && ((c1 != '.') || isNaN(bt) || isNaN(nc)) && ((c1 != '-') || isNaN(nc))))
            {
               c1 = (mo[c2] ? mo[c2] : mo[c1]);
            }

            rt+= c1;
         // -----------------------------------------------------------------------------------------------
         }
      // --------------------------------------------------------------------------------------------------




      // done :: sanitize
      // --------------------------------------------------------------------------------------------------
         rt = rt.trim();
         rt = rt.Swap({'﹔﹔﹔﹔':'﹔', '﹔﹔﹔':'﹔', '﹔﹔':'﹔'});
         rt = rt.Swap({'﹙﹔':'﹙', '﹝﹔':'﹝', '﹛﹔':'﹛', '﹕﹔':'﹕','﹔﹐':'﹔'});
         rt = rt.Swap({'﹚ ﹙':'﹚﹙', '﹚ ﹛':'﹚﹛', '﹚ ﹝':'﹚﹝', '﹕ ﹙':'﹕﹙', '﹜ ﹝':'﹜﹝'});
         rt = rt.Trim('﹔');

         return rt;
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------





   // func :: reckon : calculate expressions
   // -----------------------------------------------------------------------------------------------------
      reckon:function(text,vars,self)
      {
      // vars
      // --------------------------------------------------------------------------------------------------
         var oper,data;

         oper = Vals(Vamp.oprlib.swap).Delete(DUPL);
      // --------------------------------------------------------------------------------------------------




      // cond :: variables : e.g: `(just.some.value)`
      // --------------------------------------------------------------------------------------------------
         if (!self && !text.Has(oper.Delete('﹒')))
         { return vars.Tunnel(text.split('﹒').join('.')); }
      // --------------------------------------------------------------------------------------------------
      }
      .Join
      ({
      // func :: Calc : calculate expressions
      // --------------------------------------------------------------------------------------------------
         Calc:function()
         {
         // vars
         // -----------------------------------------------------------------------------------------------
            var args,

            args = listOf(arguments);
         // -----------------------------------------------------------------------------------------------



         // -----------------------------------------------------------------------------------------------
            Dump('Calc',args);
         // -----------------------------------------------------------------------------------------------
         },
      // --------------------------------------------------------------------------------------------------




      // func :: Call : call expressions
      // --------------------------------------------------------------------------------------------------
         Call:function()
         {
         // vars
         // -----------------------------------------------------------------------------------------------
            var args,

            args = listOf(arguments);
         // -----------------------------------------------------------------------------------------------



         // -----------------------------------------------------------------------------------------------
            Dump('Call',args);
         // -----------------------------------------------------------------------------------------------
         },
      // --------------------------------------------------------------------------------------------------
      }),
   // -----------------------------------------------------------------------------------------------------





   // func :: dewrap : split up minified vamp-text sections into a list of wrap definitions
   // -----------------------------------------------------------------------------------------------------
      dewrap:function(text)
      {
      // vars
      // --------------------------------------------------------------------------------------------------
         var xlst,xbgn,xend,wrap,bufr,levl,lidx,last,prts,flcp,list,resl,dlim;

         xbgn = ['﹙','﹝','﹛','﹕'];
         xend = ['﹚','﹞','﹜','﹕'];
         wrap = Vamp.oprlib.wrap;
         levl = 0;
         bufr = '';
         list = [];
         last = (text.length - 1);
         resl = {BASE:VOID, EXPR:VOID, ATTR:VOID, DATA:text};
      // --------------------------------------------------------------------------------------------------


      // cond :: flat
      // --------------------------------------------------------------------------------------------------
         if (!text.Has(['﹙','﹝','﹛','﹕']) || (text[0] == '#')){ return resl; }
      // --------------------------------------------------------------------------------------------------


      // each :: char : walk each char
      // --------------------------------------------------------------------------------------------------
         text.Each = function(c,p)
         {
            if (xbgn.Has(c))
            {
               levl++;

               if ((levl < 2) && (list.length < 1) && ['﹝','﹛'].Has(c))
               {
                  list[list.length] = bufr.trim();
                  bufr = c;
                  return;
               }
            }

            bufr += c;

            if (xend.Has(c) || (p == last))
            {
               levl--;

               if (levl < 1)
               {
                  list[list.length] = bufr.trim();
                  bufr = '';
               }
            }
         };
      // --------------------------------------------------------------------------------------------------



      // cond :: list : make node.BASE
      // --------------------------------------------------------------------------------------------------
         if
         (
            (list[0].findOf(xbgn) == '﹕') || ((list[0].trimOf(1) == '﹙﹚') && (list[1] == '﹕')) ||
            ((list[0].match(/^[a-z0-9_\/$]{1,360}$/i)) && list[1] && ['﹝','﹛'].Has(list[1][0]))
         )
         {
            prts = list[0].split('﹕');
            resl.BASE = prts[0];
            list.shift();

            if (!prts[1] && (list[0] == '﹕'))
            { list.shift(); }
         }
      // --------------------------------------------------------------------------------------------------


      // cond :: list : make node.EXPR
      // --------------------------------------------------------------------------------------------------
         if (list[0] && list[0].hasAll('﹙','﹚') && (list[0].substr(-1,1) == '﹚'))
         {
            resl.EXPR = list[0];
            list.shift();
         }
      // --------------------------------------------------------------------------------------------------


      // cond :: list : make node.ATTR
      // --------------------------------------------------------------------------------------------------
         if (list[0] && list[0].hasAll('﹛','﹜') && (list[0].substr(-1,1) == '﹜'))
         {
            resl.ATTR = list[0];
            list.shift();
         }
      // --------------------------------------------------------------------------------------------------


      // cond :: list : make node.DATA
      // --------------------------------------------------------------------------------------------------
         if (list[0] && list[0].hasAll('﹝','﹞') && (list[0].substr(-1,1) == '﹞'))
         {
            resl.DATA = list[0];
            list.shift();
         }
         else
         { resl.DATA = list[0]; }
      // --------------------------------------------------------------------------------------------------



      // done
      // --------------------------------------------------------------------------------------------------
         return resl;
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------





   // func :: desect : split up minified vamp-text into a list of same-level sections
   // -----------------------------------------------------------------------------------------------------
      desect:function(text,note)
      {
      // vars
      // --------------------------------------------------------------------------------------------------
         var xlst,xbgn,xend,bufr,levl,bopr,eopr,resl,indx,pair,wrap,hash,dlim,prts,popr,copr,nopr,list;

         xlst = Vamp.oprlib.xlst;
         xbgn = Vamp.oprlib.xbgn.join('');
         xend = Vamp.oprlib.xend.join('');
         wrap = {'‴﹕':AUTO,  '﹚﹕':AUTO,  '﹚﹙':AUTO,  '﹚﹛':AUTO,  '﹚﹝':AUTO,  '﹜﹝':AUTO};
         bufr = '';
         eopr = '';
         levl = 0;
         resl = [''];
         indx = 0;
      // --------------------------------------------------------------------------------------------------


      // each :: char
      // --------------------------------------------------------------------------------------------------
         text.Each = function(c,p)
         {
            resl[indx] += c;

            if (xbgn.Has(text[p-1]) || xend.Has(text[p-1])){ popr = text[p-1]; }else{ popr = VOID; }
            if (xbgn.Has(c) || xend.Has(c)){ copr = c; }else{ copr = VOID; }
            if (xbgn.Has(text[p+1]) || xend.Has(text[p+1])){ nopr = text[p+1]; }else{ nopr = VOID; }

            if (xlst[c] && ((c == bopr) || (levl < 1)) && ((popr+copr) != '﹕﹕'))
            {
               bopr = c;
               eopr = xlst[c];
               levl++;
            }

            if (eopr && eopr.Has(c)){ levl--; }

            if (((levl < 1) && xend.Has(c) && (wrap[copr+nopr] !== AUTO)) && (nopr != '﹚') && (resl[indx].Find(xbgn.split('')) || (copr == '﹔')))
            {
               bopr = VOID;
               eopr = VOID;
               indx++;
               resl[indx] = '';
            }
         };

         if ((resl[indx] == '') || (resl[indx] == '﹔')){ resl.pop(); } // remove blank items at end
      // --------------------------------------------------------------------------------------------------



      // each :: sect : dewrap
      // --------------------------------------------------------------------------------------------------
         list = [];

         resl.Each = function(sect,indx)
         {
            sect = sect.trim().Trim('﹔').trim().Trim('﹐').trim();
            if (sect.length < 1){ return; }

            if (sect.Has('﹙','﹝','﹛'))
            {
               list[list.length] = Vamp.dewrap(sect);
               return;
            }

            if (text.Has('﹔','﹐'))
            {
               dlim = text.findOf(['﹔','﹐']);
               sect = sect.split(dlim);

               sect.Each = function(item)
               {
                  if (!item.Has('﹕'))
                  {
                     if (note == 'attr')
                     { list[list.length] = {BASE:item, EXPR:VOID, ATTR:VOID, DATA:'#true'}; return; }

                     list[list.length] = {BASE:indx, EXPR:VOID, ATTR:VOID, DATA:item}; return;
                  }

                  prts = item.split('﹕');

                  list[list.length] = {BASE:prts.shift().trim(), EXPR:VOID, ATTR:VOID, DATA:prts.join('﹕').trim()};
               };

               return;
            }

            if (sect.Has('﹕'))
            {
               prts = sect.split('﹕');
               list[list.length] = {BASE:prts[0].trim(), EXPR:VOID, ATTR:VOID, DATA:prts[1].trim()};
               return;
            }

            if (note == 'attr')
            { list[list.length] = {BASE:sect, EXPR:VOID, ATTR:VOID, DATA:'#true'}; return; }

            list[list.length] = {BASE:indx, EXPR:VOID, ATTR:VOID, DATA:sect.Swap({'﹨':'/', '﹒':'.'})};
         };
      // --------------------------------------------------------------------------------------------------



      // done
      // --------------------------------------------------------------------------------------------------
         return list;
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------





   // func :: decode : parse into runtime
   // -----------------------------------------------------------------------------------------------------
      decode:function(text,vars,done,mini,flat)
      {
      // vars
      // --------------------------------------------------------------------------------------------------
         var deco,xlst,xbgn,xend,wrap,dlim,resl,list,flcp,mctx,prts,flag,node,name,data,type,mime;

         text = (mini ? text : Vamp.minify(text)).Trim('﹐').Trim('﹔');
         vars = (isNode(vars) ? vars : {});

         vars.$ = (vars.$ || {Path:vars.FILEPATH, Mime:(vars.FILEPATH ? Path.Mime(vars.FILEPATH) : '/')});

         deco = this;
         xlst = Vamp.oprlib.xlst;
         xbgn = Vamp.oprlib.xbgn;
         xend = Vamp.oprlib.xend;
         wrap = Vamp.oprlib.wrap;
         dlim = ['﹐','﹔'];
         flcp = text.trimOf(1);
         mctx = {'‷':'‴',  '﹙':'﹚',  '﹝':'﹞',  '﹛':'﹜'};
      // --------------------------------------------------------------------------------------------------




      // walk :: poly : sections
      // --------------------------------------------------------------------------------------------------
         resl = function()
         {
         // cond :: quick : flat
         // --------------------------------------------------------------------------------------------------
            if (!text.Has(xbgn))
            { return deco.Flat(text); }
         // --------------------------------------------------------------------------------------------------



         // cond :: quick : refs
         // -----------------------------------------------------------------------------------------------
            if ((text[0] == '#') && (text.match(/^[a-z0-9#:\.][\w]{3,36}$/i)))
            { return deco.Hash(text); }
         // -----------------------------------------------------------------------------------------------



         // cond :: quick : mono-wrap
         // -----------------------------------------------------------------------------------------------
            if ((mctx[flcp[0]] == flcp[1]) && (text.spanOf(flcp[0]) < 2))
            {
               switch (flcp)
               {
                  case '‷‴':return deco.Quot(text,vars);
                  case '﹙﹚':return deco.Expr(text,VOID,VOID,vars);
                  case '﹛﹜':return deco.Attr(text,vars);
                  case '﹝﹞':return deco.Data(text,vars);
               }
            }
         // -----------------------------------------------------------------------------------------------



         // cond :: quick : attr - skip if any complex line
         // -----------------------------------------------------------------------------------------------
            if (text.Has('﹕') && !text.Has('﹛','﹝'))
            {
               dlim = text.findOf(['﹔','﹐']);
               list = text.split((dlim || '﹔'));
               node = {};

               list.Each = function(line)
               {
                  line = line.trim();

                  if (line.length < 1){ return NEXT; }
                  // if (!line.Has('﹕'))
                  // { flag = SKIP; return STOP; } // skip quick-assign

                  prts = line.split('﹕');
                  prts[1] = (prts[1] || '');

                  if ((prts[0].Has('﹙') && !prts[0].Has('﹚')) || (prts[1].Has('﹙') && !prts[1].Has('﹚')))
                  { flag = SKIP; return STOP; } // skip quick-assign

                  name = Vamp.decode(prts[0],vars,VOID,1,1);
                  data = Vamp.decode(prts[1],vars,VOID,1,1);

                  node[name] = data;
               };

               if (flag != SKIP){ return node; }
            }
         // -----------------------------------------------------------------------------------------------



         // each :: list : sect
         // -----------------------------------------------------------------------------------------------
            list = Vamp.desect(text);

            list.Each = function(sect,indx)
            {
            // --------------------------------------------------------------------------------------------
               sect.BASE = function()
               {
                  if (!sect.BASE){ return indx; }

                  flcp = sect.BASE.trimOf(1);

                  if (['‷‴','﹙﹚'].Has(flcp))
                  {
                     if (flcp == '‷‴'){ return deco.Data(sect.BASE,vars); }
                     return deco.Expr(sect.BASE,VOID,VOID,vars);
                  }

                  return sect.BASE;
               }();
            // --------------------------------------------------------------------------------------------


            // --------------------------------------------------------------------------------------------
               if (sect.EXPR)
               {
                  sect.DATA = function()
                  {
                     return deco.Expr(sect.EXPR, sect.ATTR, sect.DATA, vars);
                  }();
               }
               else
               {
                  sect.ATTR = function()
                  {
                     if (!sect.ATTR){ return VOID; }
                     return deco.Attr(sect.ATTR,vars);
                  }();

                  sect.DATA = function()
                  {
                     if (!sect.DATA){ return VOID; }
                     flcp = sect.DATA.trimOf(1);
                     return deco[((flcp == '﹝﹞') ? 'Data' : 'Quot')](sect.DATA,vars);
                  }();
               }

               sect.Delete('EXPR');

               if (sect.ATTR)
               { sect.ATTR.$ = {Path:vars.$.Path + '/' + indx + '/' + sect.BASE}; }
            // --------------------------------------------------------------------------------------------


            // --------------------------------------------------------------------------------------------
               list[indx] = sect;
            // --------------------------------------------------------------------------------------------
            };

            return list;
         // -----------------------------------------------------------------------------------------------
         }();
      // --------------------------------------------------------------------------------------------------



      // done
      // --------------------------------------------------------------------------------------------------
         if (flat){ return resl; }

         resl = function(node)
         {
            node = {BASE:Path.Base(vars.FILEPATH), ATTR:{$:vars.$}, DATA:VOID};
            type = typeOf(resl);

            if (type == NODE)
            {
               node.ATTR = resl;
               node.ATTR.$ = vars.$;

               return node;
            }

            node.DATA = resl;

            return node;
         }();

         mime = Path.Mime(resl.ATTR.$.Path);

         if (Vamp.export.hasKey(mime))
         { resl = Vamp.export[mime](resl); }

         if (isFunc(done)){ done(resl); return; }
         return resl;
      // --------------------------------------------------------------------------------------------------
      }
      .Join
      ({
      // Func :: Flat : mono
      // --------------------------------------------------------------------------------------------------
         Flat:function(text)
         {
            var kind,dlim;

            kind = kindOf(text).substr(1,4);
            dlim = ['﹔','﹐',' '];
            text = text.Swap({'﹨':'/', '﹒':'.'});

            if (text.Has(dlim))
            {
               dlim = text.findOf(dlim);
               text = text.split((dlim+' ')).join(dlim).split((' '+dlim)).join(dlim).split(dlim);

               return text;
            }

            if (kind == 'VOID'){ return VOID; }
            if (kind == 'UNIT'){ return (text * 1); }
            if (kind == 'QBIT'){ return ((text == 'true') ? true : false); }

            return text;
         },
      // --------------------------------------------------------------------------------------------------




      // Func :: Hash : hash-ref
      // --------------------------------------------------------------------------------------------------
         Hash:function(text)
         {
            var prts,name,args;

            prts = text.split('::');
            name = prts.shift();
            args = prts[0];

            if (this.refs[name])
            { return this.refs[name](args); }

            return text;
         }
         .Join
         ({
            refs:
            {
               http:function()
               {
                  throw 'TODO :: Vamp.decode.Hash : http';
               },
            }
         }),
      // --------------------------------------------------------------------------------------------------




      // Func :: Quot : quoted-text
      // --------------------------------------------------------------------------------------------------
         Quot:function(text,vars)
         {
         // vars
         // -----------------------------------------------------------------------------------------------
            var temp,escp,span,flcp;

            if (!text){ return VOID; } // empty
            text = text.Trim(1);
            if (text.Has('↵')){ text = text.split('↵').join('\n'); }
         // -----------------------------------------------------------------------------------------------



         // cond :: quot : quoted text with escape support for chars, vars, unicode
         // -----------------------------------------------------------------------------------------------
            if (text.Has('\\'))
            {
               temp = text.split('\\');
               text = '';
               escp = Vamp.oprlib.escp;

               temp.Each = function(item,indx)
               {
                  if (indx.isEVOD(EVEN))
                  { text += item; return; }

                  if (indx.isEVOD(ODDS))
                  {
                     span = item.length;
                     flcp = item.trimOf(1);

                     if (span < 1){ text += '\\'; return; }
                     if (span < 2){ text += (escp[item] ? escp[item] : item); return; }
                     if (flcp == '()')
                     {
                        item = Vamp.Expr(Vamp.minify(item), VOID, VOID, vars);
                        text+= ((item === VOID) ? '□' : textOf(item));
                        return;
                     }

                     text += (charOf(item) || '□');
                  }
               };
            }

            return text;
         // -----------------------------------------------------------------------------------------------
         },
      // --------------------------------------------------------------------------------------------------




      // func :: Expr : calculate expression
      // --------------------------------------------------------------------------------------------------
         Expr:function(expr,attr,data,vars)
         {
         // vars
         // -----------------------------------------------------------------------------------------------
            var flcp,wrap,args,cntx,resl,list,name,prts;

            flcp = expr.trimOf(1);
            wrap = {ATTR:(attr ? 1 : 0), DATA:(data ? 1 : 0)};

            expr = ((flcp == '﹙﹚') ? expr.Trim(1) : expr).trim().Trim('﹐').trim().Trim('﹔').trim();
            attr = (attr || '').Trim(1).trim().Trim('﹐').trim().Trim('﹔').trim();
            data = (data || '').Trim(1).trim().Trim('﹐').trim().Trim('﹔').trim();

            if (!expr && !attr && !data){ return VOID; }
         // -----------------------------------------------------------------------------------------------




         // cond :: expr : vars & calc
         // -----------------------------------------------------------------------------------------------
            if ((flcp == '﹙﹚') && !attr && !data)
            {
            // cond :: vars
            // --------------------------------------------------------------------------------------------
               if (expr.match(/^[a-z0-9\.$][\w]{1,36}$/i))
               {
                  if (expr[0] == '$'){ expr = (expr[0] + '.' + expr.substr(1)); } // self
                  return (vars.Tunnel(expr));
               }
            // --------------------------------------------------------------------------------------------


            // cond :: hash
            // --------------------------------------------------------------------------------------------
               if ((expr[0] == '#') && (!expr.Has(' ','﹐','﹔','﹙','﹛','﹝')))
               {
                  expr = expr.substr(1);

                  if (expr.Has('﹕﹕'))
                  {
                     resl = {};
                     list = expr.split('﹕﹕');

                     list.Each = function(sect)
                     {
                        if (!sect.Has('﹕'))
                        {
                           name = sect;
                           resl[name] = {};
                           return NEXT;
                        }

                        if (name)
                        {
                           prts = sect.split('﹕');
                           prts[1] = (isUnitText(prts[1]) ? (prts[1] * 1) : prts[1]);
                           resl[name][prts[0]] = prts[1];
                        }
                     };

                     return resl;
                  }

                  if (expr.Has('﹕'))
                  {
                     resl = {};
                     prts = expr.split('﹕');
                     prts[1] = (isUnitText(prts[1]) ? (prts[1] * 1) : prts[1]);
                     resl[prts[0]] = prts[1];

                     return resl;
                  }
               }
            // --------------------------------------------------------------------------------------------


            // cond :: calc
            // --------------------------------------------------------------------------------------------
               if (expr.Has(' ﹨ ')) // HACK!! :: TODO calculations
               {
                  prts = expr.split(' ﹨ ');

                  if (isUnitText(prts[0]) && isUnitText(prts[1]))
                  {
                     prts[0] = (prts[0] * 1);
                     prts[1] = (prts[1] * 1);

                     return (prts[0] / prts[1]);
                  }
               }

               throw 'TODO :: expr : calc';
            // --------------------------------------------------------------------------------------------
            }
         // -----------------------------------------------------------------------------------------------



         // cond :: call : func
         // -----------------------------------------------------------------------------------------------
            if (expr && (flcp != '﹙﹚'))
            {
               this.CALL(expr,attr,data,vars,function($Echo)
               {
                  // dump($Echo);
                  Dump('so far so good!');
               });
            }
         // -----------------------------------------------------------------------------------------------



         // cond :: make : func
         // -----------------------------------------------------------------------------------------------
            if ((flcp == '﹙﹚') && wrap.DATA)
            {
               args = expr.split('﹐').join(',');

               if (attr)
               {
                  throw 'TODO :: expr : make func -&- set attr';
               }

               data = this.toJS(data);
               cntx = "$=this; $Tick=(event||window.event); "+data+";";

               return cntx;
            }
         // -----------------------------------------------------------------------------------------------
         }
         .Join
         ({
            CALL:function(expr,attr,data,vars,cbfn)
            {
               var self,prts,func,args,list;

               self = this;
               prts = expr.Stub('﹙');
               func = prts[0];


               args = function()
               {
                  list = prts[1].Trim(1).split('﹐');
                  list.Each = function(item,indx)
                  {
                     item = self.toJS(item);
                     list[indx] = ((item.Has('/','.') && !item.Has(' ',"'")) ? ("'"+item+"'") : item);
                  };

                  return list;
               }();


               data = function()
               {
                  list = Vamp.desect(data);

                  list.Each = function(item)
                  {
                     // dump(item);
                  };
Dump('so far so good! -- vamp.js  line: 1003');
               }();
            },


            CALC:function(text)
            {
            },


            toJS:function(text)
            {
               text = text.trim().Trim('﹐').trim().Trim('﹔').trim();
               text = text.Swap
               ({
                  '﹙':'(', '﹚':')',
                   '﹛':'{', '﹜':'}',
                   '﹐':',', '﹔':';',
                   '‷':"'", '‴':"'",
                   '﹕':'=', '﹨':'/',
               });

               return text;
            },
         }),
      // --------------------------------------------------------------------------------------------------




      // func :: Attr : attributes
      // --------------------------------------------------------------------------------------------------
         Attr:function(text,vars)
         {
            var list,resl,prts,flcp,temp;

            flcp = text.trimOf(1);

            if (flcp == '﹛﹜'){ text = text.Trim(1).trim().Trim('﹐').trim().Trim('﹔').trim(); }
            if (!text){ return VOID; }

            list = Vamp.desect(text,'attr');

            list.Each = function(sect,indx)
            {
               if (!sect.DATA)
               {
                  if (sect.ATTR)
                  { sect.DATA = sect.ATTR; sect.ATTR = VOID; }
               }

               if (vars && Vamp.export.hasKey(vars.$.Mime) && Vamp.export[vars.$.Mime].FUNC.ATTR.hasKey(sect.BASE))
               {
                  return; // skip if to be decoded elsewhere
               }

               if (sect.EXPR)
               {
                  sect.DATA = Vamp.decode.Expr(sect.EXPR, sect.ATTR, sect.DATA, vars);
                  sect.Delete('EXPR');
                  return;
               }

               if (sect.DATA.trimOf(1) == '﹛﹜')
               {

                  list[indx].DATA = Vamp.decode.Attr(sect.DATA,vars);
                  return;
               }

               if (sect.DATA.trimOf(1) == '﹝﹞')
               {
                  list[indx].DATA = Vamp.decode.Data(sect.DATA,vars);
                  return;
               }

               list[indx].DATA = Vamp.decode(sect.DATA,vars,VOID,1,1);
            };

            resl = {};

            if (!list){ return resl; }

            if (typeOf(list) == NODE)
            { return list; }

            list.Each = function(sect)
            {
               if (isText(sect.DATA))
               {
                  sect.DATA = sect.DATA.trim().Trim('﹐').trim().Trim('﹔').trim();
                  if (sect.DATA.trimOf(1) == '‷‴'){ sect.DATA = sect.DATA.Trim(1); }
                  if (sect.DATA.Has('﹨','﹒')){ sect.DATA = sect.DATA.Swap({'﹨':'/', '﹒':'.'}); }
               }

               sect.DATA = (!isNaN(sect.DATA) ? (sect.DATA * 1) : sect.DATA);
               resl[sect.BASE] = sect.DATA;
            };

            return resl;
         },
      // --------------------------------------------------------------------------------------------------




      // func :: Data : contents
      // --------------------------------------------------------------------------------------------------
         Data:function(text,vars)
         {
            var resl,list;

            text = text.trim().Trim('﹐').trim().Trim('﹔').trim();

            if (text.trimOf(1) == '﹝﹞'){ text = text.Trim(1).trim().Trim('﹐').trim().Trim('﹔').trim(); }
            if (!text){ return VOID; }

            list = Vamp.desect(text);

            if (!list[0] || !list[0].DATA)
            { return list; }

            if (!list[0].DATA.Has('﹝','﹛','﹙') && list[0].DATA.Has('﹐') && !list[1])
            {
               return list[0].DATA.split('﹐');
            }

            return list;
         },
      // --------------------------------------------------------------------------------------------------
      }),
   // -----------------------------------------------------------------------------------------------------





   // func :: export : mime-type
   // -----------------------------------------------------------------------------------------------------
      export:
      {

      }
      .Join
      ({
         htm:function(gist,home)
         {
            var self,resl,node,attr,data;

            gist = (isNode(gist) ? gist.DATA : gist);
            self = this;
            resl = '';

            gist.Each = function(sect,indx)
            {
               if (!isNode(sect))
               {
                  resl += '<span>'+self.toSrc(sect)+'</span>';
                  return;
               }

               if (isVoid(sect.BASE) || isUnit(sect.BASE))
               { sect.BASE = 'SPAN'; }

               if (self.Tags.hasKey(sect.BASE))
               {
                  if (isNode(sect.ATTR))
                  {
                     sect.ATTR['vtag'] = sect.BASE;

                     if (sect.ATTR.dbug)
                     {
                        if (!sect.ATTR.Clan){ sect.ATTR.Clan = ''; }
                        sect.ATTR.Clan += ' dbug';
                        sect.ATTR.Delete('dbug');
                     }
                  }
                  else if (isText(sect.ATTR))
                  { sect.ATTR = ('﹛'+(sect.ATTR.Trim(1).Trim('﹐').trim().Trim('﹔').trim() + ('﹔vtag﹕' + sect.BASE))+'﹜'); }

                  resl += self.Tags[sect.BASE](sect.ATTR,sect.DATA,sect.BASE,home);
                  // resl += '\n\n';

                  return;
               }

               node = sect.BASE.caseTo(LOWR);
               attr = self.toAtr(sect.ATTR,sect.BASE);
               data = self.toSrc(sect.DATA,sect.BASE);

               resl += ('<'+ node + attr +'>'+ data +'</'+ node +'>');
            };


            return resl;
         }
         .Join
         ({
         // -----------------------------------------------------------------------------------------------
            toTag:function(node,attr)
            {

            },
         // -----------------------------------------------------------------------------------------------



         // -----------------------------------------------------------------------------------------------
            toAtr:function(attr,node)
            {
               var self,resl,clan,evnt,eatr;

               self = this;
               resl = '';
               clan = '';
               eatr = '';

               if (!attr){ return ''; }
               if (isText(attr)){ attr = Vamp.decode.Attr(attr); }

               attr.Each = function(v,k)
               {
                  if (k == '$'){ return NEXT; }

                  if (self.Atrs.hasKey(k))
                  {
                     if (['Clan','Span','Size'].Has(k))
                     {
                        clan += (' '+self.Atrs[k](v,node));
                        return;
                     }

                     resl += self.Atrs[k](v);
                     return;
                  }

                  v = (textOf(v) || '').split('"').join("'");
                  resl += (' '+k+'="'+v+'"');
               };

               if (clan.length > 0)
               { resl += (' class="'+clan.trim()+'"'); }

               return resl;
            },
         // -----------------------------------------------------------------------------------------------



         // -----------------------------------------------------------------------------------------------
            toSrc:function(data,node)
            {
               return (isList(data) ? Vamp.export.htm(data) : textOf(data));
            },
         // -----------------------------------------------------------------------------------------------



         // -----------------------------------------------------------------------------------------------
            Tags:
            {
               ZONE:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  attr = expo.toAtr(attr,node);
                  node = 'div';

                  return ('<'+ node + attr +'>'+ expo.toSrc(data,node) +'</'+ node +'>');
               },


               SHOW:function(attr,data,node,home)
               {
                  var expo,node,attr,data,rate,ctrl,face,ctrl,cast,want;

                  expo = Vamp.export.htm;
                  // rate = copyOf(attr.Rate); attr.Delete('Rate');
                  // ctrl = copyOf(attr.Ctrl); attr.Delete('Ctrl');
                  attr = expo.toAtr(attr,node);


                  if (isList(data))
                  {
                     want = nodeOf(function()
                     {
                        var self = this;
                        var list = self.parentNode.childNodes;
                        var deck = self.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('show-deck')[0].childNodes;

                        this.parentNode.childNodes.Each = function(node,indx)
                        {
                           node.className = 'knob text-size-02 icon-circle-o';
                           deck[indx].style.display = 'none';

                           if (node === self)
                           {
                              node.className = 'knob text-size-02 icon-dot-circle-o';
                              deck[indx].style.display = 'block';
                           }
                        };

                     }).Data.join('');

                     ctrl = function()
                     {
                        var resl = Create({div:'.show-view-pane'});

                        data.Each = function(item,indx)
                        {
                           resl.Insert
                           (
                              Create({i:'.knob .text-size-02 .icon-circle-o', style:'margin:0.5rem;', onclick:want})
                           );
                        };

                        return resl;
                     }();

                     node = '<div '+attr+'>'+
                            '<div class="show-deck span-full posi-none flow-clip">'+expo(data,node)+'</div>'+
                            '<table class="show-face span-full posi-none">'+
                            '<tr><td class="span-full text-botm">'+textOf(ctrl)+'</td></tr>'+
                            '</table>'+
                            '</div>';

                     return node;
                  }

                  throw 'TODO :: show : Data';

               },


               FILE:function(attr,data,node,home)
               {
                  var expo,node,attr,data,mime,htag;

                  expo = Vamp.export.htm;
                  attr = (attr || {});
                  data = (isList(data) ? data[0].DATA : data);
                  data = Vamp.decode.Data(data)[0].DATA;
                  mime = Path.Extn(data);
                  htag = 'iframe';

                  attr.Clan = (attr.Clan || '');

                  if (['jpg','png','svg'].Has(mime))
                  {
                     htag = 'div';
                     attr.Clan += ' span-full flow-clip';
                     attr.style = 'background-image:url(\''+data+'\'); background-size:cover;';
                  }

                  attr = expo.toAtr(attr,node)

                  return ('<'+ htag + attr +'></'+ htag +'>');
               }
               .Join
               ({
                  jpg:{tag:'div', css:''}
               }),


               PANE:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  node = 'div';

                  return ('<'+ node + expo.toAtr(attr,node) +'>'+ expo.toSrc(data,node) +'</'+ node +'>');
               },


               ICON:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  if (isText(attr)){ attr = Vamp.decode.Attr(attr); }

                  expo = Vamp.export.htm;
                  attr = (attr || {});

                  if (data)
                  {
                     if (!attr.Deck)
                     {
                        data = (isList(data) ? data[0].DATA : data);
                        data = ((data.trimOf(1) == '﹝﹞') ? data.Trim(1) : data);
                        data = ((data.trimOf(1) == '‷‴') ? data.Trim(1) : data);

                        attr.Deck = data;
                        data = '';
                     }
                  }

                  if (!attr.Clan){ attr.Clan = ''; }
                  attr.Clan += (' icon-'+(attr.Deck||'bug'));  attr.Clan = attr.Clan.trim();  attr.Delete('Deck');

                  attr = expo.toAtr(attr,node);
                  node = 'i';

                  return ('<'+ node + attr +'></'+ node +'>');
               },


               BUTN:function(attr,data,node,home)
               {
                  var self,expo,node,attr,deck,icon,data,resl,size;

                  expo = Vamp.export.htm;
                  self = this;

                  if (isText(attr)){ attr = Vamp.decode.Attr(attr); }
                  if (!attr){ attr = {Deck:'#auto'}; }
                  if (!attr.Clan){ attr.Clan = ''; }

                  deck = (attr.Deck || '#auto');  attr.Delete('Deck');

                  if (deck[0] == '#')
                  {
                     deck = deck.substr(1);
                     icon = (self[deck] ? self[deck].icon : self.auto.icon);
                  }
// dump(icon);
                  attr.Clan += (' butn butn-'+deck);  attr.Clan = attr.Clan.trim();

                  data = (isList(data) ? data[0].DATA : data);
                  data = ((data.trimOf(1) == '﹝﹞') ? data.Trim(1) : data);
                  data = ((data.trimOf(1) == '‷‴') ? data.Trim(1) : data).split(' ').join('&nbsp;');
                  size = ((attr.Size && (attr.Size > 1)) ? ((attr.Size / 2.5) + 0.5) : 0);

                  if (attr.Icon)
                  {
                     icon = (((attr.Icon == '#auto') || (attr.Icon == '#true')) ? icon : attr.Icon); attr.Delete('Icon');
                     resl = '<i class="icon-'+icon+'" style="margin-right:'+size+'rem"></i></td><td class="line-vert"></td><td style="padding:0.5rem">'+ data;
                  }
                  else
                  {
                     resl = data;
                  }

                  attr = expo.toAtr(attr,node);
                  node = ('<div'+ attr +'><table><tr><td style="padding:0.5rem">'+resl+'</td></tr></table></div>');

                  return node;
               }
               .Join
               ({
                  auto:{icon:'magic'},
                  fail:{icon:'thumbs-o-down'},
                  warn:{icon:'exclamation'},
                  good:{icon:'thumbs-o-up'},
                  info:{icon:'info'},
                  mind:{icon:'pencil-square-o'},
                  need:{icon:'hand-o-right'},
               }),


               MENU:function(attr,data,node,home)
               {
                  var expo,node,attr,data,htag;

                  expo = Vamp.export.htm;
                  attr = expo.toAtr(attr,node);
                  data = expo(data,node);

                  htag = '<div '+attr+'>'+data+'</div>';

                  return htag;
               },


               ITEM:function(attr,data,node,home)
               {
                  var expo,node,attr,data,htag,goto;

                  expo = Vamp.export.htm;
                  attr = (isText(attr) ? Vamp.decode.Attr(attr) : attr);
                  goto = keysOf(attr.Goto);

                  data = ((data.trimOf(1) == '﹝﹞') ? data.Trim(1) : data);
                  data = ((data.trimOf(1) == '‷‴') ? data.Trim(1) : data).split(' ').join('&nbsp;');

                  attr.Goto = (goto+':'+attr.Goto[goto]);
                  attr.Clan = (attr.Clan || '');
                  attr.Clan+= 'knob';

                  attr.onclick = nodeOf(function()
                  {
                     var self = this;
                     var goto = this.getAttribute('Goto');

                     dump(goto);

                  }).Data.join('');

                  attr = expo.toAtr(attr,node);
                  htag = '<div '+attr+'>'+data+'</div>';

                  return htag;
               },


               GRID:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  node = 'table';

                  return ('<'+ node + expo.toAtr(attr,node) +'>'+ expo.toSrc(data,node) +'</'+ node +'>');
               },


               TOP:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  node = 'thead';

                  return ('<'+ node + expo.toAtr(attr,node) +'>'+ expo.toSrc(data,node) +'</'+ node +'>');
               },


               ROW:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  node = 'tr';

                  return ('<'+ node + expo.toAtr(attr,node) +'>'+ expo.toSrc(data,node) +'</'+ node +'>');
               },


               COL:function(attr,data,node,home)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  node = 'td';

                  return ('<'+ node + expo.toAtr(attr,node) +'>'+ expo.toSrc(data,node) +'</'+ node +'>');
               },


               IMG:function(attr,data,node)
               {
                  var expo,node,attr,data;

                  expo = Vamp.export.htm;
                  node = 'img';

                  if (attr && attr.Data){ attr.src = attr.Data; }
                  if (data && data[0]){ attr.src = data[0]; }

                  attr.Delete('Data');

                  return ('<'+ node + expo.toAtr(attr,node) +'>');
               },
            },
         // -----------------------------------------------------------------------------------------------



         // -----------------------------------------------------------------------------------------------
            Atrs:
            {
               Name:function(data)
               {
                  return (' id="'+data+'" name="'+data+'"');
               },


               Clan:function(data)
               {
                  if (isList(data))
                  { data = data.join(' '); }

                  return data;
               },


               Span:function(data)
               {
                  var list,resl,prts,base,part;

                  resl = '';

                  if (isUnit(data))
                  {
                     data = ((data < 10) ? ('0'+data) : data);
                     return 'span-horz-'+data+' span-vert-'+data;
                  }

                  if (isNode(data))
                  {
                     base = keysOf(data)[0];
                     part = keysOf(data[base])[0];
                     data = (data[base][part]+'').split('.');

                     data[0] = (data[0] * 1);
                     data[1] = (data[1] ? (data[1] * 1) : VOID);

                     data[0] = ((data[0] < 10) ? ('0'+data[0]) : data[0]);
                     data[1] = (isVoid(data[1]) ? VOID : ((data[1] < 10) ? ('0'+data[1]) : data[1]));

                     if (base == 'tilt')
                     {
                        resl += 'tilt-horz-span-x'+data[1]+'-y'+data[0]+' ';
                        resl += 'tilt-vert-span-x'+data[0]+'-y'+data[1]+' ';

                        return resl;
                     }

                     if (base == 'area')
                     {
                        resl += 'span-horz-'+data[0]+' ';
                        resl += 'span-vert-'+data[1]+' ';

                        return resl;
                     }
                  }
               },


               Size:function(data,node)
               {
                  var list,resl,prts,base,part;

                  resl = '';

                  if (['BUTN','ICON','TEXT'].Has(node))
                  {
                     if (isUnit(data))
                     {
                        data = ((data < 10) ? ('0'+data) : data);
                        return ('text-size-'+data);
                     }
                  }
               },


               Upon:function(data)
               {
                  var refr,data,upon,attr,evnt,text,list;

                  refr = Vamp.export.htm.FUNC;
                  data = Vamp.desect(data.Trim(1));
                  upon = 'Upon="';
                  attr = '';

                  data.Each = function(sect)
                  {
                     evnt = sect.BASE;

                     if (!refr.ATTR.Upon[evnt]){ return; }

                     text = Vamp.decode.Expr.toJS(sect.DATA.Trim(1));
                     upon += (evnt+'::'+text+';;');

                     list = refr.ATTR.Upon[evnt];
                     list.Each = function(item)
                     {
                        attr += ' on'+item+'="Vamp.export.htm.FUNC.EXEC(event,this,\'Upon\',\''+evnt+'\')"';
                     };
                  };

                  attr = (upon + '" ' + attr);

                  return attr;
               }
            },
         // -----------------------------------------------------------------------------------------------



         // conf :: FUNC : functions
         // -----------------------------------------------------------------------------------------------
            FUNC:
            {
               PREP:'Vamp.export.htm.FUNC.EXEC(event,this)',


               EXEC:function(evnt,node,attr,func)
               {
                  var $ = node;
                  var $Home,$Tick,$Data;
                  var refr,text,func;

                  $Home = node.parentNode;
                  $Tick = (evnt || window.event);
                  $Data = 'TODO';

                  refr = (node[attr] || node.getAttribute(attr));

                  if (isText(refr))
                  {
                     node[attr] = {};
                     text = refr.split(';;');

                     text.Each = function(prts)
                     {
                        if (prts.length < 1){ return; }

                        prts = prts.split('::');
                        node[attr][prts[0]] = funcOf({Type:FUNC, Args:['$','$Home','$Tick','$Data'], Data:prts[1]});
                     };
                  }

                  refr = node[attr][func];
                  refr.apply(node,[$,$Home,$Tick,$Data]);
               },


               ATTR:
               {
                  Upon:
                  {
                     init:['load'],
                     seek:['mouseover','mousemove','mouseout'],
                     want:['focus','click'],
                     edit:['change'],
                     exit:['blur'],
                     drag:['dragstart','drop','dragend'],
                     menu:['contextmenu'],
                     info:[],
                  },
               }
            },
         // -----------------------------------------------------------------------------------------------
         }),
      }),
   // -----------------------------------------------------------------------------------------------------





   // attr :: fnclib : vamp function library
   // -----------------------------------------------------------------------------------------------------
      fnclib:
      {

      },
   // -----------------------------------------------------------------------------------------------------




   // attr :: oprlib : operator library
   // -----------------------------------------------------------------------------------------------------
      oprlib:
      {
         extn:{v:'Vamp',vmp:'Vamp',vamp:'Vamp'},

         xlst: {'‷':'‴',  '#':' ﹐﹔﹜﹚﹞',  '﹙':'﹚',  '﹝':'﹞',  '﹛':'﹜',  '﹕':'﹐﹔﹜﹚﹞'},  // conteXt list
         xbgn: ['‷',  '#',  '﹙',  '﹝',  '﹛',  '﹕'],                 // conteXt begin
         xend: ['‴',  ' ﹐﹔﹜﹚﹞',  '﹚',  '﹞',  '﹜',  '﹐﹔﹜﹚﹞'],     // conteXt end
         wrap: ['‴﹕',  '﹚﹕',  '﹚﹙',  '﹚﹛',  '﹚﹝',  '﹜﹝'],        // context pairs: `()()` `(){}` `()[]` `{}[]`

         expr: // expression operators
         {
            '.':/a-zA-Z0-9_\(/,  // select - as in "chica's boobs"   .: chica.boobs
            '+':null,            // add / insert
            '-':null,            // subtract / remove
            '*':null,            // multiply / combine
            '/':null,            // divide / chop
            '%':null,            // modulus / modify
            '^':null,            // powerOf / parentOf
            '=':null,            // strict compare
            '~':null,            // loose compare
            '<':null,            // less-than
            '>':null,            // more-than
            '&':null,            // and
            '|':null,            // else    / boolean-test(alternative)
            '?':null,            // really? / boolean-cast(either-or)
            '!':null,            // !toggle / boolean-cast(negative-of)
         },

         mopr: // multi-level operators
         {
            ':':'\n;,)]}'.Chop(1),// define
            '(':')',             // call/express
            '{':'}',             // attribute
            '[':']',             // content
         },

         dlim: // delimiter operators
         {
            "\n":null,           // next
            ';' :null,           // next
            ',' :null,           // next
         },

         quot: // quoted-text operators
         {
            '`' :'`',            // multi-line
            '"' :'"',            // single-line
            "'" :"'",            // single-line
            '[|':'|]',           // multi-line  (alternative content)
         },

         omit: // comment operators
         {
            '# '   : "\n",
            '##'   : "\n",
            '#! '  : "\n",
            '!# '  : "\n",
            '.: '  : "\n",
            ':: '  : "\n",
            ':::'  : "\n",
            '---': "\n",
            '...': "\n",
            '===': "\n",
            '// '  : "\n",
            '\\\\ ': "\n",
            '/*'   : '*/',                // muli-line
            "\n-- ": ["\n-- ","\n:: "],   // muli-line
         },

         escp: // escape characters in quoted-string
         {
            'n':"\n",
            'r':"\r",
            't':"\t",
            "'":"'",
            '"':'"',
            '`':'`',
            '[|':'[|',
         },

         swap: // swap operators with (special) single operators
         {
            '+=':'⨥',
            '-=':'⨪',
            '*=':'⨰',
            '/=':'⨫',
            '>=':'≤',
            '<=':'≥',
            '==':'﹦',
            '&&':'﹠',
            '||':'‖',
            '.' :'﹒',
            '+' :'﹢',
            '-' :'﹣',
            '*' :'﹡',
            '/' :'﹨',
            '%' :'﹪',
            '^' :'ˆ',
            '=' :'﹦',
            '~' :'∼',
            '<' :'﹤',
            '>' :'﹥',
            '&' :'﹠',
            '|' :'‖',
            '?' :'﹖',
            '!' :'﹗',
            ':' :'﹕',
            ',' :'﹐',
            ';' :'﹔',
            '\n':'﹔',

            '(' :'﹙',
            ')' :'﹚',
            '[' :'﹝',
            ']' :'﹞',
            '{' :'﹛',
            '}' :'﹜',
         },
      },
   });
// --------------------------------------------------------------------------------------------------------
