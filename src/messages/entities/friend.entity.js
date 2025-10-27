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
exports.Friend = exports.FriendStatus = exports.GroupType = exports.ReceiverType = exports.SenderType = void 0;
var typeorm_1 = require("typeorm");
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
// ============= FRIEND ENTITY =============
var Friend = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('friends')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _studentId_decorators;
    var _studentId_initializers = [];
    var _studentId_extraInitializers = [];
    var _requesterId_decorators;
    var _requesterId_initializers = [];
    var _requesterId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _requester_decorators;
    var _requester_initializers = [];
    var _requester_extraInitializers = [];
    var _student_decorators;
    var _student_initializers = [];
    var _student_extraInitializers = [];
    var Friend = _classThis = /** @class */ (function () {
        function Friend_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.studentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
            this.requesterId = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _requesterId_initializers, void 0));
            this.status = (__runInitializers(this, _requesterId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            // Relations
            this.requester = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _requester_initializers, void 0));
            this.student = (__runInitializers(this, _requester_extraInitializers), __runInitializers(this, _student_initializers, void 0));
            __runInitializers(this, _student_extraInitializers);
        }
        return Friend_1;
    }());
    __setFunctionName(_classThis, "Friend");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _studentId_decorators = [(0, typeorm_1.Column)({ name: 'student_id', type: 'int' })];
        _requesterId_decorators = [(0, typeorm_1.Column)({ name: 'requester_id', type: 'int' })];
        _status_decorators = [(0, typeorm_1.Column)({
                name: 'status',
                type: 'enum',
                enum: FriendStatus,
                default: FriendStatus.PENDING,
            })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' })];
        _requester_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { eager: false }), (0, typeorm_1.JoinColumn)({ name: 'requester_id' })];
        _student_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, { eager: false }), (0, typeorm_1.JoinColumn)({ name: 'student_id' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: function (obj) { return "studentId" in obj; }, get: function (obj) { return obj.studentId; }, set: function (obj, value) { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
        __esDecorate(null, null, _requesterId_decorators, { kind: "field", name: "requesterId", static: false, private: false, access: { has: function (obj) { return "requesterId" in obj; }, get: function (obj) { return obj.requesterId; }, set: function (obj, value) { obj.requesterId = value; } }, metadata: _metadata }, _requesterId_initializers, _requesterId_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _requester_decorators, { kind: "field", name: "requester", static: false, private: false, access: { has: function (obj) { return "requester" in obj; }, get: function (obj) { return obj.requester; }, set: function (obj, value) { obj.requester = value; } }, metadata: _metadata }, _requester_initializers, _requester_extraInitializers);
        __esDecorate(null, null, _student_decorators, { kind: "field", name: "student", static: false, private: false, access: { has: function (obj) { return "student" in obj; }, get: function (obj) { return obj.student; }, set: function (obj, value) { obj.student = value; } }, metadata: _metadata }, _student_initializers, _student_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Friend = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Friend = _classThis;
}();
exports.Friend = Friend;
