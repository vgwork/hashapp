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
var JSSoup = require('jssoup').default;
var request = require('request');
var file = require('file-system');
var fs = require('fs');
var crypto = require('crypto');
var getImageUrls = require('get-image-urls');
const hasha = require('hasha');
var express = require("express");
var app = express();



let hashArray = []
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
	let test = ['https://simg3.gelbooru.com/thumbnails/9e/9d/thumbnail_9e9d8b73dcb822bd7e45bd7227623ef8.jpg',
  'https://simg3.gelbooru.com/thumbnails/27/a4/thumbnail_27a439b9c4eed20043a68ad9f82a4e97.jpg',
  'https://simg3.gelbooru.com/thumbnails/dc/ea/thumbnail_dceabeb8a28b1ee6629867342e6786fb.jpg',
  'https://simg3.gelbooru.com/thumbnails/a2/de/thumbnail_a2de13af2be1d3a009e60e9f98522a68.jpg',
  'https://simg3.gelbooru.com/thumbnails/46/72/thumbnail_4672dc6f1afe0208b3de087810955948.jpg',
  'https://simg3.gelbooru.com/thumbnails/8e/79/thumbnail_8e79c1a788d5110a3a4d389ae2bd5b64.jpg',
  'https://simg3.gelbooru.com/thumbnails/17/ca/thumbnail_17cabad75c7ecd80e8bd8b90b6f099f8.jpg',
  'https://simg3.gelbooru.com/thumbnails/d2/bc/thumbnail_d2bc2d4ed95aa2bc087defa94128b4bc.jpg',
  'https://simg3.gelbooru.com/thumbnails/28/2d/thumbnail_282d67ad852be58658acaef1ac69aa23.jpg',
  'https://simg3.gelbooru.com/thumbnails/60/37/thumbnail_6037b2dcdac850f050a53d604c50da87.jpg',
  'https://simg3.gelbooru.com/thumbnails/66/2a/thumbnail_662a1d03755591d9a0f6b99817346f4a.jpg',
  'https://simg3.gelbooru.com/thumbnails/08/92/thumbnail_08928715724153aa0338ca0cf9bcb520.jpg',
  'https://simg3.gelbooru.com/thumbnails/ed/e7/thumbnail_ede7212c51410e827d95574e55e721a3.jpg',
  'https://simg3.gelbooru.com/thumbnails/df/d3/thumbnail_dfd3cbdf5d64a3ef8b3766835176df24.jpg',
  'https://simg3.gelbooru.com/thumbnails/4b/a1/thumbnail_4ba1b9ccdc111710c3d4424e8711a7c0.jpg',
  'https://simg3.gelbooru.com/thumbnails/7e/e6/thumbnail_7ee60e6f6a9a6f1b70006dfbbdcef3d9.jpg',
  'https://simg3.gelbooru.com/thumbnails/e1/10/thumbnail_e11046a7557b104ee5240d23c46d4009.jpg',
  'https://simg3.gelbooru.com/thumbnails/c2/b6/thumbnail_c2b6f8da41d645877bfcea52965044a8.jpg',
  'https://simg3.gelbooru.com/thumbnails/1f/38/thumbnail_1f38446e1b83dbbd21982637b5f603e6.jpg',
  'https://simg3.gelbooru.com/thumbnails/f0/fb/thumbnail_f0fb0ed3ae21794adbe42dee4e756b43.jpg',
  'https://simg3.gelbooru.com/thumbnails/c7/be/thumbnail_c7be49be7e3021f6a06148f429ecae8f.jpg',
  'https://simg3.gelbooru.com/thumbnails/0f/59/thumbnail_0f5956c749524b056d85053b78ca0114.jpg',
  'https://simg3.gelbooru.com/thumbnails/97/53/thumbnail_9753874e8d5ce95333b53e242cc71ebc.jpg',
  'https://simg3.gelbooru.com/thumbnails/93/ce/thumbnail_93ce2ed840d7d430d98ece5b441746a7.jpg',
  'https://simg3.gelbooru.com/thumbnails/75/82/thumbnail_758217d82dcb11e0265fabbe9ffb44ef.jpg',
  'https://simg3.gelbooru.com/thumbnails/5a/04/thumbnail_5a04c427f6168509d1c6886f40d80135.jpg',
  'https://simg3.gelbooru.com/thumbnails/be/18/thumbnail_be1834394c31841584ba20c232d22dc7.jpg',
  'https://simg3.gelbooru.com/thumbnails/c1/06/thumbnail_c1067d2edfaff6418a8504f00452594c.jpg',
  'https://simg3.gelbooru.com/thumbnails/f8/5e/thumbnail_f85ea35a75e78bdd80f661a1538c20f5.jpg' ]


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


const http = require('http');

const hostname = '192.168.88.209';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(hashArray));
});

app.get("/", function(req, res){
	res.send(hashArray)
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



