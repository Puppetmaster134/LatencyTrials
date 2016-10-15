var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); 
var fs = require('fs');

io.on('connection', function(socket)
{
	console.log('client connect');
	var participantNumber = fs.readdirSync('./trials').length;
	
	socket.on('trial', function(results)
	{
		//console.log(result);  
		var formattedResults = '';
		formattedResults += results['trial'] + '\t';
		formattedResults += results['difficulty'] + '\t';
		formattedResults += results['type'] + '\t';
		formattedResults += results['origin'] + '\t';
		formattedResults += results['target'] + '\t';
		formattedResults += results['start'] + '\t';
		formattedResults += results['end'] + '\t';
		formattedResults += results['xActual'] + '\t';
		formattedResults += results['xBall'] + '\t';
		formattedResults += results['errors'] + '\n';
		
		fs.appendFile('trials/trial'+ participantNumber +'.txt', formattedResults, function(err) 
		{
			if(err) 
			{
				return console.log(err);
			}
			console.log("The file was saved!");
		});
		
		
	});
	
	socket.on('means', function(results)
	{
		var formattedRow = '';
		formattedRow += 'P' + participantNumber + '\t';
		formattedRow += results['c2'] + '\t';
		formattedRow += results['c3'] + '\t';
		formattedRow += results['c4'] + '\t';
		formattedRow += results['c5'] + '\t';
		formattedRow += results['f2'] + '\t';
		formattedRow += results['f3'] + '\t';
		formattedRow += results['f4'] + '\t';
		formattedRow += results['f5'] + '\t';
		formattedRow += results['n2'] + '\t';
		formattedRow += results['n3'] + '\t';
		formattedRow += results['n4'] + '\t';
		formattedRow += results['n5'] + '\n';
		
		fs.appendFile('means.txt', formattedRow, function(err) 
		{
			if(err) 
			{
				return console.log(err);
			}
			console.log("The file was saved!");
		});
	});
});

http.listen(3000, function()
{
	console.log('listening on *:3000');
});

