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
exports.CreateMessageDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var message_entity_1 = require("../entities/message.entity");
var CreateMessageDto = function () {
    var _a;
    var _receiverId_decorators;
    var _receiverId_initializers = [];
    var _receiverId_extraInitializers = [];
    var _receiverType_decorators;
    var _receiverType_initializers = [];
    var _receiverType_extraInitializers = [];
    var _groupId_decorators;
    var _groupId_initializers = [];
    var _groupId_extraInitializers = [];
    var _messageContent_decorators;
    var _messageContent_initializers = [];
    var _messageContent_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateMessageDto() {
                this.receiverId = __runInitializers(this, _receiverId_initializers, void 0);
                this.receiverType = (__runInitializers(this, _receiverId_extraInitializers), __runInitializers(this, _receiverType_initializers, void 0));
                this.groupId = (__runInitializers(this, _receiverType_extraInitializers), __runInitializers(this, _groupId_initializers, void 0));
                this.messageContent = (__runInitializers(this, _groupId_extraInitializers), __runInitializers(this, _messageContent_initializers, void 0));
                __runInitializers(this, _messageContent_extraInitializers);
            }
            return CreateMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _receiverId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'ID du destinataire (pour message privé)',
                    example: 1,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _receiverType_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Type du destinataire (optionnel - sera récupéré automatiquement depuis la base de données si non fourni)',
                    enum: message_entity_1.ReceiverType,
                    example: message_entity_1.ReceiverType.STUDENT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(message_entity_1.ReceiverType)];
            _groupId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'ID du groupe (pour message de groupe)',
                    example: 1,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _messageContent_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Contenu du message',
                    example: 'Bonjour, comment allez-vous ?',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _receiverId_decorators, { kind: "field", name: "receiverId", static: false, private: false, access: { has: function (obj) { return "receiverId" in obj; }, get: function (obj) { return obj.receiverId; }, set: function (obj, value) { obj.receiverId = value; } }, metadata: _metadata }, _receiverId_initializers, _receiverId_extraInitializers);
            __esDecorate(null, null, _receiverType_decorators, { kind: "field", name: "receiverType", static: false, private: false, access: { has: function (obj) { return "receiverType" in obj; }, get: function (obj) { return obj.receiverType; }, set: function (obj, value) { obj.receiverType = value; } }, metadata: _metadata }, _receiverType_initializers, _receiverType_extraInitializers);
            __esDecorate(null, null, _groupId_decorators, { kind: "field", name: "groupId", static: false, private: false, access: { has: function (obj) { return "groupId" in obj; }, get: function (obj) { return obj.groupId; }, set: function (obj, value) { obj.groupId = value; } }, metadata: _metadata }, _groupId_initializers, _groupId_extraInitializers);
            __esDecorate(null, null, _messageContent_decorators, { kind: "field", name: "messageContent", static: false, private: false, access: { has: function (obj) { return "messageContent" in obj; }, get: function (obj) { return obj.messageContent; }, set: function (obj, value) { obj.messageContent = value; } }, metadata: _metadata }, _messageContent_initializers, _messageContent_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateMessageDto = CreateMessageDto;
