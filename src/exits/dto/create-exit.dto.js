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
exports.CreateExitDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateExitDto = function () {
    var _a;
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _destination_decorators;
    var _destination_initializers = [];
    var _destination_extraInitializers = [];
    var _departureDate_decorators;
    var _departureDate_initializers = [];
    var _departureDate_extraInitializers = [];
    var _expectedReturnDate_decorators;
    var _expectedReturnDate_initializers = [];
    var _expectedReturnDate_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateExitDto() {
                this.reason = __runInitializers(this, _reason_initializers, void 0);
                this.destination = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _destination_initializers, void 0));
                this.departureDate = (__runInitializers(this, _destination_extraInitializers), __runInitializers(this, _departureDate_initializers, void 0));
                this.expectedReturnDate = (__runInitializers(this, _departureDate_extraInitializers), __runInitializers(this, _expectedReturnDate_initializers, void 0));
                this.description = (__runInitializers(this, _expectedReturnDate_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                __runInitializers(this, _description_extraInitializers);
            }
            return CreateExitDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _reason_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Raison de la sortie',
                    example: 'Visite familiale',
                    maxLength: 255,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
            _destination_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Destination',
                    example: 'Abidjan',
                    maxLength: 255,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
            _departureDate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Date et heure de départ',
                    example: '2025-10-15T10:00:00Z',
                    type: String,
                }), (0, class_validator_1.IsDateString)()];
            _expectedReturnDate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Date et heure de retour prévue',
                    example: '2025-10-20T18:00:00Z',
                    type: String,
                }), (0, class_validator_1.IsDateString)()];
            _description_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Description détaillée (optionnel)',
                    example: 'Je vais rendre visite à ma famille pour le weekend',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            __esDecorate(null, null, _destination_decorators, { kind: "field", name: "destination", static: false, private: false, access: { has: function (obj) { return "destination" in obj; }, get: function (obj) { return obj.destination; }, set: function (obj, value) { obj.destination = value; } }, metadata: _metadata }, _destination_initializers, _destination_extraInitializers);
            __esDecorate(null, null, _departureDate_decorators, { kind: "field", name: "departureDate", static: false, private: false, access: { has: function (obj) { return "departureDate" in obj; }, get: function (obj) { return obj.departureDate; }, set: function (obj, value) { obj.departureDate = value; } }, metadata: _metadata }, _departureDate_initializers, _departureDate_extraInitializers);
            __esDecorate(null, null, _expectedReturnDate_decorators, { kind: "field", name: "expectedReturnDate", static: false, private: false, access: { has: function (obj) { return "expectedReturnDate" in obj; }, get: function (obj) { return obj.expectedReturnDate; }, set: function (obj, value) { obj.expectedReturnDate = value; } }, metadata: _metadata }, _expectedReturnDate_initializers, _expectedReturnDate_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateExitDto = CreateExitDto;
