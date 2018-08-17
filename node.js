

"use strict"
require('use-strict')
var JSSoup = require('jssoup').default;
var request = require('request');
var file = require('file-system');
var fs = require('fs');
var crypto = require('crypto');
var getImageUrls = require('get-image-urls');
const hasha = require('hasha');




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


const http = require('http');

const hostname = '192.168.88.209';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(hashArray));
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



