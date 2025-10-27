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
exports.CreateUserDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var userrole_1 = require("../../enum/userrole");
var userstatus_1 = require("../../enum/userstatus");
var use_level_1 = require("../../enum/use_level");
var CreateUserDto = function () {
    var _a;
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _firstName_extraInitializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _lastName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _studentId_decorators;
    var _studentId_initializers = [];
    var _studentId_extraInitializers = [];
    var _level_decorators;
    var _level_initializers = [];
    var _level_extraInitializers = [];
    var _roomNumber_decorators;
    var _roomNumber_initializers = [];
    var _roomNumber_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateUserDto() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.password = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.role = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.studentId = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
                this.level = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _level_initializers, void 0));
                this.roomNumber = (__runInitializers(this, _level_extraInitializers), __runInitializers(this, _roomNumber_initializers, void 0));
                this.phone = (__runInitializers(this, _roomNumber_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
                this.status = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                __runInitializers(this, _status_extraInitializers);
            }
            return CreateUserDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User first name',
                    example: 'Jean',
                    minLength: 2,
                    maxLength: 100,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(100)];
            _lastName_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User last name',
                    example: 'Dupont',
                    minLength: 2,
                    maxLength: 100,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(100)];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User email address',
                    example: 'jean.dupont@example.com',
                }), (0, class_validator_1.IsEmail)({}, { message: 'Email must be valid' })];
            _password_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User password',
                    example: 'Password123!',
                    minLength: 6,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(6, { message: 'Password must contain at least 6 characters' })];
            _role_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'User role',
                    enum: userrole_1.UserRole,
                    default: userrole_1.UserRole.STUDENT,
                    example: userrole_1.UserRole.STUDENT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(userrole_1.UserRole, { message: 'Role must be STUDENT or ADMIN' })];
            _studentId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Student ID (required for students)',
                    example: 'STU2024001',
                    maxLength: 50,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _level_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Education level',
                    enum: use_level_1.UserLevel,
                    default: use_level_1.UserLevel.Freshman,
                    example: use_level_1.UserLevel.Freshman,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(use_level_1.UserLevel, { message: 'Level must be Freshman, Sophomore, Junior, Senior, or Graduate' })];
            _roomNumber_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Room number',
                    example: 'A101',
                    maxLength: 20,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
            _phone_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Phone number',
                    example: '0705137055',
                    maxLength: 20,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'User status',
                    enum: userstatus_1.UserStatus,
                    default: userstatus_1.UserStatus.PRESENT,
                    example: userstatus_1.UserStatus.PRESENT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(userstatus_1.UserStatus, { message: 'Status must be PRESENT or ON_EXIT' })];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: function (obj) { return "studentId" in obj; }, get: function (obj) { return obj.studentId; }, set: function (obj, value) { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
            __esDecorate(null, null, _level_decorators, { kind: "field", name: "level", static: false, private: false, access: { has: function (obj) { return "level" in obj; }, get: function (obj) { return obj.level; }, set: function (obj, value) { obj.level = value; } }, metadata: _metadata }, _level_initializers, _level_extraInitializers);
            __esDecorate(null, null, _roomNumber_decorators, { kind: "field", name: "roomNumber", static: false, private: false, access: { has: function (obj) { return "roomNumber" in obj; }, get: function (obj) { return obj.roomNumber; }, set: function (obj, value) { obj.roomNumber = value; } }, metadata: _metadata }, _roomNumber_initializers, _roomNumber_extraInitializers);
            __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateUserDto = CreateUserDto;
