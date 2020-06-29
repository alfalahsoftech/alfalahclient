// function printPage() {
//     console.log('Print method called')
//     var w = window.open();

//     var headers = 'Invoice 1245'// $("#headers").html();
//     // var field= $("#field1").html();
//     // var field2= $("#field2").html();

//    // var tabl = document.getElementById("tbl1").innerHTML;
//     // var html = "<!DOCTYPE HTML>";
//  var   html = '<html lang="en-us">';
//     html += '<head><style></style></head>';
//     html += "<body>";

//     //check to see if they are null so "undefined" doesnt print on the page. <br>s optional, just to give space
//     if(headers != null) html += headers + "<br/><br/>";
//     // if(field != null) html += field + "<br/><br/>";
//     // if(field2 != null) html += field2 + "<br/><br/>";
//     // html +=tabl;
//  var    itemsToBeSoldArray =[{'name':'Jikit','quantity':12,'total':355},{'name':'Jikit','quantity':12,'total':355},{'name':'Jikit','quantity':12,'total':355}]
//  console.log(itemsToBeSoldArray)
//     html +="<table>";
//     for (var i =0;i<itemsToBeSoldArray.length;i++) {
//         console.log(i)
//         item = itemsToBeSoldArray[i];
//         console.log(item)
//         html +=  "<tr><td>"+item.name+"</td><td>"+item.quantity+"</td><td>"+item.total+"</td><tr>";
//     }
  
//      html += "</table>";
//     html += "</body>";
//     console.log(html)
//     w.document.write(html);
//     w.window.print();
//     w.document.close();
// };

