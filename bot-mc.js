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
  });

  bot.on('message', (message) => {
    console.log(message.toAnsi());

    switch(true) {
      case messageText.includes('Znalazłeś'):
        resetReconnectInterval();
        break;
      
      case messageText.includes('papuga'):
        bot.chat('/tpa KujuVacFangu');
        break;

      case messageText.includes('ptoszek'):
        bot.chat('/tpa Chosnek1');
        break;

      case messageText.includes('cx'):
        cobbleX();
        break;
      
      case messageText.includes('close'):
        bot.end();
        break;
      
      case messageText.includes('sell'):
        bot.chat('/sell all');
        break;

      case messageText.includes('echo'):
        logInventory();
        break;
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
  bot.chat('/polacz skyblock');
}

function sendChatMessage(message) {
  bot.chat(message);
}

function cobbleX() {
  bot.chat('/sklep');

  setTimeout(() => {
    bot.clickWindow(10, 0, 0);

    setTimeout(() => {
      bot.clickWindow(11, 0, 0);

      setTimeout(() => {
        bot.clickWindow(25, 0, 0);

        setTimeout(() => {
          bot.clickWindow(31, 0, 0);

          setTimeout(() => {
            bot.chat('/cx');
            
            setTimeout(() => {
              bot.chat('/sell all');
              cobbleX();

            }, 1000);
          }, 1000); 
        }, 1000); 
      }, 1000); 
    }, 1000); 
  }, 1000); 

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