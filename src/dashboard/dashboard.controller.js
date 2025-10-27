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
exports.DashboardController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var dashboard_dto_1 = require("./dto/dashboard.dto");
var jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
var DashboardController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Dashboard'), (0, common_1.Controller)('dashboard'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getDashboardData_decorators;
    var _getDashboardStats_decorators;
    var _getExitsTrends_decorators;
    var DashboardController = _classThis = /** @class */ (function () {
        function DashboardController_1(dashboardService) {
            this.dashboardService = (__runInitializers(this, _instanceExtraInitializers), dashboardService);
        }
        DashboardController_1.prototype.getDashboardData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dashboardService.getDashboardData()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        DashboardController_1.prototype.getDashboardStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dashboardData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dashboardService.getDashboardData()];
                        case 1:
                            dashboardData = _a.sent();
                            return [2 /*return*/, dashboardData.stats];
                    }
                });
            });
        };
        DashboardController_1.prototype.getExitsTrends = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.dashboardService.getExitsTrends()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return DashboardController_1;
    }());
    __setFunctionName(_classThis, "DashboardController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getDashboardData_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({
                summary: 'Get dashboard data',
                description: 'Retrieve comprehensive dashboard statistics and recent activities for admin users'
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Dashboard data retrieved successfully',
                type: dashboard_dto_1.DashboardDataDto,
            }), (0, swagger_1.ApiResponse)({
                status: 401,
                description: 'Unauthorized - Invalid or missing JWT token',
            }), (0, swagger_1.ApiResponse)({
                status: 403,
                description: 'Forbidden - Admin role required',
            })];
        _getDashboardStats_decorators = [(0, common_1.Get)('stats'), (0, swagger_1.ApiOperation)({
                summary: 'Get dashboard statistics only',
                description: 'Retrieve only the statistics part of the dashboard data'
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Dashboard statistics retrieved successfully',
            })];
        _getExitsTrends_decorators = [(0, common_1.Get)('trends'), (0, swagger_1.ApiOperation)({
                summary: 'Get exits trends data',
                description: 'Retrieve exits trends data for charts (monthly, weekly, yearly)'
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Exits trends data retrieved successfully',
                type: dashboard_dto_1.ExitsTrendsDto,
            })];
        __esDecorate(_classThis, null, _getDashboardData_decorators, { kind: "method", name: "getDashboardData", static: false, private: false, access: { has: function (obj) { return "getDashboardData" in obj; }, get: function (obj) { return obj.getDashboardData; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDashboardStats_decorators, { kind: "method", name: "getDashboardStats", static: false, private: false, access: { has: function (obj) { return "getDashboardStats" in obj; }, get: function (obj) { return obj.getDashboardStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getExitsTrends_decorators, { kind: "method", name: "getExitsTrends", static: false, private: false, access: { has: function (obj) { return "getExitsTrends" in obj; }, get: function (obj) { return obj.getExitsTrends; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DashboardController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DashboardController = _classThis;
}();
exports.DashboardController = DashboardController;
