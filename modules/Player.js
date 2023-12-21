class Player {
    constructor(position) {
        this.inventory = [];  // Proprietà per l'inventario.
        this.position = position;  // Proprietà per la posizione.
    }

    move(direction) {
        const newRoom = rooms[this.position].Exits[direction];
        if (newRoom) {
            this.position = newRoom;
            console.log(`Ti sei spostato verso: ${newRoom}`);
        } else {
            console.log("Non puoi andare in quella direzione.");
        }
    }

    pick(item) {
        const roomItems = rooms[this.position].Objects;
        const itemIndex = roomItems.indexOf(item);
        if (itemIndex > -1) {
            this.inventory.push(item);
            roomItems.splice(itemIndex, 1);  // Rimuove l'oggetto dalla stanza.
            console.log(`Hai raccolto: ${item}`);
        } else {
            console.log("Oggetto non trovato nella stanza.");
        }
    }

    drop(item) {
        const itemIndex = this.inventory.indexOf(item);
        if (itemIndex > -1) {
            rooms[this.position].Objects.push(item);
            this.inventory.splice(itemIndex, 1);  // Rimuove l'oggetto dall'inventario.
            console.log(`Hai lasciato: ${item}`);
        } else {
            console.log("Non hai questo oggetto nell'inventario.");
        }
    }

    attack(monster) {
        const roomMonster = rooms[this.position].Monster;
        if (roomMonster === monster) {
            console.log(`Hai attaccato: ${monster}`);
        } else {
            console.log("Non ci sono mostri di questo tipo qui.");
        }
    }

    look() {
        const room = rooms[this.position];
        console.log(`Ti trovi in: ${this.position}. ${room.Description}`);
        if (room.Objects.length > 0) {
            console.log("Vedi gli oggetti: " + room.Objects.join(", "));
        }
        if (room.Monster !== "None") {
            console.log(`C'è un mostro qui: ${room.Monster}`);
        }
    }
}

module.exports = Player;
