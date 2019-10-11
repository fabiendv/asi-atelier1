module.exports = class Game {
    constructor(id, first_player, second_player){
        this.id = id;
        this.first_player = first_player;
        this.second_player = second_player;
    }

    isReady() {
        if (this.first_user != null && this.second_user != null){
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
