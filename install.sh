#!/bin/bash
#
#


gnome-terminal -e "bash -c \"cd ./reactJs; npm install; exec bash; \"" & gnome-terminal -e "bash -c \"cd ./nodeJs/game;npm install; exec bash\"" & gnome-terminal -e "bash -c \"cd ./nodeJs/chat;npm install ; exec bash\"" 

   
  
