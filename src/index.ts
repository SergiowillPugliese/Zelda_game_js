import { Game } from "./app/modules/Game";
import * as readline from 'readline';
import { Room } from "./app/modules/game.interface";

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
    // playerName sarà un array di stringhe
    //const playerName = await askQuestion('Inserisci il tuo nome e cognome: ');
    const game = new Game();

    let gameInfo: Room | string = '';
    //gameInfo = game.startGame(`${playerName[0] + ' ' + playerName[1]}`);
    gameInfo = game.startGame(`Giovanni Rossi`);
    console.log(gameInfo);
    while (gameInfo !== 'Game Over') {
        // commands sarà un array di stringhe
        const commands = await askQuestion('Cosa vuoi fare? (scrivi "exit" per uscire): ');
        if (commands[0].toLowerCase() === 'exit') {
            console.log('Uscita dal gioco...');
            break;
        }

        // l'input e passa i comandi a gamePlay
        gameInfo = commands.length === 1 ? game.gamePlay(commands[0], '') : game.gamePlay(commands[0], commands[1]);
        //console.log(gameInfo);

        if (gameInfo === 'Game Over') {
            console.log('Il gioco è terminato!');
            break;
        }
    }
}

main();
