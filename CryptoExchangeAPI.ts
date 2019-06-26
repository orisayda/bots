// import * as fs from 'fs';
// var readline = require('readline');
// const crypt = require('crypto');
var BittrexAPI = require('./bittrex/bittrexAPI');
var bitfinex = require('./bitfinex/bitfinexAPI.js');
var PoloniexAPI = require('./poloniex/poloniexAPI.js');
var BitstampAPI = require('./bitstamp/bitstamp.js');
var BinanceAPI = require('./binance/binanceAPI.js');
var KrakenAPI = require('./kraken/kraken.js');
var bit2c = require('./bit2c/bit2cAPI.js');
var okex = require('./okex/oKexAPI.js');




// class CryptoExchangeAPI {
//   private api_key;
//   private secret_key;
//   private exchange;
//   private thirdParam;
//   private exchangeObject;


//   constructor(api_key, secret, exchange, third) {
//     this.api_key = api_key;
//     this.secret_key = secret;
//     this.exchange = exchange;
//     this.thirdParam = third;
//     this.whatToInit();
//   }

//   whatToInit () {
//     switch (this.exchange) {
//       case "BITTREX":
//         this.exchangeObject = new BittrexAPI(this.api_key, this.secret_key, 'https://api.bittrex.com/api/v1.1');
//         break;
//       // case "BITFINEX":
//       //   this.exchangeObject = new bitfinexAPI(this.api_key, this.secret_key,'https://api.bitfinex.com');
//       //   break;
//       case "POLONIEX":
//         this.exchangeObject = new PoloniexAPI(this.api_key, this.secret_key);
//         break;
//       case "BITSTAMP": 
//         this.exchangeObject = new BitstampAPI(this.api_key, this.secret_key,this.thirdParam);
//         break;
//       case "BINANCE":
//         this.exchangeObject = new BinanceAPI(this.api_key, this.secret_key);
//         break;
//       case "KRAKEN":
//         this.exchangeObject = new KrakenAPI(this.api_key, this.secret_key);
//         break;
//       case "BIT2C":
//         this.exchangeObject = new bit2cAPI(this.api_key, this.secret_key);
//         break;
//       case "OKEX":
//         this.exchangeObject = new okexAPI(this.api_key, this.secret_key);
//         break;
//       default:
//         console.error("We don't support this exchange!");
//         break;
//     }
//   }

//  /**
//   * getInventoryBalance
//   */
//  public async getInventoryBalance(timeStamp) {
//   return await this.exchangeObject.getInventoryBalance(timeStamp);
//  } 

//  public async getDepositHistory() {
//    return await this.exchangeObject.getDepositHistory();
//  }

//  public async getWithdrawalHistory() {
//   return await this.exchangeObject.getWithdrawalHistory();
// }

// public async getTradeHistory() {
//   return await this.exchangeObject.getTradeHistory();
// }

// }

// -----------------  Bittrex  ----------------//

// const apiK = 'd5c94092cebf4983b3839d17d75270ff';
// const sK = '9f6da54759e94483a29afe07396d8b03';
// const GAIPK = 'c0e0aa3526e54cec8f3bfa8f2facdd03';
// const GSK = '2b3f1d0f811d4b5cbdf3b9a6438367e0';

// var bittrex = new BittrexAPI(GAIPK, GSK, 'https://api.bittrex.com/api/v1.1');

// callInventory();
// async function callInventory() {
//     console.log(await bittrex.getInventoryBalance(1551711045000));
// }


// -----------------  Bitfinex  ----------------//



// var bitfinexApiKey = '5QJlGBL3RPNj9JqmhhS14Rjx8I1bn5Ha5XctqTqfnfk';
// var bitfinexSecretKey = 'eLW4jUwvKvwjgPJ8keOQ4gTKoG0l5B2R5MrDXmYwlFz';

// var bitfinexApiKeyClient = '7MGsiSazhAVfI0vZgnTW9svnaCB1lWHiWI2vqDi5MSK';
// var bitfinexSecretKeyClient = 'Ob5eq7YiEFDjycI3Du5920qLAq10R6GAG8nV7PmpFya';


// var BitfinexAPI = new bitfinex(bitfinexApiKeyClient, bitfinexSecretKeyClient, 'https://api.bitfinex.com');

// callInventoryBitfinex();
// async function callInventoryBitfinex() {
    // var bitfinexDeposit = await BitfinexAPI.getDepositHistory();
    // console.log("deposit: ");
    // console.log(bitfinexDeposit);
    // var bitfinexWithDrawal = await BitfinexAPI.getWithdrawalHistory();
    // console.log("withdrawal: ");
    // console.log(bitfinexWithDrawal);
    // var bitfinexTrades = await BitfinexAPI.getTradeHistory();
    
    
    // console.log("trades: ");
    // console.log(bitfinexTrades);
//}


//var x = bitfinex.getAccountInfo('/v1/account_infos');

// -----------------  Poloniex  ----------------//

// 

// var aliApiKeyPoloniex = 'G14MTBNH-YDMENLXY-RYFY9BL9-LSL9TVY0';
// var aliSecertPoloniex = 'b7f08d919b99c60d57bccf36b805520f8bc10e85bd6111935f093356cff846ea7baaf8e7b67f6fb70d79807707c1a7a9089bd8bfc8b236ee7a349647a0f80085';
// var gidiApiKeyPoloniex = 'L19A7KRU-83V6HNZT-P93L1E9Y-7O2QCYKN';
// var gidiSecertPoloniex = '7b1811150fa4c6cbd599c578736427a8189ef907949e1a6cfce6e22d92aaa4f5a791984792405eca91b4de4a93fb0e85e3b50b9c77a9ad0f944525f9183143d3';

