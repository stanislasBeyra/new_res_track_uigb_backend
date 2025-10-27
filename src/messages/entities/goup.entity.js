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
exports.Group = exports.FriendStatus = exports.GroupType = exports.ReceiverType = exports.SenderType = void 0;
var typeorm_1 = require("typeorm");
var group_member_entity_1 = require("./group_member.entity");
var message_entity_1 = require("./message.entity");
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
// ============= GROUP ENTITY =============
var Group = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('groups')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _groupName_decorators;
    var _groupName_initializers = [];
    var _groupName_extraInitializers = [];
    var _groupType_decorators;
    var _groupType_initializers = [];
    var _groupType_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _creatorType_decorators;
    var _creatorType_initializers = [];
    var _creatorType_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _members_decorators;
    var _members_initializers = [];
    var _members_extraInitializers = [];
    var _messages_decorators;
    var _messages_initializers = [];
    var _messages_extraInitializers = [];
    var Group = _classThis = /** @class */ (function () {
        function Group_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.groupName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _groupName_initializers, void 0));
            this.groupType = (__runInitializers(this, _groupName_extraInitializers), __runInitializers(this, _groupType_initializers, void 0));
            this.createdBy = (__runInitializers(this, _groupType_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.creatorType = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _creatorType_initializers, void 0));
            this.createdAt = (__runInitializers(this, _creatorType_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            // Relations
            this.members = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _members_initializers, void 0));
            this.messages = (__runInitializers(this, _members_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
            __runInitializers(this, _messages_extraInitializers);
        }
        return Group_1;
    }());
    __setFunctionName(_classThis, "Group");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _groupName_decorators = [(0, typeorm_1.Column)({ name: 'group_name', type: 'varchar', length: 200 })];
        _groupType_decorators = [(0, typeorm_1.Column)({
                name: 'group_type',
                type: 'enum',
                enum: GroupType,
                default: GroupType.STUDENT,
            })];
        _createdBy_decorators = [(0, typeorm_1.Column)({ name: 'created_by', type: 'int' })];
        _creatorType_decorators = [(0, typeorm_1.Column)({
                name: 'creator_type',
                type: 'enum',
                enum: SenderType,
            })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' })];
        _members_decorators = [(0, typeorm_1.OneToMany)(function () { return group_member_entity_1.GroupMember; }, function (member) { return member.group; })];
        _messages_decorators = [(0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (message) { return message.group; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _groupName_decorators, { kind: "field", name: "groupName", static: false, private: false, access: { has: function (obj) { return "groupName" in obj; }, get: function (obj) { return obj.groupName; }, set: function (obj, value) { obj.groupName = value; } }, metadata: _metadata }, _groupName_initializers, _groupName_extraInitializers);
        __esDecorate(null, null, _groupType_decorators, { kind: "field", name: "groupType", static: false, private: false, access: { has: function (obj) { return "groupType" in obj; }, get: function (obj) { return obj.groupType; }, set: function (obj, value) { obj.groupType = value; } }, metadata: _metadata }, _groupType_initializers, _groupType_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _creatorType_decorators, { kind: "field", name: "creatorType", static: false, private: false, access: { has: function (obj) { return "creatorType" in obj; }, get: function (obj) { return obj.creatorType; }, set: function (obj, value) { obj.creatorType = value; } }, metadata: _metadata }, _creatorType_initializers, _creatorType_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _members_decorators, { kind: "field", name: "members", static: false, private: false, access: { has: function (obj) { return "members" in obj; }, get: function (obj) { return obj.members; }, set: function (obj, value) { obj.members = value; } }, metadata: _metadata }, _members_initializers, _members_extraInitializers);
        __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: function (obj) { return "messages" in obj; }, get: function (obj) { return obj.messages; }, set: function (obj, value) { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Group = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Group = _classThis;
}();
exports.Group = Group;
