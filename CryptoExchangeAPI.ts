
var BinanceAPI = require('./binance/binanceAPI.js');

// -----------------  Binance  -----------------//


const sleep2 = ms => new Promise(resolve => setTimeout(resolve, ms))

var binanceApiKeyClient = '';
var binanceSecretKeyClient = '';

var Binance = new BinanceAPI(binanceApiKeyClient, binanceSecretKeyClient);

callInventoryBitfinex();
async function callInventoryBitfinex() {
    // var binanceDeposit = await Binance.get_deposite_history();
    // console.log("deposit: ");
    // console.log(binanceDeposit);
    // var binanceWithDrawal = await Binance.get_withdraw_history();
    // console.log("withdrawal: ");
    // console.log(binanceWithDrawal);
    var all_symbols_array = await Binance.getAllSymbols();
    console.log("symbols: ", all_symbols_array);
    
    await sleep2(60000);
    var binanceTrades = await Binance.getAllTrades(all_symbols_array);
    console.log("trades: ");
    console.log(binanceTrades);
}
