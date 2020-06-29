function myTest() {
    alert('Welcome to custom js');
}

function printPage(items,custInfo) {
    console.log(items)
    console.log('Print method called')
    var w = window.open();

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

var myvar = '<html>'+
'<head>'+
''+
'</head>'+
'<body>'+
''+
'<table width="50%" border="1" style="border-collapse: collapse;">'+
'		    	<tbody>'+
'		    			<tr>'+
'		    				<td rowSpan="8">'+
'		    					<table>'+
'									<tr>'+
'										<td> <b>ASHRAF AGARBATTI</b> </td>'+
'									</tr>'+
'									<tr>'+
'										<td>Auth. Dealer Bihar and Jharkhand </td>'+
'									</tr>'+
'									<tr>'+
'										<td>House No.89, PANCHITYA AKHARA </td>'+
'									</tr>'+
'									<tr>'+
'										<td>GAYA-823001(BIHAR) </td>'+
'									</tr>'+
'									<tr>'+
'										<td>GSTIN:-10AMIPA6881B1Z</td>'+
'									</tr>'+
'									<tr>'+
'										<td>STATE CODE:-10</td>'+
'									</tr>'+
'									<tr>'+
'										<td>Mob.No.9693581311,8862855686,7070173595</td>'+
'									</tr>'+
'									<tr>'+
'										<td><b>E-mail:</b>asharafagarbati@gmail.com</td>'+
'									</tr>'+
'								</table>'+
'							</td>'+
'		    				<td colspan="2">'+
'		    					Deals in Agarbatti, Agarbatti Made Machine,'+
'								Machine Parts, Machine Made Agarbatti,'+
'								Chinse Bamboo Stick,Machine Raw Material,'+
'								S.Steel Material,Pipe Fitting etc '+
'							</td>'+
'		    			</tr>'+
'		    			<tr>'+
'		    				<td colspan="2">'+
'			    				<table>'+
'				    				<tr>'+
'				    					<td>'+
'					    					SI No.'+
'					    				</td>'+
'					    				<td>'+
'					    					2872'+
'					    				</td>'+
'					    				<td>'+
'					    					   				'+
'					    				</td>'+
'					    				<td>'+
'				    						date'+
'				    					</td>'+
'				    					<td>'+
'				    						19-Apr-2019'+
'				    					</td>'+
'				    				</tr>'+
'				    				<tr>'+
'				    					<td>'+
'				    						Lorry'+
'				    					</td>'+
'				    					<td>'+
'				    						---------'+
'				    					</td>'+
'				    				</tr>'+
'				    			</table>'+
'		    				</td>'+
'		    			</tr>'+
'		    	</tbody>'+
''+
'		    </table>'+
'		    <table width="50%" border="1" style="border-collapse: collapse;border-top: none">'+
'		    	<tbody>'+
'		    		<tr>'+
'	    				<td colspan="1">Buyer Name: </td>'+
'	    				<td colspan="4">'+custInfo.clientName+'</td>'+
'	    			</tr>'+
'	    			<tr>'+
'	    				<td colspan="1">Address: </td>'+
'	    				<td colspan="4"> '+custInfo.address+'</td>'+
'	    			</tr>'+
'	    			<tr>'+
'	    				<td colspan="1">GSTIN:</td><td colspan="1">'+custInfo.gstNo+'</td><td colspan="1">Pan No.:<td colspan="1">'+custInfo.clientName+custInfo.contactNo+'</td>'+
'	    			</tr>'+
'	    			<tr>'+
'	    				<td colspan="1">State Code:</td><td colspan="1">'+custInfo.stateCode+'</td><td colspan="1">Mobile No.:<td colspan="1">'+custInfo.contactNo+'</td>'+
'	    			</tr>'+
'		    	</tbody>'+
'		    </table>'+
'		    <table width="50%" max-height="40%" border="1" style="border-collapse: collapse;border-top: none">'+
'		    	<colgroup>'+
'		    		<col width="1%">'+
'		    		<col width="24%">'+
'		    		<col width="8%">'+
'		    		<col width="7%">'+
'		    		<col width="5%">'+
'		    		<col width="5%">'+
'		    	</colgroup>'+
'		    	<thead>'+
'		    		<th>'+
'		    			Sl.No.	'+
'		    		</th>'+
'		    		<th>'+
'		    			Particulars '+
'		    		</th>'+
'		    		<th>'+
'		    			 HSN/ASC'+
'		    		</th>'+
'		    		<th>'+
'		    			 Quantity'+
'		    		</th>'+
'		    		<th>'+
'		    			Rate'+
'		    		</th>'+
'		    		<th>'+
'		    			RS'+
'		    		</th>'+
'		    	</thead>'+
'		    	<tbody>';
            for (var i =0;i<items.length;i++) {
                console.log(i)
                item = items[i];
                console.log(item)
                myvar += "<tr><td align=center>"+(i+1)+"</td><td align=center>"+item.name+"</td><td align=center>&nbsp; </td><td align=center>"+item.quantity+"</td><td align=center>&nbsp; </td><td align=center>"+item.totalPrice+"</td><tr>";
            }


myvar+=
'		    		<tr>'+
'		    			<td colspan="4">'+
'		    				<table>'+
'		    					<tr>'+
'		    						<td colspan="2">Bank Name</td><td colspan="2">  HSBC </td>'+
'		    					</tr>'+
'		    					<tr>'+
'		    						<td colspan="2">Bank A/c No.</td><td colspan="2"> 7389328432</td>'+
'		    					</tr>'+
'		    					<tr>'+
'		    						<td colspan="2">Branch Name: </td><td colspan="2"> New York</td>'+
'		    					</tr>'+
'		    					<tr>'+
'		    						<td colspan="2">IFSC CODE: </td><td colspan="2">HSC20098 </td>'+
'		    					</tr>'+
'		    					<tr>'+
'		    						<td><p></p></td>'+
'		    					</tr>'+
'		    					<tr>'+
'									<td colspan="2">All subject to Gaya Judicial only.</td><td colspan="2" align="right">Signature</td>'+
'								</tr>'+
'		    				</table>'+
'		    			</td>'+
'		    			'+
'		    			<td colspan="2" >'+
'		    				<table  style="border-right:solid black 1px;margin: -2px;">'+
'		    					<tr>'+
'		    						<td>Total</td>'+
'					    			<td> </td>'+
'		    					</tr>'+
'					    		<tr>'+
'					    			<td>CGST</td>'+
'					    			<td> </td>'+
'					    		</tr>'+
'					    		<tr>'+
'					    			<td>SGST</td>'+
'					    			<td> </td>'+
'					    		</tr>'+
'					    		<tr>'+
'					    			<td>IGST</td>'+
'					    			<td> </td>'+
'					    		</tr>'+
'					    		<tr>'+
'					    			<td>G.Total</td>'+
'					    			<td> </td>'+
'					    		</tr>'+
'		    				</table>'+
'		    				'+
'		    			</td>'+
'		    		</tr>'+
'		    		'+
'		    	</tbody>'+
'		    </table>'+
'		    '+
'</body>'+
'</html>';
	

    console.log(myvar)
    w.document.write(myvar);
    w.window.print();
    w.document.close();
    w.close();
};