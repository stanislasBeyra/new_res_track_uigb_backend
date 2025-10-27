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
exports.CreateGroupDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var goup_entity_1 = require("../entities/goup.entity");
var CreateGroupDto = function () {
    var _a;
    var _groupName_decorators;
    var _groupName_initializers = [];
    var _groupName_extraInitializers = [];
    var _groupType_decorators;
    var _groupType_initializers = [];
    var _groupType_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateGroupDto() {
                this.groupName = __runInitializers(this, _groupName_initializers, void 0);
                this.groupType = (__runInitializers(this, _groupName_extraInitializers), __runInitializers(this, _groupType_initializers, void 0));
                __runInitializers(this, _groupType_extraInitializers);
            }
            return CreateGroupDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _groupName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Nom du groupe',
                    example: 'Étudiants L3 Informatique',
                    maxLength: 200,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(200)];
            _groupType_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type de groupe',
                    enum: goup_entity_1.GroupType,
                    example: goup_entity_1.GroupType.STUDENT,
                }), (0, class_validator_1.IsEnum)(goup_entity_1.GroupType)];
            __esDecorate(null, null, _groupName_decorators, { kind: "field", name: "groupName", static: false, private: false, access: { has: function (obj) { return "groupName" in obj; }, get: function (obj) { return obj.groupName; }, set: function (obj, value) { obj.groupName = value; } }, metadata: _metadata }, _groupName_initializers, _groupName_extraInitializers);
            __esDecorate(null, null, _groupType_decorators, { kind: "field", name: "groupType", static: false, private: false, access: { has: function (obj) { return "groupType" in obj; }, get: function (obj) { return obj.groupType; }, set: function (obj, value) { obj.groupType = value; } }, metadata: _metadata }, _groupType_initializers, _groupType_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateGroupDto = CreateGroupDto;
