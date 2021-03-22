# WSH-Worker 


| File name | Description |
|----:|:----|
|__config.js__                      | Configuration file                                                  |
|__main.cmd__			                  | Batch script for running main script                                |
|__main.wsf__			                  | Main script                                                         |
|__processor.wsf__			            | Worker script for generating images in frames                       |
|__includes\general.js__		        | Script with common functions used in main.wsf and processor.wsf     |
|__includes\shell.connector.wsc__   | Windows script object for passing data between processes            |
|__includes\json2.min.js__          | Minified version of json2.js. Library for working with JSON         |
|__includes\worker.js__		          | Workers factory script                                              |
|__includes\worker.core.js__		    | Worker core script                                                  |
