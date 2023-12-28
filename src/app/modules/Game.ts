import * as fs from 'fs';
import { Room } from './Game.interface';
import { RoomController } from './RoomController';
import { Player } from './Player';
import chalk from 'chalk';

export class Game {
    rooms: Room[] = [];
    player!: Player;
    roomDescription!: string;

    constructor() { }

    startGame(playerName: string) {
        //creo l'array della mappa da rooms.json
        this.rooms = this.initMap();
        this.player = new Player(playerName, this.rooms[0]);
        this.roomDescription = RoomController.roomDescription(this.rooms[0]);
        return `
        ${chalk.yellow(this.roomDescription)}
        ${chalk.blue(this.player.playerDescription())}
        `
    }

    gamePlay(command: string, value: string) {
        console.log(command, value);
        const commandMap = new Map<string, () => string | Room>(
            [
                ['look', () => this.player.look()],
                ['move', () => this.player.move(value, this.rooms)],
                ['pick', () => this.player.pick(value)],
                ['drop', () => this.player.drop(value)],
                ['attack', () => this.player.attack()],
            ]
        );

        const commandFunction = commandMap.get(command);
        if (commandFunction) {
            const result = commandFunction();
            if (typeof result === 'string') {
                return result;
            }
            return RoomController.roomDescription(result) + this.player.playerDescription();
        } else {
            return `
        Comando non riconosciuto: ${command}.
        Puoi usare i comandi ${[...commandMap.keys()].join(', ')}.

            ${commandMap.get('look')?.()}
            `;
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