#!/bin/bash
#
#


gnome-terminal -e "bash -c \"cd ./reactJs;npm start; exec bash\"" & gnome-terminal -e "bash -c \"cd ./nodeJs/game;npm start; exec bash\"" & gnome-terminal -e "bash -c \"cd ./nodeJs/chat; npm start ; exec bash\"" 


