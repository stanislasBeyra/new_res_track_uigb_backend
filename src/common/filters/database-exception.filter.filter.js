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
exports.DatabaseExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("typeorm");
var DatabaseExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)(typeorm_1.QueryFailedError)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DatabaseExceptionFilter = _classThis = /** @class */ (function () {
        function DatabaseExceptionFilter_1() {
            this.logger = new common_1.Logger(DatabaseExceptionFilter.name);
        }
        DatabaseExceptionFilter_1.prototype.catch = function (exception, host) {
            var ctx = host.switchToHttp();
            var response = ctx.getResponse();
            // Log de l'erreur
            this.logger.error('Database Error:', exception);
            var message = 'Erreur de base de données';
            var status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            // Gérer les erreurs spécifiques MySQL
            var error = exception;
            // Violation de contrainte unique
            if (error.code === 'ER_DUP_ENTRY') {
                status = common_1.HttpStatus.CONFLICT;
                message = 'Cette valeur existe déjà dans la base de données';
            }
            // Violation de clé étrangère
            else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Référence invalide vers une entité inexistante';
            }
            var errorResponse = {
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: message,
                error: process.env.NODE_ENV === 'development' ? error.sqlMessage : undefined,
            };
            response.status(status).json(errorResponse);
        };
        return DatabaseExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "DatabaseExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DatabaseExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DatabaseExceptionFilter = _classThis;
}();
exports.DatabaseExceptionFilter = DatabaseExceptionFilter;
