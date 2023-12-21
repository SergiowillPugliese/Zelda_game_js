class Rooms {
    constructor(rooms) {
        this.rooms = rooms;
    }

    description() {
        return this.rooms.Description;
    }

    validDirection(direction) {
        if (this.rooms.Monster != 'None') {
            return
        }
    }

    monsterInRoom() {
        if (this.rooms.Monster != 'None') {
            return true;
        } else {
            return false;
        }
    }

    objectInRoom() {
        if (this.rooms.Objects.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}