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
exports.MessagesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var message_entity_1 = require("./entities/message.entity");
var goup_entity_1 = require("./entities/goup.entity");
var friend_entity_1 = require("./entities/friend.entity");
var MessagesController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Messages'), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, common_1.Controller)('messages')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _sendMessage_decorators;
    var _getConversations_decorators;
    var _getConversation_decorators;
    var _markAsRead_decorators;
    var _markConversationAsRead_decorators;
    var _markGroupMessagesAsRead_decorators;
    var _createGroup_decorators;
    var _getUserGroups_decorators;
    var _getGroup_decorators;
    var _getGroupMessages_decorators;
    var _addGroupMember_decorators;
    var _removeGroupMember_decorators;
    var _deleteGroup_decorators;
    var _sendFriendRequest_decorators;
    var _acceptFriendRequest_decorators;
    var _rejectFriendRequest_decorators;
    var _getFriends_decorators;
    var _getPendingRequests_decorators;
    var _blockUser_decorators;
    var _removeFriend_decorators;
    var MessagesController = _classThis = /** @class */ (function () {
        function MessagesController_1(messagesService) {
            this.messagesService = (__runInitializers(this, _instanceExtraInitializers), messagesService);
        }
        // ============= MESSAGES =============
        MessagesController_1.prototype.sendMessage = function (createMessageDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.sendMessage(createMessageDto, req.user.id, req.user.role)];
                });
            });
        };
        MessagesController_1.prototype.getConversations = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getUserConversations(req.user.id, req.user.role)];
                });
            });
        };
        MessagesController_1.prototype.getConversation = function (otherUserId, otherUserType, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getConversation(req.user.id, req.user.role, otherUserId, otherUserType)];
                });
            });
        };
        MessagesController_1.prototype.markAsRead = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.markAsRead(id, req.user.id, req.user.role)];
                });
            });
        };
        MessagesController_1.prototype.markConversationAsRead = function (otherUserId, otherUserType, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messagesService.markConversationAsRead(otherUserId, otherUserType, req.user.id, req.user.role)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        MessagesController_1.prototype.markGroupMessagesAsRead = function (groupId, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messagesService.markGroupMessagesAsRead(groupId, req.user.id, req.user.role)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        // ============= GROUPES =============
        MessagesController_1.prototype.createGroup = function (createGroupDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.createGroup(createGroupDto, req.user.id, req.user.role)];
                });
            });
        };
        MessagesController_1.prototype.getUserGroups = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getUserGroups(req.user.id, req.user.role)];
                });
            });
        };
        MessagesController_1.prototype.getGroup = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getGroup(id)];
                });
            });
        };
        MessagesController_1.prototype.getGroupMessages = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getGroupMessages(id, req.user.id, req.user.role)];
                });
            });
        };
        MessagesController_1.prototype.addGroupMember = function (id, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.addGroupMember(id, dto)];
                });
            });
        };
        MessagesController_1.prototype.removeGroupMember = function (groupId, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.removeGroupMember(groupId, userId, userType)];
                });
            });
        };
        MessagesController_1.prototype.deleteGroup = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.deleteGroup(id, req.user.id, req.user.role)];
                });
            });
        };
        // ============= AMIS =============
        MessagesController_1.prototype.sendFriendRequest = function (dto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.sendFriendRequest(req.user.id, dto)];
                });
            });
        };
        MessagesController_1.prototype.acceptFriendRequest = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.respondToFriendRequest(id, req.user.id, true)];
                });
            });
        };
        MessagesController_1.prototype.rejectFriendRequest = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.respondToFriendRequest(id, req.user.id, false)];
                });
            });
        };
        MessagesController_1.prototype.getFriends = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getFriends(req.user.id)];
                });
            });
        };
        MessagesController_1.prototype.getPendingRequests = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.getPendingRequests(req.user.id)];
                });
            });
        };
        MessagesController_1.prototype.blockUser = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.blockUser(id, req.user.id)];
                });
            });
        };
        MessagesController_1.prototype.removeFriend = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messagesService.removeFriend(id, req.user.id)];
                });
            });
        };
        return MessagesController_1;
    }());
    __setFunctionName(_classThis, "MessagesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sendMessage_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Envoyer un message privé ou de groupe' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Message envoyé', type: message_entity_1.Message })];
        _getConversations_decorators = [(0, common_1.Get)('conversations'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les conversations de l\'utilisateur' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des conversations' })];
        _getConversation_decorators = [(0, common_1.Get)('conversation/:otherUserId/:otherUserType'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer une conversation privée' }), (0, swagger_1.ApiParam)({ name: 'otherUserId', description: 'ID de l\'autre utilisateur' }), (0, swagger_1.ApiParam)({ name: 'otherUserType', description: 'Type de l\'autre utilisateur (STUDENT/ADMIN)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages de la conversation' })];
        _markAsRead_decorators = [(0, common_1.Patch)(':id/read'), (0, swagger_1.ApiOperation)({ summary: 'Marquer un message comme lu' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du message' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Message marqué comme lu' })];
        _markConversationAsRead_decorators = [(0, common_1.Patch)('conversation/:otherUserId/:otherUserType/read'), (0, swagger_1.ApiOperation)({ summary: 'Marquer tous les messages d\'une conversation comme lus' }), (0, swagger_1.ApiParam)({ name: 'otherUserId', description: 'ID de l\'autre utilisateur' }), (0, swagger_1.ApiParam)({ name: 'otherUserType', description: 'Type de l\'autre utilisateur (STUDENT/ADMIN)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation marquée comme lue' })];
        _markGroupMessagesAsRead_decorators = [(0, common_1.Patch)('groups/:groupId/read'), (0, swagger_1.ApiOperation)({ summary: 'Marquer tous les messages d\'un groupe comme lus' }), (0, swagger_1.ApiParam)({ name: 'groupId', description: 'ID du groupe' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages du groupe marqués comme lus' })];
        _createGroup_decorators = [(0, common_1.Post)('groups'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Créer un groupe' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Groupe créé', type: goup_entity_1.Group })];
        _getUserGroups_decorators = [(0, common_1.Get)('groups'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer les groupes de l\'utilisateur' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des groupes' })];
        _getGroup_decorators = [(0, common_1.Get)('groups/:id'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer un groupe' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du groupe' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Détails du groupe', type: goup_entity_1.Group })];
        _getGroupMessages_decorators = [(0, common_1.Get)('groups/:id/messages'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer les messages d\'un groupe' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du groupe' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages du groupe' })];
        _addGroupMember_decorators = [(0, common_1.Post)('groups/:id/members'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Ajouter un membre à un groupe' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du groupe' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Membre ajouté' })];
        _removeGroupMember_decorators = [(0, common_1.Delete)('groups/:groupId/members/:userId/:userType'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Retirer un membre d\'un groupe' }), (0, swagger_1.ApiParam)({ name: 'groupId', description: 'ID du groupe' }), (0, swagger_1.ApiParam)({ name: 'userId', description: 'ID de l\'utilisateur' }), (0, swagger_1.ApiParam)({ name: 'userType', description: 'Type d\'utilisateur' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Membre retiré' })];
        _deleteGroup_decorators = [(0, common_1.Delete)('groups/:id'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Supprimer un groupe' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du groupe' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Groupe supprimé' })];
        _sendFriendRequest_decorators = [(0, common_1.Post)('friends/request'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Envoyer une demande d\'ami' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Demande envoyée', type: friend_entity_1.Friend })];
        _acceptFriendRequest_decorators = [(0, common_1.Patch)('friends/:id/accept'), (0, swagger_1.ApiOperation)({ summary: 'Accepter une demande d\'ami' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la demande' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Demande acceptée', type: friend_entity_1.Friend })];
        _rejectFriendRequest_decorators = [(0, common_1.Patch)('friends/:id/reject'), (0, swagger_1.ApiOperation)({ summary: 'Rejeter une demande d\'ami' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la demande' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Demande rejetée', type: friend_entity_1.Friend })];
        _getFriends_decorators = [(0, common_1.Get)('friends'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des amis' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des amis' })];
        _getPendingRequests_decorators = [(0, common_1.Get)('friends/pending'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer les demandes d\'ami en attente' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Demandes en attente' })];
        _blockUser_decorators = [(0, common_1.Patch)('friends/:id/block'), (0, swagger_1.ApiOperation)({ summary: 'Bloquer un utilisateur' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la relation ami' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur bloqué', type: friend_entity_1.Friend })];
        _removeFriend_decorators = [(0, common_1.Delete)('friends/:id'), (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT), (0, swagger_1.ApiOperation)({ summary: 'Supprimer un ami' }), (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la relation ami' }), (0, swagger_1.ApiResponse)({ status: 204, description: 'Ami supprimé' })];
        __esDecorate(_classThis, null, _sendMessage_decorators, { kind: "method", name: "sendMessage", static: false, private: false, access: { has: function (obj) { return "sendMessage" in obj; }, get: function (obj) { return obj.sendMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getConversations_decorators, { kind: "method", name: "getConversations", static: false, private: false, access: { has: function (obj) { return "getConversations" in obj; }, get: function (obj) { return obj.getConversations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getConversation_decorators, { kind: "method", name: "getConversation", static: false, private: false, access: { has: function (obj) { return "getConversation" in obj; }, get: function (obj) { return obj.getConversation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAsRead_decorators, { kind: "method", name: "markAsRead", static: false, private: false, access: { has: function (obj) { return "markAsRead" in obj; }, get: function (obj) { return obj.markAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markConversationAsRead_decorators, { kind: "method", name: "markConversationAsRead", static: false, private: false, access: { has: function (obj) { return "markConversationAsRead" in obj; }, get: function (obj) { return obj.markConversationAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markGroupMessagesAsRead_decorators, { kind: "method", name: "markGroupMessagesAsRead", static: false, private: false, access: { has: function (obj) { return "markGroupMessagesAsRead" in obj; }, get: function (obj) { return obj.markGroupMessagesAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createGroup_decorators, { kind: "method", name: "createGroup", static: false, private: false, access: { has: function (obj) { return "createGroup" in obj; }, get: function (obj) { return obj.createGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserGroups_decorators, { kind: "method", name: "getUserGroups", static: false, private: false, access: { has: function (obj) { return "getUserGroups" in obj; }, get: function (obj) { return obj.getUserGroups; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroup_decorators, { kind: "method", name: "getGroup", static: false, private: false, access: { has: function (obj) { return "getGroup" in obj; }, get: function (obj) { return obj.getGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroupMessages_decorators, { kind: "method", name: "getGroupMessages", static: false, private: false, access: { has: function (obj) { return "getGroupMessages" in obj; }, get: function (obj) { return obj.getGroupMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addGroupMember_decorators, { kind: "method", name: "addGroupMember", static: false, private: false, access: { has: function (obj) { return "addGroupMember" in obj; }, get: function (obj) { return obj.addGroupMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeGroupMember_decorators, { kind: "method", name: "removeGroupMember", static: false, private: false, access: { has: function (obj) { return "removeGroupMember" in obj; }, get: function (obj) { return obj.removeGroupMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteGroup_decorators, { kind: "method", name: "deleteGroup", static: false, private: false, access: { has: function (obj) { return "deleteGroup" in obj; }, get: function (obj) { return obj.deleteGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendFriendRequest_decorators, { kind: "method", name: "sendFriendRequest", static: false, private: false, access: { has: function (obj) { return "sendFriendRequest" in obj; }, get: function (obj) { return obj.sendFriendRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _acceptFriendRequest_decorators, { kind: "method", name: "acceptFriendRequest", static: false, private: false, access: { has: function (obj) { return "acceptFriendRequest" in obj; }, get: function (obj) { return obj.acceptFriendRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectFriendRequest_decorators, { kind: "method", name: "rejectFriendRequest", static: false, private: false, access: { has: function (obj) { return "rejectFriendRequest" in obj; }, get: function (obj) { return obj.rejectFriendRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFriends_decorators, { kind: "method", name: "getFriends", static: false, private: false, access: { has: function (obj) { return "getFriends" in obj; }, get: function (obj) { return obj.getFriends; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPendingRequests_decorators, { kind: "method", name: "getPendingRequests", static: false, private: false, access: { has: function (obj) { return "getPendingRequests" in obj; }, get: function (obj) { return obj.getPendingRequests; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _blockUser_decorators, { kind: "method", name: "blockUser", static: false, private: false, access: { has: function (obj) { return "blockUser" in obj; }, get: function (obj) { return obj.blockUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFriend_decorators, { kind: "method", name: "removeFriend", static: false, private: false, access: { has: function (obj) { return "removeFriend" in obj; }, get: function (obj) { return obj.removeFriend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagesController = _classThis;
}();
exports.MessagesController = MessagesController;
