import { Room } from "./Game.interface";
import * as fs from 'fs';
import chalk from 'chalk';

export class RoomController {

    constructor() { }

    //cambia stanza
    static changeRoom(currentRoom: Room, direction: string, rooms: Room[]) {
        let newDestination = currentRoom.exits.find(e => e.position.includes(direction));
        if (this.isValidDirection(currentRoom, direction) && !this.isMonsterBlocking(currentRoom, direction)) {
            if (newDestination?.destination.includes('exit')) {
                return "exit";
            }
            let index = rooms.findIndex(room => room.id === newDestination?.destination);
            return rooms[index];
        } else {
            return "Non puoi andare qui!";
        }
    }
    //verifica se la direzione esiste e se è bloccata da un mostro
    static isMonsterBlocking(currentRoom: Room, direction: string) {
        return currentRoom.exits.some(exit => exit.position.includes(direction) && exit.monster);
    }

    //verifica se la direzione esiste
    static isValidDirection(currentRoom: Room, direction: string): boolean {
        return currentRoom.exits.some(exit => exit.position.includes(direction));
    }

    //verifica se l'oggetto è nella stanza
    static isValidItem(currentRoom: Room, item: string): boolean {
        return currentRoom.objects.includes(item);
    }

    //rimuove l'oggetto dalla stanza
    static deleteItem(currentRoom: Room, item: string) {
        if (!this.isValidItem(currentRoom, item)) {
            return "Oggetto non presente nella stanza";
        }
        const editCurrentRoom = currentRoom;
        const index = editCurrentRoom.objects.indexOf(item);
        if (index > -1) {
            editCurrentRoom.objects.splice(index, 1);
        }
        return editCurrentRoom;
    }

    //verifica se la stanza ha spazio
    static isPossibleToDrop(currentRoom: Room, item: string): boolean {
        return (currentRoom.objects.length < 5) ? true : false;
    }

    //aggiunge l'oggetto nella stanza
    static dropItemInRoom(currentRoom: Room, item: string) {
        if (!this.isPossibleToDrop(currentRoom, item)) {
            return "Stanza piena";
        }
        const editCurrentRoom = currentRoom;
        editCurrentRoom.objects.push(item);
        return editCurrentRoom;
    }

    //ritorna la descrizione della stanza
    static roomDescription(currentRoom: Room) {
        const roomIdVar = `${currentRoom.id.toUpperCase().replace('-', '_')}`;
        const roomDescriptionPath = process.env[roomIdVar];
        let desc = '';
        if (!roomDescriptionPath) {
            throw new Error(`Path not found for room ${currentRoom.id}`);
        }

        try {
            const data = fs.readFileSync(roomDescriptionPath, 'utf8');
            desc = data;
        } catch (err) {
            throw new Error(`Unable to read the file at ${roomDescriptionPath}`);
        }

        return `
                ${chalk.yellow(desc)}
        
        ${(currentRoom.objects.length) ? 'Oggetti nella stanza: ' + chalk.green(currentRoom.objects.join(', ')) : chalk.green('Non ci sono Oggetti a terra')}
        ${(currentRoom.monster)
                ?
                `Il tuo nemico è ${chalk.red(currentRoom.monster.name.slice(0, 1).toUpperCase() + currentRoom.monster.name.slice(1))}`
                :
                chalk.green('Non ci sono mostri')} 
        `

    }



}