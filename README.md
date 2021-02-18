# WSH-Worker

- __config.js__                     - Configuration file
- __generate.cmd__			            - Batch script for running main script
- __generate.wsf__			            - Main script
- __processor.wsf__			            - Worker script for generating images in frames
- __includes\general.js__		        - Script with common functions used in generate.wsf and processor.wsf
- __includes\shell.connector.wsc__  - Windows script object for passing data between processes
- __includes\worker.js__		        - Workers factory script.
- __includes\worker.core.js__		    - Worker core script.
