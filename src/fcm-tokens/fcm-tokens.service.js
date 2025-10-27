"use strict";
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
exports.FcmTokensService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var FcmTokensService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FcmTokensService = _classThis = /** @class */ (function () {
        function FcmTokensService_1(fcmTokenRepository, fcmService) {
            this.fcmTokenRepository = fcmTokenRepository;
            this.fcmService = fcmService;
            this.logger = new common_1.Logger(FcmTokensService.name);
        }
        /**
         * Enregistrer ou mettre à jour un FCM token
         */
        FcmTokensService_1.prototype.registerToken = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var fcmToken, savedToken, _i, _a, topic, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fcmToken = null;
                            if (!dto.deviceId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.fcmTokenRepository.findOne({
                                    where: { userId: userId, deviceId: dto.deviceId },
                                })];
                        case 1:
                            fcmToken = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (!!fcmToken) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.fcmTokenRepository.findOne({
                                    where: { userId: userId, token: dto.token },
                                })];
                        case 3:
                            fcmToken = _b.sent();
                            _b.label = 4;
                        case 4:
                            if (fcmToken) {
                                // Mettre à jour le token existant
                                fcmToken.token = dto.token; // Mettre à jour le token (peut avoir changé)
                                fcmToken.deviceType = dto.deviceType || fcmToken.deviceType;
                                fcmToken.deviceId = dto.deviceId || fcmToken.deviceId;
                                fcmToken.topics = dto.topics || fcmToken.topics;
                                fcmToken.isActive = true;
                                fcmToken.lastUsedAt = new Date();
                                this.logger.log("\uD83D\uDD04 Updating existing token for user ".concat(userId));
                            }
                            else {
                                // Créer un nouveau token
                                fcmToken = this.fcmTokenRepository.create({
                                    userId: userId,
                                    token: dto.token,
                                    deviceType: dto.deviceType,
                                    deviceId: dto.deviceId,
                                    topics: dto.topics || [],
                                    lastUsedAt: new Date(),
                                });
                                this.logger.log("\u2728 Creating new token for user ".concat(userId));
                            }
                            return [4 /*yield*/, this.fcmTokenRepository.save(fcmToken)];
                        case 5:
                            savedToken = _b.sent();
                            if (!(dto.topics && dto.topics.length > 0)) return [3 /*break*/, 11];
                            _i = 0, _a = dto.topics;
                            _b.label = 6;
                        case 6:
                            if (!(_i < _a.length)) return [3 /*break*/, 11];
                            topic = _a[_i];
                            _b.label = 7;
                        case 7:
                            _b.trys.push([7, 9, , 10]);
                            return [4 /*yield*/, this.fcmService.subscribeToTopic(dto.token, topic)];
                        case 8:
                            _b.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            error_1 = _b.sent();
                            console.error("\u274C Erreur lors de l'abonnement au topic ".concat(topic, ":"), error_1);
                            return [3 /*break*/, 10];
                        case 10:
                            _i++;
                            return [3 /*break*/, 6];
                        case 11: return [2 /*return*/, savedToken];
                    }
                });
            });
        };
        /**
         * Récupérer tous les tokens d'un utilisateur
         */
        FcmTokensService_1.prototype.getUserTokens = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokenRepository.find({
                            where: { userId: userId, isActive: true },
                            order: { lastUsedAt: 'DESC' },
                        })];
                });
            });
        };
        /**
         * Récupérer tous les tokens actifs d'un utilisateur
         */
        FcmTokensService_1.prototype.getActiveTokens = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fcmTokenRepository.find({
                                where: { userId: userId, isActive: true },
                                select: ['token'],
                            })];
                        case 1:
                            tokens = _a.sent();
                            return [2 /*return*/, tokens.map(function (t) { return t.token; })];
                    }
                });
            });
        };
        /**
         * S'abonner à un topic
         */
        FcmTokensService_1.prototype.subscribeToTopic = function (userId, tokenId, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var fcmToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fcmTokenRepository.findOne({
                                where: { id: tokenId, userId: userId },
                            })];
                        case 1:
                            fcmToken = _a.sent();
                            if (!fcmToken) {
                                throw new common_1.NotFoundException('Token not found');
                            }
                            // Ajouter le topic s'il n'existe pas déjà
                            if (!fcmToken.topics) {
                                fcmToken.topics = [];
                            }
                            if (!fcmToken.topics.includes(topic)) {
                                fcmToken.topics.push(topic);
                            }
                            // Abonner le token au topic Firebase
                            return [4 /*yield*/, this.fcmService.subscribeToTopic(fcmToken.token, topic)];
                        case 2:
                            // Abonner le token au topic Firebase
                            _a.sent();
                            return [2 /*return*/, this.fcmTokenRepository.save(fcmToken)];
                    }
                });
            });
        };
        /**
         * Se désabonner d'un topic
         */
        FcmTokensService_1.prototype.unsubscribeFromTopic = function (userId, tokenId, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var fcmToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fcmTokenRepository.findOne({
                                where: { id: tokenId, userId: userId },
                            })];
                        case 1:
                            fcmToken = _a.sent();
                            if (!fcmToken) {
                                throw new common_1.NotFoundException('Token not found');
                            }
                            if (fcmToken.topics) {
                                fcmToken.topics = fcmToken.topics.filter(function (t) { return t !== topic; });
                            }
                            // Désabonner le token du topic Firebase
                            return [4 /*yield*/, this.fcmService.unsubscribeFromTopic(fcmToken.token, topic)];
                        case 2:
                            // Désabonner le token du topic Firebase
                            _a.sent();
                            return [2 /*return*/, this.fcmTokenRepository.save(fcmToken)];
                    }
                });
            });
        };
        /**
         * Désactiver un token
         */
        FcmTokensService_1.prototype.deactivateToken = function (userId, tokenId) {
            return __awaiter(this, void 0, void 0, function () {
                var fcmToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fcmTokenRepository.findOne({
                                where: { id: tokenId, userId: userId },
                            })];
                        case 1:
                            fcmToken = _a.sent();
                            if (!fcmToken) {
                                throw new common_1.NotFoundException('Token not found');
                            }
                            fcmToken.isActive = false;
                            return [4 /*yield*/, this.fcmTokenRepository.save(fcmToken)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Supprimer un token
         */
        FcmTokensService_1.prototype.deleteToken = function (userId, token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fcmTokenRepository.delete({ userId: userId, token: token })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Récupérer tous les tokens d'un topic
         */
        FcmTokensService_1.prototype.getTokensByTopic = function (topic) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fcmTokenRepository
                                .createQueryBuilder('fcm_token')
                                .where('fcm_token.is_active = :isActive', { isActive: true })
                                .andWhere(':topic = ANY(fcm_token.topics)', { topic: topic })
                                .select(['fcm_token.token'])
                                .getMany()];
                        case 1:
                            tokens = _a.sent();
                            return [2 /*return*/, tokens.map(function (t) { return t.token; })];
                    }
                });
            });
        };
        /**
         * Récupérer tous les tokens actifs de plusieurs utilisateurs
         */
        FcmTokensService_1.prototype.getTokensByUserIds = function (userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0) {
                                return [2 /*return*/, []];
                            }
                            return [4 /*yield*/, this.fcmTokenRepository.find({
                                    where: { isActive: true },
                                    select: ['token', 'userId'],
                                })];
                        case 1:
                            tokens = _a.sent();
                            return [2 /*return*/, tokens
                                    .filter(function (t) { return userIds.includes(t.userId); })
                                    .map(function (t) { return t.token; })];
                    }
                });
            });
        };
        /**
         * Nettoyer les tokens inactifs (plus de 90 jours)
         */
        FcmTokensService_1.prototype.cleanupInactiveTokens = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ninetyDaysAgo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ninetyDaysAgo = new Date();
                            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
                            return [4 /*yield*/, this.fcmTokenRepository
                                    .createQueryBuilder()
                                    .delete()
                                    .where('is_active = :isActive', { isActive: false })
                                    .andWhere('updated_at < :date', { date: ninetyDaysAgo })
                                    .execute()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.affected || 0];
                    }
                });
            });
        };
        FcmTokensService_1.prototype.sendTestNotification = function (userId, title, body) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens, results, invalidTokens, successCount;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getActiveTokens(userId)];
                        case 1:
                            tokens = _a.sent();
                            if (tokens.length === 0) {
                                throw new common_1.NotFoundException('No active tokens found for user');
                            }
                            return [4 /*yield*/, Promise.allSettled(tokens.map(function (token) { return _this.fcmService.sendToToken(token, { title: title, body: body }); }))];
                        case 2:
                            results = _a.sent();
                            invalidTokens = [];
                            results.forEach(function (result, index) {
                                var _a;
                                if (result.status === 'rejected' && ((_a = result.reason) === null || _a === void 0 ? void 0 : _a.invalidToken)) {
                                    invalidTokens.push(result.reason.invalidToken);
                                }
                            });
                            if (!(invalidTokens.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.fcmTokenRepository.delete({ token: (0, typeorm_1.In)(invalidTokens) })];
                        case 3:
                            _a.sent();
                            this.logger.warn("\uD83D\uDDD1\uFE0F Removed ".concat(invalidTokens.length, " invalid token(s)"));
                            _a.label = 4;
                        case 4:
                            successCount = results.filter(function (r) { return r.status === 'fulfilled'; }).length;
                            if (successCount === 0) {
                                throw new Error('Failed to send notification to any device');
                            }
                            this.logger.log("\u2705 Notification sent to ".concat(successCount, "/").concat(tokens.length, " device(s)"));
                            return [2 /*return*/];
                    }
                });
            });
        };
        return FcmTokensService_1;
    }());
    __setFunctionName(_classThis, "FcmTokensService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FcmTokensService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FcmTokensService = _classThis;
}();
exports.FcmTokensService = FcmTokensService;
