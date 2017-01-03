
////////////////////////////////////
// Acquired Base Enhancement Core //
////////////////////////////////////



// note :: warn : IMPORTANT
// --------------------------------------------------------------------------------------------------------
// This code should be used client-side:
// - it MUST be in a JavaScript file referenced by a <script> tag with its `src` pointing to this file
// - this <script> tag MUST be referenced after (or inside) the <body> tags
// --------------------------------------------------------------------------------------------------------



// main :: conf : global process
// --------------------------------------------------------------------------------------------------------
   'use strict';        // strict mode    :: prevents nasty bugs
   this.Main = this;    // super-global   :: refers `window` -or- `global`

   // `LZS.encB64()`  `LZS.decB64()`
   Main.LZS=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={encB64:function(o){if(null==o)return"";var r=i._EC(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decB64:function(r){return null==r?"":""==r?null:i._DC(r.length,32,function(e){return o(n,r.charAt(e))})},ECTU16:function(o){return null==o?"":i._EC(o,15,function(o){return r(o+32)})+" "},DCFU16:function(o){return null==o?"":""==o?null:i._DC(o.length,16384,function(r){return o.charCodeAt(r)-32})},ECTU8A:function(o){for(var r=i.EC(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},DCFU8A:function(o){if(null===o||void 0===o)return i.DC(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.DC(s.join(""))},ECTEUC:function(o){return null==o?"":i._EC(o,6,function(o){return e.charAt(o)})},DCFEUC:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._DC(r.length,32,function(n){return o(e,r.charAt(n))}))},EC:function(o){return i._EC(o,16,function(o){return r(o)})},_EC:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},DC:function(o){return null==o?"":""==o?null:i._DC(o.length,32768,function(r){return o.charCodeAt(r)})},_DC:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();
   Main.VOID = (function(){}()); // undefined
   Main.Defined = [];
// --------------------------------------------------------------------------------------------------------





// glob :: func : dataType - identify variable-data-types
// --------------------------------------------------------------------------------------------------------
   Main.dataType = function(data)
   {
      var type = (({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase());

      if (['undefined','null'].indexOf(type) > -1)
      { return type; }

      if ((data instanceof Blob) || ((type == 'string') && /[\x00-\x08\x0E-\x1F\x80-\xFF]/.test(data)))
      { return 'binary'; }

      if (!data.__proto__  || ((type != 'object') && (type != 'arguments') && !data.__proto__.__proto__))
      { return ('proto-'+type); }

      if ((type == 'global') || (type == 'window'))
      { return 'supreme'; }

      if (type.indexOf('element') > -1)
      { return 'element'; }

      if (type.indexOf('collection') > -1)
      { return 'nodelist'; }

      return type;
   }
// --------------------------------------------------------------------------------------------------------





// glob :: func : Extend - extends any extensibles
// --------------------------------------------------------------------------------------------------------
   Object.defineProperty(Main,'Extend',
   {
      writable:false,
      enumerable:false,
      configurable:false,

      value:function()
      {
      // args :: lexical scope inheritance in return closure below
      // --------------------------------------------------------------------------------------------------
         var args = [].slice.call(arguments);
         var glob = ((dataType(args[0]) === 'supreme') ? true : false);
      // --------------------------------------------------------------------------------------------------



      // echo :: func : to call with object
      // --------------------------------------------------------------------------------------------------
         return function(defn)
         {
         // dbug :: must be object
         // -----------------------------------------------------------------------------------------------
            if (dataType(defn) != 'object'){ throw 'expecting dataType: `object`'; }
         // -----------------------------------------------------------------------------------------------


         // each :: defn : item
         // -----------------------------------------------------------------------------------------------
            for (var item in defn)
            {
            // vars :: local : skip irrelevant
            // --------------------------------------------------------------------------------------------
               var name,tpof,name,spec,meta;

               if (!defn.hasOwnProperty(item)){ continue; }

               name = item;
               item = defn[item];
               tpof = dataType(item);
               spec = {};
               meta =
               {
                  AS:VOID,
                  ON:{get:VOID, set:VOID},
                  IS:{writable:false, enumerable:false, configurable:false}
               };
            // --------------------------------------------------------------------------------------------


            // make :: extension object from defaults
            // --------------------------------------------------------------------------------------------
               if (((tpof!='object') && (tpof!='function')) || (!item.AS && !item.ON && !item.IS))
               { meta.AS=item;  item=meta; }
            // --------------------------------------------------------------------------------------------


            // --------------------------------------------------------------------------------------------
               for (var i in meta)
               {
                  if (!meta.hasOwnProperty(i)){ continue; }
                  if (!(i in item)){ item[i] = meta[i]; }
                  if (i == 'AS'){ spec.value=item[i]; continue; }

                  for (var o in meta[i])
                  {
                     if (!(o in item[i])){ item[i][o] = meta[i][o]; }
                     if (item[i][o] !== VOID){ spec[o] = item[i][o]; }
                  }
               }
            // --------------------------------------------------------------------------------------------


            // --------------------------------------------------------------------------------------------
               if (spec.set || spec.get){ delete(spec.value); delete(spec.writable); }
               if (glob){ Defined[Defined.length] = name; }

               args.forEach(function(argv)
               { Object.defineProperty(argv,name,spec); });
            // --------------------------------------------------------------------------------------------
            }
         // -----------------------------------------------------------------------------------------------
         };
      // --------------------------------------------------------------------------------------------------
      }
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : Define - global entities
// --------------------------------------------------------------------------------------------------------
   Extend(Main)
   ({
      Define:function(Defn)
      {
         var type = dataType(Defn);

         if ((type != 'object') && (type != 'string'))
         { throw 'expecting dataType: `object` -or- `string`'; }


         if (type == 'object')
         {
            Extend(Main)(Defn);
            return true;
         }

         if (type == 'string')
         {
            return function(defn)
            {
               var temp = {};
               temp[this.Name] = defn;
               Extend(Main)(temp);
               return true;
            }
            .bind({Name:Defn});
         }

         return;
      },
   });
// --------------------------------------------------------------------------------------------------------





// glob :: word : list - define global constants
// --------------------------------------------------------------------------------------------------------
   Define
   ({
      VOID:(function(){}()),

      FALS:false,
      NONE:null,
      TRUE:true,

      AUTO:'⋖AUTO⋗',
      DROP:'⋖DROP⋗',
      DUPL:'⋖DUPL⋗',

      UPPR:'⋖UPPR⋗',
      LOWR:'⋖LOWR⋗',
      CAML:'⋖CAML⋗',

      NEXT:'⋖NEXT⋗',
      DONE:'⋖DONE⋗',

      KEYS:'⋖KEYS⋗',
      VALS:'⋖VALS⋗',

      BFOR:'⋖BFOR⋗',
      AFTR:'⋖AFTR⋗',

      EVEN:'⋖EVEN⋗',
      ODDS:'⋖ODDS⋗',

      PULL:'⋖PULL⋗',
      PUSH:'⋖PUSH⋗',
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : (essentials)
// --------------------------------------------------------------------------------------------------------
   Define
   ({
   // Keys : returns a list of keys of anything - empty list if no keys
   // -----------------------------------------------------------------------------------------------------
      Keys:function(data,indx)
      {
         var tpod = dataType(data);
         var resl = [];

         if (['undefined','null','boolean'].indexOf(tpod) > -1)
         { return []; }

         if (['number','string'].indexOf(tpod) > -1)
         { data = (data+'').split(''); }
         else if ((tpod == 'arguments') || (tpod == 'html-nodelist'))
         { data = [].slice.call(data); }
         else if (tpod == 'date')
         {
            // TODO Date
            return [];
         }

         resl = Object.keys(data);

         if ((indx === VOID) || (indx === null))
         { return resl; }

         return resl[((indx < 0) ? (resl.length -1) : indx)];
      },

      keysOf:function(data,indx){ return Keys(data,indx); },
   // -----------------------------------------------------------------------------------------------------




   // range : create list from a number, or between 2 numbers
   // -----------------------------------------------------------------------------------------------------
      range:function(begn,endn)
      {
         var resl = [];
         var temp;

         if (endn === VOID)
         { endn=begn; begn=1; }

         if ((dataType(begn) != 'number') || (dataType(endn) != 'number'))
         { throw 'expecting dataType: `number`'; }

         if (begn < endn)
         { for (begn; begn<=endn; begn++){ resl[resl.length] = begn; } }
         else
         { for (endn; endn<=begn; begn--){ resl[resl.length] = begn; } }

         return resl;
      },
   // -----------------------------------------------------------------------------------------------------




   // Each : like forEach but with cleaner syntax and more versatile -- the `E__` vars is to avoid conflict
   // -----------------------------------------------------------------------------------------------------
      Each:function(E__d,E__f)
      {
         var E__t = dataType(E__d);

         if (E__t == 'number'){ E__d = range(E__d);  E__t = 'array'; }
         if (dataType(E__f) != 'function'){ throw 'function expected'; }

         for (var E__k in E__d)
         {
            E__k = ((((E__t == 'array') || (E__t == 'string')) && !isNaN(E__k)) ? (E__k*1) : E__k);

            if (!E__d.hasOwnProperty(E__k) || ((E__k+'').length < 1)){ continue; }
            var E__z = E__f.apply(E__d,[E__d[E__k],E__k]);
            if ((E__z !== VOID) && (E__z !== NEXT)){ break; }
         }
      },
   // -----------------------------------------------------------------------------------------------------




   // Vals : returns a list of values of anything - empty list if no values
   // -----------------------------------------------------------------------------------------------------
      Vals:function(data,indx)
      {
         var resl = [];

         Each(data,function(item)
         { resl[resl.length] = item; });

         if ((indx === VOID) || (indx === null))
         { return resl; }

         return resl[((indx < 0) ? (resl.length -1) : indx)];
      },

      valsOf:function(data,indx){ return Vals(data,indx); },
   // -----------------------------------------------------------------------------------------------------




   // Span : returns the length of anything  .:  number=digits  float=decimals  bool=1/0
   // -----------------------------------------------------------------------------------------------------
      Span:function(data)
      {
         var tpof = dataType(data);

         if (!data)
         { return 0; }

         if ((tpof == 'number') && ((data+'').indexOf('.') > 0))
         { data = (data+'').split('.')[1]; }

         return Keys(data).length;
      },

      spanOf:function(data){ return Span(data); },
   // -----------------------------------------------------------------------------------------------------




   // Copy : duplicates anything
   // -----------------------------------------------------------------------------------------------------
      Copy:function(defn)
      {
         var copy,tpof;

         tpof = dataType(defn);

         if (!defn || (['boolean','number','string'].indexOf(tpof) > -1))
         { return defn; }

         if (tpof == 'date')
         {
            copy = new Date();
            copy.setTime(defn.getTime());

            return copy;
         }

         if ((['array','object','function'].indexOf(tpof) > -1))
         {
            copy = ((tpof=='array')?[]:((tpof=='object')?{}:function(){return defn.apply(this,arguments)}));

            for (var i in defn)
            { copy[i] = Copy(defn[i]); }

            return copy;
         }

         return;
      },

      copyOf:function(defn){ return Copy(defn); },
   // -----------------------------------------------------------------------------------------------------




   // glob :: func : Time
   // -----------------------------------------------------------------------------------------------------
      Time:function(defn)
      {
         var type;

         defn = (defn || 0);
         type = dataType(defn);

         if (type == 'number')
         { return ((new Date()).getTime() + defn); }

         if (type == 'string')
         { return (new Date(defn)).getTime(); }

         if (type == 'date')
         { return defn.getTime(); }

         return VOID;
      },

      timeOf:function(defn)
      {
         return Time(defn);
      },
   // -----------------------------------------------------------------------------------------------------




   // glob :: func : Hang - wait synchronous - use with caution
   // -----------------------------------------------------------------------------------------------------
      Hang:function(ms)
      {
         for (var ts = Time(); Time(-ts) < ms;);
         return;
      },
   // -----------------------------------------------------------------------------------------------------




   // glob :: func : Char - get ascii/unicode character from int -or- hex
   // -----------------------------------------------------------------------------------------------------
      Char:function(defn)
      {
         var type,unit;

         type = dataType(defn);

         if ((type != 'number') && (type != 'string'))
         { return NONE; }

         unit = (((defn+'').length < 4) ? parseInt(defn) : parseInt(defn,16));

         if (isNaN(unit) || (unit > 65535))
         { return NONE; }

         return String.fromCharCode(unit);
      },

      charOf:function(defn){ return Char(defn); },
   // -----------------------------------------------------------------------------------------------------




   // glob :: func : dump - console.log -- `Dump` does `dump` + `Halt`
   // -----------------------------------------------------------------------------------------------------
      dump:function()
      { console.log.apply(console,[].slice.call(arguments)); },

      Dump:function()
      {
         dump.apply(null,[].slice.call(arguments));
         Halt();
      },
   // -----------------------------------------------------------------------------------------------------




   // Size : in KB, MB, GB
   // -----------------------------------------------------------------------------------------------------
      Size:function(size,unit)
      {
         if (!((typeof size) == 'number') || ((size+'').indexOf('.') > -1))
         { throw 'expecting typeOf: FLATUNIT'; }

         if (unit == 'GB')
         { return (+(1073741824 / size).toFixed(2)); }

         if (unit == 'MB')
         { return (+(1048576 / size).toFixed(2)); }

         if (unit == 'KB')
         { return (+(1024 / size).toFixed(2)); }

         return size;
      },

      sizeOf:function(size,unit){ return Size(size,unit); },
   // -----------------------------------------------------------------------------------------------------




   // Diff : difference
   // -----------------------------------------------------------------------------------------------------
      Diff:function(a,b)
      {
         var typa = dataType(a);
         var typb = dataType(b);
         var resl;

         if (typa != typb){ throw 'dataType mismatch'; }

         if (typa == 'array')
         {
            resl = [];

            a.Each = function(i){ if (b.indexOf(i)<0){ resl[resl.length] = i; } };
            b.Each = function(i){ if (a.indexOf(i)<0){ resl[resl.length] = i; } };

            return resl;
         }
      },

      diffOf:function(a,b){ return Diff(a,b); },
   // -----------------------------------------------------------------------------------------------------



   // glob :: func : Find - (needle,haystack,offset) -- return array[key,needle] - or null if not found
   // -----------------------------------------------------------------------------------------------------
      Find:function(nedl,hays,offs,kvon)
      {
         var near;
         var tpon = dataType(nedl);
         var tpoh = dataType(hays);
         var find = null;
         var resl = null;

         offs = (offs || 0);
         kvon = ((kvon || VALS)).substr(1,4);
         kvon = (kvon[0].toUpperCase() + kvon.substr(1).toLowerCase());
         near = {};


         if ((['number','string','array','object','function'].indexOf(tpoh) < 0))
         { return null; }

         if (tpon != 'array')
         { nedl = (((tpon == 'string') || (tpon == 'number')) ? [nedl+''] : Main[kvon](nedl)); }

         if (tpoh == 'number')
         {
            hays = (hays+'');
            tpoh = 'string';
         }


         if (tpoh == 'string')
         {
            hays = hays.substr(offs);

            nedl.Each = function(nv,ni)
            {
               if (nv.length < 1){ return; }
               find = hays.indexOf(nv+'');
               if (find > -1){ near[find] = nv; }
            };
         }
         else
         {
            hays.Each = function(hv,hi)
            {
               nedl.Each = function(nv,ni)
               {
                  if (nv === hv)
                  { near[hi] = nv; }
               };
            };
         }

         if (Span(near) < 1){ return null; }

         near.Each = function(nedl,indx)
         {
            if (!isNaN(indx)){ indx = (indx *1); }
            if (resl === null){ resl = indx; return; }
            if (indx < resl){ resl = indx; }
         };

         return [resl,near[resl]];
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// meta :: glob - extend all protoypes with these
// --------------------------------------------------------------------------------------------------------
   Extend
   (
      Boolean.prototype,
      Number.prototype,
      String.prototype,
      Array.prototype,
      Object.prototype,
      Function.prototype,
      Date.prototype
   )
   ({
   // func :: Each : like forEach but cleaner and more versatile
   // -----------------------------------------------------------------------------------------------------
      Each:
      {
         ON:
         {
            set:function(func)
            { Each(this,func); }
         }
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Find
   // -----------------------------------------------------------------------------------------------------
      Find:function(nedl,offs,kvon)
      {
         return Find(nedl,this,offs,kvon);
      },

      findAt:function(nedl,offs,kvon)
      {
         var resl = Find(nedl,this,offs,kvon);
         return (!resl ? null : resl[0]);
      },

      findOf:function(nedl,offs,kvon)
      {
         var resl = Find(nedl,this,offs,kvon);
         return (!resl ? null : resl[1]);
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Keys
   // -----------------------------------------------------------------------------------------------------
      Keys:function()
      {
         var args = Vals(arguments);
         var span = args.length;
         var data = Keys(this);
         var list = [];

         args.Each = function(v)
         {
            v = ((v < 0) ? (data.length -1) : v);

            if (data.hasOwnProperty(v))
            { list[list.length] = data[v]; }
         };

         return ((span < 1) ? data : ((span < 2) ? list[0] : list));
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Vals
   // -----------------------------------------------------------------------------------------------------
      Vals:function(indx)
      {
         var args = Vals(arguments);
         var span = args.length;
         var data = Vals(this);
         var list = [];

         args.Each = function(v)
         {
            v = ((v < 0) ? (data.length -1) : v);

            if (data.hasOwnProperty(v))
            { list[list.length] = data[v]; }
         };

         return ((span < 1) ? data : ((span < 2) ? list[0] : list));
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// meta :: func : extends array, object, function
// --------------------------------------------------------------------------------------------------------
   Extend(Array.prototype, Object.prototype, Function.prototype)
   ({
   // Join : merge together, minding closures & duplicates
   // -----------------------------------------------------------------------------------------------------
      Join:function(data)
      {
      // --------------------------------------------------------------------------------------------------
         var self,tpos,tpod;

         self = this;
         tpos = dataType(self);
         tpod = dataType(data);
      // --------------------------------------------------------------------------------------------------



      // --------------------------------------------------------------------------------------------------
         if (tpos == 'array')
         {
            if ((tpod == 'function') || (tpod == 'object'))
            { return data.Join(self); }

            data.Each = function(item,name)
            {
               if (isNaN(name *1))
               {
                  if (self.hasOwnProperty(name))
                  { return; }

                  self[name] = item;
               }
               else
               {
                  if (self.indexOf(item) < 0)
                  { self[self.length] = item; }
               }
            };

            return self;
         }
      // --------------------------------------------------------------------------------------------------



      // --------------------------------------------------------------------------------------------------
         if (tpos == 'object')
         {
            if ((tpod == 'object') || (tpod == 'array'))
            {
               data.Each = function(item,name)
               {
                  if (!self.hasOwnProperty(name))
                  { self[name] = item; }
               };

               return self;
            }

            if (tpod == 'function')
            {
               self = data;
               data = this;
               tpos = tpod;
               tpod = dataType(data);
            }
         }
      // --------------------------------------------------------------------------------------------------



      // --------------------------------------------------------------------------------------------------
         if (tpos == 'function')
         {
            if ((tpod == 'object') || (tpod == 'array'))
            {
               data.Each = function(item,name)
               {
                  if (!self.hasOwnProperty(name))
                  { self[name] = item; }
               };

               self = self.bind(self);

               data.Each = function(item,name)
               {
                  if (!self.hasOwnProperty(name))
                  { self[name] = item; }
               };
            }

            return self;
         }
      // --------------------------------------------------------------------------------------------------



      // --------------------------------------------------------------------------------------------------
         return self;
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// meta :: func : (search)
// --------------------------------------------------------------------------------------------------------
   Extend(Number.prototype, String.prototype, Array.prototype, Object.prototype, Function.prototype)
   ({
   // Has - check if self has keys or values (in args -or- list)  ::  0=none  1=all  float=some
   // -----------------------------------------------------------------------------------------------------
      Has:function()
      {
         var self,args,span,incr,tpos,kvon,tpoi;

         self = this;
         args = [].slice.call(arguments);
         args = ((dataType(args[0]) == 'array') ? args[0] : args);
         span = args.length;
         incr = 0;
         tpos = dataType(self);
         kvon = VALS;

         if (span < 1)
         { return 0; }

         if ((args[0] == KEYS) || (args[0] == VALS))
         {
            kvon = args.shift();
            // args = args[0][kvon];
         }
         else
         {
            if ((tpos == 'object') || (tpos == 'function'))
            { kvon = KEYS; }
         }

         if (kvon == KEYS)
         {
            if ((tpos == 'object') || (tpos == 'function'))
            {
               self = Object.keys(self);
               tpos = 'array';
               kvon = VALS;
            }
            else if (tpos == 'string')
            {
               self = self.split();
               tpos = 'array';
            }
         }

         args.Each = function(item)
         {
            if ((kvon == VALS) && (tpos == 'string'))
            {
               tpoi = dataType(item).substr(0,4);

               if ((tpoi == 'stri') &&  (self.indexOf(item) > -1))
               { incr++; return; }

               if ((tpoi == 'rege') && item.test(self))
               { incr++; return; }
            }

            if ((kvon == VALS) && (tpos == 'string') && (self.indexOf(item) > -1))
            { incr++; return; }

            self.Each = function(data,name)
            {
               if (((kvon == KEYS) && (item == name)) || ((kvon == VALS) && (item == data)))
               { incr++; }
            };
         };

         return ((incr.length < 1) ? 0 : (+(incr / span).toFixed(2)));
      },
   // -----------------------------------------------------------------------------------------------------




   // (misc) : `Has` - support functions
   // -----------------------------------------------------------------------------------------------------
      hasKey:function()
      {
         var args = [].slice.call(arguments); args.unshift(KEYS);
         return (this.Has(args) ? true : false);
      },

      hasVal:function(defn)
      {
         var args = [].slice.call(arguments); args.unshift(VALS);
         return (this.Has(args) ? true : false);
      },

      hasAny:function()
      { return ((this.Has([].slice.call(arguments)) > 0) ? true : false); },

      hasAll:function()
      { return ((this.Has([].slice.call(arguments)) === 1) ? true : false); },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// meta :: func : Number
// --------------------------------------------------------------------------------------------------------
   Extend(Number.prototype)
   ({
   // isEVOD : isEVEN -or- isODDS -- argument[EVEN/ODDS] for boolean comparison
   // -----------------------------------------------------------------------------------------------------
      isEVOD:function(evod)
      {
         var self = (this *1); // to number-constant
         var even = (((self<1)||(((self/2)+'').indexOf('.') < 0)) ? true : false);

         if (!evod){ return (even ? EVEN : ODDS); }

         return (((evod==EVEN) && even) ? true : (((evod==ODDS) && !even) ? true : false));
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// meta :: func : String
// --------------------------------------------------------------------------------------------------------
   Extend(String.prototype)
   ({
   // Chop : `by number` -or- `by char` -or- `by list` -- (`by list` includes list items)
   // -----------------------------------------------------------------------------------------------------
      Chop:function(defn)
      {
         var self = this.toString();
         var type = dataType(defn);
         var resl = [];
         var indx;


         if (type == 'number')
         {
            var regx = new RegExp('.{1,' + defn + '}', 'g');
            return self.match(regx);
         }


         if (type == 'string')
         { return self.split(defn); }


         if (type == 'array')
         {
            defn.Each = function(item)
            {
               indx = self.indexOf(item);
               if (indx < 0){ return; }

               resl[resl.length] = self.substr(0,indx);
               resl[resl.length] = item;

               self = self.substr((indx + item.length));
            };

            if (self.length > 0)
            { resl[resl.length] = self; }

            return resl;
         }


         return [self];
      },
   // -----------------------------------------------------------------------------------------------------



   // Stub : split on first occurance -- returns array [first-part, dilimiter, remainder]
   // -----------------------------------------------------------------------------------------------------
      Stub:function(data)
      {
         var self = this.toString();
         var find = self.Find(data);

         if (!find){ return null; }

         return [self.substr(0,find[0]), find[1], self.substr(find[0]+1)];
      },
   // -----------------------------------------------------------------------------------------------------



   // Swap : replace
   // -----------------------------------------------------------------------------------------------------
      Swap:function(find,repl)
      {
         var self;

         self = this.toString();
         find = (isText(find) ? ({[find]:repl}) : find);

         if (!isMetaNode(find))
         { throw 'expecting typeOf:TEXT -or- kindOf:METANODE'; }

         find.Each = function(r,f)
         {
            if (self.indexOf(f) < 0){ return; }
            self = self.split(f).join(r);
         };

         return self;
      },
   // -----------------------------------------------------------------------------------------------------



   // Trim : trim off white-space -or characters
   // -----------------------------------------------------------------------------------------------------
      Trim:function(defn)
      {
         var self = this.toString();
         var type = dataType(defn);

         if (!defn)
         { return self.trim(); }

         if (type == 'number')
         { return self.substr(defn, ((self.length - defn) - defn)); }

         if (type == 'string')
         {
            if (self.substr((0 - defn.length)) == defn)
            { self = self.substr(0, (self.length - defn.length)); }

            if (self.substr(0,defn.length) == defn)
            { self = self.substr(defn.length); }

            return self;
         }

         return self;
      },

      trimOf:function(defn)
      {
         var self = this.toString();
         var resl = self.Trim(defn);

         return (self.split(resl).join(''));
      },
   // -----------------------------------------------------------------------------------------------------



   // spanOf : count substring ocurrences
   // -----------------------------------------------------------------------------------------------------
      spanOf:function(data)
      {
         if (!isText(data) || (data.length < 1))
         { return 0; }

         var self = this.toString();
         var prts = self.split(data);

         return (prts.length -1);
      },
   // -----------------------------------------------------------------------------------------------------



   // caseTo : change case to upper/lower/camelback
   // -----------------------------------------------------------------------------------------------------
      caseTo:function(optn)
      {
         var self,prts;

         self = this.toString().toLowerCase();

         if (optn == LOWR){ return self; }
         if (optn == UPPR){ return self.toUpperCase(); }

         if (optn == CAML)
         {
   			prts = self.split('_').join('-').split(' ').join('-').split('.').join('-').split('/').join('-');
   			prts = self.split('-');

            prts.Each = function(item,indx)
            {
               if (indx < 1){ prts[indx] = item.toLowerCase(); return; }
               prts[indx] = (item.substr(0,1).toUpperCase() + item.substr(1));
            };

   			return (prts.join(''));
         }

         if (optn == LABL)
         {
            prts = self.split('  ').join(' ').split(' ');

            prts.Each = function(item,indx)
            { prts[indx] = (item.substr(0,1).toUpperCase() + item.substr(1).toLowerCase()); };

   			return (prts.join(''));
         }

         return self;
      },
   // -----------------------------------------------------------------------------------------------------



   // caseIs : checks if case is upper/lower
   // -----------------------------------------------------------------------------------------------------
      caseIs:function(optn)
      {
         var self = this.toString();

         if (!isNaN(self)){ return true; }

         if ([LOWR,UPPR,CAML,LABL].Has(optn))
         { return ((self == self.caseTo(optn)) ? true : false); }

         return VOID;
      },
   // -----------------------------------------------------------------------------------------------------



   // parse : simple parse
   // -----------------------------------------------------------------------------------------------------
      parse:function(defn)
      {
         var self,list,lcos,dlim,prts,resl;

         self = (this.toString()).trim();
         lcos = self.toLowerCase();

         if (lcos === 'undefined')
         { return VOID; }

         if ((lcos === '') || (lcos === 'null') || (lcos === 'none'))
         { return null; }

         if (!isNaN(self))
         { return (self *1); }

         if ([lcos].Has('true','yes','on','positive'))
         { return true; }

         if ([lcos].Has('false','no','off','negative'))
         { return false; }

         if ([(self[0] + self.substr(-1,1))].Has('()','[]','{}'))
         { return eval(self); }


         if (self.Has('?','&','='))
         {
            self = (((self[0] == '?') || (self[0] == '&')) ? self.substr(1) : self);
            prts = self.split('+').join(' ');
            prts = self.split('&');
            resl = {};

            prts.Each = function(item)
            {
               item = item.split('=');
               resl[item[0]] = (item[1] ? decodeURIComponent(item[1]) : '');
            };

            return resl;
         }


         if (self.Has('::',':',',',';'))
         {
            if (self.Has(';',','))
            {
               resl = ((self.Has(':') && !self.Has(';')) ? {} : []);
               dlim = (self.Has(';') ? ';' : ',');
               prts = self.split(dlim);

               prts.Each = function(item)
               {
                  if (!item)
                  { return; }

                  if (item.Has(':'))
                  {
                     prts = item.split(':');
                     resl[prts[0].trim()] = prts[1].parse();
                  }
                  else
                  { resl[resl.length] = item.parse(); }
               };

               return resl;
            }

            if (self.Has('::',':'))
            {
               resl = {};
               dlim = (self.Has('::') ? '::' : ':');
               prts = self.split(dlim);
               resl[prts[0].trim()] = prts[1].parse();

               return resl;
            }
         }

         return self;
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : typeOf - identify variable-data-types
// --------------------------------------------------------------------------------------------------------
   Define
   ({
      typeOf:function(data)
      {
         var type = dataType(data).substr(0,4);

         if (type == 'null')
         { type = 'bool'; }
         else
         { type = (type.Has('node','argu') ? 'arra' : (type.Has('html','elem') ? 'obje' : type)); }

         if (!this[type])
         { type = 'unde'; }

         return '⋖'+this[type]+'⋗';
      }
      .Join
      ({
         unde:'VOID',
         bool:'QBIT', // qubit :: [fals null true] :: [-1  0  +1]
         numb:'UNIT',
         stri:'TEXT',
         bina:'BLOB',
         arra:'LIST',
         obje:'NODE',
         func:'FUNC',
         date:'TIME',
         supr:'MAIN',
         prot:'PLAN',
         rege:'REGX',
      })
   });

   typeOf.Each = function(type)
   {
      if (type == 'VOID'){ return; }

      Define(type)('⋖'+type+'⋗');
      Define('is'+type[0]+type.substr(1).toLowerCase())
      (
         function(data)
         { return ((typeOf(data) == this.Data) ? true : false); }.bind({Data:'⋖'+type+'⋗'})
      );
   };

   Define
   ({
      Type:function(data){ return typeOf(data); },
      isVoid:function(data){ return ((data === VOID) ? true : false); },
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : to[Type] -- cast any data-type to a relative representation of another data-type
// --------------------------------------------------------------------------------------------------------
   Extend(Main)
   ({
      voidOf:function()
      { return VOID; },


      qbitOf:function(defn)
      {
         var type = typeOf(defn);
         var list;

         if (type == QBIT)
         { return defn; }

         if (type == TEXT)
         {
            list = 'fals,false,no,off,fail,negative';
            if (list.split(',').Has(defn) || list.toUpperCase().split(',').Has(defn))
            { return false; }

            list = 'none,null';
            if (list.split(',').Has(defn) || list.toUpperCase().split(',').Has(defn))
            { return null; }

            list = 'true,yes,on,done,positive';
            if (list.split(',').Has(defn) || list.toUpperCase().split(',').Has(defn))
            { return true; }
         }

         if (type != UNIT)
         { defn = Span(defn); }

         return ((defn < 0) ? false : ((defn < 1) ? null : true));
      },


      unitOf:function(defn)
      {
         var type = typeOf(defn);

         if (type == UNIT)
         { return defn; }

         if (type == QBIT)
         { return ((defn === false) ? -1 : ((defn === null) ? 0 : 1)); }

         return Span(defn);
      },


      textOf:function(defn)
      {
         var type = typeOf(defn);

         if ([VOID,MAIN,PLAN].Has(type))
         { defn=type; type=TEXT; }

         if (type == TEXT)
         { return ((defn.trimOf(1) == '⋖⋗') ? defn.Trim(1) : defn); }

         if (type == QBIT)
         { return ((defn === false) ? 'false' : ((defn === null) ? 'null' : 'true')); }

         if ([FUNC,TIME].Has(type))
         { defn.toStrng(); }

         return JSON.stringify(defn);
      },


      listOf:function(defn)
      {
         var type = typeOf(defn);
         var flcp,dlim;

         if (type == LIST)
         { return (['arguments','nodelist'].Has(dataType(defn)) ? [].slice.call(defn) : Copy(defn)); }

         if (type == QBIT)
         { return ((defn === null) ? [] : [defn]); }

         if (type == UNIT)
         { return range(defn); }

         if (type == TEXT)
         {
            defn = defn.trim();
            dlim = defn.Find([';',',',' ','|']);

            if (['()','[]','{}'].Has(defn.trimOf(1)))
            {
               defn = eval(defn);
               return (isList(defn) ? defn : listOf(defn));
            }

            if (dlim)
            { return defn.split(dlim[1]); }

            return defn.split('');
         }

         if ([VOID,MAIN,PLAN].Has(type))
         { return []; }

         return Vals(defn);
      },


      nodeOf:function(defn)
      {
         var type = typeOf(defn);
         var resl = {};

         if ([NODE,TIME].Has(defn))
         { return Copy(defn); }

         if (type == QBIT)
         {
            resl[(unitOf(defn)+'')] = defn;
            return resl;
         }

         if (type == UNIT)
         { return nodeOf(range(defn)); }

         if (type == TEXT)
         {
            defn = defn.trim();

            if (['()','[]','{}'].Has(defn.trimOf(1)))
            { return nodeOf(eval(defn)); }

            if (defn.Has('?','&','=','::',';',':',','))
            { return nodeOf(defn.parse()); }

            return nodeOf(defn.split());
         }

         if (type == LIST)
         {
            defn.Each = function(item,indx)
            { resl[indx] = item; };

            return resl;
         }

         if (type == FUNC)
         {
            var text,indx,head,name,body,args,attr,data,f2lc,omit;

            text = defn.toString();
            indx = text.indexOf('{');
            head = text.substr(0,indx);
            name = ((head.substr(0,head.indexOf('(')).split('function ')[1].trim()) || VOID);
            head = (head.substr((head.indexOf('(')+1), (head.indexOf(')')-(head.indexOf('(')+1)))).split(',');
            body = text.substr((indx+1),((text.lastIndexOf('}')-indx) -1)).trim().split('\n');

            args = [];
            attr = {};
            data = [];

            if (name)
            { attr.Name = name; }

            defn.Each = function(val,key)
            { attr[key] = Copy(val); };

            head.Each = function(item)
            { args.Insert(item.trim()); };

            body.Each = function(line)
            {
               line = line.trim();
               f2lc = line.substr(0,2);

               if (line == '/*'){ omit=true; return; }
               if (omit){ if (line == '*/'){ omit=false; } return; }
               if ((line.length < 1) || (f2lc == '//') || ((f2lc == '/*') && (line.substr(-2,2) == '*/')))
               { return; }

               data.Insert(line);
            };

            if ((data.length < 2) && (data[0] == '[native code]'))
            { data[0] = '/* [native code] */'; }

            return {Type:type, Args:args, Attr:((Span(attr) > 0) ? attr : VOID), Data:data};
         }

         return {};
      },


      funcOf:function(defn)
      {
         var type = typeOf(defn);
         var resl;

         if (type == FUNC)
         { return Copy(defn); }

         if ([VOID,MAIN,PLAN].Has(type))
         { return function(){}; }

         if (type == NODE)
         {
            if (defn.Type != FUNC)
            { return defn.Join(function(){}); }

            resl = Function.apply(null,(defn.Args.Join(defn.Data)));

            if (defn.Args)
            {
               defn.Args.Each = function(val,key)
               { resl[key] = Copy(val); };
            }

            return resl;
         }

         return function(){ return this.Data; }.Join({Data:defn});
      },
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : kindOf - identify variable-data-kinds
// --------------------------------------------------------------------------------------------------------
   Define
   ({
      kindOf:function(data, type,kind)
      {
         type = typeOf(data).Trim(1);
         type = (!this[type] ? 'VOID' : type);


         this[type].Each = function(func,name)
         {

            if (func(data))
            {
               kind = name;
               return DONE;
            }
         };

         return ('⋖'+kind+type+'⋗');
      }
      .Join
      ({
         VOID:{ NULL:function(){ return 1; } },


         QBIT:
         {
            FALS:function(data){ return ((data === false) ? 1 : 0); },
            NONE:function(data){ return ((data === null) ? 0 : 1); },
            TRUE:function(data){ return ((data === true) ? 1 : 0); },
         },


         UNIT:
         {
            FLAT:function(data){ return (((data+'').indexOf('.') < 0) ? 1 : 0); },
            FRAC:function(){ return 1; },
         },


         TEXT:
         {
            VOID:function(data)
            {
               data = data.toLowerCase();

               if ((data.length < 1) || (['void','undefined','deleted','removed'].indexOf(data) > -1))
               { return true; }
            },

            UNIT:function(data){ if (!isNaN(data *1)){ return 1; } },
            CHAR:function(data){ if (data.length == 1){ return 1; } },

            QBIT:function(data,find)
            {
               data = data.toLowerCase();
               find = 'fals,false,no,off,fail,negative,'+
                      'none,null,'+
                      'true,yes,on,done,positive';

               if ((data.trim().length < 1) || (find.indexOf(data) > -1))
               { return true; }
            },

            QUOT:function(data){ if (data.trimOf(1).Has('``',"''",'""','‷‴')){ return 1; } },
            LIST:function(data){ if (data.trimOf(1) == '[]'){ return 1; } },
            NODE:function(data){ if (data.trimOf(1) == '{}'){ return 1; } },

            REGX:function(data){ if (data.match(/^\/[\s\S]+\/$/)){ return 1; } },
            NAME:function(data){ if (data.match(/^[a-z][\w]{2,24}$/i)){ return 1; } },
            PATH:function(data){ if (data.Has('/') && (data.match(/^[a-zA-Z0-9-\/\.⁄_]+$/))){ return 1; } },
            MAIL:function(data){if(data.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)){return 1;}},
            CALC:function(data)
            {
               if ((data.trimOf(1) == '()') || data.match(/[-!$%^&*()+|~={}\[\]:;<>?,.\/]/))
               { return 1; }
            },

            FLAT:function(){ return 1; },
         },


         BLOB:
         {
            TINY:function(data){ if (Size(data.length,'MB') < 4){ return 1; } },
            NORM:function(data){ if (Size(data.length,'MB') < 16){ return 1; } },
            PHAT:function(data){ if (Size(data.length,'MB') < 64){ return 1; } },
            HUGE:function(data){ if (Size(data.length,'MB') < 256){ return 1; } },
            MEGA:function(){ return 1; },
         },


         LIST:
         {
            ARGS:function(data){ if (dataType(data) == 'arguments'){ return 1; } },
            NODE:function(data)
            {
               if ((dataType(data) == 'nodelist') || (dataType(data[0]).Has('obje','elem')))
               { return 1; }
            },
            META:function(){ return 1; },
         },

         NODE:
         {
            HTML:function(data){ if (dataType(data).Has('elem','html')){ return 1; } },
            META:function(){ return 1; },
         },

         FUNC:
         {
            META:function(data){ if (Object.keys(data).length < 1) return 1; },
            METH:function(){ return 1; },
         },

         TIME:
         { DATE:function(){ return 1; } },

         MAIN:
         { CORE:function(){ return 1; } },

         PLAN:
         {
            QBIT:function(data){ if (data === Boolean.prototype){ return 1; } },
            UNIT:function(data){ if (data === Number.prototype){ return 1; } },
            TEXT:function(data){ if (data === String.prototype){ return 1; } },
            LIST:function(data){ if (data === Array.prototype){ return 1; } },
            NODE:function(data){ if (data === Object.prototype){ return 1; } },
            FUNC:function(data){ if (data === Function.prototype){ return 1; } },
            DATE:function(data){ if (data === Date.prototype){ return 1; } },
            VOID:function(){ return 1; },
         },

         REGX:
         {
            META:function(data){ return 1},
         }
      })
   });

   kindOf.Each = function(node,type)
   {
      node.Each = function(func,kind)
      {
         func = ('is'+kind[0]+kind.substr(1).toLowerCase()+type[0]+type.substr(1).toLowerCase());
         kind = (kind+type);

         Define(kind)('⋖'+kind+'⋗');
         Define(func)
         (
            function(data)
            { return ((kindOf(data) == this.Data) ? true : false); }.bind({Data:'⋖'+kind+'⋗'})
         );
      };
   };
// --------------------------------------------------------------------------------------------------------





// glob :: meta : Tunnel - depth map - get/set/rip dot-separated property-depth
// --------------------------------------------------------------------------------------------------------
   Extend(Array.prototype, Object.prototype, Function.prototype)
   ({
      Tunnel:function(path,data)
      {
         var prts,refr,type,last;

         if (!isText(path) && !isList(path))
         { throw 'expecting typeOf: TEXT -or- LIST'; }

         prts = (isList(path) ? path : path.Chop('.'));
         refr = this;
         type = typeOf(refr);
         last = (prts.length -1);


         prts.Each = function(part,indx)
         {
            if ((!isText(part) && !isUnit(part)) || (Span(part) < 1))
            { throw 'invalid depth-map'; }

            if (data === VOID)
            {
               if (refr.hasOwnProperty(part))
               { refr = refr[part]; }
               else
               { refr = data;  return DONE; }

               return;
            }

            if (indx < last)
            {
               if (refr.hasOwnProperty(part))
               { refr = refr[part];  return; }

               if ((data != DROP) && (data != VOID))
               {
                  refr[part] = ((type == LIST) ? [] : {});
                  refr = refr[part];
                  return;
               }

               return DONE;
            }

            if ((data == DROP) || (data == VOID))
            { delete(refr[part]); }
            else
            { refr[part] = data; }
         };


         if (data === VOID)
         { return refr; }

         return this;
      },
   });
// --------------------------------------------------------------------------------------------------------





// func :: (Main) : misc functions
// --------------------------------------------------------------------------------------------------------
   Define
   ({
   // func :: dataURL : convert data into mime-base64
   // -----------------------------------------------------------------------------------------------------
      dataURL:function(data,func)
      {
         var pars = new FileReader();

         pars.onloadend = function()
         { func(pars.result); }

         pars.readAsDataURL(data);

         return;
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: tagName : get the tag-name of an element in lower-case
   // -----------------------------------------------------------------------------------------------------
      tagName:function(node)
      {
         if (!isNode(node))
         { return null; }

         return (node.tagName+'').toLowerCase();
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Tick : events
   // -----------------------------------------------------------------------------------------------------
      Tick:function(defn,func)
      {
      // prep :: vars : dbug
      // --------------------------------------------------------------------------------------------------
         var kind,valu,list,trgt,time;

         kind = defn.Keys(0);
         valu = defn[kind];
         list = ['event','until','after','every'];

         if (!isNode(defn) || !kind.Has(list))
         { throw 'expecting typeOf: `NODE` with key-names any of: `'+list.join(', ')+'`'; }

         // TODO
      // --------------------------------------------------------------------------------------------------
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : xml-dom functions
// --------------------------------------------------------------------------------------------------------
   Extend(Object.prototype,Array.prototype)
   ({
   // func :: Create
   // -----------------------------------------------------------------------------------------------------
      Create:function(defn)
      {
         var type,tagn,tagv,node,elem,char,list,clan;

         type = typeOf(defn);

         if (![TEXT,NODE,LIST].Has(type) || (Span(defn) < 1)){ return VOID; }
         if (isText(defn)){ return document.createElement(defn); }


         if (isNode(defn))
         {
            node = {Attr:{}};

            if (!defn.Node)
            {
               tagn = defn.Keys(0);
               tagv = Copy(defn[tagn]);

               delete(defn[tagn]);
               node.Node = tagn;

               if (isText(tagv) && tagv.Has('#','.'))
               {
                  tagv = tagv.split(' ');
                  clan = [];

                  tagv.Each = function(item)
                  {
                     item = item.trim();
                     if (item.length < 2){ return; }

                     if (item[0] == '#'){ node.Attr['name'] = item.substr(1); return; }
                     if (item[0] == '.'){ clan[clan.length] = item.substr(1); return; }
                  };

                  if (clan.length > 0){ node.Attr['class'] = clan.join(' '); }
               }
               else
               {
                  if (!defn.hasKey('Data'))
                  { node.Data = tagv; }
               }
            }

            if (!isText(node.Node)){ return VOID; }

            if (!defn.Attr)
            {
               if (defn.hasKey('Data'))
               {
                  node.Data = Copy(defn.Data);
                  delete(defn.Data);
               }

               defn.Each = function(val,key)
               { node.Attr[key] = val; };
            }

            elem = document.createElement(node.Node);
            elem.Modify(node.Attr);
            elem.Insert(node.Data);

            return elem;
         }


         list = document.createElement('div');

         defn.Each = function(node)
         {
            if (!isNode(node) || (Span(node) < 1)){ return; }
            list.Insert(Create(node));
         };

         list = list.childNodes;

         if (this)
         { this.Insert(list); return true; }

         return list;
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Modify
   // -----------------------------------------------------------------------------------------------------
      Modify:function(attr)
      {
         var self = this;
         var kind = kindOf(self);

         if (!isMetaNode(attr))
         { return self; }

         if (kind = HTMLNODE)
         {
            attr.Each = function(val,key)
            {
               if (!isFunc(val)){ self.setAttribute(key,val); return; }
               self[key] = val;
            };

            return self;
         }

         if (kind == NODELIST)
         {
            self.Each = function(node)
            { node.Modify(attr); };

            return self;
         }

         attr.Each = function(val,key)
         { self[key] = val; };

         return self;
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Insert
   // -----------------------------------------------------------------------------------------------------
      Insert:function(defn)
      {
         var self = this;
         var kind = kindOf(self);
         var type,temp;

         if (kind == METALIST)
         {
            self[self.length] = defn;
            return self;
         }

         if (kind == NODELIST)
         {
            self.Each = function(node){ node.Insert(defn); };
            return self;
         }

         if (kind == HTMLNODE)
         {
            if (isList(defn))
            {
               defn.Each = function(item){ self.Insert(item); };
               return self;
            }

            if (isMetaNode(defn))
            { defn = Create(defn); }

            if (isHtmlNode(defn))
            { self.appendChild(defn); }
            else
            {
               if (isText(defn) && (defn.trim().trimOf(1) == '<>'))
               {
                  defn = defn.trim();

                  if (defn.substr(1,3) != 'svg')
                  { defn = defn.replace(/\>\s+\</g,'><'); }

                  temp = Create('div');
                  temp.innerHTML = defn;
                  self.Insert(temp.childNodes);
               }
               else
               { self.appendChild(document.createTextNode(textOf(defn))); }
            }

            return self;
         }

         if (kind == METANODE)
         {
            if (!self.Data){ self.Data = []; }
            self.Data[self.Data.length] = defn;
         }

         return self;
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Select
   // -----------------------------------------------------------------------------------------------------
      Select:function()
      {
         var args,evod,self,kind,resl,cmnd,defn,char,find,even;

         args = listOf((isList(arguments[0])?arguments[0]:arguments));  if(args.length<1){return[];}
         evod = ([EVEN,ODDS].Has(args[(args.length-1)]) ? args.pop() : VOID);
         self = (this || document);
         kind = kindOf(self);
         resl = [];

         if (kind == HTMLNODE)
         {
            cmnd = // node
            {
               '#':'getElementById',
               '@':'querySelectorAll',
               '&':'getElementsByName',
               '^':'getElementsByTagName',
               '.':'getElementsByClassName',
            };

            args.Each = function(defn)
            {
               defn = (!cmnd[defn[0]] ? ('^'+defn) : defn);
               char = defn[0];
               self = (self[cmnd[char]] ? self : document);
               defn = defn.substr(1);
               find = self[cmnd[char]](defn);

               if (Span(find) < 1){ return; }
               if (!isList(find)){ find = [find]; }

               find.Each = function(node,indx)
               {
                  if (!evod || indx.isEVOd(evod))
                  { resl[resl.length] = node; return; }
               };
            };

            return resl;
         }

         if (Span(self) < 1){ return []; }

         if (args.length < 1)
         {
            if (!evod){ return []; }
            args = range(0,(self.length-1));
         }

         args.Each = function(item,indx)
         {
            item = (self.hasKey(item) ? item : (item+''));
            if (self.hasKey(item) && (!evod || indx.isEVOD(evod)))
            { resl[resl.length] = self[item]; }
         };

         return resl;
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Select
   // -----------------------------------------------------------------------------------------------------
      Delete:function()
      {
         var args,self,kind,resl,dupl;

         args = listOf((isList(arguments[0]) ? arguments[0] : arguments));
         self = (this || document);
         kind = kindOf(self);


         if (kind == HTMLNODE)
         {
            args.Each = function(find)
            {
               (isHtmlNode(find) ? [find] : self.Select(find)).Each = function(node)
               { node.parentNode.removeChild(node); };
               return;
            };

            return self;
         }


         if (kind.Has('LIST'))
         {
            resl = [];
            dupl = [];

            args.Each = function(find)
            {
               self.Each = function(item,indx)
               {
                  if (find == DUPL)
                  {
                     if (!dupl.hasVal(item))
                     {
                        dupl[dupl.length] = Copy(item);
                        resl[resl.length] = item;
                     }

                     return;
                  }

                  if (item === find){ return; }
                  resl[resl.length] = item;
               };
            };

            return resl;
         }


         args.Each = function(find)
         {
            if (self.hasKey(find))
            { delete(self[find]); }
         };

         return self;
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Listen
   // -----------------------------------------------------------------------------------------------------
      Listen:function(evnt,func)
      {
         self = (this || Main);
         self.addEventListener(evnt,func);
      },
   // -----------------------------------------------------------------------------------------------------




   // func :: Import
   // -----------------------------------------------------------------------------------------------------
      Import:function(path,attr,done)
      {
         var tags,extn,base,home,show,busy,node;

         if (!isPathText(path)){ throw 'expecting kindOf: PATHTEXT'; }
         if (isFunc(attr)){ done=Copy(attr); attr={}; }
         if (!isNode(attr)){ attr = {}; }
         if (!isFunc(done)){ done = VOID; }


         extn = Path.Extn(path);

         tags = // object
         {
            jpg: 'img',
            png: 'img',
            gif: 'img',
            mp3: 'audio',
            ogg: 'audio',
            ogv: 'video',
            mp4: 'video',
            ttf: 'style',
            otf: 'style',
            fnt: 'style',
            woff:'style',
            css: 'style',
            js:  'script',
            svg: null,
            htm: null,
            html:null,
            txt: null,
            vmp: null,
            v:   null,
         };


         if (!tags.hasKey(extn))
         { throw 'no tag-name defined for `'+extn+'` files'; }


         base = Path.Base(path);
         home = (isHtmlNode(this) ? this : (extn.Has('css','js','fnt') ? document.head : null));
         home = (isHtmlNode(home) ? home : (isNodeList(this) ? this[0] : null));
         show = ((home && (tagName(home) != 'head')) ? home : document.body);
         busy = Loader(show);
         node = (tags[extn] ? Create(tags[extn]) : null);


         Path.Read(path,busy,function(data,mime)
         {
            if (window.haltFail){ return; } // exit on fail

            if (!node)
            {
               if (home){ home.Insert(data); }
               if (done){ done(data); }

               return home;
            }

            if (tags[extn] == 'style')
            {
               if (mime.Has('font'))
               {
                  data = '@font-face{font-family:"'+base+'"; src:url("'+data+'") ';
                  data+= 'font-weight:normal; font-style:normal;}';
               }
               else if (extn == 'fnt')
               {
                  var part,refs,type;

                  part = data.split("\n");
                  refs = LZS.decB64(part[0]).split(' ');
                  data = '';
                  type = part[1].substr(0,64).split(';base64,')[0].split('/')[1];
                  type = (type.Has('-') ? type.split('-')[1] : type.split('+')[0]);

                  data = '@font-face{font-family:"'+base+'"; src:url("'+part[1]+'") ';
                  data+= 'format("'+type+'"); font-weight:normal; font-style:normal;}\n\n';

                  data+= '[class^="'+base+'-"]:before, [class*=" '+base+'-"]:before\n'+
                         '{\n'+
                         '  font-family:"'+base+'";\n'+
                         '  font-style:normal;\n'+
                         '  font-weight:normal;\n'+
                         '  speak:none;\n'+
                         '  display:inline-block;\n'+
                         '  text-decoration:inherit;\n'+
                         '  width:1rem;\n'+
                         '  text-align:center;\n'+
                         '  font-variant:normal;\n'+
                         '  text-transform:none;\n'+
                         '  line-height:1rem;\n'+
                         '}\n\n';

                  refs.Each = function(item)
                  {
                     if (item.trim().length < 6)
                     { return; }

                     item = item.split(':');
                     data+= '.'+base+'-'+item[0]+":before{content:'\\"+item[1]+"';}\n";
                     // dump(item[0]);
                  };
               }

               node.Insert(data);
            }
            else if ((tags[extn] == 'script') || (tags[extn] === null))
            {
               node.Insert(data);
            }
            else
            { node.src = data; }


            if (home)
            {
               var defa,defb,list;

               defa = Copy(Defined);
               home.Insert(node);
               defb = Copy(Defined);
               list = Diff(defa,defb);

               list.Each = function(item)
               {
                  if (isFunc(Main[item].Init))
                  { Main[item].Init(); }
               };
            }

            if (done){ done(node); }
         });

         return home;
      },
   // -----------------------------------------------------------------------------------------------------
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : pathBase, pathExtn, Path.Read
// --------------------------------------------------------------------------------------------------------
   Define('Path')
   ({
      Norm:function(path)
      {
         if (!isPathText(path)){ throw 'expecting kindOf: PATHTEXT'; }

         if (!path.Has('://') && (path[0] != '/'))
         {
            path = ((path.substr(0,2) == './') ? path.substr(2) : path);
            path = ((window.location.href.toString().split(window.location.host))[1] + path);
         }

         return path;
      },

      Root:function(path)
      {
         path = Path.Norm(path);
         path = path.split('/');

         return ((path.length < 4) ? '/' : path[1]);
      },


      Home:function(path)
      {
         path = Path.Norm(path);
         path = path.split('/'); path.pop();
         return path[path.length -1];
      },


      Base:function(path)
      {
         path = Path.Norm(path);
         return path.split('/').pop().split('.')[0];
      },


      Mime:function(path)
      {
         path = Path.Norm(path).split('.');
         var span = (path.length - 1);

         if (span < 2){ return ((path[0].substr(-1,1) == '/') ? 'dir' : 'none'); }
         return ((span < 3) ? path[span -1] : path[span -2]);
      },


      Extn:function(path)
      {
         path = Path.Norm(path);
         return path.split('.').pop();
      },


      Read:function(path,busy,done)
      {
         var sock,extn,mime;

         path = Path.Norm(path);

         if (isFunc(busy))
         {
            done = Copy(busy);
            busy = Loader('body');
         }

         if (!isFunc(done))
         { throw 'call-back function expected'; }

         if (isText(busy))
         { busy = Loader(busy); }

         if (!isHtmlNode(busy) || (busy.className != 'busy'))
         { busy = Loader('body'); }

         sock = new XMLHttpRequest();

         busy.insert(path);
         sock.path = path;
         sock.open('GET',path);
         sock.responseType = (this.response[extn] || 'text');
         sock.setRequestHeader('Anon','initView:false');

         sock.Listen('progress',function(p)
         { busy.update(this.path, Math.floor((p.loaded / p.total) *100)); });

         sock.Listen('loadend',function(p)
         {
            if (this.status !== 200)
            {
               busy.tint('#AA0000');
               throw '`'+this.path+'` is '+((this.status > 499) ? 'seriously broken' : this.statusText);
            }

            mime = this.getResponseHeader('Content-Type').split(';')[0];
            extn = Path.Extn(this.path);

            Path.Read.doneList.Insert(this.path);

            if (Path.Read.mimeCast[extn])
            {
               Main[(Path.Read.mimeCast[extn])].decode(sock.response,{PATH:this.path},done);
               return;
            }

            if (this.responseType == 'blob')
            {
               dataURL(this.response,function(durl)
               { done(durl,mime,busy); });
               return;
            }

            done(sock.response,mime,busy);
         });

         sock.send();
      }
      .Join
      ({
         response:
         {
            jpg: 'blob',
            png: 'blob',
            gif: 'blob',
            mp3: 'blob',
            ogg: 'blob',
            ogv: 'blob',
            mp4: 'blob',
            ttf: 'blob',
            otf: 'blob',
            woff:'blob',
            json:'json',
            jso: 'json',
         },

         doneList:[],
         mimeCast:{},
      })
   });
// --------------------------------------------------------------------------------------------------------





// glob :: func : makeFont - create .fnt file by combining contents from 1 css file & 1 woff file
// --------------------------------------------------------------------------------------------------------
   Define
   ({
      makeFont:function(cpth,fpth,done)
      {
         var make = function(path,data,busy)
         {
            this[pathExtn(path)] = [pathBase(path),data];

            if (Keys(this).length < 2)
            { return; }

            Delete(busy);

            var txt = this.css[1];
            var bfr = '';
            var omt = {" ":1,"\t":1,"\n":1,"\r":1,"}":1};
            var rpl = ['.icon-','.ico-','.fa-','.i-','";'];
            var tst = ':before{content:"\\';
            var pts = null;
            var rsl = '';
            var dvl = Create('div');
            var lnk = Create('a');
            var dat = null;

            var c = '';

            for (var i=0; i<txt.length; i++)
            {
               c = txt[i];

               if (omt[c]){ continue; }
               if (c == '.'){ bfr += c; }else if (bfr.length > 0){ bfr += c; }
               if (c == ','){ bfr = ''; continue; }

               if (c == ';')
               {
                  if ((bfr[0] == '.') && (bfr.indexOf(tst) > 0))
                  {
                     for (var r in rpl) { bfr = bfr.split(rpl[r]).join(''); }
                     pts = bfr.split(tst);
                     rsl+= pts[0]+':'+pts[1]+' ';
                  }

                  bfr = '';
               }
            }


            txt = this.woff[0]+'.fnt';
            rsl = LZS.encB64(rsl.trim())+"\n"+this.woff[1];
            dat = new Blob([rsl], {type: 'text/plain;charset=UTF-8'});

            if (isFunc(done))
            {
               done(dat);
               return;
            }

            dvl.className = 'dbugProc';
            lnk.href = URL.createObjectURL(dat);
            lnk.download = txt;
            lnk.Insert(txt);
            dvl.Insert(lnk);

            document.body.Insert(dvl);
         }
         .bind({});

         Path.Read(cpth,function(data,mime,busy){ make(cpth,data,busy); });
         Path.Read(fpth,function(data,mime,busy){ make(fpth,data,busy); });
      }
   });
// --------------------------------------------------------------------------------------------------------




// glob :: func : Loader - progress indication
// --------------------------------------------------------------------------------------------------------
   Define('Loader')
   (
      function(home)
      {
         var node;

         home = (isNode(home) ? home : (isText(home) ? Select(home) : null));
         home = (isList(home) ? home[0] : home);

         if (isNode(home))
         {
            node = home.Select('.busy')[0];

            if (!node)
            {
               node = Create('div').Insert(this.html).Select('.busy')[0];
               home.Insert(node);
               node.onchange();
               node = home.Select('.busy')[0];
            }
         }
         else
         { node = Create('div').Insert(this.html).Select('.busy')[0]; }

         return node;
      }
      .Join
      ({
         html:(function()
         {
            var node = Select('.busy')[0];
            var html = node.outerHTML;

            Delete(node);
            return html;
         }())
      })
   );
// --------------------------------------------------------------------------------------------------------
