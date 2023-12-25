import { Room } from './game.interface';
import { RoomController } from './RoomController';

class Player {
    playerName: string;
    inventory: string[] = [];
    alive: boolean = true;
    lifePoints: number = 2;
    position: Room;

    constructor(playerName: string, position: Room) {
        this.playerName = playerName;
        this.position = position
    }

    move(direction: string, rooms: Room[]) {
        const newPosition = RoomController.changeRoom(this.position, direction, rooms);
        if (typeof newPosition === 'string') {
            return newPosition;
        }
        this.position = newPosition;
        return newPosition;
    }

    playerDescription() {
        return `
        Hai ${this.inventory.length} oggetti nello zaino!
        I tuoi punti vita sono: ${this.lifePoints}
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
        return RoomController.roomDescription(this.position);
    }


}

export default Player;
