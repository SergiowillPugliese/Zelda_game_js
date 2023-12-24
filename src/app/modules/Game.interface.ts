export interface Player {
    playerName: string;
    inventory: string[];
    alive: boolean;
    lifePoints: number;
}

export interface Room {
    id: string;
    name: string;
    exits: Exit[];
    objects: string[];
    monter: string | Monster;
}

export interface Monster {
    name: string;
    necessaryWeapon: string;
}

export interface Exit {
    destination: string;
    position: string;
    monster?: boolean;
    princess?: boolean;
}