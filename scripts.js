$(document).ready(function(){

	$('#arrow1').click(function(){
		$('#page1,#page2').animate({
			'right':'100vw'
		},100);
	});

	$('#arrow2').click(function(){
		$('#page1,#page2').animate({
			'right':'0vw'
		},100);
	});

	$('.yahoo-form').submit(function(){
		event.preventDefault();
		symbol = $('#symbol').val();
		// Dynamically build the URL to use the symbol(s) the user requested
		setInterval(runJSONx, 3000);
	});

	$('.save').click(function(){
		localStorage.setItem("userStocks", $('#symbol').val());
	})

	$('.retrieve').click(function(){
		runJSON(userStocksSaved);
		userStocksSaved = localStorage.getItem("userStocks");
	})

	$('.clear').click(function(){
		$('#stock-body').html("");
		localStorage.setItem("userStocks", "");
	})
});

var userStocksSaved;
var symbol;
var rowCounter = 0;

function buildStockRow(stock){
	if(stock.Change.indexOf('+') > -1) {
		var classChange = "success";
	}
	else{
		var classChange = "danger";
	}
	var newHTML = '';
	newHTML += '<tr>';
		newHTML += '<td>'+stock.Symbol+'</td>';
		newHTML += '<td>'+stock.Name+'</td>';
		newHTML += '<td>'+stock.Ask+'</td>';
		newHTML += '<td>'+stock.Bid+'</td>';
		newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
	newHTML += '</tr>';
	return newHTML;
}

function runJSONx(userStocksSavedOrSymbol){
	userStocksSavedOrSymbol = symbol
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${userStocksSavedOrSymbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
	$.getJSON(url, function(dataJSGotIfAny){
		var stockInfo = dataJSGotIfAny.query.results.quote;
		if(dataJSGotIfAny.query.count == 1){
			// we know this is a single object becaues theres only 1
			var htmlToPlot = buildStockRow(stockInfo);
			$('#stock-body').html(htmlToPlot);				
		}else{
			// we know this is an array, because the count isnt 1
			$('#stock-body').html("");
			for(let i = 0; i < stockInfo.length; i++){
				var htmlToPlot = buildStockRow(stockInfo[i]);
				$('#stock-body').append(htmlToPlot);
			}
		}
	});	
}

function runJSON(userStocksSavedOrSymbol){
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${userStocksSavedOrSymbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
	$.getJSON(url, function(dataJSGotIfAny){
		var stockInfo = dataJSGotIfAny.query.results.quote;
		if(dataJSGotIfAny.query.count == 1){
			// we know this is a single object becaues theres only 1
			var htmlToPlot = buildStockRow(stockInfo);
			$('#stock-body-two').append(htmlToPlot);				
		}else{
			// we know this is an array, because the count isnt 1
			for(let i = 0; i < stockInfo.length; i++){
				var htmlToPlot = buildStockRow(stockInfo[i]);
				$('#stock-body-two').append(htmlToPlot);
			}
		}
	});	
}














