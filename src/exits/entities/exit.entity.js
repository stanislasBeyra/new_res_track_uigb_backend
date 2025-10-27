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
exports.Exit = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var entry_exit_status_1 = require("src/enum/entry_exit_status");
var Exit = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('exits')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _studentId_decorators;
    var _studentId_initializers = [];
    var _studentId_extraInitializers = [];
    var _student_decorators;
    var _student_initializers = [];
    var _student_extraInitializers = [];
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
    var _actualReturnDate_decorators;
    var _actualReturnDate_initializers = [];
    var _actualReturnDate_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _delayDays_decorators;
    var _delayDays_initializers = [];
    var _delayDays_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var Exit = _classThis = /** @class */ (function () {
        function Exit_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.studentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
            this.student = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _student_initializers, void 0));
            this.reason = (__runInitializers(this, _student_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            this.destination = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _destination_initializers, void 0));
            this.departureDate = (__runInitializers(this, _destination_extraInitializers), __runInitializers(this, _departureDate_initializers, void 0));
            this.expectedReturnDate = (__runInitializers(this, _departureDate_extraInitializers), __runInitializers(this, _expectedReturnDate_initializers, void 0));
            this.actualReturnDate = (__runInitializers(this, _expectedReturnDate_extraInitializers), __runInitializers(this, _actualReturnDate_initializers, void 0));
            this.description = (__runInitializers(this, _actualReturnDate_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.status = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.delayDays = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _delayDays_initializers, void 0));
            this.createdAt = (__runInitializers(this, _delayDays_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            __runInitializers(this, _deletedAt_extraInitializers);
        }
        // Méthode pour calculer le retard
        Exit_1.prototype.calculateDelay = function () {
            if (!this.actualReturnDate) {
                var now = new Date();
                if (now > this.expectedReturnDate) {
                    var diffTime = Math.abs(now.getTime() - this.expectedReturnDate.getTime());
                    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }
                return 0;
            }
            if (this.actualReturnDate > this.expectedReturnDate) {
                var diffTime = Math.abs(this.actualReturnDate.getTime() - this.expectedReturnDate.getTime());
                return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
            return 0;
        };
        // Méthode pour mettre à jour le statut
        Exit_1.prototype.updateStatus = function () {
            var delay = this.calculateDelay();
            this.delayDays = delay;
            if (this.actualReturnDate) {
                if (delay > 0) {
                    this.status = entry_exit_status_1.ExitStatus.EN_RETARD;
                }
                else {
                    this.status = entry_exit_status_1.ExitStatus.TERMINEE;
                }
            }
            else {
                var now = new Date();
                if (now > this.expectedReturnDate) {
                    this.status = entry_exit_status_1.ExitStatus.EN_RETARD;
                }
                else {
                    this.status = entry_exit_status_1.ExitStatus.EN_COURS;
                }
            }
        };
        return Exit_1;
    }());
    __setFunctionName(_classThis, "Exit");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _studentId_decorators = [(0, typeorm_1.Column)({ name: 'student_id' })];
        _student_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.exits; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'student_id' })];
        _reason_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
        _destination_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 255 })];
        _departureDate_decorators = [(0, typeorm_1.Column)({ name: 'departure_date', type: 'datetime' })];
        _expectedReturnDate_decorators = [(0, typeorm_1.Column)({ name: 'expected_return_date', type: 'datetime' })];
        _actualReturnDate_decorators = [(0, typeorm_1.Column)({ name: 'actual_return_date', type: 'datetime', nullable: true })];
        _description_decorators = [(0, typeorm_1.Column)({ type: 'text', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: entry_exit_status_1.ExitStatus,
                default: entry_exit_status_1.ExitStatus.EN_COURS,
            })];
        _delayDays_decorators = [(0, typeorm_1.Column)({ name: 'delay_days', type: 'int', default: 0 })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: function (obj) { return "studentId" in obj; }, get: function (obj) { return obj.studentId; }, set: function (obj, value) { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
        __esDecorate(null, null, _student_decorators, { kind: "field", name: "student", static: false, private: false, access: { has: function (obj) { return "student" in obj; }, get: function (obj) { return obj.student; }, set: function (obj, value) { obj.student = value; } }, metadata: _metadata }, _student_initializers, _student_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _destination_decorators, { kind: "field", name: "destination", static: false, private: false, access: { has: function (obj) { return "destination" in obj; }, get: function (obj) { return obj.destination; }, set: function (obj, value) { obj.destination = value; } }, metadata: _metadata }, _destination_initializers, _destination_extraInitializers);
        __esDecorate(null, null, _departureDate_decorators, { kind: "field", name: "departureDate", static: false, private: false, access: { has: function (obj) { return "departureDate" in obj; }, get: function (obj) { return obj.departureDate; }, set: function (obj, value) { obj.departureDate = value; } }, metadata: _metadata }, _departureDate_initializers, _departureDate_extraInitializers);
        __esDecorate(null, null, _expectedReturnDate_decorators, { kind: "field", name: "expectedReturnDate", static: false, private: false, access: { has: function (obj) { return "expectedReturnDate" in obj; }, get: function (obj) { return obj.expectedReturnDate; }, set: function (obj, value) { obj.expectedReturnDate = value; } }, metadata: _metadata }, _expectedReturnDate_initializers, _expectedReturnDate_extraInitializers);
        __esDecorate(null, null, _actualReturnDate_decorators, { kind: "field", name: "actualReturnDate", static: false, private: false, access: { has: function (obj) { return "actualReturnDate" in obj; }, get: function (obj) { return obj.actualReturnDate; }, set: function (obj, value) { obj.actualReturnDate = value; } }, metadata: _metadata }, _actualReturnDate_initializers, _actualReturnDate_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _delayDays_decorators, { kind: "field", name: "delayDays", static: false, private: false, access: { has: function (obj) { return "delayDays" in obj; }, get: function (obj) { return obj.delayDays; }, set: function (obj, value) { obj.delayDays = value; } }, metadata: _metadata }, _delayDays_initializers, _delayDays_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Exit = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Exit = _classThis;
}();
exports.Exit = Exit;
