import { Room } from "colyseus";
import { MatchRoomState } from "./schema/MatchRoomState";

// export default didnt work here but classic export did
export class MatchRoom extends Room<MatchRoomState> {

    onCreate(){
        // set initial room state
        this.setState(new MatchRoomState())
    }

}