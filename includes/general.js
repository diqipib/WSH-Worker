// Function for getting random item from array
function getRandomItem(array){
	return array[getRandomInt(0,array.length)]
}

// Function for generating int random between min and max
function getRandomInt(min, max, includeMax) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Encoder object
var encoder = (function(){
	var doc = new ActiveXObject('MSXML2.DOMDocument'),
		e = doc.createElement("e");

	return {
		// Function for encoding data
		encode: function(dataType, data){
			e.dataType			= dataType;
			e.nodeTypedValue	= data;
			return e.text;
		},
		// Function for decoding data
		decode: function(dataType, data){
			e.dataType	= dataType;
			e.text		= data;
			return e.nodeTypedValue;
		}
	}
})();