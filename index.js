const fs = require('fs');
const data = JSON.parse(fs.readFileSync(filename, 'utf8'));

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => {
        readline.question(query, resolve);
    });
}

async function main() {
    const playerName = await askQuestion('Inserisci il tuo nome: ');
    readline.close();
    console.log(`Ciao ${playerName}`);

    new Player(playerName);
}

main();
