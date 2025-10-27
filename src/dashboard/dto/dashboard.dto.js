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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitsTrendsDto = exports.ChartDataDto = exports.DashboardDataDto = exports.RecentActivityDto = exports.DashboardStatsDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var DashboardStatsDto = function () {
    var _a;
    var _totalStudents_decorators;
    var _totalStudents_initializers = [];
    var _totalStudents_extraInitializers = [];
    var _studentsPresent_decorators;
    var _studentsPresent_initializers = [];
    var _studentsPresent_extraInitializers = [];
    var _studentsOnExit_decorators;
    var _studentsOnExit_initializers = [];
    var _studentsOnExit_extraInitializers = [];
    var _totalExits_decorators;
    var _totalExits_initializers = [];
    var _totalExits_extraInitializers = [];
    var _exitsInProgress_decorators;
    var _exitsInProgress_initializers = [];
    var _exitsInProgress_extraInitializers = [];
    var _exitsCompleted_decorators;
    var _exitsCompleted_initializers = [];
    var _exitsCompleted_extraInitializers = [];
    var _exitsLate_decorators;
    var _exitsLate_initializers = [];
    var _exitsLate_extraInitializers = [];
    var _occupancyRate_decorators;
    var _occupancyRate_initializers = [];
    var _occupancyRate_extraInitializers = [];
    var _pendingIssues_decorators;
    var _pendingIssues_initializers = [];
    var _pendingIssues_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DashboardStatsDto() {
                this.totalStudents = __runInitializers(this, _totalStudents_initializers, void 0);
                this.studentsPresent = (__runInitializers(this, _totalStudents_extraInitializers), __runInitializers(this, _studentsPresent_initializers, void 0));
                this.studentsOnExit = (__runInitializers(this, _studentsPresent_extraInitializers), __runInitializers(this, _studentsOnExit_initializers, void 0));
                this.totalExits = (__runInitializers(this, _studentsOnExit_extraInitializers), __runInitializers(this, _totalExits_initializers, void 0));
                this.exitsInProgress = (__runInitializers(this, _totalExits_extraInitializers), __runInitializers(this, _exitsInProgress_initializers, void 0));
                this.exitsCompleted = (__runInitializers(this, _exitsInProgress_extraInitializers), __runInitializers(this, _exitsCompleted_initializers, void 0));
                this.exitsLate = (__runInitializers(this, _exitsCompleted_extraInitializers), __runInitializers(this, _exitsLate_initializers, void 0));
                this.occupancyRate = (__runInitializers(this, _exitsLate_extraInitializers), __runInitializers(this, _occupancyRate_initializers, void 0));
                this.pendingIssues = (__runInitializers(this, _occupancyRate_extraInitializers), __runInitializers(this, _pendingIssues_initializers, void 0));
                __runInitializers(this, _pendingIssues_extraInitializers);
            }
            return DashboardStatsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _totalStudents_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of students',
                    example: 250,
                })];
            _studentsPresent_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of students currently present',
                    example: 238,
                })];
            _studentsOnExit_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of students currently on exit',
                    example: 12,
                })];
            _totalExits_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of exits',
                    example: 45,
                })];
            _exitsInProgress_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of exits in progress',
                    example: 12,
                })];
            _exitsCompleted_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of completed exits',
                    example: 30,
                })];
            _exitsLate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of late exits',
                    example: 3,
                })];
            _occupancyRate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Occupancy rate percentage',
                    example: 95,
                })];
            _pendingIssues_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of pending issues',
                    example: 3,
                })];
            __esDecorate(null, null, _totalStudents_decorators, { kind: "field", name: "totalStudents", static: false, private: false, access: { has: function (obj) { return "totalStudents" in obj; }, get: function (obj) { return obj.totalStudents; }, set: function (obj, value) { obj.totalStudents = value; } }, metadata: _metadata }, _totalStudents_initializers, _totalStudents_extraInitializers);
            __esDecorate(null, null, _studentsPresent_decorators, { kind: "field", name: "studentsPresent", static: false, private: false, access: { has: function (obj) { return "studentsPresent" in obj; }, get: function (obj) { return obj.studentsPresent; }, set: function (obj, value) { obj.studentsPresent = value; } }, metadata: _metadata }, _studentsPresent_initializers, _studentsPresent_extraInitializers);
            __esDecorate(null, null, _studentsOnExit_decorators, { kind: "field", name: "studentsOnExit", static: false, private: false, access: { has: function (obj) { return "studentsOnExit" in obj; }, get: function (obj) { return obj.studentsOnExit; }, set: function (obj, value) { obj.studentsOnExit = value; } }, metadata: _metadata }, _studentsOnExit_initializers, _studentsOnExit_extraInitializers);
            __esDecorate(null, null, _totalExits_decorators, { kind: "field", name: "totalExits", static: false, private: false, access: { has: function (obj) { return "totalExits" in obj; }, get: function (obj) { return obj.totalExits; }, set: function (obj, value) { obj.totalExits = value; } }, metadata: _metadata }, _totalExits_initializers, _totalExits_extraInitializers);
            __esDecorate(null, null, _exitsInProgress_decorators, { kind: "field", name: "exitsInProgress", static: false, private: false, access: { has: function (obj) { return "exitsInProgress" in obj; }, get: function (obj) { return obj.exitsInProgress; }, set: function (obj, value) { obj.exitsInProgress = value; } }, metadata: _metadata }, _exitsInProgress_initializers, _exitsInProgress_extraInitializers);
            __esDecorate(null, null, _exitsCompleted_decorators, { kind: "field", name: "exitsCompleted", static: false, private: false, access: { has: function (obj) { return "exitsCompleted" in obj; }, get: function (obj) { return obj.exitsCompleted; }, set: function (obj, value) { obj.exitsCompleted = value; } }, metadata: _metadata }, _exitsCompleted_initializers, _exitsCompleted_extraInitializers);
            __esDecorate(null, null, _exitsLate_decorators, { kind: "field", name: "exitsLate", static: false, private: false, access: { has: function (obj) { return "exitsLate" in obj; }, get: function (obj) { return obj.exitsLate; }, set: function (obj, value) { obj.exitsLate = value; } }, metadata: _metadata }, _exitsLate_initializers, _exitsLate_extraInitializers);
            __esDecorate(null, null, _occupancyRate_decorators, { kind: "field", name: "occupancyRate", static: false, private: false, access: { has: function (obj) { return "occupancyRate" in obj; }, get: function (obj) { return obj.occupancyRate; }, set: function (obj, value) { obj.occupancyRate = value; } }, metadata: _metadata }, _occupancyRate_initializers, _occupancyRate_extraInitializers);
            __esDecorate(null, null, _pendingIssues_decorators, { kind: "field", name: "pendingIssues", static: false, private: false, access: { has: function (obj) { return "pendingIssues" in obj; }, get: function (obj) { return obj.pendingIssues; }, set: function (obj, value) { obj.pendingIssues = value; } }, metadata: _metadata }, _pendingIssues_initializers, _pendingIssues_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DashboardStatsDto = DashboardStatsDto;
var RecentActivityDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _color_decorators;
    var _color_initializers = [];
    var _color_extraInitializers = [];
    var _timestamp_decorators;
    var _timestamp_initializers = [];
    var _timestamp_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RecentActivityDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.message = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.color = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _color_initializers, void 0));
                this.timestamp = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _timestamp_initializers, void 0));
                __runInitializers(this, _timestamp_extraInitializers);
            }
            return RecentActivityDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Activity type',
                    example: 'exit',
                })];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Activity message',
                    example: 'John Doe est en sortie',
                })];
            _color_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Activity color for UI',
                    example: 'blue',
                })];
            _timestamp_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Activity timestamp',
                    example: '2025-01-15T10:30:00Z',
                })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: function (obj) { return "color" in obj; }, get: function (obj) { return obj.color; }, set: function (obj, value) { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: function (obj) { return "timestamp" in obj; }, get: function (obj) { return obj.timestamp; }, set: function (obj, value) { obj.timestamp = value; } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RecentActivityDto = RecentActivityDto;
var DashboardDataDto = function () {
    var _a;
    var _stats_decorators;
    var _stats_initializers = [];
    var _stats_extraInitializers = [];
    var _recentActivity_decorators;
    var _recentActivity_initializers = [];
    var _recentActivity_extraInitializers = [];
    var _recentExits_decorators;
    var _recentExits_initializers = [];
    var _recentExits_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DashboardDataDto() {
                this.stats = __runInitializers(this, _stats_initializers, void 0);
                this.recentActivity = (__runInitializers(this, _stats_extraInitializers), __runInitializers(this, _recentActivity_initializers, void 0));
                this.recentExits = (__runInitializers(this, _recentActivity_extraInitializers), __runInitializers(this, _recentExits_initializers, void 0));
                __runInitializers(this, _recentExits_extraInitializers);
            }
            return DashboardDataDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _stats_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Dashboard statistics',
                    type: DashboardStatsDto,
                })];
            _recentActivity_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Recent activities',
                    type: [RecentActivityDto],
                })];
            _recentExits_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Recent exits (last 5)',
                    type: 'array',
                    items: { type: 'object' },
                })];
            __esDecorate(null, null, _stats_decorators, { kind: "field", name: "stats", static: false, private: false, access: { has: function (obj) { return "stats" in obj; }, get: function (obj) { return obj.stats; }, set: function (obj, value) { obj.stats = value; } }, metadata: _metadata }, _stats_initializers, _stats_extraInitializers);
            __esDecorate(null, null, _recentActivity_decorators, { kind: "field", name: "recentActivity", static: false, private: false, access: { has: function (obj) { return "recentActivity" in obj; }, get: function (obj) { return obj.recentActivity; }, set: function (obj, value) { obj.recentActivity = value; } }, metadata: _metadata }, _recentActivity_initializers, _recentActivity_extraInitializers);
            __esDecorate(null, null, _recentExits_decorators, { kind: "field", name: "recentExits", static: false, private: false, access: { has: function (obj) { return "recentExits" in obj; }, get: function (obj) { return obj.recentExits; }, set: function (obj, value) { obj.recentExits = value; } }, metadata: _metadata }, _recentExits_initializers, _recentExits_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DashboardDataDto = DashboardDataDto;
var ChartDataDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _sorties_decorators;
    var _sorties_initializers = [];
    var _sorties_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ChartDataDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.sorties = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _sorties_initializers, void 0));
                __runInitializers(this, _sorties_extraInitializers);
            }
            return ChartDataDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Period name (e.g., "Jan", "Sem 1", "2024")',
                    example: 'Jan',
                })];
            _sorties_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of exits for this period',
                    example: 45,
                })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _sorties_decorators, { kind: "field", name: "sorties", static: false, private: false, access: { has: function (obj) { return "sorties" in obj; }, get: function (obj) { return obj.sorties; }, set: function (obj, value) { obj.sorties = value; } }, metadata: _metadata }, _sorties_initializers, _sorties_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ChartDataDto = ChartDataDto;
