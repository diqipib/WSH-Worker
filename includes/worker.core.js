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
		// File System Object
		fso = new ActiveXObject('Scripting.FileSystemObject'),
		// Creating html document to use "setInterval" function and JSON object
		document = new ActiveXObject('htmlfile');
		var window = document.parentWindow;
	// Check if JSON object loaded
	if(!JSON) throw new Error('JSON object not found');
	// Receiving host connector id
	try {
		var hostConnectorId = fso.GetStandardStream(0).ReadLine();
	} catch(e){}
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
	
	// Sending back worker connector id
	try {
		fso.GetStandardStream(1).WriteLine(connector.id);
	} catch(e){}
	
	// Checking if host is still alive
	var timer = window.setInterval(function(){
		if(!connector.connect(hostConnectorId)){
			window.clearInterval(timer);
			if(typeof context.onhostterminate == 'function') context.onhostterminate();
		}
	},100);
})(this);
