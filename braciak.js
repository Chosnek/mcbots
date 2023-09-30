const mineflayer = require('mineflayer')
const readline = require('readline')
const toolPlugin = require('mineflayer-tool').plugin

const pass = require('./vars.js')

let bot;

function startBot() {
    bot = mineflayer.createBot({
        host: 'tabmc.pl',
        port: 25565,
        username: 'ShovSwSys',
        version: '1.16'
    });

    bot.loadPlugin(toolPlugin)

    bot.on('spawn', () => {
    setTimeout(login, 3000);
    setTimeout(polacz, 4000)
})

bot.on('message', (message) => {
    console.log(message.toAnsi())

    if(message.toString().includes('kopaj')){
        legitMining()
    }
    if(message.toString().includes('echo2')){
        logInventory()
    }
    if(message.toString().includes('ptoszek')){
        bot.chat('/tpa Chosnek1')
    }
    if(message.toString().includes('swap')){
        bot.setQuickBarSlot(1)
    }
    if(message.toString().includes('sellall')){
        bot.chat('/sellall')
    }
    if(message.toString().includes('przyzwoitka')){
        przyzwoitka();
      }
});

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input) => {
    sendChatMessage(input);
  });
}

function login() {
    bot.chat('/login '+pass)
}

function polacz() {
    bot.chat('/polacz oneblock')
}

function sendChatMessage(message) { 
    bot.chat(message);
  }

function startMining() {
    let block = bot.blockAtCursor(maxDistance=3)
    bot.swingArm()
    if(block.name.includes('quartz')) bot.dig(block)
    setTimeout(startMining, 200)
}

function legitMining() {
    var block = bot.blockAtCursor(maxDistance=2)
  
    // bot.swingArm()

    // if(block.name.includes('chest') 
    // || block.name.includes('plank') 
    // || block.name.includes('log') 
    // || block.name.includes('melon')
    // || block.name.includes('clay')
    // || block.name == ('sand')
    // || block.name.includes('soul')
    // || block.name.includes('dirt')
    // || block.name.includes('grass')
    // || block.name.includes('gravel')
    // || block.name.includes('snow')
    // || block.name.includes('stem')){
    //   bot.tool.equipForBlock(block, {})
      bot.dig(block)
      console.log(block.name)
      // bot.setQuickBarSlot(2)
  
  setTimeout(legitMining, 1000)
}

function przyzwoitka() {
    bot.swingArm()
    block = bot.blockAtCursor(maxDistance = 2)
    bot.dig(block)
    setTimeout(przyzwoitka, 500)
}

function logInventory() {
    console.log('Ekwipunek Braciszka: ')
    for(let item of bot.inventory.slots){
        if (item) console.log(`${item.displayName} - ${item.count}`)
    }
}

startBot();