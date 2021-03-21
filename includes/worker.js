/*
Workers factory script
Tasks
1) Allows to create multiple workers
2) Send them messages using method "postMessage"
3) Catches events with handler "onmessage"
*/
var Worker = (function(context){
	// Object for running processes
	var wshShell = new ActiveXObject('WScript.Shell'),
		// Process shell variables
		vars = wshShell.Environment("Process"),
		// current process connector
		connector = GetObject("script:file:includes\\shell.connector.wsc"),
		// Object for operations with file system
		fso	= new ActiveXObject('Scripting.FileSystemObject'),
		// Creating html document to use "setInterval" function
		document = new ActiveXObject('htmlfile'),
		// document parent window object (Used for JS setTimeout / setInterval functions)
		window = document.parentWindow,
		// workers storage
		workers = {}, i=0;
	// Check if JSON object loaded
	if(!JSON) throw new Error('JSON object not found');
	// Attaching event to connector
	connector.onmessage = function(connectorId, data){
		try {
			if(data) data = JSON.parse(data);
		} catch(e){
			throw new Error('Failed to parse data: ' + data)
		}
		if(typeof workers[connectorId].onmessage == 'function') workers[connectorId].onmessage.call(workers[connectorId], data);
	}
	
	// returning constructor function
	return function(fileName){
		// saving current context
		var context = this, id;
		// Checking if file exists
		if(!fso.FileExists(fileName)) throw new Error('File "' + fileName + '" not found');
		// Exporting function for sending messages
		this.postMessage = function(data){  
			return connector.postMessage(id, JSON.stringify(data));
		}
		// Exporting function for terminating worker
		this.terminate = function(){
			// wshExec.Terminate() raises an error
			GetObject('winmgmts:root\\cimv2').Get('Win32_Process.Handle=' + wshExec.ProcessID).Terminate();
		}
		// Saving host id to environment variable
		vars("host") = connector.id;
		// Adding worker index
		i++;
		// Building worker id
		id = connector.id + ':' + i;
		// Saving worker id to environment variable 
		vars("id") = id;
		// Starting script process
		var wshExec = wshShell.Exec('wscript "' + fileName + '"');
		// saving current worker to collection to use it in onmessage event
		workers[id] = context;
		// Starting timer for checking host process status
		var timer = window.setInterval(function(){
			if(wshExec.status == 1){
				window.clearInterval(timer);
				// raising event if process terminates
				if(typeof context.onterminate == 'function') context.onterminate.call(context,wshExec.ExitCode);
			}
		},100);
	}
})(this);
