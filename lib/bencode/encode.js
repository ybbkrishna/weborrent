/*
 * type of str is string
 */
var _encodeString = function(str) {
	var encodedStr = str.length + ":" + str;
	return encodedStr;
};
/*
 * type of val is Integer
 */
var _encodeInteger = function(val) {
	var encodedVar = "i" + val + "e";
	return encodedVar;
};
/*
 * type of list id List
 */
var _encodeList = function(list) {
	var encodedList = "l",i=0,temp;
	for(i=0;i<list.length;i++) {
		temp = list[i];
		if(typeof temp==="string") {
			encodedList+=_encodeString(temp);
		}
		else if(typeof temp==="number") {
			encodedList+=_encodeInteger(temp);
		}
		else if(temp instanceof Array) {
			encodedList += _encodeList(temp);
		}
		else {
			encodedList += _encodeDictionary(temp);
		}
	}
	encodedList+="e";
	return encodedList;
};
/*
 * type of obj Object Dictionary
 */
var _encodeDictionary = function(obj) {
	var encodedDictionary="d",temp,val;
	for(temp in obj) {
		val = obj[temp];
		if(typeof temp==="string") {
			encodedDictionary+=_encodeString(temp);
		}
		else if(typeof temp==="number") {
			encodedDictionary+=_encodeInteger(temp);
		}
		else if(temp instanceof Array) {
			encodedDictionary += _encodeList(temp);
		}
		else {
			encodedDictionary += _encodeDictionary(temp);
		}
		if(typeof val==="string") {
			encodedDictionary+=_encodeString(val);
		}
		else if(typeof val==="number") {
			encodedDictionary+=_encodeInteger(val);
		}
		else if(val instanceof Array) {
			encodedDictionary += _encodeList(val);
		}
		else {
			encodedDictionary += _encodeDictionary(val);
		}
	}
	encodedDictionary+="e";
	return encodedDictionary;
};