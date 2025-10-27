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
exports.MessagesService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var message_entity_1 = require("./entities/message.entity");
var friend_entity_1 = require("./entities/friend.entity");
var MessagesService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MessagesService = _classThis = /** @class */ (function () {
        function MessagesService_1(messageRepository, groupRepository, groupMemberRepository, friendRepository, userRepository, websocketGateway, fcmTokensService, fcmService) {
            this.messageRepository = messageRepository;
            this.groupRepository = groupRepository;
            this.groupMemberRepository = groupMemberRepository;
            this.friendRepository = friendRepository;
            this.userRepository = userRepository;
            this.websocketGateway = websocketGateway;
            this.fcmTokensService = fcmTokensService;
            this.fcmService = fcmService;
            this.logger = new common_1.Logger(MessagesService.name);
        }
        // ============= MESSAGES =============
        MessagesService_1.prototype.sendMessage = function (createMessageDto, senderId, senderType) {
            return __awaiter(this, void 0, void 0, function () {
                var receiver, isMember, friendship, message, savedMessage, sender, senderName, members, memberIds, sent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("\uD83D\uDCE8 Tentative d'envoi de message: \u00C9metteur ".concat(senderId, " (").concat(senderType, ")"));
                            this.logger.debug("\uD83D\uDCDD Contenu du DTO: ".concat(JSON.stringify(createMessageDto)));
                            // Validation: message privé OU groupe, pas les deux
                            if (createMessageDto.groupId && createMessageDto.receiverId) {
                                this.logger.warn("\u274C Tentative d'envoi \u00E0 la fois priv\u00E9 et de groupe");
                                throw new common_1.BadRequestException('Un message ne peut pas être à la fois privé et de groupe');
                            }
                            if (!createMessageDto.groupId && !createMessageDto.receiverId) {
                                this.logger.warn("\u274C Aucun destinataire sp\u00E9cifi\u00E9");
                                throw new common_1.BadRequestException('Vous devez spécifier soit un destinataire, soit un groupe');
                            }
                            if (!(createMessageDto.receiverId && !createMessageDto.receiverType)) return [3 /*break*/, 2];
                            this.logger.debug("\uD83D\uDD0D R\u00E9cup\u00E9ration automatique du type pour l'utilisateur ".concat(createMessageDto.receiverId));
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { id: createMessageDto.receiverId },
                                    select: ['id', 'role'],
                                })];
                        case 1:
                            receiver = _a.sent();
                            if (!receiver) {
                                this.logger.warn("\u274C Destinataire non trouv\u00E9: ID ".concat(createMessageDto.receiverId));
                                throw new common_1.NotFoundException('Destinataire non trouvé');
                            }
                            // Convertir le role en ReceiverType
                            createMessageDto.receiverType = receiver.role;
                            this.logger.debug("\u2705 Type r\u00E9cup\u00E9r\u00E9 automatiquement: ".concat(createMessageDto.receiverType));
                            _a.label = 2;
                        case 2:
                            if (!createMessageDto.groupId) return [3 /*break*/, 4];
                            this.logger.debug("\uD83D\uDC65 V\u00E9rification de l'appartenance au groupe ".concat(createMessageDto.groupId));
                            return [4 /*yield*/, this.groupMemberRepository.findOne({
                                    where: {
                                        groupId: createMessageDto.groupId,
                                        userId: senderId,
                                        userType: senderType,
                                    },
                                })];
                        case 3:
                            isMember = _a.sent();
                            if (!isMember) {
                                this.logger.warn("\u26D4 Utilisateur ".concat(senderId, " n'est pas membre du groupe ").concat(createMessageDto.groupId));
                                throw new common_1.ForbiddenException('Vous n\'êtes pas membre de ce groupe');
                            }
                            this.logger.debug("\u2705 Membre du groupe v\u00E9rifi\u00E9");
                            _a.label = 4;
                        case 4:
                            if (!(createMessageDto.receiverId && senderType === message_entity_1.SenderType.STUDENT)) return [3 /*break*/, 8];
                            this.logger.debug("\uD83D\uDD0D Message priv\u00E9 vers utilisateur ".concat(createMessageDto.receiverId, ", type: ").concat(createMessageDto.receiverType));
                            if (!(senderId !== createMessageDto.receiverId)) return [3 /*break*/, 6];
                            this.logger.debug("\uD83D\uDC65 V\u00E9rification de la relation d'amiti\u00E9 entre ".concat(senderId, " et ").concat(createMessageDto.receiverId));
                            return [4 /*yield*/, this.friendRepository
                                    .createQueryBuilder('friend')
                                    .where('((friend.requesterId = :senderId AND friend.studentId = :receiverId) OR ' +
                                    '(friend.requesterId = :receiverId AND friend.studentId = :senderId)) AND ' +
                                    'friend.status = :status', {
                                    senderId: senderId,
                                    receiverId: createMessageDto.receiverId,
                                    status: friend_entity_1.FriendStatus.ACCEPTED,
                                })
                                    .getOne()];
                        case 5:
                            friendship = _a.sent();
                            if (!friendship) {
                                this.logger.warn("\u274C Pas de relation d'amiti\u00E9 entre ".concat(senderId, " et ").concat(createMessageDto.receiverId));
                                throw new common_1.ForbiddenException('Vous ne pouvez envoyer des messages qu\'à vos amis. Envoyez d\'abord une demande d\'ami.');
                            }
                            this.logger.debug("\u2705 Relation d'amiti\u00E9 v\u00E9rifi\u00E9e (ID: ".concat(friendship.id, ")"));
                            // Vérifier que la relation n'est pas bloquée
                            if (friendship.status === friend_entity_1.FriendStatus.BLOCKED) {
                                this.logger.warn("\uD83D\uDEAB Relation bloqu\u00E9e entre ".concat(senderId, " et ").concat(createMessageDto.receiverId));
                                throw new common_1.ForbiddenException('Impossible d\'envoyer un message à cet utilisateur');
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            this.logger.debug("\uD83D\uDCDD Message \u00E0 soi-m\u00EAme autoris\u00E9");
                            _a.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            if (createMessageDto.receiverId && senderType !== message_entity_1.SenderType.STUDENT) {
                                this.logger.debug("\uD83D\uDC6E Message de ".concat(senderType, " vers ").concat(createMessageDto.receiverId, " - Pas de v\u00E9rification d'amiti\u00E9"));
                            }
                            _a.label = 9;
                        case 9:
                            message = this.messageRepository.create(__assign(__assign({}, createMessageDto), { senderId: senderId, senderType: senderType }));
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 10:
                            savedMessage = _a.sent();
                            this.logger.log("\uD83D\uDCBE Message sauvegard\u00E9: ID ".concat(savedMessage.id));
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { id: senderId },
                                    select: ['id', 'firstName', 'lastName'],
                                })];
                        case 11:
                            sender = _a.sent();
                            senderName = sender ? "".concat(sender.firstName, " ").concat(sender.lastName) : 'Un utilisateur';
                            if (!savedMessage.groupId) return [3 /*break*/, 13];
                            // Message de groupe
                            this.logger.debug("\uD83D\uDCE2 Envoi du message au groupe ".concat(savedMessage.groupId));
                            return [4 /*yield*/, this.groupMemberRepository.find({
                                    where: { groupId: savedMessage.groupId },
                                })];
                        case 12:
                            members = _a.sent();
                            memberIds = members.map(function (m) { return m.userId; }).filter(function (id) { return id !== senderId; });
                            this.logger.debug("\uD83D\uDC65 ".concat(memberIds.length, " membre(s) \u00E0 notifier: ").concat(memberIds.join(', ')));
                            // WebSocket
                            this.logger.log("\uD83D\uDE80 ENVOI WEBSOCKET GROUPE: Message ".concat(savedMessage.id, " vers ").concat(memberIds.length, " membres du groupe ").concat(savedMessage.groupId));
                            this.websocketGateway.sendMessageToGroup(memberIds, 'message:new', savedMessage);
                            this.logger.log("\uD83D\uDCE1 Message envoy\u00E9 aux membres: ".concat(memberIds.join(', ')));
                            // Notification push pour les membres du groupe
                            this.sendPushNotificationToUsers(memberIds, senderName, savedMessage.messageContent, 'group', savedMessage.groupId.toString());
                            return [3 /*break*/, 14];
                        case 13:
                            if (savedMessage.receiverId) {
                                // Message privé
                                this.logger.debug("\uD83D\uDCE4 Envoi du message priv\u00E9 \u00E0 l'utilisateur ".concat(savedMessage.receiverId));
                                // WebSocket
                                this.logger.log("\uD83D\uDE80 ENVOI WEBSOCKET: Message ".concat(savedMessage.id, " vers utilisateur ").concat(savedMessage.receiverId));
                                sent = this.websocketGateway.sendMessageToUser(savedMessage.receiverId, 'message:new', savedMessage);
                                this.logger.log("\uD83D\uDCE1 R\u00E9sultat envoi WebSocket: ".concat(sent ? 'SUCCÈS' : 'ÉCHEC', " (utilisateur ").concat(savedMessage.receiverId, " ").concat(sent ? 'connecté' : 'déconnecté', ")"));
                                // Notification push pour le destinataire
                                this.sendPushNotificationToUsers([savedMessage.receiverId], senderName, savedMessage.messageContent, 'private', senderId.toString());
                            }
                            _a.label = 14;
                        case 14:
                            this.logger.log("\u2705 Message envoy\u00E9 avec succ\u00E8s: ID ".concat(savedMessage.id, " de ").concat(senderId, " vers ").concat(savedMessage.groupId ? 'groupe ' + savedMessage.groupId : 'utilisateur ' + savedMessage.receiverId));
                            return [2 /*return*/, savedMessage];
                    }
                });
            });
        };
        MessagesService_1.prototype.getConversation = function (userId, userType, otherUserId, otherUserType) {
            return __awaiter(this, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("\uD83D\uDCAC R\u00E9cup\u00E9ration de la conversation entre ".concat(userId, " et ").concat(otherUserId));
                            return [4 /*yield*/, this.messageRepository
                                    .createQueryBuilder('message')
                                    .leftJoinAndSelect('message.sender', 'sender')
                                    .leftJoinAndSelect('message.receiver', 'receiver')
                                    .where('((message.senderId = :userId AND message.senderType = :userType AND message.receiverId = :otherUserId AND message.receiverType = :otherUserType) OR ' +
                                    '(message.senderId = :otherUserId AND message.senderType = :otherUserType AND message.receiverId = :userId AND message.receiverType = :userType))', { userId: userId, userType: userType, otherUserId: otherUserId, otherUserType: otherUserType })
                                    .orderBy('message.sentAt', 'ASC')
                                    .getMany()];
                        case 1:
                            messages = _a.sent();
                            this.logger.log("\uD83D\uDCE8 ".concat(messages.length, " message(s) dans la conversation"));
                            return [2 /*return*/, messages];
                    }
                });
            });
        };
        MessagesService_1.prototype.getGroupMessages = function (groupId, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var isMember, messages;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("\uD83D\uDC65 R\u00E9cup\u00E9ration des messages du groupe ".concat(groupId, " pour l'utilisateur ").concat(userId));
                            return [4 /*yield*/, this.groupMemberRepository.findOne({
                                    where: { groupId: groupId, userId: userId, userType: userType },
                                })];
                        case 1:
                            isMember = _a.sent();
                            if (!isMember) {
                                this.logger.warn("\u26D4 Utilisateur ".concat(userId, " n'est pas membre du groupe ").concat(groupId));
                                throw new common_1.ForbiddenException('Vous n\'êtes pas membre de ce groupe');
                            }
                            return [4 /*yield*/, this.messageRepository
                                    .createQueryBuilder('message')
                                    .leftJoinAndSelect('message.sender', 'sender')
                                    .leftJoinAndSelect('message.group', 'group')
                                    .where('message.groupId = :groupId', { groupId: groupId })
                                    .orderBy('message.sentAt', 'ASC')
                                    .getMany()];
                        case 2:
                            messages = _a.sent();
                            this.logger.log("\uD83D\uDCE8 ".concat(messages.length, " message(s) dans le groupe ").concat(groupId));
                            return [2 /*return*/, messages];
                    }
                });
            });
        };
        MessagesService_1.prototype.getUserConversations = function (userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var messages, conversationsMap, _i, messages_1, message, key, otherUserId, otherUserType, otherUser, conversations, _a, conversations_1, conversation, unreadCount;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this.logger.debug("\uD83D\uDCCB R\u00E9cup\u00E9ration des conversations pour l'utilisateur ".concat(userId, " (").concat(userType, ")"));
                            return [4 /*yield*/, this.messageRepository
                                    .createQueryBuilder('message')
                                    .leftJoinAndSelect('message.sender', 'sender')
                                    .leftJoinAndSelect('message.receiver', 'receiver')
                                    .where('message.senderId = :userId AND message.senderType = :userType', { userId: userId, userType: userType })
                                    .orWhere('message.receiverId = :userId AND message.receiverType = :userType', { userId: userId, userType: userType })
                                    .orderBy('message.sentAt', 'DESC')
                                    .getMany()];
                        case 1:
                            messages = _d.sent();
                            this.logger.debug("\uD83D\uDCE8 ".concat(messages.length, " message(s) trouv\u00E9(s)"));
                            conversationsMap = new Map();
                            for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                                message = messages_1[_i];
                                key = void 0;
                                otherUserId = void 0;
                                otherUserType = void 0;
                                otherUser = void 0;
                                if (message.senderId === userId && message.senderType === userType) {
                                    // Je suis l'émetteur, donc l'autre utilisateur est le destinataire
                                    otherUserId = message.receiverId;
                                    otherUserType = message.receiverType;
                                    otherUser = message.receiver;
                                }
                                else {
                                    // Je suis le destinataire, donc l'autre utilisateur est l'émetteur
                                    otherUserId = message.senderId;
                                    otherUserType = message.senderType;
                                    otherUser = message.sender;
                                }
                                key = "".concat(otherUserId, "-").concat(otherUserType);
                                if (!conversationsMap.has(key)) {
                                    conversationsMap.set(key, {
                                        otherUserId: otherUserId,
                                        otherUserType: otherUserType,
                                        otherUser: otherUser ? {
                                            id: otherUser.id,
                                            firstName: otherUser.firstName,
                                            lastName: otherUser.lastName,
                                            fullName: "".concat(otherUser.firstName, " ").concat(otherUser.lastName),
                                            email: otherUser.email,
                                            role: otherUser.role,
                                            profilePicture: otherUser.profilePicture,
                                            status: otherUser.status,
                                            studentId: otherUser.studentId,
                                            level: otherUser.level,
                                            roomNumber: otherUser.roomNumber,
                                        } : null,
                                        lastMessage: message,
                                        unreadCount: 0,
                                    });
                                    if (otherUser) {
                                        this.logger.debug("\u2705 Conversation avec ".concat(otherUser.firstName, " ").concat(otherUser.lastName));
                                    }
                                }
                            }
                            conversations = Array.from(conversationsMap.values());
                            _a = 0, conversations_1 = conversations;
                            _d.label = 2;
                        case 2:
                            if (!(_a < conversations_1.length)) return [3 /*break*/, 5];
                            conversation = conversations_1[_a];
                            return [4 /*yield*/, this.messageRepository.count({
                                    where: {
                                        senderId: conversation.otherUserId,
                                        senderType: conversation.otherUserType,
                                        receiverId: userId,
                                        receiverType: userType,
                                        isRead: false,
                                    },
                                })];
                        case 3:
                            unreadCount = _d.sent();
                            conversation.unreadCount = unreadCount;
                            if (unreadCount > 0) {
                                this.logger.debug("\uD83D\uDCEC ".concat(unreadCount, " message(s) non lu(s) avec ").concat((_b = conversation.otherUser) === null || _b === void 0 ? void 0 : _b.firstName, " ").concat((_c = conversation.otherUser) === null || _c === void 0 ? void 0 : _c.lastName));
                            }
                            _d.label = 4;
                        case 4:
                            _a++;
                            return [3 /*break*/, 2];
                        case 5:
                            this.logger.log("\uD83D\uDCAC ".concat(conversations.length, " conversation(s) r\u00E9cup\u00E9r\u00E9e(s) pour l'utilisateur ").concat(userId));
                            return [2 /*return*/, conversations];
                    }
                });
            });
        };
        MessagesService_1.prototype.markAsRead = function (messageId, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository.findOne({
                                where: { id: messageId },
                            })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException('Message non trouvé');
                            }
                            // Seul le destinataire peut marquer comme lu
                            if (message.receiverId !== userId || message.receiverType !== userType) {
                                throw new common_1.ForbiddenException('Vous ne pouvez marquer que vos propres messages comme lus');
                            }
                            message.isRead = true;
                            return [4 /*yield*/, this.messageRepository.save(message)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MessagesService_1.prototype.markConversationAsRead = function (otherUserId, otherUserType, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository.update({
                                senderId: otherUserId,
                                senderType: otherUserType,
                                receiverId: userId,
                                receiverType: userType,
                                isRead: false,
                            }, {
                                isRead: true,
                            })];
                        case 1:
                            _a.sent();
                            this.logger.debug("\u2705 Messages marqu\u00E9s comme lus pour la conversation avec ".concat(otherUserId));
                            return [2 /*return*/];
                    }
                });
            });
        };
        MessagesService_1.prototype.markGroupMessagesAsRead = function (groupId, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageRepository.update({
                                groupId: groupId,
                                senderId: (0, typeorm_1.Not)(userId), // Messages pas envoyés par l'utilisateur
                                isRead: false,
                            }, {
                                isRead: true,
                            })];
                        case 1:
                            _a.sent();
                            this.logger.debug("\u2705 Messages marqu\u00E9s comme lus pour le groupe ".concat(groupId));
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ============= GROUPES =============
        MessagesService_1.prototype.createGroup = function (createGroupDto, creatorId, creatorType) {
            return __awaiter(this, void 0, void 0, function () {
                var group, savedGroup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            group = this.groupRepository.create(__assign(__assign({}, createGroupDto), { createdBy: creatorId, creatorType: creatorType }));
                            return [4 /*yield*/, this.groupRepository.save(group)];
                        case 1:
                            savedGroup = _a.sent();
                            // Ajouter le créateur comme membre
                            return [4 /*yield*/, this.addGroupMember(savedGroup.id, {
                                    userId: creatorId,
                                    userType: creatorType,
                                })];
                        case 2:
                            // Ajouter le créateur comme membre
                            _a.sent();
                            return [2 /*return*/, savedGroup];
                    }
                });
            });
        };
        MessagesService_1.prototype.getGroup = function (groupId) {
            return __awaiter(this, void 0, void 0, function () {
                var group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.groupRepository.findOne({
                                where: { id: groupId },
                                relations: ['members'],
                            })];
                        case 1:
                            group = _a.sent();
                            if (!group) {
                                throw new common_1.NotFoundException('Groupe non trouvé');
                            }
                            return [2 /*return*/, group];
                    }
                });
            });
        };
        MessagesService_1.prototype.getUserGroups = function (userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var members, groups, _i, groups_1, group, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.groupMemberRepository.find({
                                where: { userId: userId, userType: userType },
                                relations: ['group', 'group.members'],
                            })];
                        case 1:
                            members = _a.sent();
                            groups = members.map(function (member) { return member.group; });
                            _i = 0, groups_1 = groups;
                            _a.label = 2;
                        case 2:
                            if (!(_i < groups_1.length)) return [3 /*break*/, 5];
                            group = groups_1[_i];
                            return [4 /*yield*/, this.messageRepository.count({
                                    where: {
                                        groupId: group.id,
                                        senderId: (0, typeorm_1.Not)(userId), // Messages pas envoyés par l'utilisateur
                                        isRead: false,
                                    },
                                })];
                        case 3:
                            unreadCount = _a.sent();
                            // Ajouter la propriété unreadCount au groupe
                            group.unreadCount = unreadCount;
                            if (unreadCount > 0) {
                                this.logger.debug("\uD83D\uDCEC ".concat(unreadCount, " message(s) non lu(s) dans le groupe ").concat(group.groupName));
                            }
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, groups];
                    }
                });
            });
        };
        MessagesService_1.prototype.addGroupMember = function (groupId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var group, existingMember, member;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.groupRepository.findOne({ where: { id: groupId } })];
                        case 1:
                            group = _a.sent();
                            if (!group) {
                                throw new common_1.NotFoundException('Groupe non trouvé');
                            }
                            return [4 /*yield*/, this.groupMemberRepository.findOne({
                                    where: {
                                        groupId: groupId,
                                        userId: dto.userId,
                                        userType: dto.userType,
                                    },
                                })];
                        case 2:
                            existingMember = _a.sent();
                            if (existingMember) {
                                throw new common_1.BadRequestException('Cet utilisateur est déjà membre du groupe');
                            }
                            member = this.groupMemberRepository.create(__assign({ groupId: groupId }, dto));
                            return [4 /*yield*/, this.groupMemberRepository.save(member)];
                        case 3: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MessagesService_1.prototype.removeGroupMember = function (groupId, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var member;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.groupMemberRepository.findOne({
                                where: { groupId: groupId, userId: userId, userType: userType },
                            })];
                        case 1:
                            member = _a.sent();
                            if (!member) {
                                throw new common_1.NotFoundException('Membre non trouvé dans ce groupe');
                            }
                            return [4 /*yield*/, this.groupMemberRepository.remove(member)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MessagesService_1.prototype.deleteGroup = function (groupId, userId, userType) {
            return __awaiter(this, void 0, void 0, function () {
                var group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.groupRepository.findOne({ where: { id: groupId } })];
                        case 1:
                            group = _a.sent();
                            if (!group) {
                                throw new common_1.NotFoundException('Groupe non trouvé');
                            }
                            // Seul le créateur peut supprimer le groupe
                            if (group.createdBy !== userId || group.creatorType !== userType) {
                                throw new common_1.ForbiddenException('Seul le créateur peut supprimer ce groupe');
                            }
                            return [4 /*yield*/, this.groupRepository.remove(group)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ============= AMIS =============
        MessagesService_1.prototype.sendFriendRequest = function (requesterId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingFriend, friendRequest, saved;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("\uD83D\uDCE4 Tentative d'envoi de demande d'ami: Utilisateur ".concat(requesterId, " -> Utilisateur ").concat(dto.studentId));
                            // Vérifier qu'on ne s'ajoute pas soi-même
                            if (requesterId === dto.studentId) {
                                this.logger.warn("\u274C L'utilisateur ".concat(requesterId, " a tent\u00E9 de s'ajouter lui-m\u00EAme"));
                                throw new common_1.BadRequestException('Vous ne pouvez pas vous ajouter vous-même');
                            }
                            return [4 /*yield*/, this.friendRepository
                                    .createQueryBuilder('friend')
                                    .where('((friend.requesterId = :requesterId AND friend.studentId = :studentId) OR ' +
                                    '(friend.requesterId = :studentId AND friend.studentId = :requesterId))', { requesterId: requesterId, studentId: dto.studentId })
                                    .getOne()];
                        case 1:
                            existingFriend = _a.sent();
                            if (!existingFriend) return [3 /*break*/, 5];
                            this.logger.debug("\uD83D\uDD0D Relation existante trouv\u00E9e: ID ".concat(existingFriend.id, ", Status: ").concat(existingFriend.status));
                            if (!(existingFriend.status === friend_entity_1.FriendStatus.REJECTED)) return [3 /*break*/, 3];
                            this.logger.log("\u267B\uFE0F Suppression de l'ancienne demande rejet\u00E9e (ID: ".concat(existingFriend.id, ")"));
                            return [4 /*yield*/, this.friendRepository.remove(existingFriend)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            if (existingFriend.status === friend_entity_1.FriendStatus.PENDING) {
                                this.logger.warn("\u23F3 Demande d\u00E9j\u00E0 en attente entre ".concat(requesterId, " et ").concat(dto.studentId));
                                throw new common_1.BadRequestException('Une demande d\'ami est déjà en attente avec cet utilisateur');
                            }
                            else if (existingFriend.status === friend_entity_1.FriendStatus.ACCEPTED) {
                                this.logger.warn("\u2705 Les utilisateurs ".concat(requesterId, " et ").concat(dto.studentId, " sont d\u00E9j\u00E0 amis"));
                                throw new common_1.BadRequestException('Vous êtes déjà ami avec cet utilisateur');
                            }
                            else if (existingFriend.status === friend_entity_1.FriendStatus.BLOCKED) {
                                this.logger.warn("\uD83D\uDEAB Tentative d'envoi \u00E0 un utilisateur bloqu\u00E9: ".concat(dto.studentId));
                                throw new common_1.BadRequestException('Cet utilisateur est bloqué');
                            }
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            this.logger.debug("\u2728 Aucune relation existante trouv\u00E9e");
                            _a.label = 6;
                        case 6:
                            friendRequest = this.friendRepository.create({
                                requesterId: requesterId,
                                studentId: dto.studentId,
                                status: friend_entity_1.FriendStatus.PENDING,
                            });
                            return [4 /*yield*/, this.friendRepository.save(friendRequest)];
                        case 7:
                            saved = _a.sent();
                            this.logger.log("\u2705 Demande d'ami cr\u00E9\u00E9e avec succ\u00E8s: ID ".concat(saved.id, ", de ").concat(requesterId, " vers ").concat(dto.studentId));
                            return [2 /*return*/, saved];
                    }
                });
            });
        };
        MessagesService_1.prototype.respondToFriendRequest = function (friendId, studentId, accept) {
            return __awaiter(this, void 0, void 0, function () {
                var friendRequest, saved;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("\uD83D\uDCE9 Traitement demande d'ami: ID ".concat(friendId, ", Utilisateur ").concat(studentId, ", Action: ").concat(accept ? 'ACCEPTER' : 'REJETER'));
                            return [4 /*yield*/, this.friendRepository.findOne({
                                    where: { id: friendId, studentId: studentId },
                                })];
                        case 1:
                            friendRequest = _a.sent();
                            if (!friendRequest) {
                                this.logger.warn("\u274C Demande d'ami non trouv\u00E9e: ID ".concat(friendId, " pour utilisateur ").concat(studentId));
                                throw new common_1.NotFoundException('Demande d\'ami non trouvée');
                            }
                            if (friendRequest.status !== friend_entity_1.FriendStatus.PENDING) {
                                this.logger.warn("\u26A0\uFE0F Demande d\u00E9j\u00E0 trait\u00E9e: ID ".concat(friendId, ", Status actuel: ").concat(friendRequest.status));
                                throw new common_1.BadRequestException('Cette demande a déjà été traitée');
                            }
                            friendRequest.status = accept ? friend_entity_1.FriendStatus.ACCEPTED : friend_entity_1.FriendStatus.REJECTED;
                            return [4 /*yield*/, this.friendRepository.save(friendRequest)];
                        case 2:
                            saved = _a.sent();
                            this.logger.log("".concat(accept ? '✅ Demande acceptée' : '❌ Demande rejetée', ": ID ").concat(friendId, ", entre ").concat(friendRequest.requesterId, " et ").concat(studentId));
                            return [2 /*return*/, saved];
                    }
                });
            });
        };
        MessagesService_1.prototype.getFriends = function (studentId) {
            return __awaiter(this, void 0, void 0, function () {
                var friends;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("\uD83D\uDCCB R\u00E9cup\u00E9ration de la liste d'amis pour l'utilisateur ".concat(studentId));
                            return [4 /*yield*/, this.friendRepository
                                    .createQueryBuilder('friend')
                                    .leftJoinAndSelect('friend.requester', 'requester')
                                    .leftJoinAndSelect('friend.student', 'student')
                                    .where('((friend.requesterId = :studentId OR friend.studentId = :studentId) AND friend.status = :status)', { studentId: studentId, status: friend_entity_1.FriendStatus.ACCEPTED })
                                    .getMany()];
                        case 1:
                            friends = _a.sent();
                            this.logger.log("\uD83D\uDC65 ".concat(friends.length, " ami(s) trouv\u00E9(s) pour l'utilisateur ").concat(studentId));
                            return [2 /*return*/, friends];
                    }
                });
            });
        };
        MessagesService_1.prototype.getPendingRequests = function (studentId) {
            return __awaiter(this, void 0, void 0, function () {
                var requests;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.debug("\u23F3 R\u00E9cup\u00E9ration des demandes en attente pour l'utilisateur ".concat(studentId));
                            return [4 /*yield*/, this.friendRepository.find({
                                    where: {
                                        studentId: studentId,
                                        status: friend_entity_1.FriendStatus.PENDING,
                                    },
                                    relations: ['requester', 'student'],
                                })];
                        case 1:
                            requests = _a.sent();
                            this.logger.log("\uD83D\uDCEC ".concat(requests.length, " demande(s) en attente pour l'utilisateur ").concat(studentId));
                            return [2 /*return*/, requests];
                    }
                });
            });
        };
        MessagesService_1.prototype.blockUser = function (friendId, studentId) {
            return __awaiter(this, void 0, void 0, function () {
                var friend, saved;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("\uD83D\uDEAB Tentative de blocage: Relation ID ".concat(friendId, " par utilisateur ").concat(studentId));
                            return [4 /*yield*/, this.friendRepository.findOne({
                                    where: { id: friendId },
                                })];
                        case 1:
                            friend = _a.sent();
                            if (!friend) {
                                this.logger.warn("\u274C Relation non trouv\u00E9e: ID ".concat(friendId));
                                throw new common_1.NotFoundException('Relation non trouvée');
                            }
                            // Vérifier que l'utilisateur est impliqué dans cette relation
                            if (friend.requesterId !== studentId && friend.studentId !== studentId) {
                                this.logger.warn("\u26D4 Tentative de blocage non autoris\u00E9e: Utilisateur ".concat(studentId, " sur relation ").concat(friendId));
                                throw new common_1.ForbiddenException('Vous ne pouvez pas bloquer cette relation');
                            }
                            friend.status = friend_entity_1.FriendStatus.BLOCKED;
                            return [4 /*yield*/, this.friendRepository.save(friend)];
                        case 2:
                            saved = _a.sent();
                            this.logger.log("\uD83D\uDEAB Utilisateur bloqu\u00E9: Relation ID ".concat(friendId));
                            return [2 /*return*/, saved];
                    }
                });
            });
        };
        MessagesService_1.prototype.removeFriend = function (friendId, studentId) {
            return __awaiter(this, void 0, void 0, function () {
                var friend;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("\uD83D\uDDD1\uFE0F Tentative de suppression d'ami: Relation ID ".concat(friendId, " par utilisateur ").concat(studentId));
                            return [4 /*yield*/, this.friendRepository.findOne({
                                    where: { id: friendId },
                                })];
                        case 1:
                            friend = _a.sent();
                            if (!friend) {
                                this.logger.warn("\u274C Ami non trouv\u00E9: ID ".concat(friendId));
                                throw new common_1.NotFoundException('Ami non trouvé');
                            }
                            // Vérifier que l'utilisateur est impliqué dans cette relation
                            if (friend.requesterId !== studentId && friend.studentId !== studentId) {
                                this.logger.warn("\u26D4 Tentative de suppression non autoris\u00E9e: Utilisateur ".concat(studentId, " sur relation ").concat(friendId));
                                throw new common_1.ForbiddenException('Vous ne pouvez pas supprimer cette relation');
                            }
                            return [4 /*yield*/, this.friendRepository.remove(friend)];
                        case 2:
                            _a.sent();
                            this.logger.log("\u2705 Ami supprim\u00E9: Relation ID ".concat(friendId, ", entre ").concat(friend.requesterId, " et ").concat(friend.studentId));
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ============= NOTIFICATIONS PUSH =============
        /**
         * Envoyer une notification push aux utilisateurs
         * @param userIds - Liste des IDs des utilisateurs à notifier
         * @param senderName - Nom de l'émetteur
         * @param messageContent - Contenu du message
         * @param type - Type de notification ('private', 'group', ou 'exit')
         * @param referenceId - ID de référence (userId, groupId, ou exitId)
         */
        MessagesService_1.prototype.sendPushNotificationToUsers = function (userIds, senderName, messageContent, type, referenceId) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens, notification, response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0) {
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            this.logger.debug("\uD83D\uDD14 Envoi de notification push \u00E0 ".concat(userIds.length, " utilisateur(s)"));
                            return [4 /*yield*/, this.fcmTokensService.getTokensByUserIds(userIds)];
                        case 2:
                            tokens = _a.sent();
                            if (tokens.length === 0) {
                                this.logger.warn("\u26A0\uFE0F Aucun token trouv\u00E9 pour les utilisateurs: ".concat(userIds.join(', ')));
                                return [2 /*return*/];
                            }
                            this.logger.debug("\uD83D\uDCF1 ".concat(tokens.length, " token(s) trouv\u00E9(s)"));
                            notification = {
                                title: senderName,
                                body: messageContent.length > 100
                                    ? messageContent.substring(0, 100) + '...'
                                    : messageContent,
                                data: {
                                    type: type,
                                    referenceId: referenceId,
                                    timestamp: new Date().toISOString(),
                                },
                            };
                            return [4 /*yield*/, this.fcmService.sendToMultipleTokens(tokens, notification)];
                        case 3:
                            response = _a.sent();
                            this.logger.log("\u2705 Notification push envoy\u00E9e: ".concat(response.successCount, " r\u00E9ussie(s), ").concat(response.failureCount, " \u00E9chou\u00E9e(s)"));
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            // Ne pas bloquer l'envoi du message si la notification échoue
                            this.logger.error("\u274C Erreur lors de l'envoi de la notification push:", error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return MessagesService_1;
    }());
    __setFunctionName(_classThis, "MessagesService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessagesService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessagesService = _classThis;
}();
exports.MessagesService = MessagesService;
