const mineflayer = require('mineflayer');
const toolPlugin = require('mineflayer-tool').plugin
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const readline = require('readline');
const pass = require('./vars.js')
// import {readfile} from 'fs/promises';

let bot;
let reconnectInterval;

function startBot() {
  bot = mineflayer.createBot({
    host: 'tabmc.pl',
    port: 25565,
    username: 'ChosnekGPT',
    version: '1.20.1'
  });
  bot.loadPlugin(toolPlugin)
  bot.loadPlugin(tpsPlugin)

  bot.on('spawn', () => {
    setTimeout(login, 3000);
    setTimeout(polacz, 4000);
  });

  bot.on('message', (message) => {
    console.log(message.toAnsi());

    if(message.toString().includes('kopuj')){
      startMining();
    }
    if(message.toString().includes('echo')){
      logInventory();
    }
    if(message.toString().includes('zaprzestaj')){
      bot.stopDigging();
    }
    if(message.toString().includes('tps')){
      console.log(`Tps'y: ` + bot.getTps())
    }
    if(message.toString().includes('sellall')){
      bot.chat('/sellall')
    }
    if(message.toString().includes('papuga')){
      bot.chat('/tpa Chosnek1')
    }
    if(message.toString().includes('dT')){
      let block = bot.blockAtCursor(maxDistance=2)
      console.log(bot.digTime(block))
    }
    if(message.toString().includes(`swing`)){
      bot.setQuickBarSlot(1)
    }
    if(message.toString().includes('noAdm')){
      legitMining();
    }
    if(message.toString().includes('CRIT')){
      crit()
    }
    if(message.toString().includes('recall')){
      bot.chat('/home')
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
  bot.chat('/polacz genblock');
}

function sendChatMessage(message) { 
  bot.chat(message);
}

function startMining() {
  const block = bot.blockAtCursor(maxDistance=2)
  // bot.tool.equipForBlock(block, {})
  bot.swingArm()

  if(block.name=='null'){
    setTimeout(1000)
    return
  }

  if(block.name.includes('chest') || block.name.includes('plank') || block.name.includes('log') || block.name.includes('melon' || block.name.includes('sea'))){
    bot.dig(block)
  }
  
  setTimeout(startMining, 450)
}

function legitMining() {
  var block = bot.blockAtCursor(maxDistance=2)

  bot.swingArm()

  if(!block) setTimeout(startMining, 500)
  bot.tool.equipForBlock(block, {})
  bot.dig(block)
  setTimeout(legitMining, 500)
}

function crit(){
  block = bot.blockAtCursor(maxDistance=2)
  bot.swingArm()
  bot.dig(block)
  setTimeout(crit, 400)
}

function logInventory() {
  console.log('Bot Inventory:');
  for (const item of bot.inventory.slots) {
    if (item) {
      console.log(`${item.displayName} - ${item.count}`); 
    }
  }
}

function genMining() {
  block = bot.blockAtCursor(maxDistance = 2)
  bot.findBlocks(matching(block=='minecraft:diamond_ore'))
  
}

startBot();