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
exports.ExitsService = void 0;
var common_1 = require("@nestjs/common");
var notification_entity_1 = require("../notifications/entities/notification.entity");
var entry_exit_status_1 = require("src/enum/entry_exit_status");
var userstatus_1 = require("src/enum/userstatus");
var userrole_1 = require("../enum/userrole");
var ExitsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExitsService = _classThis = /** @class */ (function () {
        function ExitsService_1(exitRepository, notificationsService, usersService, messagesService) {
            this.exitRepository = exitRepository;
            this.notificationsService = notificationsService;
            this.usersService = usersService;
            this.messagesService = messagesService;
        }
        ExitsService_1.prototype.createStudentExit = function (createExitDto, studentId) {
            return __awaiter(this, void 0, void 0, function () {
                var exit, savedExit, error_1, fullExit, notifications, adminUsers, adminIds, pushError_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            exit = this.exitRepository.create(__assign(__assign({}, createExitDto), { departureDate: new Date(createExitDto.departureDate), expectedReturnDate: new Date(createExitDto.expectedReturnDate), studentId: studentId }));
                            return [4 /*yield*/, this.exitRepository.save(exit)];
                        case 1:
                            savedExit = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.usersService.update(studentId, { status: userstatus_1.UserStatus.SORTIE })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.error('Erreur lors de la mise à jour du statut de l\'étudiant:', error_1);
                            return [3 /*break*/, 5];
                        case 5: return [4 /*yield*/, this.exitRepository.findOne({
                                where: { id: savedExit.id },
                                relations: ['student'],
                            })];
                        case 6:
                            fullExit = _a.sent();
                            if (!fullExit) {
                                throw new Error('Exit not found after creation');
                            }
                            _a.label = 7;
                        case 7:
                            _a.trys.push([7, 15, , 16]);
                            return [4 /*yield*/, this.notificationsService.notifyAllAdmins({
                                    type: notification_entity_1.NotificationType.EXIT_CREATED,
                                    title: 'Nouvelle demande de sortie',
                                    message: "".concat(fullExit.student.firstName, " ").concat(fullExit.student.lastName, " a cr\u00E9\u00E9 une demande de sortie vers ").concat(fullExit.destination),
                                    exitId: fullExit.id,
                                    metadata: {
                                        studentId: fullExit.studentId,
                                        studentName: "".concat(fullExit.student.firstName, " ").concat(fullExit.student.lastName),
                                        destination: fullExit.destination,
                                        departureDate: fullExit.departureDate,
                                        expectedReturnDate: fullExit.expectedReturnDate,
                                    },
                                })];
                        case 8:
                            notifications = _a.sent();
                            console.log("\u2705 ".concat(notifications.length, " notification(s) cr\u00E9\u00E9e(s) pour les admins"));
                            _a.label = 9;
                        case 9:
                            _a.trys.push([9, 13, , 14]);
                            return [4 /*yield*/, this.usersService.findByRole(userrole_1.UserRole.ADMIN)];
                        case 10:
                            adminUsers = _a.sent();
                            adminIds = adminUsers.map(function (admin) { return admin.id; });
                            if (!(adminIds.length > 0)) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.messagesService.sendPushNotificationToUsers(adminIds, 'ResTrack - Nouvelle Sortie', "".concat(fullExit.student.firstName, " ").concat(fullExit.student.lastName, " a cr\u00E9\u00E9 une demande de sortie vers ").concat(fullExit.destination), 'exit', fullExit.id.toString())];
                        case 11:
                            _a.sent();
                            console.log("\uD83D\uDCF1 Notification push envoy\u00E9e \u00E0 ".concat(adminIds.length, " administrateur(s)"));
                            _a.label = 12;
                        case 12: return [3 /*break*/, 14];
                        case 13:
                            pushError_1 = _a.sent();
                            console.error('❌ Erreur lors de l\'envoi des notifications push:', pushError_1.message);
                            return [3 /*break*/, 14];
                        case 14: return [3 /*break*/, 16];
                        case 15:
                            error_2 = _a.sent();
                            console.error('❌ Erreur lors de la création des notifications:', error_2.message);
                            return [3 /*break*/, 16];
                        case 16: return [2 /*return*/, fullExit];
                    }
                });
            });
        };
        ExitsService_1.prototype.findAllByAdmin = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.exitRepository.find({
                                relations: ['student'],
                                order: { createdAt: 'DESC' },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ExitsService_1.prototype.findAllExitsByStudentIdWithPagination = function (studentId_1) {
            return __awaiter(this, arguments, void 0, function (studentId, page, limit, startDate, endDate) {
                var queryBuilder, total, exits, totalPages;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryBuilder = this.exitRepository
                                .createQueryBuilder('exit')
                                .leftJoinAndSelect('exit.student', 'student')
                                .where('exit.studentId = :studentId', { studentId: studentId })
                                .orderBy('exit.createdAt', 'DESC');
                            // Ajouter les filtres de date si fournis
                            if (startDate) {
                                queryBuilder.andWhere('exit.departureDate >= :startDate', {
                                    startDate: new Date(startDate)
                                });
                            }
                            if (endDate) {
                                queryBuilder.andWhere('exit.departureDate <= :endDate', {
                                    endDate: new Date(endDate)
                                });
                            }
                            return [4 /*yield*/, queryBuilder.getCount()];
                        case 1:
                            total = _a.sent();
                            return [4 /*yield*/, queryBuilder
                                    .skip((page - 1) * limit)
                                    .take(limit)
                                    .getMany()];
                        case 2:
                            exits = _a.sent();
                            totalPages = Math.ceil(total / limit);
                            return [2 /*return*/, {
                                    exits: exits,
                                    total: total,
                                    page: page,
                                    totalPages: totalPages,
                                }];
                    }
                });
            });
        };
        ExitsService_1.prototype.findAllExitsByStudentId = function (studentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.exitRepository.find({
                                where: { studentId: studentId },
                                relations: ['student'],
                                order: { createdAt: 'DESC' },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ExitsService_1.prototype.findAllExitsByStudent = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.exitRepository.find({
                                where: { studentId: userId },
                                relations: ['student'],
                                order: { createdAt: 'DESC' },
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ExitsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var exit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.exitRepository.findOne({
                                where: { id: id },
                                relations: ['student'],
                            })];
                        case 1:
                            exit = _a.sent();
                            if (!exit) {
                                throw new Error('Exit not found');
                            }
                            return [2 /*return*/, exit];
                    }
                });
            });
        };
        ExitsService_1.prototype.update = function (id, updateExitDto) {
            return __awaiter(this, void 0, void 0, function () {
                var exit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            exit = _a.sent();
                            // Mettre à jour les champs
                            if (updateExitDto.reason)
                                exit.reason = updateExitDto.reason;
                            if (updateExitDto.destination)
                                exit.destination = updateExitDto.destination;
                            if (updateExitDto.description !== undefined)
                                exit.description = updateExitDto.description;
                            if (updateExitDto.departureDate) {
                                exit.departureDate = new Date(updateExitDto.departureDate);
                            }
                            if (updateExitDto.expectedReturnDate) {
                                exit.expectedReturnDate = new Date(updateExitDto.expectedReturnDate);
                            }
                            // Mettre à jour le statut automatiquement
                            exit.updateStatus();
                            return [4 /*yield*/, this.exitRepository.save(exit)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ExitsService_1.prototype.recordReturn = function (id, actualReturnDate) {
            return __awaiter(this, void 0, void 0, function () {
                var exit, updatedExit, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            exit = _a.sent();
                            exit.actualReturnDate = actualReturnDate || new Date();
                            exit.updateStatus();
                            return [4 /*yield*/, this.exitRepository.save(exit)];
                        case 2:
                            updatedExit = _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.usersService.update(exit.studentId, { status: userstatus_1.UserStatus.PRESENT })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_3 = _a.sent();
                            console.error('Erreur lors de la mise à jour du statut de l\'étudiant:', error_3);
                            return [3 /*break*/, 6];
                        case 6: 
                        // Notifier l'étudiant du retour enregistré
                        return [4 /*yield*/, this.notificationsService.createAndNotify({
                                userId: exit.studentId,
                                type: exit.delayDays > 0 ? notification_entity_1.NotificationType.EXIT_LATE : notification_entity_1.NotificationType.EXIT_RETURN,
                                title: exit.delayDays > 0 ? 'Retour en retard enregistré' : 'Retour enregistré',
                                message: exit.delayDays > 0
                                    ? "Votre retour a \u00E9t\u00E9 enregistr\u00E9 avec ".concat(exit.delayDays, " jour(s) de retard")
                                    : 'Votre retour a été enregistré avec succès',
                                exitId: exit.id,
                                metadata: {
                                    actualReturnDate: exit.actualReturnDate,
                                    delayDays: exit.delayDays,
                                },
                            })];
                        case 7:
                            // Notifier l'étudiant du retour enregistré
                            _a.sent();
                            return [2 /*return*/, updatedExit];
                    }
                });
            });
        };
        ExitsService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var exit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            exit = _a.sent();
                            return [4 /*yield*/, this.exitRepository.softRemove(exit)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ExitsService_1.prototype.getExitStats = function (studentId) {
            return __awaiter(this, void 0, void 0, function () {
                var whereCondition, _a, total, enCours, terminees, enRetard;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            whereCondition = studentId ? { studentId: studentId } : {};
                            return [4 /*yield*/, Promise.all([
                                    this.exitRepository.count({ where: whereCondition }),
                                    this.exitRepository.count({ where: __assign(__assign({}, whereCondition), { status: entry_exit_status_1.ExitStatus.EN_COURS }) }),
                                    this.exitRepository.count({ where: __assign(__assign({}, whereCondition), { status: entry_exit_status_1.ExitStatus.TERMINEE }) }),
                                    this.exitRepository.count({ where: __assign(__assign({}, whereCondition), { status: entry_exit_status_1.ExitStatus.EN_RETARD }) }),
                                ])];
                        case 1:
                            _a = _b.sent(), total = _a[0], enCours = _a[1], terminees = _a[2], enRetard = _a[3];
                            return [2 /*return*/, { total: total, enCours: enCours, terminees: terminees, enRetard: enRetard }];
                    }
                });
            });
        };
        return ExitsService_1;
    }());
    __setFunctionName(_classThis, "ExitsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExitsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExitsService = _classThis;
}();
exports.ExitsService = ExitsService;