var ExitsTrendsDto = function () {
    var _a;
    var _monthly_decorators;
    var _monthly_initializers = [];
    var _monthly_extraInitializers = [];
    var _weekly_decorators;
    var _weekly_initializers = [];
    var _weekly_extraInitializers = [];
    var _yearly_decorators;
    var _yearly_initializers = [];
    var _yearly_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ExitsTrendsDto() {
                this.monthly = __runInitializers(this, _monthly_initializers, void 0);
                this.weekly = (__runInitializers(this, _monthly_extraInitializers), __runInitializers(this, _weekly_initializers, void 0));
                this.yearly = (__runInitializers(this, _weekly_extraInitializers), __runInitializers(this, _yearly_initializers, void 0));
                __runInitializers(this, _yearly_extraInitializers);
            }
            return ExitsTrendsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _monthly_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Monthly trends data',
                    type: [ChartDataDto],
                })];
            _weekly_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Weekly trends data',
                    type: [ChartDataDto],
                })];
            _yearly_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Yearly trends data',
                    type: [ChartDataDto],
                })];
            __esDecorate(null, null, _monthly_decorators, { kind: "field", name: "monthly", static: false, private: false, access: { has: function (obj) { return "monthly" in obj; }, get: function (obj) { return obj.monthly; }, set: function (obj, value) { obj.monthly = value; } }, metadata: _metadata }, _monthly_initializers, _monthly_extraInitializers);
            __esDecorate(null, null, _weekly_decorators, { kind: "field", name: "weekly", static: false, private: false, access: { has: function (obj) { return "weekly" in obj; }, get: function (obj) { return obj.weekly; }, set: function (obj, value) { obj.weekly = value; } }, metadata: _metadata }, _weekly_initializers, _weekly_extraInitializers);
            __esDecorate(null, null, _yearly_decorators, { kind: "field", name: "yearly", static: false, private: false, access: { has: function (obj) { return "yearly" in obj; }, get: function (obj) { return obj.yearly; }, set: function (obj, value) { obj.yearly = value; } }, metadata: _metadata }, _yearly_initializers, _yearly_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ExitsTrendsDto = ExitsTrendsDto;
