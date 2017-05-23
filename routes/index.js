global.Buffer = global.Buffer || require('buffer').Buffer;
global.dataArray;
global.imageName;
if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str).toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString();
  };
}

global.Blob = require('blob');
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//global.FileReader = require('filereader');
global.File = require('file');
var express = require('express');
var downloadImg = require("./downloadImg");
var router = express.Router();
//var http = require('http');
var https = require('https');
//var https = require('follow-redirects').https;
//var request = require('request');
var app = express();
var RESTClient = require('node-rest-client').Client;
var convert = require('node-image-base64');
var blobUtil = require('blob-util');
var querystring = require('querystring');
getBase64ImageBlob = convert.getBase64ImageBlob;


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var list_options = {
	//host:'javadaytokyojse-gse00011010.apaas.em3.oraclecloud.com',
	host:'javadaytokyo2accs-gse00011010.apaas.em3.oraclecloud.com',
//        host:'javadaytomcatapplication-gse00011010.apaas.em3.oraclecloud.com',
	//hostname:'javadaytomcatapplication-gse00011010.apaas.em3.oraclecloud.com',
//	 hostname:'localhost',
//        port:8081,
        //path:'/javaDayTokyo/list/',
	path:'/javaDayTokyo-0.0.1-SNAPSHOT/javaDayTokyo/list/',
        method:'GET'
}

var pic_computeCloud_options = {
//	host:'storageconsole.em2.oraclecloud.com',
	host:'gse00011010.storage.oraclecloud.com',	
//        port:8081,
//        path:'/v1/Storage-gse00011010/JavaDayTokyo/ListHeader.png',
        method:'GET',
	auth:'cloud.admin:yOung@9LuCk',
	headers:{'X-Auth-Token':'AUTH_tk170e6bd74e7d06e0eb7d3b81f4e895da'}
}

//var PORT = process.env.PORT || 8089; 
//var bodyParser = require('body-parser');
restClient = new RESTClient({
    user: 'cloud.admin',
    password:'yOung@9LuCk'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
                                                 
var fs = require('fs');

router.get('/javaDayTokyoNodejs/list', function(req, res, next) {
// res.render('index', { title: 'Expresspppppppppppp' });
//	res.setHeader("Content-Type","charset=ANSI"); 

  	pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/HeaderIcon.png';
        var headerSubReq = https.request(pic_computeCloud_options,function(subres){
                 subres.setEncoding("binary");
                 var json='';
                 subres.on('data',function(data) {
                      json+=data;
                    //  console.log( json);
                 });
                 subres.on('end',function() {
//                    console.log("json" + json);

                    //var base64 = new Buffer(json).toString('base64');
//                  // res.send(data);
//                   var blobImg = new Blob([json],{type:'png'});
                     fs.writeFile('public/css/images/HeaderIcon.png',json,"binary",function(err){
                        if(err) {
                                console.log("Download failed");
                        }
                        console.log("Download success");
                     });
                 });
          });
          headerSubReq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          headerSubReq.end();

	pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/FooterIcon.png';
        var footerSubReq = https.request(pic_computeCloud_options,function(subres){
                 subres.setEncoding("binary");
                 var json='';
                 subres.on('data',function(data) {
                      json+=data;
                    //  console.log( json);
                 });
                 subres.on('end',function() {
//                    console.log("json" + json);

                    //var base64 = new Buffer(json).toString('base64');
//                  // res.send(data);
//                   var blobImg = new Blob([json],{type:'png'});
                     fs.writeFile('public/css/images/FooterIcon.png',json,"binary",function(err){
                        if(err) {
                                console.log("Download failed");
                        }
                        console.log("Download success");
                     });
                 });
          });
          footerSubReq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          footerSubReq.end();


	pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/ListHeader.png';
	var subreq = https.request(pic_computeCloud_options,function(subres){
		 subres.setEncoding("binary");
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
        	    //  console.log( json);
	         });
        	 subres.on('end',function() {
//             	      console.log("json" + json);
	        
                    //var base64 = new Buffer(json).toString('base64');
//		    // res.send(data);
//		     var blobImg = new Blob([json],{type:'png'});
		     fs.writeFile('public/css/images/ListHeader.png',json,"binary",function(err){
			if(err) {
				console.log("Download failed");			
			}
			console.log("Download success");
		     }); 
        	 });	        
          });
          subreq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          subreq.end();

/*	pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/GlobalHumanResourcesCloud.png';
	var humanResourceReq = https.request(pic_computeCloud_options,function(subres){
		 subres.setEncoding("binary");
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
        	    //  console.log( json);
	         });
        	 subres.on('end',function() {
//             	      console.log("json" + json);
	        
                    //var base64 = new Buffer(json).toString('base64');
//		    // res.send(data);
//		     var blobImg = new Blob([json],{type:'png'});
		     fs.writeFile('public/css/images/GlobalHumanResourcesCloud.png',json,"binary",function(err){
			if(err) {
				console.log("Download failed");			
			}
			console.log("Download success");
		     }); 
        	 });	        
          });
          humanResourceReq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          humanResourceReq.end();

	pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/ApplicationContainerCloud.png';
	var containerResourceReq = https.request(pic_computeCloud_options,function(subres){
		 subres.setEncoding("binary");
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
        	    //  console.log( json);
	         });
        	 subres.on('end',function() {
//             	      console.log("json" + json);
	        
                    //var base64 = new Buffer(json).toString('base64');
//		    // res.send(data);
//		     var blobImg = new Blob([json],{type:'png'});
		     fs.writeFile('public/css/images/ApplicationContainerCloud.png',json,"binary",function(err){
			if(err) {
				console.log("Download failed");			
			}
			console.log("Download success");
		     }); 
        	 });	        
          });
          containerResourceReq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          containerResourceReq.end();

	pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/StorageCloud.png';
	var storageResourceReq = https.request(pic_computeCloud_options,function(subres){
		 subres.setEncoding("binary");
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
        	    //  console.log( json);
	         });
        	 subres.on('end',function() {
//             	      console.log("json" + json);
	        
                    //var base64 = new Buffer(json).toString('base64');
//		    // res.send(data);
//		     var blobImg = new Blob([json],{type:'png'});
		     fs.writeFile('public/css/images/StorageCloud.png',json,"binary",function(err){
			if(err) {
				console.log("Download failed");			
			}
			console.log("Download success");
		     }); 
        	 });	        
          });
          storageResourceReq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          storageResourceReq.end();*/

	 var listSubreq = https.request(list_options,function(subres){
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
              	     // console.log("data" + data);
	         });
        	 subres.on('end',function() {
             	    //  console.log("json" + json);
		     dataArray = eval(json);
		     
		     for (var i =0 ;i < dataArray.length; i++) {
			imageName = dataArray[i].name.split(' ').join('') + ".png";
			//pic_computeCloud_options.path = '/v1/Storage-gse00011010/JavaDayTokyo/';
          	     	downloadImg.downloadImg('/v1/Storage-gse00011010/JavaDayTokyo/',imageName);
		     }
	             res.send(json);
		   //  res.send(names);	             
			
        	 });
          });
          listSubreq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          listSubreq.end();


