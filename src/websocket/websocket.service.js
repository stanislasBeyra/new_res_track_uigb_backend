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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketService = void 0;
var common_1 = require("@nestjs/common");
var WebsocketService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WebsocketService = _classThis = /** @class */ (function () {
        function WebsocketService_1() {
            this.logger = new common_1.Logger(WebsocketService.name);
            this.connectedUsers = new Map(); // userId -> socketIds[]
            this.userTypes = new Map(); // socketId -> userType
            this.socketToUser = new Map(); // socketId -> user info
        }
        // ============= GESTION DES CONNEXIONS =============
        /**
         * Enregistrer une nouvelle connexion utilisateur
         */
        WebsocketService_1.prototype.registerConnection = function (socketId, userId, userType) {
            // Ajouter à la map des utilisateurs connectés
            var userSockets = this.connectedUsers.get(userId) || [];
            userSockets.push(socketId);
            this.connectedUsers.set(userId, userSockets);
            // Enregistrer le type d'utilisateur
            this.userTypes.set(socketId, userType);
            this.socketToUser.set(socketId, { userId: userId, userType: userType });
            this.logger.log("\uD83D\uDFE2 NOUVELLE CONNEXION: Utilisateur ".concat(userId, " (").concat(userType, ") - Socket: ").concat(socketId));
            this.logger.log("\uD83D\uDCCA STATISTIQUES: ".concat(this.connectedUsers.size, " utilisateur(s) connect\u00E9(s), ").concat(this.getTotalConnections(), " socket(s) total"));
        };
        /**
         * Désenregistrer une connexion utilisateur
         */
        WebsocketService_1.prototype.unregisterConnection = function (socketId) {
            var userInfo = this.socketToUser.get(socketId);
            if (!userInfo) {
                return null;
            }
            var userId = userInfo.userId, userType = userInfo.userType;
            // Retirer de la map
            var userSockets = this.connectedUsers.get(userId) || [];
            var filteredSockets = userSockets.filter(function (id) { return id !== socketId; });
            var isLastConnection = false;
            if (filteredSockets.length > 0) {
                this.connectedUsers.set(userId, filteredSockets);
            }
            else {
                this.connectedUsers.delete(userId);
                isLastConnection = true;
            }
            this.userTypes.delete(socketId);
            this.socketToUser.delete(socketId);
            this.logger.log("\uD83D\uDD34 D\u00C9CONNEXION: Utilisateur ".concat(userId, " (").concat(userType, ") - Socket: ").concat(socketId));
            this.logger.log("\uD83D\uDCCA STATISTIQUES: ".concat(this.connectedUsers.size, " utilisateur(s) connect\u00E9(s), ").concat(this.getTotalConnections(), " socket(s) total"));
            return { userId: userId, userType: userType, isLastConnection: isLastConnection };
        };
        // ============= ENVOI DE MESSAGES =============
        /**
         * Envoyer un message à un utilisateur spécifique
         */
        WebsocketService_1.prototype.sendToUser = function (server, userId, event, data) {
            var _this = this;
            var userSockets = this.connectedUsers.get(userId);
            if (!userSockets || userSockets.length === 0) {
                this.logger.warn("\u274C UTILISATEUR ".concat(userId, " NON CONNECT\u00C9 - Message non envoy\u00E9"));
                return false;
            }
            this.logger.log("\uD83D\uDCE4 ENVOI MESSAGE: ".concat(event, " vers utilisateur ").concat(userId, " (").concat(userSockets.length, " socket(s))"));
            this.logger.log("\uD83D\uDCCB Contenu du message:", JSON.stringify(data, null, 2));
            userSockets.forEach(function (socketId) {
                server.to(socketId).emit(event, data);
                _this.logger.log("\u2705 Message envoy\u00E9 via socket ".concat(socketId));
            });
            this.logger.log("\uD83C\uDFAF Message envoy\u00E9 avec succ\u00E8s \u00E0 l'utilisateur ".concat(userId));
            return true;
        };
        /**
         * Envoyer un message à plusieurs utilisateurs (pour les groupes)
         */
        WebsocketService_1.prototype.sendToMultipleUsers = function (server, userIds, event, data) {
            var _this = this;
            this.logger.log("\uD83D\uDCE4 ENVOI MESSAGE GROUPE: ".concat(event, " vers ").concat(userIds.length, " utilisateurs"));
            this.logger.log("\uD83D\uDC65 Utilisateurs cibles: ".concat(userIds.join(', ')));
            var sentCount = 0;
            userIds.forEach(function (userId) {
                if (_this.sendToUser(server, userId, event, data)) {
                    sentCount++;
                }
            });
            this.logger.log("\uD83D\uDCCA R\u00C9SULTAT GROUPE: ".concat(sentCount, "/").concat(userIds.length, " messages envoy\u00E9s avec succ\u00E8s"));
        };
        /**
         * Broadcaster à tous les utilisateurs connectés sauf l'émetteur
         */
        WebsocketService_1.prototype.broadcastExcept = function (server, excludeSocketId, event, data) {
            this.logger.debug("\uD83D\uDD04 Broadcasting event \"".concat(event, "\" to all except ").concat(excludeSocketId));
            if (!server) {
                this.logger.error("\u274C Server is undefined");
                return;
            }
            // server.sockets est déjà la Map des sockets connectés
            var socketsMap = server.sockets;
            if (!socketsMap) {
                this.logger.error("\u274C Sockets map is undefined");
                return;
            }
            this.logger.debug("\uD83D\uDCCA Total sockets in namespace: ".concat(socketsMap.size));
            var sentCount = 0;
            socketsMap.forEach(function (socket) {
                if (socket.id !== excludeSocketId) {
                    socket.emit(event, data);
                    sentCount++;
                }
            });
            this.logger.debug("\u2705 Broadcast sent to ".concat(sentCount, " clients (except ").concat(excludeSocketId, "): ").concat(event));
        };
        /**
         * Broadcaster à tous les utilisateurs connectés
         */
        WebsocketService_1.prototype.broadcastToAll = function (server, event, data) {
            server.emit(event, data);
            this.logger.debug("Broadcast sent to all: ".concat(event));
        };
        // ============= REQUÊTES D'INFORMATIONS =============
        /**
         * Vérifier si un utilisateur est connecté
         */
        WebsocketService_1.prototype.isUserOnline = function (userId) {
            return this.connectedUsers.has(userId);
        };
        /**
         * Obtenir tous les socketIds d'un utilisateur
         */
        WebsocketService_1.prototype.getUserSockets = function (userId) {
            return this.connectedUsers.get(userId) || [];
        };
        /**
         * Obtenir les informations utilisateur d'un socket
         */
        WebsocketService_1.prototype.getUserFromSocket = function (socketId) {
            return this.socketToUser.get(socketId);
        };
        /**
         * Obtenir la liste des IDs des utilisateurs en ligne
         */
        WebsocketService_1.prototype.getOnlineUserIds = function () {
            return Array.from(this.connectedUsers.keys());
        };
        /**
         * Obtenir le nombre total d'utilisateurs connectés
         */
        WebsocketService_1.prototype.getTotalConnectedUsers = function () {
            return this.connectedUsers.size;
        };
        /**
         * Obtenir le nombre total de connexions (sockets)
         */
        WebsocketService_1.prototype.getTotalConnections = function () {
            var total = 0;
            this.connectedUsers.forEach(function (sockets) {
                total += sockets.length;
            });
            return total;
        };
        /**
         * Obtenir les statistiques de connexion
         */
        WebsocketService_1.prototype.getConnectionStats = function () {
            var totalUsers = this.getTotalConnectedUsers();
            var totalConnections = this.getTotalConnections();
            return {
                totalUsers: totalUsers,
                totalConnections: totalConnections,
                averageConnectionsPerUser: totalUsers > 0 ? totalConnections / totalUsers : 0,
                onlineUserIds: this.getOnlineUserIds(),
            };
        };
        // ============= GESTION DES ROOMS (GROUPES) =============
        /**
         * Obtenir le nom de la room pour un groupe
         */
        WebsocketService_1.prototype.getGroupRoomName = function (groupId) {
            return "group:".concat(groupId);
        };
        /**
         * Envoyer un message à tous les membres d'un groupe (via room)
         */
        WebsocketService_1.prototype.sendToGroupRoom = function (server, groupId, event, data) {
            var roomName = this.getGroupRoomName(groupId);
            server.to(roomName).emit(event, data);
            this.logger.debug("Message sent to group ".concat(groupId, ": ").concat(event));
        };
        // ============= UTILITAIRES =============
        /**
         * Nettoyer toutes les connexions (pour les tests ou le shutdown)
         */
        WebsocketService_1.prototype.clearAllConnections = function () {
            this.connectedUsers.clear();
            this.userTypes.clear();
            this.socketToUser.clear();
            this.logger.log('All connections cleared');
        };
        /**
         * Obtenir un résumé des utilisateurs connectés par type
         */
        WebsocketService_1.prototype.getUsersByType = function () {
            var students = [];
            var admins = [];
            this.socketToUser.forEach(function (userInfo, socketId) {
                if (userInfo.userType === 'STUDENT' && !students.includes(userInfo.userId)) {
                    students.push(userInfo.userId);
                }
                else if (userInfo.userType === 'ADMIN' && !admins.includes(userInfo.userId)) {
                    admins.push(userInfo.userId);
                }
            });
            return { students: students, admins: admins };
        };
        return WebsocketService_1;
    }());
    __setFunctionName(_classThis, "WebsocketService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebsocketService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebsocketService = _classThis;
}();
exports.WebsocketService = WebsocketService;