// var poloniex = new PoloniexAPI(gidiApiKeyPoloniex,gidiSecertPoloniex)
// callInventoryPoloniex();
// async function callInventoryPoloniex() {
//   var json = await poloniex.getInventoryBalance('1552483740');
//   console.log(json);
// }


// -----------------  Bitstamp  ----------------//

// 

// var gidiApiKeyBitstamp = 'jKEgqTLNyZKWqr7Aik4tBvGxsQlFqXsp';
// var gidiSecertBitstamp = 'P4ey7U0Rb1CutLLiIe5jn0dEHMZlFbah';
// var gidiClientIdBitstamp = 'cwiv9705';

// var Bitstamp = new BitstampAPI(gidiApiKeyBitstamp,gidiSecertBitstamp,gidiClientIdBitstamp);
// callInventoryPoloniex();
// async function callInventoryPoloniex() {
//   var json = await Bitstamp.getInventoryBalance('1552320835');
//   console.log(json);

// }


// -----------------  Binance  -----------------//


const sleep2 = ms => new Promise(resolve => setTimeout(resolve, ms))
// const apikey = 'hlNMHGbWS686FNKoafTE3obedm4awIz97763azTWmpSTavxjXVHqCciLAHbX2FSi';
// const SK = 'Fqsno6B2BSNfoc9k6wDUgllnyPGsI4A9gl6lk1U6JubEfBXzsFjePMw2W24bm2NI';
const apiKey2 = 'RbJFmQ4qmvrEm1sjxgzc1RHbE2rD2E8Sx8vyjQYqACXxWOhNsOzHDegSxFGhoPbr';
const SK2 = 'fyK4zPPU0cLPhs1YVOlz87VgAbQrGthqo67DL9trRZh52KECy2PSIJPdoAqThBhI';

var binanceApiKeyClient = 'NEl318QBSkfs38RYM87xoePBWuMT5GzQ0GEldziJRzIMCdmCVrrEkCDMCZCGxcfz';
var binanceSecretKeyClient = 'ti9aOBt1RXCuBIMHQvSv3nGR4mbDZmA0476BoG7cNsdQPkqKFhtdhqne8WBq0kjg';

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


// callInventoryBinance();
//  async function callInventoryBinance() {
//   console.log(await Binance.getInventoryBalance('1552820782'));


//  }

// -----------------  Kraken  -----------------//

// 

// const gidiKrakenApiKey = 'u+97I4rtcJCfLjHTGIhnlOX+3qSidD31IMUvHG4v7Cs4EWofKE5PZ6bp';
// const gidiKrakenSecret = 'oJL1xFGe/cSyhff7XA/6WYkwG4T4eq2WhbKH/GbqU9IqrUBveoEOisGf3mqxT9K4C3hebBPkI8nv8AfyVBE2Xg==';

// var kraken = new KrakenAPI(gidiKrakenApiKey,gidiKrakenSecret);


// callInventoryBinance();
//  async function callInventoryBinance() {
//   //console.log(await kraken._getDepositsAssets());


//  }

// -----------------  bit2c  -----------------//

// 

// const guybit2cApiKey = 'f5aa734f-bf7f-4d84-8e0f-0118b0917a79';
// const guybit2cSecret = '7F505F1B71B95CCB3AACB88E34AE85A400D111A6586B08BFF48E50B76652EB49';
// const oribit2cAPIkey = 'b54edf9c-14ba-4145-a94c-fe202e80f000';
// const oribit2cSecret = 'A5FC0CFD01E910A6C5291AD743AA82F8ED4FFED951ACBB8CE58E736F25FBCB0A';
// var bit2c = new bit2cAPI(guybit2cApiKey,guybit2cSecret);


// callInventorybit2c();
//  async function callInventorybit2c() {
//     console.log("Trades: ");
//     console.log(await bit2c._getAllTrades());
//     console.log("Balances: ");
//     console.log(await bit2c.getBalances());
//  }

// -----------------  okex  -----------------//



// const okexApiKey = 'd9484db1-f603-4c03-95e1-43a52aae8503';
// const okexSecret = '6308BFC0D7BA32E483FFB32C5B40F233';
// const gidiOkexApiKey = '9acdbd8c-64af-4f82-b38f-8331a17519ad';
// const gidiOkexSecret = '8E7256F7F56371A04BA1F1B597277468';
// // const oribit2cAPIkey = 'b54edf9c-14ba-4145-a94c-fe202e80f000';
// // const oribit2cSecret = 'A5FC0CFD01E910A6C5291AD743AA82F8ED4FFED951ACBB8CE58E736F25FBCB0A';
//  var okex = new okexAPI(gidiOkexApiKey,gidiOkexSecret);



// callInventoryOkex();
//  async function callInventoryOkex() {
//    // await okex.getMarkets();
//     await okex.getBalance();
//     await okex.getOrders();
//     await okex.getDeposits();
//     await okex.getWithdrawal();
//     await okex.getMarkets();
//  }


// -----------  From Object to excel ------------- //

//var binanceAPI = require('./binanceAPI.js');









