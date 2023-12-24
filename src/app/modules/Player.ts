import * as fs from 'fs';

class Player {
    playerName: string;
    inventory: string[] = [];
    alive: boolean = true;
    lifePoints: number = 2;
    constructor(playerName) {
        this.playerName = playerName;
    }

    pick(item: string) {
        this.inventory.push(item);
        return `Hai raccolto: ${item}!`;
    }

    drop(item: string) {
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
            return `Hai rimosso: ${item}!`;
        }
    }

    inventoryStatus() {
        if (this.inventory.length > 0) {
            return this.inventory;
        }
        return 'Hai un inventario vuoto!';
    }

    look(currentRoom) {
        return fs.readFileSync(`../data/textFiles/roomDescriptions/${currentRoom.id}.txt`, 'utf8')
    }


}

export default Player;
