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
    version: '1.18.2'
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
      dig()
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
  bot.chat('/polacz oneblock');
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
  if(block.name.includes('wart')|| block.name.includes('sponge')){
    bot.setQuickBarSlot(3)
    bot.dig(block)
    console.log(block.name)
  }
  
  if(block.name.includes('prismarine') || block.name.includes('obsidian')|| block.name.includes('magma') || block.name.includes('coral') || block.name.includes('ice') || block.name.includes('lantern') || block.name.includes('gold')){
    bot.tool.equipForBlock(block, {})
    bot.dig(block)
  }

  if(block.name.includes('chest') 
    || block.name.includes('plank') 
    || block.name.includes('log') 
    || block.name.includes('melon')
    || block.name.includes('clay')
    || block.name == ('sand')
    || block.name.includes('soul')
    || block.name.includes('dirt')
    || block.name.includes('grass')
    || block.name.includes('gravel')
    || block.name.includes('snow')
    || block.name.includes('stem')){
      bot.tool.equipForBlock(block, {})
      bot.dig(block)
      console.log(block.name)
      // bot.setQuickBarSlot(2)
  }
  setTimeout(legitMining, 500)
}

function crit(){
  block = bot.blockAtCursor(maxDistance=2)
  bot.swingArm()
  bot.dig(block)
  setTimeout(crit, 400)
}

async function dig() {
  if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
    const pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe'))[0];
    if (pickaxe) await bot.equip(pickaxe, 'hand');
    // if (!pickaxe) bot.quit();
  }

  const block = bot.blockAtCursor(4);
  if (!block) return setTimeout(() => dig(), 200);

  await bot.dig(block);
  dig();
}

function logInventory() {
  console.log('Bot Inventory:');
  for (const item of bot.inventory.slots) {
    if (item) {
      console.log(`${item.displayName} - ${item.count}`); 
    }
  }
}

startBot();