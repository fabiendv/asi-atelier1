#!/bin/bash
#
#


gnome-terminal -e "bash -c \"cd frontEnd/reactjs/;npm start; exec bash\"" & gnome-terminal -e "bash -c \"cd NodeJs;npm start; exec bash\"" & gnome-terminal -e "bash -c \"cd chat ; npm start ; exec bash\"" 


