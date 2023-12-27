import * as fs from 'fs';
import { Room } from './game.interface';
import { RoomController } from './RoomController';
import { Player } from './Player';
import * as chalk from 'chalk';

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
        ${chalk.green('Ciao ' + this.player.playerName + ', benvenuto nella tua nuova avventura!')}
        
        ${chalk.yellow(this.roomDescription)}
        ${chalk.blue(this.player.playerDescription())}
        `
    }

    gamePlay(command: string, value: string) {
        console.log(command, value);
        const commandMap = new Map<string, () => string | Room>(
            [
                ['look', () => this.player.look()],
                ['move', () => this.currentRoom = this.player.move(value, this.rooms)],
                ['pick', () => this.currentRoom = this.player.pick(value)],
                ['drop', () => this.currentRoom = this.player.drop(value)],
                ['attack', () => this.currentRoom = this.player.attack()],
            ]
        );

        const commandFunction = commandMap.get(command);
        if (typeof commandFunction === 'function') {
            const result = commandFunction();
            if (this.player.alive) {
                if (typeof result === 'string') {
                    return result;
                }
                return RoomController.roomDescription(result) + this.player.playerDescription();
            } else {
                return result;
            }
        } else {
            return "Comando non riconosciuto: " + command;
        }
    }



    initMap(): Room[] {
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