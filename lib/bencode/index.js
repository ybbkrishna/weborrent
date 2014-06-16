var encode = require('./encode.js');
var decode = require('./decode.js');
module.exports.encode = function(dict,cb) {
	var result;
	try {
		result = encode.encodeDictionary(dict);
	}
	catch(e) {
		cb(e);
	}
	cb(null,result);
};

module.exports.decode = function(str,cb) {
	console.log(str);
	var result;
	try {
		result = decode.decodeDictionary(str)[0];
	}
	catch(e) {
		cb(e);
	}
	cb(null,result);
};