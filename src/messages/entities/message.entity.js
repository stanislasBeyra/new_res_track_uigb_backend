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
exports.Message = exports.FriendStatus = exports.GroupType = exports.ReceiverType = exports.SenderType = void 0;
var typeorm_1 = require("typeorm");
var goup_entity_1 = require("./goup.entity");
var user_entity_1 = require("../../users/entities/user.entity");
// ============= ENUMS =============
var SenderType;
(function (SenderType) {
    SenderType["STUDENT"] = "STUDENT";
    SenderType["ADMIN"] = "ADMIN";
})(SenderType || (exports.SenderType = SenderType = {}));
var ReceiverType;
(function (ReceiverType) {
    ReceiverType["STUDENT"] = "STUDENT";
    ReceiverType["ADMIN"] = "ADMIN";
    ReceiverType["GROUP"] = "GROUP";
})(ReceiverType || (exports.ReceiverType = ReceiverType = {}));
var GroupType;
(function (GroupType) {
    GroupType["STUDENT"] = "STUDENT";
    GroupType["ADMIN"] = "ADMIN";
    GroupType["MIXED"] = "MIXED";
})(GroupType || (exports.GroupType = GroupType = {}));
var FriendStatus;
(function (FriendStatus) {
    FriendStatus["PENDING"] = "PENDING";
    FriendStatus["ACCEPTED"] = "ACCEPTED";
    FriendStatus["REJECTED"] = "REJECTED";
    FriendStatus["BLOCKED"] = "BLOCKED";
})(FriendStatus || (exports.FriendStatus = FriendStatus = {}));
// ============= MESSAGE ENTITY =============
var Message = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('messages'), (0, typeorm_1.Index)('idx_sender', ['senderId', 'senderType']), (0, typeorm_1.Index)('idx_receiver', ['receiverId', 'receiverType']), (0, typeorm_1.Index)('idx_group_messages', ['groupId'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _senderId_decorators;
    var _senderId_initializers = [];
    var _senderId_extraInitializers = [];
    var _senderType_decorators;
    var _senderType_initializers = [];
    var _senderType_extraInitializers = [];
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
    var _isRead_decorators;
    var _isRead_initializers = [];
    var _isRead_extraInitializers = [];
    var _sentAt_decorators;
    var _sentAt_initializers = [];
    var _sentAt_extraInitializers = [];
    var _group_decorators;
    var _group_initializers = [];
    var _group_extraInitializers = [];
    var _sender_decorators;
    var _sender_initializers = [];
    var _sender_extraInitializers = [];
    var _receiver_decorators;
    var _receiver_initializers = [];
    var _receiver_extraInitializers = [];
    var Message = _classThis = /** @class */ (function () {
        function Message_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.senderId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _senderId_initializers, void 0));
            this.senderType = (__runInitializers(this, _senderId_extraInitializers), __runInitializers(this, _senderType_initializers, void 0));
            this.receiverId = (__runInitializers(this, _senderType_extraInitializers), __runInitializers(this, _receiverId_initializers, void 0));
            this.receiverType = (__runInitializers(this, _receiverId_extraInitializers), __runInitializers(this, _receiverType_initializers, void 0));
            this.groupId = (__runInitializers(this, _receiverType_extraInitializers), __runInitializers(this, _groupId_initializers, void 0));
            this.messageContent = (__runInitializers(this, _groupId_extraInitializers), __runInitializers(this, _messageContent_initializers, void 0));
            this.isRead = (__runInitializers(this, _messageContent_extraInitializers), __runInitializers(this, _isRead_initializers, void 0));
            this.sentAt = (__runInitializers(this, _isRead_extraInitializers), __runInitializers(this, _sentAt_initializers, void 0));
            // Relations
            this.group = (__runInitializers(this, _sentAt_extraInitializers), __runInitializers(this, _group_initializers, void 0));
            this.sender = (__runInitializers(this, _group_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
            this.receiver = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _receiver_initializers, void 0));
            __runInitializers(this, _receiver_extraInitializers);
        }
        return Message_1;
    }());
    __setFunctionName(_classThis, "Message");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _senderId_decorators = [(0, typeorm_1.Column)({ name: 'sender_id', type: 'int' })];
        _senderType_decorators = [(0, typeorm_1.Column)({
                name: 'sender_type',
                type: 'enum',
                enum: SenderType,
            })];
        _receiverId_decorators = [(0, typeorm_1.Column)({ name: 'receiver_id', type: 'int', nullable: true })];
        _receiverType_decorators = [(0, typeorm_1.Column)({
                name: 'receiver_type',
                type: 'enum',
                enum: ReceiverType,
                nullable: true,
            })];
        _groupId_decorators = [(0, typeorm_1.Column)({ name: 'group_id', type: 'int', nullable: true })];
        _messageContent_decorators = [(0, typeorm_1.Column)({ name: 'message_content', type: 'text' })];
        _isRead_decorators = [(0, typeorm_1.Column)({ name: 'is_read', type: 'boolean', default: false })];
        _sentAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'sent_at', type: 'timestamp' })];
        _group_decorators = [(0, typeorm_1.ManyToOne)(function () { return goup_entity_1.Group; }, function (group) { return group.messages; }, { nullable: true }), (0, typeorm_1.JoinColumn)({ name: 'group_id' })];
        _sender_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { eager: false }), (0, typeorm_1.JoinColumn)({ name: 'sender_id' })];
        _receiver_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { eager: false }), (0, typeorm_1.JoinColumn)({ name: 'receiver_id' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _senderId_decorators, { kind: "field", name: "senderId", static: false, private: false, access: { has: function (obj) { return "senderId" in obj; }, get: function (obj) { return obj.senderId; }, set: function (obj, value) { obj.senderId = value; } }, metadata: _metadata }, _senderId_initializers, _senderId_extraInitializers);
        __esDecorate(null, null, _senderType_decorators, { kind: "field", name: "senderType", static: false, private: false, access: { has: function (obj) { return "senderType" in obj; }, get: function (obj) { return obj.senderType; }, set: function (obj, value) { obj.senderType = value; } }, metadata: _metadata }, _senderType_initializers, _senderType_extraInitializers);
        __esDecorate(null, null, _receiverId_decorators, { kind: "field", name: "receiverId", static: false, private: false, access: { has: function (obj) { return "receiverId" in obj; }, get: function (obj) { return obj.receiverId; }, set: function (obj, value) { obj.receiverId = value; } }, metadata: _metadata }, _receiverId_initializers, _receiverId_extraInitializers);
        __esDecorate(null, null, _receiverType_decorators, { kind: "field", name: "receiverType", static: false, private: false, access: { has: function (obj) { return "receiverType" in obj; }, get: function (obj) { return obj.receiverType; }, set: function (obj, value) { obj.receiverType = value; } }, metadata: _metadata }, _receiverType_initializers, _receiverType_extraInitializers);
        __esDecorate(null, null, _groupId_decorators, { kind: "field", name: "groupId", static: false, private: false, access: { has: function (obj) { return "groupId" in obj; }, get: function (obj) { return obj.groupId; }, set: function (obj, value) { obj.groupId = value; } }, metadata: _metadata }, _groupId_initializers, _groupId_extraInitializers);
        __esDecorate(null, null, _messageContent_decorators, { kind: "field", name: "messageContent", static: false, private: false, access: { has: function (obj) { return "messageContent" in obj; }, get: function (obj) { return obj.messageContent; }, set: function (obj, value) { obj.messageContent = value; } }, metadata: _metadata }, _messageContent_initializers, _messageContent_extraInitializers);
        __esDecorate(null, null, _isRead_decorators, { kind: "field", name: "isRead", static: false, private: false, access: { has: function (obj) { return "isRead" in obj; }, get: function (obj) { return obj.isRead; }, set: function (obj, value) { obj.isRead = value; } }, metadata: _metadata }, _isRead_initializers, _isRead_extraInitializers);
        __esDecorate(null, null, _sentAt_decorators, { kind: "field", name: "sentAt", static: false, private: false, access: { has: function (obj) { return "sentAt" in obj; }, get: function (obj) { return obj.sentAt; }, set: function (obj, value) { obj.sentAt = value; } }, metadata: _metadata }, _sentAt_initializers, _sentAt_extraInitializers);
        __esDecorate(null, null, _group_decorators, { kind: "field", name: "group", static: false, private: false, access: { has: function (obj) { return "group" in obj; }, get: function (obj) { return obj.group; }, set: function (obj, value) { obj.group = value; } }, metadata: _metadata }, _group_initializers, _group_extraInitializers);
        __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: function (obj) { return "sender" in obj; }, get: function (obj) { return obj.sender; }, set: function (obj, value) { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
        __esDecorate(null, null, _receiver_decorators, { kind: "field", name: "receiver", static: false, private: false, access: { has: function (obj) { return "receiver" in obj; }, get: function (obj) { return obj.receiver; }, set: function (obj, value) { obj.receiver = value; } }, metadata: _metadata }, _receiver_initializers, _receiver_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Message = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Message = _classThis;
}();
exports.Message = Message;
