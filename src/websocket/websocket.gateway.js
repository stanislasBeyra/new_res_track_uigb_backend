"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.WebsocketGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var WebsocketGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*',
                credentials: true,
            },
            namespace: '/chat',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleTyping_decorators;
    var _handleStopTyping_decorators;
    var _handleJoinGroup_decorators;
    var _handleLeaveGroup_decorators;
    var _handlePing_decorators;
    var _handleGetOnlineUsers_decorators;
    var _handleCheckUserOnline_decorators;
    var _handleGetStats_decorators;
    var WebsocketGateway = _classThis = /** @class */ (function () {
        function WebsocketGateway_1(jwtService, websocketService) {
            this.jwtService = (__runInitializers(this, _instanceExtraInitializers), jwtService);
            this.websocketService = websocketService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(WebsocketGateway.name));
        }
        WebsocketGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, userId, userType;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    this.logger.log("\uD83D\uDD0C New connection attempt - Client ID: ".concat(client.id));
                    this.logger.debug("\uD83D\uDD0D Handshake auth:", JSON.stringify(client.handshake.auth));
                    this.logger.debug("\uD83D\uDD0D Handshake headers:", JSON.stringify(client.handshake.headers));
                    try {
                        token = ((_a = client.handshake.auth) === null || _a === void 0 ? void 0 : _a.token) || ((_c = (_b = client.handshake.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1]);
                        if (!token) {
                            this.logger.warn("\u274C Client ".concat(client.id, " rejected: No token provided"));
                            client.disconnect();
                            return [2 /*return*/];
                        }
                        this.logger.debug("\uD83D\uDD11 Token found for client ".concat(client.id));
                        payload = this.jwtService.verify(token);
                        userId = payload.sub;
                        userType = payload.role;
                        this.logger.log("\u2705 Token verified - User ID: ".concat(userId, ", Type: ").concat(userType));
                        // Attacher les infos au socket
                        client.data.userId = userId;
                        client.data.userType = userType;
                        this.logger.debug("\uD83D\uDCCE Data attached to socket ".concat(client.id));
                        // Enregistrer la connexion dans le service
                        this.websocketService.registerConnection(client.id, userId, userType);
                        this.logger.debug("\u2705 Connection registered in service");
                        // Envoyer confirmation
                        client.emit('connected', {
                            message: 'Connected to chat',
                            userId: userId,
                            userType: userType,
                            stats: this.websocketService.getConnectionStats(),
                        });
                        this.logger.log("\uD83D\uDCE8 Connection confirmation sent to client ".concat(client.id));
                        // Notifier les autres que l'utilisateur est en ligne
                        this.logger.debug("\uD83D\uDCE2 Broadcasting user:online event");
                        this.websocketService.broadcastExcept(this.server, client.id, 'user:online', { userId: userId, userType: userType });
                        this.logger.log("\u2705 User ".concat(userId, " (").concat(userType, ") successfully connected with socket ").concat(client.id));
                    }
                    catch (error) {
                        this.logger.error("\u274C Connection error for client ".concat(client.id, ":"));
                        this.logger.error("Error message: ".concat(error.message));
                        this.logger.error("Error stack: ".concat(error.stack));
                        client.disconnect();
                    }
                    return [2 /*return*/];
                });
            });
        };
        WebsocketGateway_1.prototype.handleDisconnect = function (client) {
            this.logger.log("\uD83D\uDD0C Disconnect - Client ID: ".concat(client.id));
            var disconnectInfo = this.websocketService.unregisterConnection(client.id);
            if (disconnectInfo) {
                this.logger.log("\uD83D\uDC64 User ".concat(disconnectInfo.userId, " disconnected, last connection: ").concat(disconnectInfo.isLastConnection));
                if (disconnectInfo.isLastConnection) {
                    // Notifier que l'utilisateur est hors ligne (si c'était sa dernière connexion)
                    this.logger.debug("\uD83D\uDCE2 Broadcasting user:offline event for user ".concat(disconnectInfo.userId));
                    this.websocketService.broadcastExcept(this.server, client.id, 'user:offline', { userId: disconnectInfo.userId, userType: disconnectInfo.userType });
                }
            }
            else {
                this.logger.warn("\u26A0\uFE0F No disconnect info found for client ".concat(client.id));
            }
        };
        // ============= MÉTHODES PUBLIQUES (appelées depuis d'autres services) =============
        /**
         * Envoyer un message à un utilisateur spécifique
         */
        WebsocketGateway_1.prototype.sendMessageToUser = function (userId, event, data) {
            return this.websocketService.sendToUser(this.server, userId, event, data);
        };
        /**
         * Envoyer un message à plusieurs utilisateurs (pour les groupes)
         */
        WebsocketGateway_1.prototype.sendMessageToGroup = function (userIds, event, data) {
            this.websocketService.sendToMultipleUsers(this.server, userIds, event, data);
        };
        /**
         * Vérifier si un utilisateur est en ligne
         */
        WebsocketGateway_1.prototype.isUserOnline = function (userId) {
            return this.websocketService.isUserOnline(userId);
        };
        // ============= ÉVÉNEMENTS WEBSOCKET =============
        /**
         * Notifier qu'un utilisateur tape un message
         */
        WebsocketGateway_1.prototype.handleTyping = function (data, client) {
            var userId = client.data.userId;
            var userType = client.data.userType;
            this.websocketService.sendToUser(this.server, data.receiverId, 'message:typing', {
                senderId: userId,
                senderType: userType,
            });
        };
        /**
         * Notifier qu'un utilisateur a arrêté de taper
         */
        WebsocketGateway_1.prototype.handleStopTyping = function (data, client) {
            var userId = client.data.userId;
            var userType = client.data.userType;
            this.websocketService.sendToUser(this.server, data.receiverId, 'message:stop-typing', {
                senderId: userId,
                senderType: userType,
            });
        };
        /**
         * Rejoindre une room de groupe
         */
        WebsocketGateway_1.prototype.handleJoinGroup = function (data, client) {
            var roomName = this.websocketService.getGroupRoomName(data.groupId);
            client.join(roomName);
            this.logger.log("User ".concat(client.data.userId, " joined group ").concat(data.groupId));
            // Notifier les autres membres du groupe
            this.websocketService.sendToGroupRoom(this.server, data.groupId, 'group:user-joined', {
                userId: client.data.userId,
                userType: client.data.userType,
                groupId: data.groupId,
            });
            return {
                event: 'group:joined',
                data: { groupId: data.groupId },
            };
        };
        /**
         * Quitter une room de groupe
         */
        WebsocketGateway_1.prototype.handleLeaveGroup = function (data, client) {
            var roomName = this.websocketService.getGroupRoomName(data.groupId);
            client.leave(roomName);
            this.logger.log("User ".concat(client.data.userId, " left group ").concat(data.groupId));
            // Notifier les autres membres du groupe
            this.websocketService.sendToGroupRoom(this.server, data.groupId, 'group:user-left', {
                userId: client.data.userId,
                userType: client.data.userType,
                groupId: data.groupId,
            });
            return {
                event: 'group:left',
                data: { groupId: data.groupId },
            };
        };
        /**
         * Ping/Pong pour vérifier la connexion
         */
        WebsocketGateway_1.prototype.handlePing = function (client) {
            return {
                event: 'pong',
                data: {
                    timestamp: new Date().toISOString(),
                    userId: client.data.userId,
                },
            };
        };
        /**
         * Récupérer les utilisateurs en ligne
         */
        WebsocketGateway_1.prototype.handleGetOnlineUsers = function () {
            return {
                event: 'users:online:list',
                data: __assign(__assign({}, this.websocketService.getConnectionStats()), { usersByType: this.websocketService.getUsersByType() }),
            };
        };
        /**
         * Vérifier si un utilisateur spécifique est en ligne
         */
        WebsocketGateway_1.prototype.handleCheckUserOnline = function (data) {
            var isOnline = this.websocketService.isUserOnline(data.userId);
            return {
                event: 'user:online-status',
                data: {
                    userId: data.userId,
                    isOnline: isOnline,
                },
            };
        };
        /**
         * Obtenir les statistiques de connexion
         */
        WebsocketGateway_1.prototype.handleGetStats = function () {
            return {
                event: 'stats:connections',
                data: this.websocketService.getConnectionStats(),
            };
        };
        return WebsocketGateway_1;
    }());
    __setFunctionName(_classThis, "WebsocketGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleTyping_decorators = [(0, websockets_1.SubscribeMessage)('message:typing')];
        _handleStopTyping_decorators = [(0, websockets_1.SubscribeMessage)('message:stop-typing')];
        _handleJoinGroup_decorators = [(0, websockets_1.SubscribeMessage)('group:join')];
        _handleLeaveGroup_decorators = [(0, websockets_1.SubscribeMessage)('group:leave')];
        _handlePing_decorators = [(0, websockets_1.SubscribeMessage)('ping')];
        _handleGetOnlineUsers_decorators = [(0, websockets_1.SubscribeMessage)('users:online')];
        _handleCheckUserOnline_decorators = [(0, websockets_1.SubscribeMessage)('user:check-online')];
        _handleGetStats_decorators = [(0, websockets_1.SubscribeMessage)('stats:connections')];
        __esDecorate(_classThis, null, _handleTyping_decorators, { kind: "method", name: "handleTyping", static: false, private: false, access: { has: function (obj) { return "handleTyping" in obj; }, get: function (obj) { return obj.handleTyping; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleStopTyping_decorators, { kind: "method", name: "handleStopTyping", static: false, private: false, access: { has: function (obj) { return "handleStopTyping" in obj; }, get: function (obj) { return obj.handleStopTyping; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinGroup_decorators, { kind: "method", name: "handleJoinGroup", static: false, private: false, access: { has: function (obj) { return "handleJoinGroup" in obj; }, get: function (obj) { return obj.handleJoinGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveGroup_decorators, { kind: "method", name: "handleLeaveGroup", static: false, private: false, access: { has: function (obj) { return "handleLeaveGroup" in obj; }, get: function (obj) { return obj.handleLeaveGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handlePing_decorators, { kind: "method", name: "handlePing", static: false, private: false, access: { has: function (obj) { return "handlePing" in obj; }, get: function (obj) { return obj.handlePing; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleGetOnlineUsers_decorators, { kind: "method", name: "handleGetOnlineUsers", static: false, private: false, access: { has: function (obj) { return "handleGetOnlineUsers" in obj; }, get: function (obj) { return obj.handleGetOnlineUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleCheckUserOnline_decorators, { kind: "method", name: "handleCheckUserOnline", static: false, private: false, access: { has: function (obj) { return "handleCheckUserOnline" in obj; }, get: function (obj) { return obj.handleCheckUserOnline; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleGetStats_decorators, { kind: "method", name: "handleGetStats", static: false, private: false, access: { has: function (obj) { return "handleGetStats" in obj; }, get: function (obj) { return obj.handleGetStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebsocketGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebsocketGateway = _classThis;
}();
exports.WebsocketGateway = WebsocketGateway;
