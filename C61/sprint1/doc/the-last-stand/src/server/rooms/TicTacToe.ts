import { Room } from "colyseus";
import { TicTacToeState } from "./schema/TicTacToeState";


// export default didnt work here but classic export did
export class TicTacToe extends Room<TicTacToeState> {

    onCreate(){
        // set initial room state
        this.setState(new TicTacToeState())
    }

}