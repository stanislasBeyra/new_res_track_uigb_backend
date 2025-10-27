"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmService = void 0;
var common_1 = require("@nestjs/common");
var admin = __importStar(require("firebase-admin"));
var path_1 = require("path");
var FcmService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FcmService = _classThis = /** @class */ (function () {
        function FcmService_1() {
            this.logger = new common_1.Logger(FcmService.name);
        }
        // onModuleInit() {
        //   try {
        //     // Initialiser Firebase Admin SDK
        //     const serviceAccountPath = path.join(
        //       __dirname,
        //       '../config/uigb-ef896-firebase-adminsdk-fbsvc-2f3757dc89.json',
        //     );
        //     admin.initializeApp({
        //       credential: admin.credential.cert(serviceAccountPath),
        //     });
        //     this.logger.log('✅ Firebase Admin SDK initialized successfully');
        //   } catch (error) {
        //     this.logger.error('❌ Failed to initialize Firebase Admin SDK', error);
        //   }
        // }
        FcmService_1.prototype.onModuleInit = function () {
            try {
                // Chemin absolu depuis la racine du projet
                var serviceAccountPath = (0, path_1.join)(process.cwd(), 'src', 'config', 'uigb-ef896-firebase-adminsdk-fbsvc-2f3757dc89.json');
                if (!admin.apps.length) {
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccountPath),
                    });
                    this.logger.log('✅ Firebase Admin SDK initialized successfully');
                }
            }
            catch (error) {
                this.logger.error('❌ Failed to initialize Firebase Admin SDK');
                this.logger.error(error);
            }
        };
        /**
         * Envoyer une notification à un seul token
         */
        FcmService_1.prototype.sendToToken = function (token, notification) {
            return __awaiter(this, void 0, void 0, function () {
                var message, response, error_1;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            message = {
                                token: token,
                                notification: {
                                    title: notification.title,
                                    body: notification.body,
                                    imageUrl: notification.imageUrl,
                                },
                                data: notification.data,
                                android: {
                                    priority: 'high',
                                    notification: {
                                        sound: 'default',
                                        channelId: 'default',
                                    },
                                },
                                apns: {
                                    payload: {
                                        aps: {
                                            sound: 'default',
                                            badge: 1,
                                        },
                                    },
                                },
                            };
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin.messaging().send(message)];
                        case 2:
                            response = _c.sent();
                            this.logger.log("\u2705 Message sent successfully: ".concat(response));
                            return [2 /*return*/, response];
                        case 3:
                            error_1 = _c.sent();
                            this.logger.error("\u274C Error sending message to token ".concat(token, ":"), error_1);
                            // Si le token n'est plus valide, retourner l'info pour le supprimer
                            if (((_a = error_1.errorInfo) === null || _a === void 0 ? void 0 : _a.code) === 'messaging/registration-token-not-registered' ||
                                ((_b = error_1.errorInfo) === null || _b === void 0 ? void 0 : _b.code) === 'messaging/invalid-registration-token') {
                                this.logger.warn("\u26A0\uFE0F Invalid token detected: ".concat(token.substring(0, 20), "..."));
                                error_1.invalidToken = token;
                            }
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Envoyer une notification à plusieurs tokens
         */
        FcmService_1.prototype.sendToMultipleTokens = function (tokens, notification) {
            return __awaiter(this, void 0, void 0, function () {
                var message, response, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (tokens.length === 0) {
                                this.logger.warn('⚠️ No tokens provided for multicast message');
                                return [2 /*return*/, {
                                        successCount: 0,
                                        failureCount: 0,
                                        responses: [],
                                    }];
                            }
                            message = {
                                tokens: tokens,
                                notification: {
                                    title: notification.title,
                                    body: notification.body,
                                    imageUrl: notification.imageUrl,
                                },
                                data: notification.data,
                                android: {
                                    priority: 'high',
                                    notification: {
                                        sound: 'default',
                                        channelId: 'default',
                                    },
                                },
                                apns: {
                                    payload: {
                                        aps: {
                                            sound: 'default',
                                            badge: 1,
                                        },
                                    },
                                },
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin.messaging().sendEachForMulticast(message)];
                        case 2:
                            response = _a.sent();
                            this.logger.log("\u2705 ".concat(response.successCount, " messages sent successfully, ").concat(response.failureCount, " failed"));
                            // Logger les tokens qui ont échoué
                            response.responses.forEach(function (resp, idx) {
                                var _a;
                                if (!resp.success) {
                                    _this.logger.warn("\u274C Failed to send to token ".concat(tokens[idx], ": ").concat((_a = resp.error) === null || _a === void 0 ? void 0 : _a.message));
                                }
                            });
                            return [2 /*return*/, response];
                        case 3:
                            error_2 = _a.sent();
                            this.logger.error('❌ Error sending multicast message:', error_2);
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Envoyer une notification à un topic
         */
        FcmService_1.prototype.sendToTopic = function (topic, notification) {
            return __awaiter(this, void 0, void 0, function () {
                var message, response, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            message = {
                                topic: topic,
                                notification: {
                                    title: notification.title,
                                    body: notification.body,
                                    imageUrl: notification.imageUrl,
                                },
                                data: notification.data,
                                android: {
                                    priority: 'high',
                                    notification: {
                                        sound: 'default',
                                        channelId: 'default',
                                    },
                                },
                                apns: {
                                    payload: {
                                        aps: {
                                            sound: 'default',
                                            badge: 1,
                                        },
                                    },
                                },
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin.messaging().send(message)];
                        case 2:
                            response = _a.sent();
                            this.logger.log("\u2705 Message sent to topic ".concat(topic, ": ").concat(response));
                            return [2 /*return*/, response];
                        case 3:
                            error_3 = _a.sent();
                            this.logger.error("\u274C Error sending message to topic ".concat(topic, ":"), error_3);
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Abonner un token à un topic
         */
        FcmService_1.prototype.subscribeToTopic = function (token, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, admin.messaging().subscribeToTopic([token], topic)];
                        case 1:
                            _a.sent();
                            this.logger.log("\u2705 Token subscribed to topic ".concat(topic));
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error("\u274C Error subscribing token to topic ".concat(topic, ":"), error_4);
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Abonner plusieurs tokens à un topic
         */
        FcmService_1.prototype.subscribeMultipleToTopic = function (tokens, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (tokens.length === 0) {
                                this.logger.warn('⚠️ No tokens provided for topic subscription');
                                return [2 /*return*/, {
                                        successCount: 0,
                                        failureCount: 0,
                                        errors: [],
                                    }];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin.messaging().subscribeToTopic(tokens, topic)];
                        case 2:
                            response = _a.sent();
                            this.logger.log("\u2705 ".concat(response.successCount, " tokens subscribed to topic ").concat(topic, ", ").concat(response.failureCount, " failed"));
                            return [2 /*return*/, response];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error("\u274C Error subscribing tokens to topic ".concat(topic, ":"), error_5);
                            throw error_5;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Désabonner un token d'un topic
         */
        FcmService_1.prototype.unsubscribeFromTopic = function (token, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, admin.messaging().unsubscribeFromTopic([token], topic)];
                        case 1:
                            _a.sent();
                            this.logger.log("\u2705 Token unsubscribed from topic ".concat(topic));
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.error("\u274C Error unsubscribing token from topic ".concat(topic, ":"), error_6);
                            throw error_6;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Désabonner plusieurs tokens d'un topic
         */
        FcmService_1.prototype.unsubscribeMultipleFromTopic = function (tokens, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (tokens.length === 0) {
                                this.logger.warn('⚠️ No tokens provided for topic unsubscription');
                                return [2 /*return*/, {
                                        successCount: 0,
                                        failureCount: 0,
                                        errors: [],
                                    }];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin
                                    .messaging()
                                    .unsubscribeFromTopic(tokens, topic)];
                        case 2:
                            response = _a.sent();
                            this.logger.log("\u2705 ".concat(response.successCount, " tokens unsubscribed from topic ").concat(topic, ", ").concat(response.failureCount, " failed"));
                            return [2 /*return*/, response];
                        case 3:
                            error_7 = _a.sent();
                            this.logger.error("\u274C Error unsubscribing tokens from topic ".concat(topic, ":"), error_7);
                            throw error_7;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Envoyer une notification silencieuse (data-only)
         */
        FcmService_1.prototype.sendDataMessage = function (token, data) {
            return __awaiter(this, void 0, void 0, function () {
                var message, response, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            message = {
                                token: token,
                                data: data,
                                android: {
                                    priority: 'high',
                                },
                                apns: {
                                    headers: {
                                        'apns-priority': '10',
                                    },
                                    payload: {
                                        aps: {
                                            contentAvailable: true,
                                        },
                                    },
                                },
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, admin.messaging().send(message)];
                        case 2:
                            response = _a.sent();
                            this.logger.log("\u2705 Data message sent successfully: ".concat(response));
                            return [2 /*return*/, response];
                        case 3:
                            error_8 = _a.sent();
                            this.logger.error("\u274C Error sending data message:", error_8);
                            throw error_8;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return FcmService_1;
    }());
    __setFunctionName(_classThis, "FcmService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FcmService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FcmService = _classThis;
}();
exports.FcmService = FcmService;
