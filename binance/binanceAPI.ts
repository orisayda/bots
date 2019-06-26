var array = require('lodash/array');
const binanceAPI = require('binance');


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class BinanceCryptoAPI {
  public all_symbols_array;
  private all_deposite_array;
  private all_withdraw_array;
  private all_trades_array = [];
  private tradesPromises;
  private all_Balances_array;
  private B;
  private allTrideFullFuild;
  private BalancesByTimeStamp = {};

  constructor(api_key, secret_key) {

    this.B = new binanceAPI.BinanceRest({
      key: api_key, // Get this from your account on binance.com
      secret: secret_key, // Same for this
      timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
      recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
      disableBeautification: false,
      /*
       * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
       * default those keys will be replaced with more descriptive, longer ones.
       */
      handleDrift: true
      /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
       * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
       * binance's server time, calculating the difference with your own clock, and then reattempting
       * the request.
       */
    });
    //this.all_Balances_array = Promise.resolve(this.getBalances());
    // this.all_withdraw_array = Promise.resolve(this.get_withdraw_history());
    // this.all_deposite_array = Promise.resolve(this.get_deposite_history());
    
    //this.tradesPromises = Promise.resolve(this.getAllTrades());
  }

  public async getInventoryBalance(timestamp) {
    var _this = this;
    return await Promise.all([_this.all_Balances_array, _this.tradesPromises, _this.all_withdraw_array, _this.all_deposite_array]).then(async function (arr) {
      return await _this.calcInventoryBalance(timestamp).then(async function (list) {
        return await list;
      })
    })
  }

  private async calcInventoryBalance(timestamp) {
    var _this = this;
    Promise.all([_this.all_Balances_array, _this.all_deposite_array, _this.all_withdraw_array]).then(async function (a) {
      for (let i = 0; i < a[0].length; i++) {
        _this.BalancesByTimeStamp[a[0][i].asset] = 0;
      }
      for (let i = 0; i < a[1].length; i++) {
        if (Number(a[1][i].insertTime) / 1000 > timestamp) {
          break;
        } else {

          _this.BalancesByTimeStamp[a[1][i].asset] += a[1][i].amount;
        }

      }

      for (let i = 0; i < a[2].length; i++) {
        if (Number(a[2][i].applyTime) / 1000 > timestamp) {
          break;
        } else {
          _this.BalancesByTimeStamp[a[2][i].asset] -= a[2][i].amount;
        }
      }

      await Promise.resolve(_this.tradesPromises).then(async function (tradesResolevd) {

        for (let i = 0; i < tradesResolevd.length; i++) {
          for (let j = 0; j < tradesResolevd[i].length; j++) {

            if (tradesResolevd[i][j].time / 1000 > timestamp || tradesResolevd[i][j].length < 1) {
              break;
            } else {

              if (tradesResolevd[i][j].isBuyer) {//isBuyer==true
                _this.BalancesByTimeStamp[tradesResolevd[i][j].symbol.replace(tradesResolevd[i][j].commissionAsset, "")] -= (Number(tradesResolevd[i][j].quoteQty));
                _this.BalancesByTimeStamp[tradesResolevd[i][j].commissionAsset] += (Number(tradesResolevd[i][j].qty) - Number(tradesResolevd[i][j].commission));
              } else {// isBuyer==false 
                _this.BalancesByTimeStamp[tradesResolevd[i][j].symbol.replace(tradesResolevd[i][j].commissionAsset, "")] -= Number(tradesResolevd[i][j].qty);
                _this.BalancesByTimeStamp[tradesResolevd[i][j].commissionAsset] += (Number(tradesResolevd[i][j].quoteQty) - Number(tradesResolevd[i][j].commission));
              }
            }
          }
        }
        for (var key in _this.BalancesByTimeStamp) {
          _this.BalancesByTimeStamp[key] = Math.round(Number(_this.BalancesByTimeStamp[key]) * Math.pow(10, 8)) / Math.pow(10, 8);
          if (_this.BalancesByTimeStamp[key] === 0)
            delete _this.BalancesByTimeStamp[key];
        }
      })


    });

    return await _this.BalancesByTimeStamp;

  }

  private async getBalances() {
    var _this = this;
    return await _this.B.account()
      .then(async (account) => {
        console.log(account.balances);

        return await account.balances;
      }).catch((err) => {
        console.error(err);
      })
  }

  public async getAllTrades(symbols) {
    var _this = this;
    var promises = [];
    //return await Promise.resolve(_this.all_symbols_array).then(async function (symbols) {
      console.log(symbols.length);

      for (var i = 0; i < symbols.length; i++) {
        if (i !== 188) {
          //await promises.push(await _this.B.myTrades({ symbol: 'BTCUSDT' })
          await promises.push(_this.B.myTrades({ symbol: symbols[i].symbol })
            .then(async (data) => {
              console.log(symbols[i].symbol + ", " + i + ": ");
              console.log(data);
              return data;
            })
            .catch((err) => {
              console.error(err);
            }))

          await sleep(4000);
        }

      }
      return await promises;
    //}

    //)

  }

  public async getAllSymbols() {
    var _this = this;
    return await _this.B.bookTicker((error, ticker) => {
      //console.log("bookTickers()", ticker);
      return ticker;
      //console.log("Price of BNB: ", ticker.BNBBTC);
    });
  }

  /**
   * get_withdraw_history
   */
  public async get_withdraw_history() {
    var _this = this;
    return await _this.B.withdrawHistory({}).then(async (response) => {
      return await response.withdrawList;
    }).catch((err) => {
      console.error(err);
    })
  }

  /**
  * get_deposite_history
  */
  public async get_deposite_history() {
    var _this = this;

    return await _this.B.depositHistory({}).then(async (response) => {
      return await response.depositList;
    }).catch((err) => {
      console.error(err);
    })
  }

}

module.exports = BinanceCryptoAPI;

// binance().options({
//     APIKEY: apikey,
//     APISECRET: SK,
//     //useServerTime: false // If you get timestamp errors, synchronize to server time at startup
//   });


// 	binance.trades("all", (error, trades, symbol) => {
//         if ( error ) return console.error(error);
//         console.log(symbol+" trade history", trades);
//       });



