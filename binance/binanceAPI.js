var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var array = require('lodash/array');
var binanceAPI = require('binance');
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var BinanceCryptoAPI = /** @class */ (function () {
    function BinanceCryptoAPI(api_key, secret_key) {
        this.all_trades_array = [];
        this.BalancesByTimeStamp = {};
        this.B = new binanceAPI.BinanceRest({
            key: api_key,
            secret: secret_key,
            timeout: 15000,
            recvWindow: 10000,
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
    BinanceCryptoAPI.prototype.getInventoryBalance = function (timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, Promise.all([_this.all_Balances_array, _this.tradesPromises, _this.all_withdraw_array, _this.all_deposite_array]).then(function (arr) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, _this.calcInventoryBalance(timestamp).then(function (list) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, list];
                                                                case 1: return [2 /*return*/, _a.sent()];
                                                            }
                                                        });
                                                    });
                                                })];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BinanceCryptoAPI.prototype.calcInventoryBalance = function (timestamp) {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        Promise.all([_this.all_Balances_array, _this.all_deposite_array, _this.all_withdraw_array]).then(function (a) {
                            return __awaiter(this, void 0, void 0, function () {
                                var i, i, i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            for (i = 0; i < a[0].length; i++) {
                                                _this.BalancesByTimeStamp[a[0][i].asset] = 0;
                                            }
                                            for (i = 0; i < a[1].length; i++) {
                                                if (Number(a[1][i].insertTime) / 1000 > timestamp) {
                                                    break;
                                                }
                                                else {
                                                    _this.BalancesByTimeStamp[a[1][i].asset] += a[1][i].amount;
                                                }
                                            }
                                            for (i = 0; i < a[2].length; i++) {
                                                if (Number(a[2][i].applyTime) / 1000 > timestamp) {
                                                    break;
                                                }
                                                else {
                                                    _this.BalancesByTimeStamp[a[2][i].asset] -= a[2][i].amount;
                                                }
                                            }
                                            return [4 /*yield*/, Promise.resolve(_this.tradesPromises).then(function (tradesResolevd) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var i, j, key;
                                                        return __generator(this, function (_a) {
                                                            for (i = 0; i < tradesResolevd.length; i++) {
                                                                for (j = 0; j < tradesResolevd[i].length; j++) {
                                                                    if (tradesResolevd[i][j].time / 1000 > timestamp || tradesResolevd[i][j].length < 1) {
                                                                        break;
                                                                    }
                                                                    else {
                                                                        if (tradesResolevd[i][j].isBuyer) { //isBuyer==true
                                                                            _this.BalancesByTimeStamp[tradesResolevd[i][j].symbol.replace(tradesResolevd[i][j].commissionAsset, "")] -= (Number(tradesResolevd[i][j].quoteQty));
                                                                            _this.BalancesByTimeStamp[tradesResolevd[i][j].commissionAsset] += (Number(tradesResolevd[i][j].qty) - Number(tradesResolevd[i][j].commission));
                                                                        }
                                                                        else { // isBuyer==false 
                                                                            _this.BalancesByTimeStamp[tradesResolevd[i][j].symbol.replace(tradesResolevd[i][j].commissionAsset, "")] -= Number(tradesResolevd[i][j].qty);
                                                                            _this.BalancesByTimeStamp[tradesResolevd[i][j].commissionAsset] += (Number(tradesResolevd[i][j].quoteQty) - Number(tradesResolevd[i][j].commission));
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            for (key in _this.BalancesByTimeStamp) {
                                                                _this.BalancesByTimeStamp[key] = Math.round(Number(_this.BalancesByTimeStamp[key]) * Math.pow(10, 8)) / Math.pow(10, 8);
                                                                if (_this.BalancesByTimeStamp[key] === 0)
                                                                    delete _this.BalancesByTimeStamp[key];
                                                            }
                                                            return [2 /*return*/];
                                                        });
                                                    });
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [4 /*yield*/, _this.BalancesByTimeStamp];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BinanceCryptoAPI.prototype.getBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, _this.B.account()
                                .then(function (account) { return __awaiter(_this_1, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(account.balances);
                                            return [4 /*yield*/, account.balances];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })["catch"](function (err) {
                                console.error(err);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BinanceCryptoAPI.prototype.getAllTrades = function (symbols) {
        return __awaiter(this, void 0, void 0, function () {
            var _this, promises, i;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        promises = [];
                        //return await Promise.resolve(_this.all_symbols_array).then(async function (symbols) {
                        console.log(symbols.length);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < symbols.length)) return [3 /*break*/, 5];
                        if (!(i !== 188)) return [3 /*break*/, 4];
                        //await promises.push(await _this.B.myTrades({ symbol: 'BTCUSDT' })
                        return [4 /*yield*/, promises.push(_this.B.myTrades({ symbol: symbols[i].symbol })
                                .then(function (data) { return __awaiter(_this_1, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log(symbols[i].symbol + ", " + i + ": ");
                                    console.log(data);
                                    return [2 /*return*/, data];
                                });
                            }); })["catch"](function (err) {
                                console.error(err);
                            }))];
                    case 2:
                        //await promises.push(await _this.B.myTrades({ symbol: 'BTCUSDT' })
                        _a.sent();
                        return [4 /*yield*/, sleep(4000)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [4 /*yield*/, promises];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BinanceCryptoAPI.prototype.getAllSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, _this.B.bookTicker(function (error, ticker) {
                                //console.log("bookTickers()", ticker);
                                return ticker;
                                //console.log("Price of BNB: ", ticker.BNBBTC);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * get_withdraw_history
     */
    BinanceCryptoAPI.prototype.get_withdraw_history = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, _this.B.withdrawHistory({}).then(function (response) { return __awaiter(_this_1, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, response.withdrawList];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })["catch"](function (err) {
                                console.error(err);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
    * get_deposite_history
    */
    BinanceCryptoAPI.prototype.get_deposite_history = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _this = this;
                        return [4 /*yield*/, _this.B.depositHistory({}).then(function (response) { return __awaiter(_this_1, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, response.depositList];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })["catch"](function (err) {
                                console.error(err);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return BinanceCryptoAPI;
}());
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
