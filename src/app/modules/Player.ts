import * as chalk from 'chalk';
import { Room } from './game.interface';
import { RoomController } from './RoomController';

export class Player {
    playerName: string;
    inventory: string[] = [];
    alive: boolean = true;
    position: Room;
    princess = false;

    constructor(playerName: string, position: Room) {
        this.playerName = playerName;
        this.position = position
    }

    move(direction: string, rooms: Room[]) {
        const newPosition = RoomController.changeRoom(this.position, direction, rooms);
        if (typeof newPosition === 'string') {
            if (newPosition === 'exit' && !this.princess) {
                return `
        Uscendo dal castello, ti rendi conto che la principessa non è con te.
        Torni dentro al castello non sapendo cosa ti sia preso e più determinato di prima.

                ${chalk.yellow(RoomController.roomDescription(this.position))}
                `;
            } else {
                return 'WINGAME'
            }
        }
        this.position = newPosition;
        if (this.position.princess) {
            this.princess = true;
        }
        return newPosition;
    }

    playerDescription() {
        return `
        Hai ${this.inventory.length} oggetti nello zaino!
        ${this.inventory.length > 0 ? 'I tuoi oggetti sono: ' + this.inventoryStatus() : this.inventoryStatus()} 
        Ecco la tua posizione: ${this.position.name}
        `
    }

    pick(item: string) {
        const editValue = RoomController.deleteItem(this.position, item);
        if (typeof editValue === 'string') {
            return editValue;
        }
        this.position = editValue;
        this.inventory.push(item);
        console.log(`Hai raccolto: ${item}!`);
        return editValue;
    }

    drop(item: string) {
        const editValue = RoomController.dropItemInRoom(this.position, item);
        if (typeof editValue === 'string') {
            return editValue;
        }
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.position = editValue;
            this.inventory.splice(index, 1);
        }
        console.log(`Hai rimosso: ${item}!`);
        return editValue;
    }

    inventoryStatus() {
        if (this.inventory.length > 0) {
            return this.inventory;
        }
        return 'Hai un inventario vuoto!';
    }

    look() {
        return RoomController.roomDescription(this.position) + this.playerDescription();
    }

    attack() {
        if (this.position.monster) {
            if (this.position.monster.name === 'medusa' && this.inventory.includes('magicshield')) {
                this.position.exits.forEach(exit => {
                    if (exit.monster) {
                        exit.monster = false;
                    }
                })
                delete this.position.monster;

                return this.position;
            } else if (this.position.monster.name === 'dracula' && this.inventory.includes('pugnale')) {
                this.position.exits.forEach(exit => {
                    if (exit.monster) {
                        exit.monster = false;
                    }
                })
                delete this.position.monster;

                return this.position;
            } else {
                this.alive = false;
                return "ENDGAME";
            }

        } else {
            return 'Non hai nemici nella stanza';
        }

    }
}
