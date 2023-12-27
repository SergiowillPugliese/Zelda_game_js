export interface Player {
    playerName: string;
    inventory: string[];
    alive: boolean;
    lifePoints: number;
    position: Room;
    princess: boolean;
}

export interface Room {
    id: string;
    name: string;
    exits: Exit[];
    objects: string[];
    monster?: Monster;
    princess?: boolean;
}

export interface Monster {
    name: string;
    necessaryWeapon: string;
}

export interface Exit {
    destination: string;
    position: string;
    monster?: boolean;
}