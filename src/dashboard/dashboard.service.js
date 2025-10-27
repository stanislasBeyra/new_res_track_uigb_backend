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
exports.DashboardService = void 0;
var common_1 = require("@nestjs/common");
var userstatus_1 = require("../enum/userstatus");
var entry_exit_status_1 = require("../enum/entry_exit_status");
var userrole_1 = require("../enum/userrole");
var DashboardService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DashboardService = _classThis = /** @class */ (function () {
        function DashboardService_1(userRepository, exitRepository) {
            this.userRepository = userRepository;
            this.exitRepository = exitRepository;
        }
        DashboardService_1.prototype.getDashboardData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var students, exits, stats, recentActivity, recentExits;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.find({
                                where: { role: userrole_1.UserRole.STUDENT },
                                relations: ['exits'],
                            })];
                        case 1:
                            students = _a.sent();
                            return [4 /*yield*/, this.exitRepository.find({
                                    relations: ['student'],
                                    order: { createdAt: 'DESC' },
                                })];
                        case 2:
                            exits = _a.sent();
                            stats = this.calculateStats(students, exits);
                            recentActivity = this.generateRecentActivity(exits, students);
                            recentExits = exits.slice(0, 5);
                            return [2 /*return*/, {
                                    stats: stats,
                                    recentActivity: recentActivity,
                                    recentExits: recentExits,
                                }];
                    }
                });
            });
        };
        DashboardService_1.prototype.calculateStats = function (students, exits) {
            // Statistiques des étudiants
            var totalStudents = students.length;
            var studentsPresent = students.filter(function (s) { return s.status === userstatus_1.UserStatus.PRESENT; }).length;
            var studentsOnExit = students.filter(function (s) { return s.status === userstatus_1.UserStatus.SORTIE; }).length;
            // Statistiques des sorties
            var totalExits = exits.length;
            var exitsInProgress = exits.filter(function (e) { return e.status === entry_exit_status_1.ExitStatus.EN_COURS; }).length;
            var exitsCompleted = exits.filter(function (e) { return e.status === entry_exit_status_1.ExitStatus.TERMINEE; }).length;
            var exitsLate = exits.filter(function (e) { return e.status === entry_exit_status_1.ExitStatus.EN_RETARD; }).length;
            // Calculer le taux d'occupation
            var occupancyRate = totalStudents > 0 ? Math.round((studentsPresent / totalStudents) * 100) : 0;
            // Calculer les problèmes en attente
            var pendingIssues = exitsLate + exits.filter(function (e) { return e.status === entry_exit_status_1.ExitStatus.EN_COURS; }).length;
            return {
                totalStudents: totalStudents,
                studentsPresent: studentsPresent,
                studentsOnExit: studentsOnExit,
                totalExits: totalExits,
                exitsInProgress: exitsInProgress,
                exitsCompleted: exitsCompleted,
                exitsLate: exitsLate,
                occupancyRate: occupancyRate,
                pendingIssues: pendingIssues,
            };
        };
        DashboardService_1.prototype.generateRecentActivity = function (exits, students) {
            var activities = [];
            // Activités basées sur les sorties récentes (5 dernières)
            exits.slice(0, 5).forEach(function (exit) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                if (exit.status === entry_exit_status_1.ExitStatus.EN_COURS) {
                    activities.push({
                        type: 'exit',
                        message: "".concat((_a = exit.student) === null || _a === void 0 ? void 0 : _a.firstName, " ").concat((_b = exit.student) === null || _b === void 0 ? void 0 : _b.lastName, " est en sortie"),
                        color: 'blue',
                        timestamp: ((_c = exit.createdAt) === null || _c === void 0 ? void 0 : _c.toISOString()) || new Date(exit.departureDate).toISOString(),
                    });
                }
                else if (exit.status === entry_exit_status_1.ExitStatus.TERMINEE) {
                    activities.push({
                        type: 'return',
                        message: "".concat((_d = exit.student) === null || _d === void 0 ? void 0 : _d.firstName, " ").concat((_e = exit.student) === null || _e === void 0 ? void 0 : _e.lastName, " est revenu de sortie"),
                        color: 'green',
                        timestamp: exit.actualReturnDate ? new Date(exit.actualReturnDate).toISOString() : ((_f = exit.updatedAt) === null || _f === void 0 ? void 0 : _f.toISOString()) || ((_g = exit.createdAt) === null || _g === void 0 ? void 0 : _g.toISOString()),
                    });
                }
                else if (exit.status === entry_exit_status_1.ExitStatus.EN_RETARD) {
                    activities.push({
                        type: 'late',
                        message: "".concat((_h = exit.student) === null || _h === void 0 ? void 0 : _h.firstName, " ").concat((_j = exit.student) === null || _j === void 0 ? void 0 : _j.lastName, " est en retard"),
                        color: 'orange',
                        timestamp: exit.actualReturnDate ? new Date(exit.actualReturnDate).toISOString() : ((_k = exit.updatedAt) === null || _k === void 0 ? void 0 : _k.toISOString()) || ((_l = exit.createdAt) === null || _l === void 0 ? void 0 : _l.toISOString()),
                    });
                }
            });
            // Ajouter des activités basées sur les nouveaux étudiants (dernière semaine)
            var oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            var newStudents = students
                .filter(function (s) { return s.createdAt && new Date(s.createdAt) > oneWeekAgo; })
                .slice(0, 2);
            newStudents.forEach(function (student) {
                var _a;
                activities.push({
                    type: 'new',
                    message: "Nouvel \u00E9tudiant enregistr\u00E9: ".concat(student.firstName, " ").concat(student.lastName),
                    color: 'green',
                    timestamp: ((_a = student.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString()) || new Date().toISOString(),
                });
            });
            // Trier par timestamp et retourner les 5 plus récentes
            return activities
                .sort(function (a, b) { return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); })
                .slice(0, 5);
        };
        DashboardService_1.prototype.getExitsTrends = function () {
            return __awaiter(this, void 0, void 0, function () {
                var exits, monthly, weekly, yearly;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.exitRepository.find({
                                order: { createdAt: 'ASC' },
                            })];
                        case 1:
                            exits = _a.sent();
                            monthly = this.calculateMonthlyTrends(exits);
                            weekly = this.calculateWeeklyTrends(exits);
                            yearly = this.calculateYearlyTrends(exits);
                            return [2 /*return*/, {
                                    monthly: monthly,
                                    weekly: weekly,
                                    yearly: yearly,
                                }];
                    }
                });
            });
        };
        DashboardService_1.prototype.calculateMonthlyTrends = function (exits) {
            var monthlyData = {};
            var monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
            // Initialiser tous les mois à 0
            monthNames.forEach(function (month) {
                monthlyData[month] = 0;
            });
            // Compter les sorties par mois
            exits.forEach(function (exit) {
                var date = new Date(exit.createdAt || exit.departureDate);
                var monthIndex = date.getMonth();
                var monthName = monthNames[monthIndex];
                monthlyData[monthName]++;
            });
            return monthNames.map(function (month) { return ({
                name: month,
                sorties: monthlyData[month],
            }); });
        };
        DashboardService_1.prototype.calculateWeeklyTrends = function (exits) {
            var weeklyData = [];
            var _loop_1 = function (i) {
                var weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - (i * 7));
                var weekEnd = new Date(weekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);
                var weekExits = exits.filter(function (exit) {
                    var exitDate = new Date(exit.createdAt || exit.departureDate);
                    return exitDate >= weekStart && exitDate <= weekEnd;
                });
                weeklyData.push({
                    name: "Sem ".concat(8 - i),
                    sorties: weekExits.length,
                });
            };
            // Calculer les 8 dernières semaines
            for (var i = 7; i >= 0; i--) {
                _loop_1(i);
            }
            return weeklyData;
        };
        DashboardService_1.prototype.calculateYearlyTrends = function (exits) {
            var yearlyData = {};
            // Compter les sorties par année
            exits.forEach(function (exit) {
                var date = new Date(exit.createdAt || exit.departureDate);
                var year = date.getFullYear().toString();
                yearlyData[year] = (yearlyData[year] || 0) + 1;
            });
            // Convertir en array et trier par année
            return Object.entries(yearlyData)
                .sort(function (_a, _b) {
                var a = _a[0];
                var b = _b[0];
                return parseInt(a) - parseInt(b);
            })
                .map(function (_a) {
                var year = _a[0], count = _a[1];
                return ({
                    name: year,
                    sorties: count,
                });
            });
        };
        return DashboardService_1;
    }());
    __setFunctionName(_classThis, "DashboardService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardService = _classThis;
}();
exports.DashboardService = DashboardService;