/*https.get(pic_computeCloud_options, function(subres){
//https://storageconsole.em2.oraclecloud.com/v1/Storage-gse00011010/JavaDayTokyo/ComputeCloud'
    var imgData = "";

    subres.setEncoding("binary"); 


   subres.on("data", function(chunk){
        imgData+=chunk;
    });

    subres.on("end", function(){
        fs.writeFile("./public/upload/downImg/logonew.png", imgData, "binary", function(err){
            if(err){
                console.log("down fail");
            }
            console.log("down success");
        });
	res.send(imgdata);		
    });

});*/


});


router.get('/javaDayTokyoNodejs/list/:type', function(req, res, next) {

	var list_type_options = {
		hostname:'javadaytokyo2accs-gse00011010.apaas.em3.oraclecloud.com',
	  //      port:443,
		path:'/javaDayTokyo-0.0.1-SNAPSHOT/javaDayTokyo/list/' + req.params.type,
		method:'GET'
	}
	 var subreq = https.request(list_type_options,function(subres){
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
              	      console.log("data" + data);
	         });
        	 subres.on('end',function() {
             	      console.log("json" + json);
	             res.send(json);
        	 });
          });
          subreq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          subreq.end();

});

router.get('/javaDayTokyoNodejs/service/:name', function(req, res, next) {

	console.log("filter key word of service name is " + querystring.escape(req.params.name));
	var list_type_options = {
		hostname:'javadaytokyo2accs-gse00011010.apaas.em3.oraclecloud.com',
	    //    port:443,
		path:'/javaDayTokyo-0.0.1-SNAPSHOT/javaDayTokyo/service/' + querystring.escape(req.params.name),
		method:'GET'
	}
	
	 var subreq = https.request(list_type_options,function(subres){
        	 var json='';
	         subres.on('data',function(data) {
        	      json+=data;
              	      console.log("data" + data);
	         });
        	 subres.on('end',function() {
             	      console.log("json" + json);
	             res.send(json);
        	 });
          });
          subreq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          subreq.end();

});

router.get('/javaDayTokyoNodejs/service/', function(req, res, next) {

       //onsole.log("filter key word of service name is " + querystring.escape(req.params.name));
        var list_type_options = {
                hostname:'javadaytokyo2accs-gse00011010.apaas.em3.oraclecloud.com',
            //    port:443,
                path:'/javaDayTokyo-0.0.1-SNAPSHOT/javaDayTokyo/list/',
                method:'GET'
        }
        console.log(list_type_options);
         var subreq = https.request(list_type_options,function(subres){
                 var json='';
                 subres.on('data',function(data) {
                      json+=data;
                      console.log("data" + data);
                 });
                 subres.on('end',function() {
                      console.log("json" + json);
                     res.send(json);
                 });
          });
          subreq.on('error',function(err){
               console.log("error" + err);
               res.send(err);
          });
          subreq.end();

});

module.exports = router;
