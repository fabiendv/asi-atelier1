module.exports = class Game {
    constructor(id, first_player, second_player){
        this.id = id;
        this.first_player = first_player;
        this.second_player = second_player;
        this.first_player_cards = null;
        this.second_player_cards = null;
    }

    isReady() {
        if (this.first_user != null && this.second_user != null 
            && this.first_player_cards != null && this.second_player_cards != null){
            return true;
        }
        else{
            return false;
        }
    }

    start(){
        //lance la partie
    }
}
