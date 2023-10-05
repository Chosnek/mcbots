const mineflayer = require('mineflayer');
const toolPlugin = require('mineflayer-tool').plugin
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const readline = require('readline');


let bot;

function startBot() {
  bot = mineflayer.createBot({
    host: 'tabmc.pl',
    port: 25565,
    username: 'Chosnek1',
    version: '1.20.1',
    auth: 'microsoft'
  });
  bot.loadPlugin(toolPlugin)
  bot.loadPlugin(tpsPlugin)

  bot.on('spawn', () => {
    setTimeout(login, 3000);
    setTimeout(polacz, 4000);
  });

  bot.on('message', (message) => {
    console.log(message.toAnsi());
    if(message.toString().includes('echo')){
      logInventory();
    }
    if(message.toString().includes('tps')){
      console.log(`Tps'y: ` + bot.getTps())
    }
    if(message.toString().includes('sellall')){
      bot.chat('/sellall')
    }
    if(message.toString().includes('dT')){
      let block = bot.blockAtCursor(maxDistance=2)
      console.log(bot.digTime(block))
    }
    if(message.toString().includes('recall')){
      bot.chat('/home')
    }
    if(message.toString().includes('cxGo')){
      cobbleX();
    }
    if(message.toString().includes('kopuj')){
      startMining();
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
  bot.chat('/login H@k00las1ka?');
}

function polacz() {
  bot.chat('/polacz genblock');
}

function sendChatMessage(message) { 
  bot.chat(message);
}



function crit(){
  block = bot.blockAtCursor(maxDistance=2)
  bot.tool.equipForBlock(block, {})
  if(block) bot.dig(block)
  setTimeout(crit, 800)
}

function logInventory() {
  console.log('Bot Inventory:');
  for (const item of bot.inventory.slots) {
    if (item) {
      console.log(`${item.displayName} - ${item.count}`);
    }
  }
}
function startMining() {
  var block = bot.blockAtCursor(maxDistance = 2)
  if(block.name.includes('ancient') || block.name.includes('glazed') || block.name.includes('ore'))bot.dig(block)
  setTimeout(startMining,1000)
}

startBot();