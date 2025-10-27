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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var exit_entity_1 = require("./entities/exit.entity");
var ExitsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Exits'), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, common_1.Controller)('exits')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _findAll_decorators;
    var _getMyExits_decorators;
    var _getGlobalStats_decorators;
    var _getMyStats_decorators;
    var _getStudentExits_decorators;
    var _getStudentStats_decorators;
    var _findOne_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _recordReturn_decorators;
    var ExitsController = _classThis = /** @class */ (function () {
        function ExitsController_1(exitsService) {
            this.exitsService = (__runInitializers(this, _instanceExtraInitializers), exitsService);
        }
        ExitsController_1.prototype.create = function (createExitDto, userId) {
            return this.exitsService.createStudentExit(createExitDto, userId);
        };
        ExitsController_1.prototype.findAll = function () {
            return this.exitsService.findAllByAdmin();
        };
        ExitsController_1.prototype.getMyExits = function (req) {
            return this.exitsService.findAllExitsByStudent(req.user.id);
        };
        ExitsController_1.prototype.getGlobalStats = function () {
            return this.exitsService.getExitStats();
        };
        ExitsController_1.prototype.getMyStats = function (req) {
            return this.exitsService.getExitStats(req.user.id);
        };
        ExitsController_1.prototype.getStudentExits = function (studentId, page, limit, startDate, endDate) {
            if (page === void 0) { page = '1'; }
            if (limit === void 0) { limit = '10'; }
            return this.exitsService.findAllExitsByStudentIdWithPagination(+studentId, +page, +limit, startDate, endDate);
        };
        ExitsController_1.prototype.getStudentStats = function (studentId) {
            return this.exitsService.getExitStats(+studentId);
        };
        ExitsController_1.prototype.findOne = function (id) {
            return this.exitsService.findOne(+id);
        };
        ExitsController_1.prototype.update = function (id, updateExitDto) {
            return this.exitsService.update(+id, updateExitDto);
        };
        ExitsController_1.prototype.remove = function (id) {
            return this.exitsService.remove(+id);
        };
        ExitsController_1.prototype.recordReturn = function (id) {
            return this.exitsService.recordReturn(+id);
        };
        return ExitsController_1;
    }());
    __setFunctionName(_classThis, "ExitsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)(), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Créer une demande de sortie (étudiant)' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Sortie créée avec succès', type: exit_entity_1.Exit }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' })];
        _findAll_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les sorties (admin)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des sorties', type: [exit_entity_1.Exit] })];
        _getMyExits_decorators = [(0, common_1.Get)('my-exits'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer mes sorties (étudiant connecté)' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste de mes sorties', type: [exit_entity_1.Exit] }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' })];
        _getGlobalStats_decorators = [(0, common_1.Get)('stats'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer les statistiques globales des sorties (admin)' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Statistiques des sorties',
                schema: {
                    properties: {
                        total: { type: 'number', example: 150 },
                        enCours: { type: 'number', example: 45 },
                        terminees: { type: 'number', example: 95 },
                        enRetard: { type: 'number', example: 10 }
                    }
                }
            })];
        _getMyStats_decorators = [(0, common_1.Get)('stats/my-stats'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer mes statistiques de sorties (étudiant connecté)' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Mes statistiques de sorties',
                schema: {
                    properties: {
                        total: { type: 'number', example: 10 },
                        enCours: { type: 'number', example: 2 },
                        terminees: { type: 'number', example: 7 },
                        enRetard: { type: 'number', example: 1 }
                    }
                }
            })];
        _getStudentExits_decorators = [(0, common_1.Get)('student/:studentId'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer les sorties d\'un étudiant spécifique (admin)' }), (0, swagger_1.ApiParam)({ name: 'studentId', description: 'ID de l\'étudiant', type: 'number' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des sorties de l\'étudiant', type: [exit_entity_1.Exit] }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Non autorisé' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Étudiant non trouvé' })];
        _getStudentStats_decorators = [(0, common_1.Get)('stats/:studentId'), (0, swagger_1.ApiOperation)({ summary: 'Récupérer les statistiques d\'un étudiant spécifique (admin)' }), (0, swagger_1.ApiParam)({ name: 'studentId', description: 'ID de l\'étudiant', type: 'number' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Statistiques de l\'étudiant',
                schema: {
                    properties: {
                        total: { type: 'number', example: 10 },
                        enCours: { type: 'number', example: 2 },
                        terminees: { type: 'number', example: 7 },
                        enRetard: { type: 'number', example: 1 }
                    }
                }
            })];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _update_decorators = [(0, common_1.Patch)(':id')];
        _remove_decorators = [(0, common_1.Delete)(':id')];
        _recordReturn_decorators = [(0, common_1.Patch)(':id/return'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Marquer le retour d\'une sortie' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Retour enregistré avec succès', type: exit_entity_1.Exit }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Sortie non trouvée' })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyExits_decorators, { kind: "method", name: "getMyExits", static: false, private: false, access: { has: function (obj) { return "getMyExits" in obj; }, get: function (obj) { return obj.getMyExits; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGlobalStats_decorators, { kind: "method", name: "getGlobalStats", static: false, private: false, access: { has: function (obj) { return "getGlobalStats" in obj; }, get: function (obj) { return obj.getGlobalStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyStats_decorators, { kind: "method", name: "getMyStats", static: false, private: false, access: { has: function (obj) { return "getMyStats" in obj; }, get: function (obj) { return obj.getMyStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStudentExits_decorators, { kind: "method", name: "getStudentExits", static: false, private: false, access: { has: function (obj) { return "getStudentExits" in obj; }, get: function (obj) { return obj.getStudentExits; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStudentStats_decorators, { kind: "method", name: "getStudentStats", static: false, private: false, access: { has: function (obj) { return "getStudentStats" in obj; }, get: function (obj) { return obj.getStudentStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _recordReturn_decorators, { kind: "method", name: "recordReturn", static: false, private: false, access: { has: function (obj) { return "recordReturn" in obj; }, get: function (obj) { return obj.recordReturn; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExitsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExitsController = _classThis;
}();
exports.ExitsController = ExitsController;
