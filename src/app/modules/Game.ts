import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Room } from './game.interface';
import { RoomController } from './RoomController';
import Player from './Player';

export class Game {
    rooms: Room[];
    currentRoom: Room | string;
    player: Player;
    roomDescription: string;

    constructor() { }

    startGame(playerName: string) {
        //creo l'array della mappa da rooms.json
        this.rooms = this.initMap();
        this.currentRoom = this.rooms[0];
        this.player = new Player(playerName, this.currentRoom);
        this.roomDescription = RoomController.roomDescription(this.currentRoom);
        return `
        Ciao ${this.player.playerName}, benvenuto nella tua nuova avventura!
        Sei appena entrato nel castello dove è imprigionata la principessa Zelda.
        Il tuo compito, è quello di liberarla e riportarla fuori dal castello.
        All' interno del castello ci sono dei mostri che dovranno essere uccisi per raggiungere la principessa.
        Per poterli uccidere, avrai bisogno di armi speciali che puoi trovare all'interno del castello. Corri, presto! La principessa ha bisogno di te!

        ${this.roomDescription}
        ${this.player.playerDescription()}
        `
    }

    gamePlay(command: string, value: string) {
        console.log(command, value);
        const commandMap = new Map<string, () => string | Room>(
            [
                ['look', () => this.player.look()],
                ['move', () => this.currentRoom = this.player.move(value, this.rooms)],
                ['pick', () => this.currentRoom = this.player.pick(value)],
                ['drop', () => this.currentRoom = this.player.drop(value)]
            ]
        );

        const commandFunction = commandMap.get(command);
        if (typeof commandFunction === 'function') {
            const result = commandFunction();
            if (this.player.alive) {
                if (typeof result === 'string') {
                    return result;
                }

                return result;
            } else {
                return "Game Over";
            }
        } else {
            console.log("Command not recognized:", command);
            return "Command not recognized";
        }
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