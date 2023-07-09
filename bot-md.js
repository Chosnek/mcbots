const mineflayer = require('mineflayer');
const readline = require('readline');
const pass = require('./vars.js');

let bot;
let reconnectInterval;

function startBot() {
  bot = mineflayer.createBot({
    host: 'tabmc.pl',
    port: 25565,
    username: 'ChosnekGPT',
    version: '1.16'
  });

  bot.on('spawn', () => {
    setTimeout(login, 3000);
    setTimeout(polacz, 4000);
    // mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  });

  bot.on('message', (message) => {
    console.log(message.toAnsi());

    if (message.toString().includes('Znalazłeś')) {
      resetReconnectInterval();
    }

    if (message.toString().includes('ptoszek')) {
      bot.chat('/tpa Chosnek1');
    }

    if (message.toString().includes('papuga')) {
      bot.chat('/tpa KujuVacFangu')
    }
    
    if (message.toString().includes('close')){
      bot.end();
    }
    
    if (message.toString().includes('echo')){
      logInventory();
    }
    
    // if (message.toString().includes('drop')) {
    //   dropItem();
    // }

    if (message.toString().includes('sellnij')) {
      sell();
    }

    if (message.toString().includes('afkuj')){
        afk();
    }
  });

  bot.on('end', () => {
    console.log('Bot został rozłączony.');
    reconnect();
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    sendChatMessage(input);
  });
}

function reconnect() {
  clearInterval(reconnectInterval);
  console.log('Próba ponownego połączenia...');
  startBot();
}

function resetReconnectInterval() {
  clearInterval(reconnectInterval);
  reconnectInterval = setInterval(reconnect, 120000); // 2 minuty
}

function login() {
  bot.chat('/login '+ pass);
}

function polacz() {
  bot.chat('/polacz megadrop');
}

function sell() {
    bot.chat('/sellallperly');
}

function afk() {
    bot.chat('/afk');
    setTimeout(() => {
        sell();
        setTimeout(() => {
            bot.chat('/repair all');
            setTimeout(() =>{
                startMining();
                afk();
            }, 500);
        }, 500);
    }, 500);
}

function startMining() {
    bot.activateBlock(bot.blockAt(bot.entity.position), false); // Activate the block (hold left mouse button)
  }
  function stopMining() {
    bot.deactivateBlock(); // Deactivate the block (release left mouse button)
  }

function sendChatMessage(message) {
  bot.chat(message);
}
function logInventory() {
  console.log('Bot Inventory:');
  for (const item of bot.inventory.slots) {
    if (item) {
      console.log(`${item.displayName} - Count: ${item.count}`);
    }
  }
}


startBot();