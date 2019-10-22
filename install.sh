#!/bin/bash
#
#


gnome-terminal -e "bash -c \"cd frontEnd/reactjms/; npm install; exec bash; \"" & gnome-terminal -e "bash -c \"cd NodeJs;npm install; exec bash\"" & gnome-terminal -e "bash -c \"cd chat;npm install ; exec bash\"" 

   
  
