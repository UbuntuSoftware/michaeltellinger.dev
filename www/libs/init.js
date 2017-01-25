
   Import(INITVIEW.landPage,function(data)
   {
// dump(data);
      // document.body.innerHTML = '';
      Select('body').Insert(data);
   });
