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
		// current process connector
		connector = GetObject("script:file:includes\\shell.connector.wsc"),
		// Object for operations with file system
		fso	= new ActiveXObject('Scripting.FileSystemObject'),
		// Creating html document to use "setInterval" function
		document = new ActiveXObject('htmlfile');
		var window = document.parentWindow,
			workers = {};
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
		var context = this;
		// Checking if file exists
		if(!fso.FileExists(fileName)) throw new Error('File "' + fileName + '" not found');
		// Exporting function for sending messages
		this.postMessage = function(data){  
			return connector.postMessage(workerConnectorId, JSON.stringify(data));
		}
		// Exporting function for terminating worker
		this.terminate = function(){
			// wshExec.Terminate() raises an error
			if(wshExec.Status == 0) GetObject('winmgmts:root\\cimv2').Get('Win32_Process.Handle=' + wshExec.ProcessID).Terminate();
		}
		// Starting script process
		var wshExec = wshShell.Exec('wscript "' + fileName + '"');
		// Sending host connector id to worker process
		wshExec.StdIn.WriteLine(connector.id);
		// Receiving worker connector from worker process
		var workerConnectorId = wshExec.StdOut.ReadLine();
		// saving current worker to collection to use it in onmessage event
		workers[workerConnectorId] = context;
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
