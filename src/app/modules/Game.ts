import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Room } from './game.interface';
import { RoomController } from './RoomController';

export class Game {
    rooms: Room[];
    currentRoom: Room;
    roomController;

    constructor() { }

    startGame() {
        //creo l'array della mappa da rooms.json
        this.rooms = this.initMap();
        this.createRoom('room-1');
        this.roomController = new RoomController();
    }
    move(direction: string) {

    }

    createRoom(destination: string) {
        let index = this.rooms.findIndex(room => room.id === destination);
        this.currentRoom = this.rooms[index];
    }

    initMap(): Room[] {
        dotenv.config();
        const roomsDataPath = process.env.ROOMS_DATA_PATH;
        if (!roomsDataPath) {
            throw new Error("The ROOMS_DATA_PATH environment variable is not defined.");
        }

        const initMap = JSON.parse(fs.readFileSync(roomsDataPath, 'utf8'));
        return Object.keys(initMap).map(key => {
            return {
                id: key,
                ...initMap[key]
            };
        });
    }
}