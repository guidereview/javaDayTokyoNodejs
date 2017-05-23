var https = require('https');
var fs = require('fs');
exports.downloadImg = function(path,imageName) {
	var pic_computeCloud_options = {
	//	host:'storageconsole.em2.oraclecloud.com',
		host:'gse00011010.storage.oraclecloud.com',	
	//        port:8081,
	//        path:'/v1/Storage-gse00011010/JavaDayTokyo/ListHeader.png',
		method:'GET',
		auth:'cloud.admin:yOung@9LuCk',
		headers:{'X-Auth-Token':'AUTH_tk170e6bd74e7d06e0eb7d3b81f4e895da'}
	}

	pic_computeCloud_options.path = path + imageName;
	var resourceReq = https.request(pic_computeCloud_options,function(subres){
		 subres.setEncoding("binary");
		 var json='';
		 subres.on('data',function(data) {
		      json+=data;
		    //  console.log( json);
		 });
		 subres.on('end',function() {
//             	      console.log("json" + json);
		     fs.writeFile('public/css/images/' + imageName,json,"binary",function(err){
			if(err) {
				console.log("Download failed");			
			}
			console.log("Download success " + imageName);
		     });
		 });	        
	  });
	  resourceReq.on('error',function(err){
	       console.log("error" + err);
	       downloadImg(path,imageName);
	  });
	  resourceReq.end();

}

