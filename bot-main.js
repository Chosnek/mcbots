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
    version: '1.18.2',
    auth: 'microsoft'
  });
  bot.loadPlugin(toolPlugin)
  bot.loadPlugin(tpsPlugin)

  bot.on('spawn', () => {
    setTimeout(login, 3000);
    setTimeout(polacz, 4000);
  });

  bot.on('message', (username, message, arg) => {
    console.log(message.toAnsi());

    if(username == bot.name){
      return
    }

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
      bot.chat('/tpa ChosnekGPT')
    }
    if(message.toString().includes('dT')){
      let block = bot.blockAtCursor(maxDistance=2)
      console.log(bot.digTime(block))
    }
    if(message.toString().includes(`swing `+ arg)){
      bot.setQuickBarSlot(arg)
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
  bot.chat('/login H@k00las1ka?');
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

startBot();