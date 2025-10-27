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
exports.AlertsService = void 0;
var common_1 = require("@nestjs/common");
var userrole_1 = require("../enum/userrole");
var notification_entity_1 = require("../notifications/entities/notification.entity");
var AlertsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AlertsService = _classThis = /** @class */ (function () {
        function AlertsService_1(userRepository, messagesService, notificationsService) {
            this.userRepository = userRepository;
            this.messagesService = messagesService;
            this.notificationsService = notificationsService;
        }
        /**
         * Envoyer une alerte d'urgence à tous les étudiants
         */
        AlertsService_1.prototype.sendEmergencyAlertToStudents = function (alertData) {
            return __awaiter(this, void 0, void 0, function () {
                var errors, studentsNotified, pushNotificationsSent, students, studentIds, notifications, notificationError_1, pushError_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errors = [];
                            studentsNotified = 0;
                            pushNotificationsSent = 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 10, , 11]);
                            return [4 /*yield*/, this.userRepository.find({
                                    where: { role: userrole_1.UserRole.STUDENT },
                                    select: ['id', 'firstName', 'lastName', 'email']
                                })];
                        case 2:
                            students = _a.sent();
                            if (students.length === 0) {
                                return [2 /*return*/, {
                                        success: false,
                                        studentsNotified: 0,
                                        pushNotificationsSent: 0,
                                        errors: ['Aucun étudiant trouvé']
                                    }];
                            }
                            studentIds = students.map(function (student) { return student.id; });
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.notificationsService.notifyUsers(studentIds, {
                                    type: notification_entity_1.NotificationType.SYSTEM,
                                    title: alertData.title,
                                    message: alertData.message,
                                    metadata: {
                                        priority: alertData.priority,
                                        alertType: 'emergency',
                                        timestamp: new Date().toISOString(),
                                    },
                                })];
                        case 4:
                            notifications = _a.sent();
                            studentsNotified = notifications.length;
                            console.log("\u2705 ".concat(studentsNotified, " notification(s) cr\u00E9\u00E9e(s) pour les \u00E9tudiants"));
                            return [3 /*break*/, 6];
                        case 5:
                            notificationError_1 = _a.sent();
                            errors.push("Erreur notifications: ".concat(notificationError_1.message));
                            console.error('❌ Erreur lors de la création des notifications:', notificationError_1);
                            return [3 /*break*/, 6];
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.messagesService.sendPushNotificationToUsers(studentIds, '🚨 ResTrack - Alerte Urgence', alertData.message, 'private', 'emergency-alert')];
                        case 7:
                            _a.sent();
                            pushNotificationsSent = studentIds.length;
                            console.log("\uD83D\uDCF1 ".concat(pushNotificationsSent, " notification(s) push envoy\u00E9e(s) aux \u00E9tudiants"));
                            return [3 /*break*/, 9];
                        case 8:
                            pushError_1 = _a.sent();
                            errors.push("Erreur push notifications: ".concat(pushError_1.message));
                            console.error('❌ Erreur lors de l\'envoi des notifications push:', pushError_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, {
                                success: errors.length === 0,
                                studentsNotified: studentsNotified,
                                pushNotificationsSent: pushNotificationsSent,
                                errors: errors
                            }];
                        case 10:
                            error_1 = _a.sent();
                            console.error('❌ Erreur générale lors de l\'envoi de l\'alerte d\'urgence:', error_1);
                            return [2 /*return*/, {
                                    success: false,
                                    studentsNotified: 0,
                                    pushNotificationsSent: 0,
                                    errors: ["Erreur g\u00E9n\u00E9rale: ".concat(error_1.message)]
                                }];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Envoyer une alerte d'urgence à tous les utilisateurs (étudiants + admins)
         */
        AlertsService_1.prototype.sendEmergencyAlertToAll = function (alertData) {
            return __awaiter(this, void 0, void 0, function () {
                var errors, usersNotified, pushNotificationsSent, users, userIds, notifications, notificationError_2, pushError_2, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            errors = [];
                            usersNotified = 0;
                            pushNotificationsSent = 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 10, , 11]);
                            return [4 /*yield*/, this.userRepository.find({
                                    select: ['id', 'firstName', 'lastName', 'email', 'role']
                                })];
                        case 2:
                            users = _a.sent();
                            if (users.length === 0) {
                                return [2 /*return*/, {
                                        success: false,
                                        usersNotified: 0,
                                        pushNotificationsSent: 0,
                                        errors: ['Aucun utilisateur trouvé']
                                    }];
                            }
                            userIds = users.map(function (user) { return user.id; });
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.notificationsService.notifyUsers(userIds, {
                                    type: notification_entity_1.NotificationType.SYSTEM,
                                    title: alertData.title,
                                    message: alertData.message,
                                    metadata: {
                                        priority: alertData.priority,
                                        alertType: 'emergency',
                                        timestamp: new Date().toISOString(),
                                    },
                                })];
                        case 4:
                            notifications = _a.sent();
                            usersNotified = notifications.length;
                            console.log("\u2705 ".concat(usersNotified, " notification(s) cr\u00E9\u00E9e(s) pour tous les utilisateurs"));
                            return [3 /*break*/, 6];
                        case 5:
                            notificationError_2 = _a.sent();
                            errors.push("Erreur notifications: ".concat(notificationError_2.message));
                            console.error('❌ Erreur lors de la création des notifications:', notificationError_2);
                            return [3 /*break*/, 6];
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.messagesService.sendPushNotificationToUsers(userIds, '🚨 ResTrack - Alerte Urgence', alertData.message, 'private', 'emergency-alert')];
                        case 7:
                            _a.sent();
                            pushNotificationsSent = userIds.length;
                            console.log("\uD83D\uDCF1 ".concat(pushNotificationsSent, " notification(s) push envoy\u00E9e(s) \u00E0 tous les utilisateurs"));
                            return [3 /*break*/, 9];
                        case 8:
                            pushError_2 = _a.sent();
                            errors.push("Erreur push notifications: ".concat(pushError_2.message));
                            console.error('❌ Erreur lors de l\'envoi des notifications push:', pushError_2);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, {
                                success: errors.length === 0,
                                usersNotified: usersNotified,
                                pushNotificationsSent: pushNotificationsSent,
                                errors: errors
                            }];
                        case 10:
                            error_2 = _a.sent();
                            console.error('❌ Erreur générale lors de l\'envoi de l\'alerte d\'urgence:', error_2);
                            return [2 /*return*/, {
                                    success: false,
                                    usersNotified: 0,
                                    pushNotificationsSent: 0,
                                    errors: ["Erreur g\u00E9n\u00E9rale: ".concat(error_2.message)]
                                }];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Obtenir les statistiques des alertes
         */
        AlertsService_1.prototype.getAlertStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, totalStudents, totalAdmins, totalUsers, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Promise.all([
                                    this.userRepository.count({ where: { role: userrole_1.UserRole.STUDENT } }),
                                    this.userRepository.count({ where: { role: userrole_1.UserRole.ADMIN } }),
                                    this.userRepository.count()
                                ])];
                        case 1:
                            _a = _b.sent(), totalStudents = _a[0], totalAdmins = _a[1], totalUsers = _a[2];
                            return [2 /*return*/, {
                                    totalStudents: totalStudents,
                                    totalAdmins: totalAdmins,
                                    totalUsers: totalUsers
                                }];
                        case 2:
                            error_3 = _b.sent();
                            console.error('❌ Erreur lors de la récupération des statistiques:', error_3);
                            return [2 /*return*/, {
                                    totalStudents: 0,
                                    totalAdmins: 0,
                                    totalUsers: 0
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return AlertsService_1;
    }());
    __setFunctionName(_classThis, "AlertsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AlertsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AlertsService = _classThis;
}();
exports.AlertsService = AlertsService;
