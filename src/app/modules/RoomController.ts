import { Room } from "./game.interface";

export class RoomController {

    constructor() { }

    changeRoom(currentRoom: Room, direction: string) {

    }

    isMonsterBlocking(currentRoom: Room, direction: string) {

    }

    isValidDirection(currentRoom: Room, direction: string) {
        return currentRoom.exits.filter(exit => exit.destination.includes(direction));
    }

}