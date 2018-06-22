exports.payTemplate=function (wxPay) {
  var xmlNode="";
  for(var key in wxPay){
    if(wxPay[key])
      xmlNode+=`<${key}>${wxPay[key]}</${key}>`;
  }
  return `<xml>${xmlNode}</xml>`
}
