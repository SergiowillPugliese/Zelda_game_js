import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Game } from "./app/modules/Game";
import * as readline from 'readline';
import { Room } from "./app/modules/Game.interface";

// Specifica che la funzione restituirà una Promise che risolve un array di stringhe
function askQuestion(query: string): Promise<string[]> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(query, (answer) => {
            rl.close();
            // Risolve con l'input diviso in parole
            resolve(answer.trim().split(/\s+/));
        });
    });
}

async function main() {
    const GREEN = "\x1b[32m";
    let validGame = true;
    // playerName sarà un array di stringhe
    const playerName = await askQuestion('Inserisci il tuo nome e cognome: ');
    const game = new Game();

    let gameInfo: Room | string = '';
    let startInfo = loadGameText('STARTGAME');
    gameInfo = game.startGame(`${playerName[0] + ' ' + playerName[1]}`);

    console.clear();
    console.log('Ciao ' + playerName[0] + ' ' + playerName[1] + ', benvenuto nella tua nuova avventura!');
    console.log(startInfo);
    console.log(gameInfo);
    while (validGame) {
        // commands sarà un array di stringhe
        const commands = await askQuestion('Cosa vuoi fare? (scrivi "exit" per uscire): ');
        if (commands[0].toLowerCase() === 'exit') {
            console.log('Uscita dal gioco...');
            break;
        }

        // l'input e passa i comandi a gamePlay
        gameInfo = commands.length === 1 ? game.gamePlay(commands[0], '') : game.gamePlay(commands[0], commands[1]);
        console.clear();

        if (gameInfo === 'ENDGAME' || gameInfo === 'WINGAME') {
            gameInfo = loadGameText(gameInfo);
            validGame = false;
        }

        console.log(gameInfo);
    }
}

function loadGameText(value: string) {
    dotenv.config();
    const text = process.env[value];
    if (!text) {
        throw new Error('Path not found');
    }
    try {
        return fs.readFileSync(text, 'utf8');
    } catch (err) {
        throw new Error(`Unable to read the file at ${text}`);
    }
}

main();
