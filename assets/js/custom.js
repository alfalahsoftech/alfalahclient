function myTest() {
    alert('Welcome to custom js');
}

function printPage(items,custInfo,ttPrice) {
    console.log(items)
    console.log('Print method called')
   // var w = window.open();

    var headers = 'Invoice 1245'// $("#headers").html();
    // var field= $("#field1").html();
    // var field2= $("#field2").html();

   // var tabl = document.getElementById("tbl1").innerHTML;
    // var html = "<!DOCTYPE HTML>";
 var   html = '<html lang="en-us">';
    html += '<head><style></style></head>';
    html += "<body>";

    //check to see if they are null so "undefined" doesnt print on the page. <br>s optional, just to give space
    if(headers != null) html += headers + "<br/><br/>";
    // if(field != null) html += field + "<br/><br/>";
    // if(field2 != null) html += field2 + "<br/><br/>";
    // html +=tabl;
 var    itemsToBeSoldArray =[{'name':'Jikit','quantity':12,'total':355},{'name':'Jikit','quantity':12,'total':355},{'name':'Jikit','quantity':12,'total':355}]
 console.log(itemsToBeSoldArray)
    html +="<table>";
    for (var i =0;i<items.length;i++) {
        console.log(i)
        item = items[i];
        console.log(item)
        html +=  "<tr><td>"+item.name+"</td><td>"+item.quantity+"</td><td>"+item.totalPrice+"</td><tr>";
    }
  
     html += "</table>";
    html += "</body>";


    var myvar = '<pdf>'+
    '	'+
    '	<head>'+
    '	<style TYPE="text/css">'+
    '	/* body{'+
    '		size:A4-landscape;'+
    '	} */'+
    '	th {'+
    '		font-size: 9;'+
    '		background-color:#C6E0B4;'+
    '		padding:2px;'+
    '		border-bottom:1px;'+
    '		border-right-width: 1;'+
    '		border-style: solid;'+
    '		align: center;'+
    '		vertical-align: middle;'+
    '	}'+
    '	th:last-child{'+
    '		border-right-width: 0;'+
    '	}'+
    '	.bordr tr:last-child{'+
    '		border-bottom:1px;'+
    '	}'+
    '	td {'+
    '		font-size: 9;'+
    '		align: center;'+
    '		padding:4px 2px;'+
    '	}'+
    '	.tableDivTop {'+
    '	border-width: 1px 0px 0px 0px;'+
    '	border-style:solid;'+
    '	}'+
    '	.tableDiv {'+
    '	border: 1px;'+
    '	border-style:solid;'+
    '	padding-bottom: 30px;'+
    '	}'+
    ' .billHeader {'+
    '             margin-right: 25px;  '+
    '   }'+
    '	.total{'+
    '		background-color: #E2EFDA;'+
    '	}'+
    '	.bdr td {'+
    '		border-right:1px;'+
    '        border-bottom:1px;'+
    '        border-top:0px;'+
    '        border-left:0px;'+
    '		border-style: solid;'+
    '		'+
    '	}'+
    '	.totale tr:td {'+
    '		border-right:0 px;'+
    '        border-bottom:1px;'+
    '        border-top:0px;'+
    '        border-left:1px;'+
    '		border-style: solid;'+
    '	}'+
    '	#tbl{'+
    '		margin-right: 30px;'+
    '		'+
    '	}'+
    '	.noBorder {'+
    '	margin-top:15px; '+
    '	}'+
    '.rightDiv {'+    
      ' margin-left: 900px; align: left;'  +  
      '}'+
    '	</style>'+
    '			'+
    '	</head>'+
    ''+
    '	<body >'+
    ''+
    '	<div class = "tableDiv" style="page-break-before: always">'+custInfo.heading+
    '	<div class = "tableDivTop">'+
    '			<table width="100%" >'+
    '		    	<tbody>'+
    '		    		<tr>'+
    '	    				<td colspan="1" align="left">Buyer Name: </td>'+
    '	    				<td colspan="2" align="left">'+custInfo.clientName+'</td>'+
    '	    			</tr>'+
    '	    			<tr>'+
    '	    				<td colspan="1" align="left">Address: </td>'+
    '	    				<td colspan="2" align="left">'+custInfo.address+'</td>'+
    '	    			</tr>'+
    '	    			<tr>'+
    '	    				<td colspan="1" align="left">Refered By:</td>'+
                            '<td colspan="1" align="left">'+(custInfo.referedBy==undefined?'':custInfo.referedBy)+'</td>'+
                            '<td colspan="1" align="left">Mobile No.:</td>'+
                            '<td colspan="1" align="left">'+(custInfo.contactNo==undefined?'':custInfo.contactNo)+'</td>'+
                            // '<td colspan="1" align="left">Pan No.:</td>'+
                            // '<td colspan="1" align="left">10AMIPA6881B1Z</td>'+
    '	    			</tr>'+
    
    // '	    			<tr>'+
    // '	    				<td colspan="1" align="left">State Code:</td><td colspan="1" align="left">'+custInfo.stateCode+'</td>'+
                        
    // '	    			</tr>'+

    '		    	</tbody>'+
    '		    </table>'+
    '	<div class = "tableDivTop">'+
    '	<table width="100%" height = "60%">'+
    '		    	<thead>'+
    '		    		<tr>'+
    '			    		<th width="1%">Sl.No.</th>'+
    '			    		<th width="5%">Qnty.</th>'+
    '			    		<th width="24%">Particulars </th>'+
    '			    		<th width="5%">Mfg.By</th>'+
    '			    		<th width="8%">Exp.Date</th>'+
    '			    		<th width="7%">MRP</th>'+
    '			    		<th width="7%">Disc.%</th>'+
    '			    		<th width="5%">Sub-Total(Rs)</th>'+
    '			    	</tr>'+
    '		    	</thead>'+
    '		    	<tbody>';
    
                 for (var i =0;i<items.length;i++) {
                    console.log(i)
                    item = items[i];
                    console.log(item)
                    //myvar += '<tr class="bdr"><td align="center">'+(i+1)+'</td><td align="center">'+item.name+'</td><td align="center">'+item.unitCost+'</td><td align="center">'+item.quantity+'</td><td align="center">'+item.gstPerc+'%='+item.gstAmount+' </td><td align="center">'+item.totalPrice+'</td></tr>';
                    myvar += '<tr class="bdr">'+
                                    '<td align="center">'+(i+1)+'</td>'+
                                    '<td align="center">'+item.quantity+'</td>'+
                                    '<td align="center">'+item.mediName+'</td>'+
                                    '<td align="center">'+(item.mfgBy==undefined?'':item.mfgBy)+' </td>'+
                                    '<td align="center">'+item.expDate+' </td>'+
                                    '<td align="center">'+item.unitCost+'</td>'+
                                    '<td align="center">'+item.discount+'</td>'+
                                    // '<td align="center">'+item.pack+' </td>'+
                                    '<td align="center">'+item.subTotal+'</td>'+
                             '</tr>';
                }
    
    myvar+='</tbody>'+
    '		    </table>'+
    // '			<table width="100%">'+
    // '				<tbody>'+
    // '					<tr>'+
    // '		    			<td  width="10%">'+
    // '			    				<table>'+
    // '			    					<tr>'+
    // '			    						<td colspan="1" align="left">Bank Name</td><td colspan="2" align="left">  HSBC </td>'+
    // '			    					</tr>'+
    // '			    					<tr>'+
    // '			    						<td colspan="1" align="left">Bank A/c No.</td><td colspan="2" align="left"> 7389328432</td>'+
    // '			    					</tr>'+
    // '			    					<tr>'+
    // '			    						<td colspan="1" align="left">Branch Name: </td><td colspan="2" align="left"> New York</td>'+
    // '			    					</tr>'+
    // '			    					<tr>'+
    // '			    						<td colspan="1" align="left">IFSC CODE: </td><td colspan="2" align="left">HSC20098 </td><td  colspan="6"></td>'+
    // '			    					</tr>'+
    // '			    				</table>'+
    // '		    			</td>'+
    // '		    			<td width="40%"></td>'+
    // '		    		</tr>'+
    // '				</tbody>'+
    // '			</table>'+
    '			<table width="45%" align="right">'+
    '				<tr>'+
    '					<td ><b>Grand Total Rs </b></td><td style="margin-right: 8%;">'+ttPrice+'</td>'+
    '				</tr>'+
    '				<tr>'+
    '					<td><b>Due Amount Rs </b></td><td style="margin-right: 8%;">'+custInfo.dueAmt+'</td>'+
    '				</tr>'+
    '				<tr>'+
    '					<td><b>Due Date: </b></td><td style="margin-right: 8%;">'+custInfo.dueDate+'</td>'+
    '				</tr>'+
    '			</table>'+
    '			<div class="noBorder">'+
    '			<table width="100%">'+
    '				<tbody>'+
    '				<tr>'+
    '					<td align="left" width="70%" style="font-size: 8%;">All subject to Gaya Judicial only.</td><td colspan="2" width="15%" align="right">Signature</td>'+
    '	    		</tr>'+
    '	    		</tbody>'+
    '			</table></div>'+
    '	</div>'+
    '	</div>'+
    '	</div>'+
    '	</body>'+
    '	</pdf>';
        
    
    // console.log(myvar)
    // w.document.write(myvar);
    // w.window.print();
    // w.document.close();
    // w.close();
    return myvar;
};

function printPDF(tab){
    setTimeout(function(){
        tab.document.close();
        tab.focus()
        tab.print();
     }, 2000);
   
}
function onPrintRequest(value) {
    var w = window.open("about:blank");
    w.document.write(value);
   
    w.focus();
    w.print();
}