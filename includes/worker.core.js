/*
Worker core script.
Tasks:
1) Creates connection with host script 
2) Provides method "postMessage" for sending messages to host script
3) Provides event "onmessage" for getting data from host script
*/
(function(context){
	// Initializing connector
	var connector = GetObject("script:file:includes\\shell.connector.wsc"),
		// Shell object. Used for reading process environment variables
		wshShell = new ActiveXObject('WScript.Shell'),
		// Process shell variables used for current process
		vars = wshShell.Environment('Process'),
		// Creating html document to use "setInterval" function and JSON object
		document = new ActiveXObject('htmlfile'),
		// document parent window object (Used for JS setTimeout / setInterval functions)
		window = document.parentWindow;
	// Check if JSON object loaded
	if(!JSON) throw new Error('JSON object not found');
	// Receiving host connector id
	hostConnectorId = vars("host");
	// Setting connector id
	connector.id = vars("id");
	// External method for sending message to parent process
	connector.onmessage = function(id,data){
		try {
			if(data) data = JSON.parse(data);
		} catch(e){
			throw new Error('Failed to parse data: ' + data);
		}
		// Raising onmessage event
		if(typeof context.onmessage == 'function') context.onmessage(data);
	}
	// External method for sending messages to parent process
	postMessage = function(data){
		// Sending message to host connector
		return connector.postMessage(hostConnectorId, JSON.stringify(data))
	}
	// Checking if host is still alive
	var timer = window.setInterval(function(){
		if(!connector.connect(hostConnectorId)){
			window.clearInterval(timer);
			if(typeof context.onhostterminate == 'function') context.onhostterminate();
		}
	},100);
})(this);
