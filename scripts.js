$(document).ready(function(){
	$('.yahoo-form').submit(function(){
		// Stop the form from submitting (default action)
		event.preventDefault();
		var symbol = $('#symbol').val();

		// Dynamically build the URL to use the symbol(s) the user requested
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+symbol+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
		// getJSON, param1 = where to go. param2 = what to do
		$.getJSON(url, function(dataJSGotIfAny){
			var stockInfo = dataJSGotIfAny.query.results.quote;
			// create variable that uses count
			var moreThanOne = dataJSGotIfAny.query.count;
			console.log(moreThanOne);
			var newHTML = '';
			if(moreThanOne > 1){
				for(let i = 0; i < stockInfo.length; i++){
					if(stockInfo[i].Change.indexOf('+') > -1){
					var classChange = "success";
					}
					else{
						var classChange = "danger";
					}
					newHTML += '<tr>';
						newHTML += '<td>'+stockInfo[i].Symbol+'</td>';
						newHTML += '<td>'+stockInfo[i].Name+'</td>';
						newHTML += '<td>'+stockInfo[i].Ask+'</td>';
						newHTML += '<td>'+stockInfo[i].Bid+'</td>';
						newHTML += '<td class="'+classChange+'">'+stockInfo[i].Change+'</td>';
					newHTML += '</tr>';
				}
			}
			else{
				// This If statement adds class color based on finding a plus sign in the quote.change section
				if(stockInfo.Change.indexOf('+') > -1){
					var classChange = "success";
				}
				else{
					var classChange = "danger";
				}
				
				newHTML += '<tr>';
					newHTML += '<td>'+stockInfo.Symbol+'</td>';
					newHTML += '<td>'+stockInfo.Name+'</td>';
					newHTML += '<td>'+stockInfo.Ask+'</td>';
					newHTML += '<td>'+stockInfo.Bid+'</td>';
					newHTML += '<td class="'+classChange+'">'+stockInfo.Change+'</td>';
				newHTML += '</tr>';
			}
			$('#stock-body').html(newHTML);
		});

	});
});