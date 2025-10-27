"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.FcmTokensController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var fcm_token_entity_1 = require("./entities/fcm-token.entity");
var public_decorator_1 = require("src/common/decorators/public.decorator");
var send_test_notification_dto_1 = require("./dto/send-test-notification.dto");
var FcmTokensController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('FCM Tokens'), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, common_1.Controller)('fcm-tokens')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _registerToken_decorators;
    var _getMyTokens_decorators;
    var _sendTestNotification_decorators;
    var _subscribeToTopic_decorators;
    var _unsubscribeFromTopic_decorators;
    var _deactivateToken_decorators;
    var _deleteToken_decorators;
    var FcmTokensController = _classThis = /** @class */ (function () {
        function FcmTokensController_1(fcmTokensService) {
            this.fcmTokensService = (__runInitializers(this, _instanceExtraInitializers), fcmTokensService);
        }
        FcmTokensController_1.prototype.registerToken = function (dto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.registerToken(req.user.id, dto)];
                });
            });
        };
        FcmTokensController_1.prototype.getMyTokens = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.getUserTokens(req.user.id)];
                });
            });
        };
        // envoyer notification (test)
        FcmTokensController_1.prototype.sendTestNotification = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.sendTestNotification(dto.userId, dto.title, dto.body)];
                });
            });
        };
        FcmTokensController_1.prototype.subscribeToTopic = function (id, dto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.subscribeToTopic(req.user.id, id, dto.topic)];
                });
            });
        };
        FcmTokensController_1.prototype.unsubscribeFromTopic = function (id, dto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.unsubscribeFromTopic(req.user.id, id, dto.topic)];
                });
            });
        };
        FcmTokensController_1.prototype.deactivateToken = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.deactivateToken(req.user.id, id)];
                });
            });
        };
        FcmTokensController_1.prototype.deleteToken = function (token, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fcmTokensService.deleteToken(req.user.id, token)];
                });
            });
        };
        return FcmTokensController_1;
    }());
    __setFunctionName(_classThis, "FcmTokensController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _registerToken_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Enregistrer un FCM token' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Token enregistré', type: fcm_token_entity_1.FcmToken })];
        _getMyTokens_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Récupérer mes FCM tokens' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des tokens', type: [fcm_token_entity_1.FcmToken] })];
        _sendTestNotification_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('send-test'), (0, swagger_1.ApiOperation)({ summary: 'Envoyer une notification de test' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Notification envoyée avec succès' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Aucun token actif trouvé pour cet utilisateur' }), (0, swagger_1.ApiBody)({ type: send_test_notification_dto_1.SendTestNotificationDto })];
        _subscribeToTopic_decorators = [(0, common_1.Patch)(':id/subscribe'), (0, swagger_1.ApiOperation)({ summary: 'S\'abonner à un topic' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Abonné au topic', type: fcm_token_entity_1.FcmToken })];
        _unsubscribeFromTopic_decorators = [(0, common_1.Patch)(':id/unsubscribe'), (0, swagger_1.ApiOperation)({ summary: 'Se désabonner d\'un topic' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du token' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Désabonné du topic', type: fcm_token_entity_1.FcmToken })];
        _deactivateToken_decorators = [(0, common_1.Patch)(':id/deactivate'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Désactiver un token' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du token' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Token désactivé' })];
        _deleteToken_decorators = [(0, common_1.Delete)(':token'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Supprimer un token' }), (0, swagger_1.ApiParam)({ name: 'token', description: 'FCM Token' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Token supprimé' })];
        __esDecorate(_classThis, null, _registerToken_decorators, { kind: "method", name: "registerToken", static: false, private: false, access: { has: function (obj) { return "registerToken" in obj; }, get: function (obj) { return obj.registerToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyTokens_decorators, { kind: "method", name: "getMyTokens", static: false, private: false, access: { has: function (obj) { return "getMyTokens" in obj; }, get: function (obj) { return obj.getMyTokens; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendTestNotification_decorators, { kind: "method", name: "sendTestNotification", static: false, private: false, access: { has: function (obj) { return "sendTestNotification" in obj; }, get: function (obj) { return obj.sendTestNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _subscribeToTopic_decorators, { kind: "method", name: "subscribeToTopic", static: false, private: false, access: { has: function (obj) { return "subscribeToTopic" in obj; }, get: function (obj) { return obj.subscribeToTopic; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unsubscribeFromTopic_decorators, { kind: "method", name: "unsubscribeFromTopic", static: false, private: false, access: { has: function (obj) { return "unsubscribeFromTopic" in obj; }, get: function (obj) { return obj.unsubscribeFromTopic; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deactivateToken_decorators, { kind: "method", name: "deactivateToken", static: false, private: false, access: { has: function (obj) { return "deactivateToken" in obj; }, get: function (obj) { return obj.deactivateToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteToken_decorators, { kind: "method", name: "deleteToken", static: false, private: false, access: { has: function (obj) { return "deleteToken" in obj; }, get: function (obj) { return obj.deleteToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FcmTokensController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FcmTokensController = _classThis;
}();
exports.FcmTokensController = FcmTokensController;
