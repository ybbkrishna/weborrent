/*
 * type of output is string
 */
var _decodeString = function(str,index) {
	if(!index) {
		index=0;
	}
	var strlenLen =str.indexOf(":",index)-index;
	var strStart = parseInt(strlenLen) +index+1;
	var strlen = str.substring(index,strStart-1);
	var strlend = strStart+parseInt(strlen) +1;
	var decodedStr = str.substring(strStart,strlend-1);
	return [decodedStr,strlend-1];
};
/*
 * type of val is Integer
 */
var _decodeInteger = function(str,index) {
	if(!index) {
		index=0;
	}
	var intLen =str.indexOf("e",index);
	return [parseInt(str.substring(index+1,intLen)),intLen+1];
};
/*
 * type of list id List
 */
var _decodeList = function(str,index) {
	var decodedList = [];
	if(!index) {
		index=0;
	}
	var temp = index,bal=0;
	for(temp=index+1;temp<str.length;temp++) {
		var start = str.charAt(temp),val;
		if(start==="e") {
			temp++;
			break;
		}
		if(start.match(/\d/ig)) {
			val = _decodeString(str, temp);
			decodedList.push(val[0]);
			temp=val[1]-1;
			continue;
		}
		if(start==="i") {
			val = _decodeInteger(str, temp);
			decodedList.push(val[0]);
			temp=val[1]-1;
			continue;
		}
		else if(start==="l") {
			val = _decodeList(str, temp);
			decodedList.push(val[0]);
			temp=val[1]-1;
			continue;
		}
		else if(start==="d") {
			val = _decodeDictionary(str, temp);
			decodedList.push(val[0]);
			temp=val[1]-1;
			continue;
		}
		
	}
	return [decodedList,temp];
};
/*
 * type of obj Object Dictionary
 */
var _decodeDictionary = function(str,index) {
	var decodedDict = {};
	if(!index) {
		index=0;
	}
	var temp = index;
	for(temp=index+1;temp<str.length;temp++) {
		var start = str.charAt(temp),key,val;
		if(start==="e") {
			temp++;
			break;
		}
		if(start.match(/\d/ig)) {
			key = _decodeString(str, temp);
			temp=key[1];
			key = key[0];
			start = str.charAt(temp);
			if(start.match(/\d/ig)) {
				val = _decodeString(str, temp);
				decodedDict[key] = val[0];
				temp=val[1]-1;
				continue;
			}
			else if(start==="i") {
				val = _decodeInteger(str, temp);
				decodedDict[key] = val[0];
				temp=val[1]-1;
				continue;
			}
			else if(start==="l") {
				val = _decodeList(str, temp);
				decodedDict[key] = val[0];
				temp=val[1]-1;
				continue;
			}
			else if(start==="d") {
				val = _decodeDictionary(str, temp);
				decodedDict[key] = val[0];
				temp=val[1]-1;
				continue;
			}
		}
	}
	return [decodedDict,temp];
};
module.exports.decodeDictionary = _decodeDictionary;