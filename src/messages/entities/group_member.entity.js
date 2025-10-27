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
exports.GroupMember = exports.FriendStatus = exports.GroupType = exports.ReceiverType = exports.SenderType = void 0;
var typeorm_1 = require("typeorm");
var goup_entity_1 = require("./goup.entity");
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
// ============= GROUP MEMBER ENTITY =============
var GroupMember = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('group_members'), (0, typeorm_1.Index)('idx_group_members', ['groupId']), (0, typeorm_1.Index)('idx_user_groups', ['userId', 'userType']), (0, typeorm_1.Index)('unique_member', ['groupId', 'userId', 'userType'], { unique: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _groupId_decorators;
    var _groupId_initializers = [];
    var _groupId_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _userType_decorators;
    var _userType_initializers = [];
    var _userType_extraInitializers = [];
    var _joinedAt_decorators;
    var _joinedAt_initializers = [];
    var _joinedAt_extraInitializers = [];
    var _group_decorators;
    var _group_initializers = [];
    var _group_extraInitializers = [];
    var GroupMember = _classThis = /** @class */ (function () {
        function GroupMember_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.groupId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _groupId_initializers, void 0));
            this.userId = (__runInitializers(this, _groupId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.userType = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _userType_initializers, void 0));
            this.joinedAt = (__runInitializers(this, _userType_extraInitializers), __runInitializers(this, _joinedAt_initializers, void 0));
            // Relations
            this.group = (__runInitializers(this, _joinedAt_extraInitializers), __runInitializers(this, _group_initializers, void 0));
            __runInitializers(this, _group_extraInitializers);
        }
        return GroupMember_1;
    }());
    __setFunctionName(_classThis, "GroupMember");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _groupId_decorators = [(0, typeorm_1.Column)({ name: 'group_id', type: 'int' })];
        _userId_decorators = [(0, typeorm_1.Column)({ name: 'user_id', type: 'int' })];
        _userType_decorators = [(0, typeorm_1.Column)({
                name: 'user_type',
                type: 'enum',
                enum: SenderType,
            })];
        _joinedAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'joined_at', type: 'timestamp' })];
        _group_decorators = [(0, typeorm_1.ManyToOne)(function () { return goup_entity_1.Group; }, function (group) { return group.members; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'group_id' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _groupId_decorators, { kind: "field", name: "groupId", static: false, private: false, access: { has: function (obj) { return "groupId" in obj; }, get: function (obj) { return obj.groupId; }, set: function (obj, value) { obj.groupId = value; } }, metadata: _metadata }, _groupId_initializers, _groupId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _userType_decorators, { kind: "field", name: "userType", static: false, private: false, access: { has: function (obj) { return "userType" in obj; }, get: function (obj) { return obj.userType; }, set: function (obj, value) { obj.userType = value; } }, metadata: _metadata }, _userType_initializers, _userType_extraInitializers);
        __esDecorate(null, null, _joinedAt_decorators, { kind: "field", name: "joinedAt", static: false, private: false, access: { has: function (obj) { return "joinedAt" in obj; }, get: function (obj) { return obj.joinedAt; }, set: function (obj, value) { obj.joinedAt = value; } }, metadata: _metadata }, _joinedAt_initializers, _joinedAt_extraInitializers);
        __esDecorate(null, null, _group_decorators, { kind: "field", name: "group", static: false, private: false, access: { has: function (obj) { return "group" in obj; }, get: function (obj) { return obj.group; }, set: function (obj, value) { obj.group = value; } }, metadata: _metadata }, _group_initializers, _group_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GroupMember = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GroupMember = _classThis;
}();
exports.GroupMember = GroupMember;
