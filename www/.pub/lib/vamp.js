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

         vt = ('\n'+(vt.split('\r\n').join('\n').split('\t').join('   '))+'\n'); // fix white-space
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
         var xlst,wrap,bufr,levl,resl;

         xlst = {'﹙':'﹚', '﹝':'﹞', '﹛':'﹜'};
         wrap = ['﹚﹙', '﹚﹛', '﹚﹝', '﹜﹝'];
         bufr = '';
         levl = [];
         resl = [];
      // --------------------------------------------------------------------------------------------------


      // cond :: skip : return list with 1 item as text if empty or irrelevant
      // --------------------------------------------------------------------------------------------------
         if (!text.Has(wrap)){ return [text]; }
      // --------------------------------------------------------------------------------------------------


      // each :: char : walk each char
      // --------------------------------------------------------------------------------------------------
         text.Each = function(c,p)
         {
            bufr += c;

            if (xlst[c])
            {
               levl[levl.length] = xlst[c];
               return;
            }

            if (c == levl[(levl.length -1)])
            {
               levl.pop();

               if (levl.length < 1)
               {
                  resl[resl.length] = bufr.trim();
                  bufr = '';
               }
            }
         };
      // --------------------------------------------------------------------------------------------------


      // done
      // --------------------------------------------------------------------------------------------------
         return resl;
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------





   // func :: desect : split up minified vamp-text into a list of same-level sections
   // -----------------------------------------------------------------------------------------------------
      desect:function(text)
      {
      // vars
      // --------------------------------------------------------------------------------------------------
         var xlst,blst,elst,bufr,list,bopr,eopr,resl,indx,pair,wrap;

         xlst = {'﹙':'﹚', '﹝':'﹞', '﹛':'﹜', '﹕':'﹐﹔﹜﹚﹞'};
         wrap = ['﹚﹙', '﹚﹛', '﹚﹝', '﹜﹝'];
         blst = keysOf(xlst);
         elst = valsOf(xlst);
         bufr = '';
         list = [];
         resl = [''];
         indx = 0;
      // --------------------------------------------------------------------------------------------------



      // each :: char
      // --------------------------------------------------------------------------------------------------
         text.Each = function(c,p)
         {
            resl[indx] += c;

            if (blst.Has(c))
            {
               bopr = c;
               eopr = xlst[c]
               list[list.length] = eopr;

               return;
            }

            if (eopr && eopr.hasAny(c))
            {
               list.pop();
               eopr = list[list.length -1];
               pair = (c + text[p+1]);

               if (list.length < 1)
               {
                  resl[indx] = resl[indx].Trim('﹔');

                  if (!wrap.Has(pair))
                  {
                     indx++;
                     resl[indx] = '';
                     return;
                  }
               }
            }
         };

         if ((resl[indx] == '') || (resl[indx] == '﹔')){ resl.pop(); } // remove blank items at end
      // --------------------------------------------------------------------------------------------------



      // each :: sect : dewrap
      // --------------------------------------------------------------------------------------------------
         resl.Each = function(sect,indx)
         {
            resl[indx] = Vamp.dewrap(sect);
         };
      // --------------------------------------------------------------------------------------------------



      // done
      // --------------------------------------------------------------------------------------------------
         return resl;
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------





   // func :: decode : parse into runtime
   // -----------------------------------------------------------------------------------------------------
      decode:function(text,vars,done,mini,flat,self)
      {
      // vars
      // --------------------------------------------------------------------------------------------------
         var list,resl,path,xlst,begn,endn,kind,stub,temp,line,flcp,span,prts,escp,oper,dlim,type,find;
         var item,node,attr,data,posi,wrap,attr,base,flst,func;

         text = (mini ? text : Vamp.minify(text));
         vars = (isNode(vars) ? vars : {});
         path = ((!vars || !vars.PATH) ? VOID : vars.PATH);
         oper = Vals(Vamp.oprlib.swap).Delete(DUPL);
         xlst = {'‷':'‴', '﹙':'﹚', '﹝':'﹞', '﹛':'﹜', '﹕':'﹐﹔﹜﹚﹞'};
         begn = keysOf(xlst);
         endn = valsOf(xlst);
         flcp = text.trimOf(1);
      // --------------------------------------------------------------------------------------------------




      // edit :: result
      // --------------------------------------------------------------------------------------------------
         resl = function()
         {
         // cond :: flat : numes, bools, plain-text
         // -----------------------------------------------------------------------------------------------
            if (!text.Has(begn))
            { return this.Flat(text); }
         // -----------------------------------------------------------------------------------------------


         // cond :: hash : refs
         // -----------------------------------------------------------------------------------------------
            if ((text[0] == '#') && (text.match(/^[a-z#:\.][\w]{3,36}$/i)))
            { return this.Hash(text); }
         // -----------------------------------------------------------------------------------------------


         // cond :: mono : context i.e.  `"..."`  `(...)`  `{...}`  `[...]`
         // -----------------------------------------------------------------------------------------------
            if ((xlst[flcp[0]] == flcp[1]) && (text.spanOf(flcp[0]) < 3))
            {
               text = text.Trim(1);

               switch (flcp)
               {
                  case '‷‴' : return this.Quot(text,vars);
                  case '﹙﹚' : return this.Calc(text,vars);
                  case '﹛﹜' : return this.Attr(text,vars);
                  case '﹝﹞' : return this.List(text,vars);
               }
            }
         // -----------------------------------------------------------------------------------------------


         // cond :: poly : sections
         // -----------------------------------------------------------------------------------------------
            list = Vamp.desect(text);
            flst = ['﹙', '﹝', '﹛', '﹕'];

            list.Each = function(sect,indx)
            {
               var base,args,attr,data;

               sect.Each = function(item,part)
               {
                  if (part < 1)
                  {
                     dlim = item.Find(flst);
                     base = (dlim ? item.substr(0,dlim[0]).trim() : indx);
                     item = item.substr(dlim[0]);
                  }

                  flcp = item.trimOf(1);
                  item = item.Trim(1).Trim('﹔').Trim('﹐');

                  if (flcp == '﹙﹚'){ args = item; return; }
                  if (flcp == '﹛﹜'){ attr = item; return; }
                  if (flcp == '﹝﹞'){ data = item; return; }
               };

               args = this.Func(base,args,vars);
               attr = this.Attr(attr,vars);
               data = this.List(data,vars);

               sect = {base:base, args:args, attr:attr, data:data};
            };
         // -----------------------------------------------------------------------------------------------
         }();
      // --------------------------------------------------------------------------------------------------
      }
      .Join
      ({
      // func :: Flat : text, hash, void, unit, qbit
      // --------------------------------------------------------------------------------------------------
         Flat:function(text)
         {
            var kind,dlim;

            kind = kindOf(text).substr(1,4);
            dlim = ['﹔','﹐',' '];

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



      // func :: Hash : relative lookup by text reference
      // --------------------------------------------------------------------------------------------------
         Hash:function(text)
         {
            var args,name;

            args = text.split(':');
            name = prts.pop();

            if (this.refs[name])
            { return this.refs(args); }

            return text;
         }
         .Join
         ({
            refs:
            {
               http:'TODO:http:hashref',
            }
         }),
      // --------------------------------------------------------------------------------------------------



      // Func :: Quot : quoted text with escaped:(chars,unicode,variables) support
      // --------------------------------------------------------------------------------------------------
         Quot:function(text,vars)
         {
            var text,temp,escp,span,flcp;

            if (text.Has('↵'))
            { text = text.split('↵').join('\n'); }

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
                        item = Vamp.reckon(item.Trim(1),vars,self);
                        text+= ((item === VOID) ? '□' : textOf(item));
                        return;
                     }

                     text += (charOf(item) || '□');
                  }
               };
            }

            return text;
         },
      // --------------------------------------------------------------------------------------------------



      // func :: Calc : calculate expression
      // --------------------------------------------------------------------------------------------------
         Calc:function()
         {},
      // --------------------------------------------------------------------------------------------------



      // func :: Call : call expression
      // --------------------------------------------------------------------------------------------------
         Call:function()
         {},
      // --------------------------------------------------------------------------------------------------



      // text :: quot : quoted text with escaped value support
      // --------------------------------------------------------------------------------------------------
         Attr:function()
         {},
      // --------------------------------------------------------------------------------------------------



      // text :: quot : quoted text with escaped value support
      // --------------------------------------------------------------------------------------------------
         List:function()
         {},
      // --------------------------------------------------------------------------------------------------
      }),
   // -----------------------------------------------------------------------------------------------------





   // attr :: oprlib : operator library
   // -----------------------------------------------------------------------------------------------------
      oprlib:
      {
         extn:{v:'Vamp',vmp:'Vamp'},

         xlst: {'‷':'‴', '﹙':'﹚', '﹝':'﹞', '﹛':'﹜', '﹕':'﹐﹔﹜﹚﹞'},  // conteXt list
         xbgn: ['‷', '﹙', '﹝', '﹛', '﹕'],          // conteXt begin
         xend: ['‴', '﹚', '﹞', '﹜', '﹐﹔﹜﹚﹞'],     // conteXt end

         wrap: ['﹚﹙', '﹚﹛', '﹚﹝', '﹜﹝'],          // relative contexts like: `()()` `(){}` `()[]`, `{}[]`

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
