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
exports.NotificationsService = void 0;
var common_1 = require("@nestjs/common");
var userrole_1 = require("../enum/userrole");
var NotificationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationsService = _classThis = /** @class */ (function () {
        function NotificationsService_1(notificationRepository, userRepository, notificationsGateway) {
            this.notificationRepository = notificationRepository;
            this.userRepository = userRepository;
            this.notificationsGateway = notificationsGateway;
        }
        // Créer une notification et l'envoyer en temps réel
        NotificationsService_1.prototype.createAndNotify = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var notification, savedNotification, fullNotification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            notification = this.notificationRepository.create(data);
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 1:
                            savedNotification = _a.sent();
                            return [4 /*yield*/, this.notificationRepository.findOne({
                                    where: { id: savedNotification.id },
                                    relations: ['user', 'exit', 'exit.student'],
                                })];
                        case 2:
                            fullNotification = _a.sent();
                            if (!fullNotification) {
                                throw new Error('Notification not found after creation');
                            }
                            // Envoyer via WebSocket
                            this.notificationsGateway.notifyUser(data.userId, 'notification:new', {
                                id: fullNotification.id,
                                type: fullNotification.type,
                                title: fullNotification.title,
                                message: fullNotification.message,
                                exitId: fullNotification.exitId,
                                isRead: fullNotification.isRead,
                                createdAt: fullNotification.createdAt,
                                metadata: fullNotification.metadata,
                            });
                            return [2 /*return*/, fullNotification];
                    }
                });
            });
        };
        // Notifier tous les admins (pour les nouvelles sorties)
        NotificationsService_1.prototype.notifyAllAdmins = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var admins, notifications, _i, admins_1, admin, notification, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.find({
                                where: { role: userrole_1.UserRole.ADMIN, isActive: true },
                            })];
                        case 1:
                            admins = _a.sent();
                            console.log("\uD83D\uDCCA Nombre d'admins trouv\u00E9s: ".concat(admins.length));
                            if (admins.length === 0) {
                                console.warn('⚠️ Aucun admin actif trouvé pour recevoir la notification');
                                return [2 /*return*/, []];
                            }
                            notifications = [];
                            _i = 0, admins_1 = admins;
                            _a.label = 2;
                        case 2:
                            if (!(_i < admins_1.length)) return [3 /*break*/, 7];
                            admin = admins_1[_i];
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.createAndNotify(__assign({ userId: admin.id }, data))];
                        case 4:
                            notification = _a.sent();
                            notifications.push(notification);
                            console.log("\u2705 Notification cr\u00E9\u00E9e pour admin ID ".concat(admin.id));
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            console.error("\u274C Erreur cr\u00E9ation notification pour admin ".concat(admin.id, ":"), error_1.message);
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7:
                            // Envoyer aussi via WebSocket à tous les admins connectés
                            this.notificationsGateway.notifyAdmins('notification:new', {
                                type: data.type,
                                title: data.title,
                                message: data.message,
                                exitId: data.exitId,
                                createdAt: new Date(),
                                metadata: data.metadata,
                            });
                            return [2 /*return*/, notifications];
                    }
                });
            });
        };
        // Notifier plusieurs utilisateurs spécifiques
        NotificationsService_1.prototype.notifyUsers = function (userIds, data) {
            return __awaiter(this, void 0, void 0, function () {
                var notifications, _i, userIds_1, userId, notification, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0) {
                                console.warn('⚠️ Aucun utilisateur spécifié pour recevoir la notification');
                                return [2 /*return*/, []];
                            }
                            notifications = [];
                            _i = 0, userIds_1 = userIds;
                            _a.label = 1;
                        case 1:
                            if (!(_i < userIds_1.length)) return [3 /*break*/, 6];
                            userId = userIds_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.createAndNotify(__assign({ userId: userId }, data))];
                        case 3:
                            notification = _a.sent();
                            notifications.push(notification);
                            console.log("\u2705 Notification cr\u00E9\u00E9e pour utilisateur ID ".concat(userId));
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.error("\u274C Erreur cr\u00E9ation notification pour utilisateur ".concat(userId, ":"), error_2.message);
                            return [3 /*break*/, 5];
                        case 5:
                            _i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/, notifications];
                    }
                });
            });
        };
        // Marquer une notification comme lue
        NotificationsService_1.prototype.markAsRead = function (notificationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var notification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findOne({
                                where: { id: notificationId, userId: userId },
                            })];
                        case 1:
                            notification = _a.sent();
                            if (!notification) {
                                throw new Error('Notification not found');
                            }
                            notification.isRead = true;
                            notification.readAt = new Date();
                            return [4 /*yield*/, this.notificationRepository.save(notification)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // Récupérer les notifications d'un utilisateur
        NotificationsService_1.prototype.getUserNotifications = function (userId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = this.notificationRepository
                                .createQueryBuilder('notification')
                                .where('notification.userId = :userId', { userId: userId })
                                .leftJoinAndSelect('notification.exit', 'exit')
                                .leftJoinAndSelect('exit.student', 'student')
                                .orderBy('notification.createdAt', 'DESC');
                            if (options === null || options === void 0 ? void 0 : options.unreadOnly) {
                                query.andWhere('notification.isRead = :isRead', { isRead: false });
                            }
                            if (options === null || options === void 0 ? void 0 : options.limit) {
                                query.take(options.limit);
                            }
                            return [4 /*yield*/, query.getMany()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // Compter les notifications non lues
        NotificationsService_1.prototype.countUnread = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.count({
                                where: { userId: userId, isRead: false },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // Marquer toutes les notifications comme lues
        NotificationsService_1.prototype.markAllAsRead = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.update({ userId: userId, isRead: false }, { isRead: true, readAt: new Date() })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationsService_1;
    }());
    __setFunctionName(_classThis, "NotificationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationsService = _classThis;
}();
exports.NotificationsService = NotificationsService;
