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
	// Main button that calls runJSON1 function and builds HTML table
	$('.yahoo-form').submit(function(){
		event.preventDefault();
		symbol = $('#symbol').val();
		// Dynamically build the URL to use the symbol(s) the user requested
		setInterval(runJSON1, 3000);
	});
	// Initiates local storage
	$('.save').click(function(){
		localStorage.setItem("userStocks", $('#symbol').val());
	})

	$('.retrieve').click(function(){
		for(let i = 0; i < 2; i++){
			runJSON2(userStocksSaved);
			userStocksSaved = localStorage.getItem("userStocks");
		}
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
	var date = new Date()
    var timeStamp;
    if(date.getHours() < 10){
        timeStamp = "0" + date.getHours();
    }
    else{
        timeStamp = date.getHours();
    };

    if(date.getMinutes() < 10){
        timeStamp += (":0" + date.getMinutes())
    }
    else{
        timeStamp += (":" + date.getMinutes())    
    };

    if(date.getSeconds() < 10){
        timeStamp += (":0" + date.getSeconds())
    }
    else{
        timeStamp += (":" + date.getSeconds())    
    };

	var newHTML = '';
	newHTML += '<tr>';
		newHTML += '<td>'+stock.Symbol+'</td>';
		newHTML += '<td>'+stock.Name+'</td>';
		newHTML += '<td>'+stock.Ask+'</td>';
		newHTML += '<td>'+stock.Bid+'</td>';
		newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
		newHTML += '<td>'+timeStamp+'</td>'
	newHTML += '</tr>';
	return newHTML;
}

function runJSON1(){
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${symbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
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

function runJSON2(userStocksSavedOrSymbol){
	var url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("${userStocksSaved}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
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














