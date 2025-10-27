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
exports.NotificationsGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var userrole_1 = require("../enum/userrole");
var NotificationsGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: '*', // � configurer selon votre frontend
                credentials: true,
            },
            namespace: '/notifications',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handlePing_decorators;
    var NotificationsGateway = _classThis = /** @class */ (function () {
        function NotificationsGateway_1(jwtService) {
            this.jwtService = (__runInitializers(this, _instanceExtraInitializers), jwtService);
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(NotificationsGateway.name));
            this.connectedUsers = new Map(); // userId -> socketIds[]
            this.adminSockets = new Set(); // socketIds des admins
        }
        NotificationsGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, userId, userRole, userSockets;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    try {
                        token = ((_a = client.handshake.auth) === null || _a === void 0 ? void 0 : _a.token) || ((_c = (_b = client.handshake.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1]);
                        if (!token) {
                            this.logger.warn("Client ".concat(client.id, " rejected: No token provided"));
                            client.disconnect();
                            return [2 /*return*/];
                        }
                        payload = this.jwtService.verify(token);
                        userId = payload.sub;
                        userRole = payload.role;
                        // Attacher les infos user au socket
                        client.data.userId = userId;
                        client.data.userRole = userRole;
                        userSockets = this.connectedUsers.get(userId) || [];
                        userSockets.push(client.id);
                        this.connectedUsers.set(userId, userSockets);
                        // Si c'est un admin, l'ajouter au Set des admins
                        if (userRole === userrole_1.UserRole.ADMIN) {
                            this.adminSockets.add(client.id);
                            this.logger.log("Admin connected: ".concat(client.id, " (User ID: ").concat(userId, ")"));
                        }
                        else {
                            this.logger.log("User connected: ".concat(client.id, " (User ID: ").concat(userId, ")"));
                        }
                        // Envoyer confirmation de connexion
                        client.emit('connected', {
                            message: 'Connected to notifications',
                            userId: userId,
                            role: userRole,
                        });
                    }
                    catch (error) {
                        this.logger.error("Connection error for client ".concat(client.id, ":"), error.message);
                        client.disconnect();
                    }
                    return [2 /*return*/];
                });
            });
        };
        NotificationsGateway_1.prototype.handleDisconnect = function (client) {
            var userId = client.data.userId;
            var userRole = client.data.userRole;
            if (userId) {
                // Retirer du map des utilisateurs connect�s
                var userSockets = this.connectedUsers.get(userId) || [];
                var filteredSockets = userSockets.filter(function (id) { return id !== client.id; });
                if (filteredSockets.length > 0) {
                    this.connectedUsers.set(userId, filteredSockets);
                }
                else {
                    this.connectedUsers.delete(userId);
                }
                // Si c'�tait un admin, le retirer du Set
                if (userRole === userrole_1.UserRole.ADMIN) {
                    this.adminSockets.delete(client.id);
                    this.logger.log("Admin disconnected: ".concat(client.id));
                }
                else {
                    this.logger.log("User disconnected: ".concat(client.id));
                }
            }
        };
        // Envoyer une notification � tous les admins
        NotificationsGateway_1.prototype.notifyAdmins = function (event, data) {
            var _this = this;
            this.adminSockets.forEach(function (socketId) {
                _this.server.to(socketId).emit(event, data);
            });
            this.logger.log("Notification sent to ".concat(this.adminSockets.size, " admin(s): ").concat(event));
        };
        // Envoyer une notification � un utilisateur sp�cifique
        NotificationsGateway_1.prototype.notifyUser = function (userId, event, data) {
            var _this = this;
            var userSockets = this.connectedUsers.get(userId);
            if (userSockets) {
                userSockets.forEach(function (socketId) {
                    _this.server.to(socketId).emit(event, data);
                });
                this.logger.log("Notification sent to user ".concat(userId, ": ").concat(event));
            }
        };
        // Broadcaster � tous les utilisateurs connect�s
        NotificationsGateway_1.prototype.broadcast = function (event, data) {
            this.server.emit(event, data);
            this.logger.log("Broadcast sent: ".concat(event));
        };
        NotificationsGateway_1.prototype.handlePing = function (client) {
            return { event: 'pong', data: { timestamp: new Date().toISOString() } };
        };
        return NotificationsGateway_1;
    }());
    __setFunctionName(_classThis, "NotificationsGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handlePing_decorators = [(0, websockets_1.SubscribeMessage)('ping')];
        __esDecorate(_classThis, null, _handlePing_decorators, { kind: "method", name: "handlePing", static: false, private: false, access: { has: function (obj) { return "handlePing" in obj; }, get: function (obj) { return obj.handlePing; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsGateway = _classThis;
}();
exports.NotificationsGateway = NotificationsGateway;
