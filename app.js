// var JSSoup = require('jssoup').default;
// var request = require('request');
// var getImageUrls = require('get-image-urls');
// var arr = []
// var link = "https://www.quora.com/What-is-a-simple-explanation-of-higher-order-functions-and-callbacks-in-JavaScript"
// function parseBody(html){
// 	var body = new JSSoup(html)
// 	var getImages = body.findAll("img")
// 	for(var i = 0; i < getImages.length; i++){
// 		console.log(getImages[i].attrs.src)
// 	}
// }
// request(link, function (error, response, body) {
//     if (!error) {
//     	parseBody(body)

//     } else {
//         console.log(error);
//     }
// });

 
// getImageUrls('http://google.com', function(err, images) {
//   if (!err) {
//     console.log(images.url);
//   }
//   else {
//     console.log('ERROR', err);
//   }
// })



// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



"use strict"
require('use-strict')
var request = require('request');
var file = require('file-system');
var fs = require('fs');
const hasha = require('hasha');
var express = require('express');
var app = express();






let hashArray = []
hashArray.push(Math.trunc(Date.now() / 100000000))

	for(let i = 0; i <= 4200; i+=42){
		
		let link = "https://gelbooru.com/index.php?page=post&s=list&tags=rating:safe&pid=" + i
		request(link, function (error, response, body) {
		    if (!error) {
		    	hashArray = hashArray.concat(parseBody(body))	    	
		    } else {
		        console.log(error);
		    }
		});	
	}

//======================
function getThumbHash(link){
		let requestSettings = {
		method: "GET",
		url: link,
		encoding: null
	}
	let result
request(requestSettings, (err, resp, buffer) => {
     if(err){
     	console.log(err)
     } else {

     	result = hasha(buffer, {algorithm: 'md5'})
     	return result
     }

});
}


//======================
	setTimeout(write, 20000);



	
	function write(){
		fs.writeFile ("data.json", JSON.stringify(hashArray), function(err) {
	    if (err) throw err;
	    }
	);	
    console.log("json writed")
	}
	
	function parseBody(html){
		let hash = []
		let body = html
		let fullSizeRegex = /\w{32}(?=\.jpg)|\w{32}(?=\.png)/g
		let fullSizeHash = body.match(fullSizeRegex)
		hash = hash.concat(fullSizeHash)
		let thumbRegex = /(https\:\/\/simg3).+(thumbnail).+(jpg)|(https\:\/\/simg3).+(thumbnail).+(png)/g
		let thumbLinks = body.match(thumbRegex)
		for(let item of thumbLinks){
			let requestSettings
  			let result
  			requestSettings = {
				method: "GET",
				url: item,
				encoding: null
			}
			request(requestSettings, (err, resp, buffer) => {
			     if(err){
			     	console.log(err)
			     } else {
			     	result = hasha(buffer, {algorithm: 'md5'})
			     	
			     	hashArray.push(result)
			     }
     
			});			
		}
		return hash
	}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
	
app.get('/', function(req, res) {
    res.send(hashArray);
});





// function parseBody(html){
// 		let hash = []
// 		let body = html
// 		let fullSizeRegex = /\w{32}(?=\.jpg)|\w{32}(?=\.png)/g
// 		let fullSizeHash = body.match(fullSizeRegex)
// 		hash = hash.concat(fullSizeHash)
// 		let thumbRegex = /(https\:\/\/simg3).+(thumbnail).+(jpg)|(https\:\/\/simg3).+(thumbnail).+(png)/g
// 		let thumbLinks = body.match(thumbRegex)
// 		for(let item of thumbLinks){
// 			let requestSettings
//   			let result
//   			requestSettings = {
// 				method: "GET",
// 				url: item,
// 				encoding: null
// 			}
// 			request(requestSettings, (err, resp, buffer) => {
// 			     if(err){
// 			     	console.log(err)
// 			     } else {
// 			     	result = hasha(buffer, {algorithm: 'md5'})
			     	
// 			     	hashArray.push(result)
// 			     }
     
// 			});			
// 		}
// 		return hash
// 	}
		
//   		for(let item of test){
//   			let requestSettings
//   			let result
//   			requestSettings = {
// 		method: "GET",
// 		url: item,
// 		encoding: null
// 	}

// request(requestSettings, (err, resp, buffer) => {
//      if(err){
//      	console.log(err)
//      } else {

//      	result = hasha(buffer, {algorithm: 'md5'})
//      	console.log(item)
//      	console.log(result)
//      }
     
// });
//   		}


// function parseBody(html){
// 	var body = new JSSoup(html)
// 	var getImages = body.findAll("img")
// 	for(var i = 0; i < getImages.length; i++){
// 		console.log(getImages[i].attrs.src)
// 	}
// 	let body = html
// 	let regex = /\w{32}(?=\.jpg)|\w{32}(?=\.png)/g
// 	let hash = body.match(regex)
	
// }
// request(link, function (error, response, body) {
//     if (!error) {
//     	parseBody(body)

//     } else {
//         console.log(error);
//     }
// });

// getImageUrls(link, function(err, images) {
//   if (!err) {
//     for(let item of images){
//     	console.log(item.url)
//     	obj.table.push(item.url)
//     }
//     fs.writeFile ("data.json", JSON.stringify(obj), function(err) {
// 	    if (err) throw err;
// 	    }
// 	);	
//     console.log("json writed")
//   }
//   else {
//     console.log('ERROR', err);
//   }
// })

// getImageUrls(link, function(err, images) {
//   if (!err) {
//     console.log('Images found', images.length);
//     console.log(images);
//   }
//   else {
//     console.log('ERROR', err);
//   }
// })


var port = process.env.PORT || 8080;
const http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(hashArray));
});

server.listen(process.env.PORT || port)

