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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var UsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UsersService = _classThis = /** @class */ (function () {
        function UsersService_1(userRepository) {
            this.userRepository = userRepository;
        }
        UsersService_1.prototype.createUser = function (createUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, emailExists, romm, studentIdExists, user, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            if (!createUserDto) {
                                throw new common_1.BadRequestException('the data is required');
                            }
                            if (!createUserDto.email) return [3 /*break*/, 2];
                            email = createUserDto.email;
                            if (!email.endsWith('@student.iugb.edu.ci')) {
                                throw new common_1.BadRequestException('this email address is not valid');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { email: createUserDto.email }
                                })];
                        case 1:
                            emailExists = _a.sent();
                            if (emailExists) {
                                throw new common_1.BadRequestException('the email already exists');
                            }
                            _a.label = 2;
                        case 2:
                            if (createUserDto.roomNumber) {
                                romm = createUserDto.roomNumber;
                                if (romm.length > 3) {
                                    throw new common_1.BadRequestException('the room number must be less than 20 characters');
                                }
                            }
                            if (!createUserDto.studentId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { studentId: createUserDto.studentId }
                                })];
                        case 3:
                            studentIdExists = _a.sent();
                            if (studentIdExists) {
                                throw new common_1.BadRequestException('the student id already exists');
                            }
                            _a.label = 4;
                        case 4:
                            user = this.userRepository.create(createUserDto);
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6:
                            error_1 = _a.sent();
                            if (error_1 instanceof common_1.BadRequestException) {
                                throw error_1;
                            }
                            throw new common_1.BadRequestException('Error while creating the user');
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.findAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.userRepository.find({
                                    order: { createdAt: 'DESC' }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_2 = _a.sent();
                            throw new common_1.BadRequestException('Error while retrieving the users');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.findOne = function (id, studentId, email) {
            return __awaiter(this, void 0, void 0, function () {
                var whereCondition, user, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Vérifier qu'au moins un paramètre est fourni
                            if (!id && !studentId && !email) {
                                throw new common_1.BadRequestException('At least one search parameter is required (id, studentId, or email)');
                            }
                            whereCondition = {};
                            if (id) {
                                whereCondition.id = id;
                            }
                            if (studentId) {
                                whereCondition.studentId = studentId;
                            }
                            if (email) {
                                whereCondition.email = email;
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: whereCondition })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            return [2 /*return*/, user];
                        case 2:
                            error_3 = _a.sent();
                            if (error_3 instanceof common_1.BadRequestException || error_3 instanceof common_1.NotFoundException) {
                                throw error_3;
                            }
                            throw new common_1.BadRequestException('Error while retrieving the user');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.uploadProfilePicture = function (id, file) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!id) {
                                throw new common_1.BadRequestException('User ID is required');
                            }
                            if (!file) {
                                throw new common_1.BadRequestException('Profile picture file is required');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            // Le fichier est déjà sauvegardé par multer dans public/upload
                            // On stocke le chemin complet de l'image
                            user.profilePicture = "upload/".concat(file.filename);
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_4 = _a.sent();
                            if (error_4 instanceof common_1.BadRequestException || error_4 instanceof common_1.NotFoundException) {
                                throw error_4;
                            }
                            throw new common_1.BadRequestException('Error while uploading the profile picture');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.updateProfilePictureUrl = function (id, profilePictureUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!id) {
                                throw new common_1.BadRequestException('User ID is required');
                            }
                            if (!profilePictureUrl) {
                                throw new common_1.BadRequestException('Profile picture URL is required');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            user.profilePicture = profilePictureUrl;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_5 = _a.sent();
                            if (error_5 instanceof common_1.BadRequestException || error_5 instanceof common_1.NotFoundException) {
                                throw error_5;
                            }
                            throw new common_1.BadRequestException('Error while updating the profile picture URL');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.update = function (id, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, emailExists, studentIdExists, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            if (!id) {
                                throw new common_1.BadRequestException('User ID is required');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: id } })];
                        case 1:
                            existingUser = _a.sent();
                            if (!existingUser) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            if (!(updateUserDto.email && updateUserDto.email !== existingUser.email)) return [3 /*break*/, 3];
                            if (!updateUserDto.email.endsWith('@student.iugb.edu.ci')) {
                                throw new common_1.BadRequestException('this email address is not valid');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { email: updateUserDto.email }
                                })];
                        case 2:
                            emailExists = _a.sent();
                            if (emailExists) {
                                throw new common_1.BadRequestException('the email already exists');
                            }
                            _a.label = 3;
                        case 3:
                            if (!(updateUserDto.studentId && updateUserDto.studentId !== existingUser.studentId)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.userRepository.findOne({
                                    where: { studentId: updateUserDto.studentId }
                                })];
                        case 4:
                            studentIdExists = _a.sent();
                            if (studentIdExists) {
                                throw new common_1.BadRequestException('the student id already exists');
                            }
                            _a.label = 5;
                        case 5: return [4 /*yield*/, this.userRepository.update(id, updateUserDto)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.findOne(id)];
                        case 7: return [2 /*return*/, _a.sent()];
                        case 8:
                            error_6 = _a.sent();
                            if (error_6 instanceof common_1.BadRequestException || error_6 instanceof common_1.NotFoundException) {
                                throw error_6;
                            }
                            throw new common_1.BadRequestException('Error while updating the user');
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.activedesactiveUser = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!id) {
                                throw new common_1.BadRequestException('User ID is required');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            user.isActive = !user.isActive;
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_7 = _a.sent();
                            if (error_7 instanceof common_1.BadRequestException || error_7 instanceof common_1.NotFoundException) {
                                throw error_7;
                            }
                            throw new common_1.BadRequestException('Error while updating user status');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.changePassword = function (id, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!id) {
                                throw new common_1.BadRequestException('User ID is required');
                            }
                            if (!newPassword) {
                                throw new common_1.BadRequestException('New password is required');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            user.password = newPassword; // Le hashage doit être géré ailleurs (ex: un subscriber)
                            return [4 /*yield*/, this.userRepository.save(user)];
                        case 2: // Le hashage doit être géré ailleurs (ex: un subscriber)
                        return [2 /*return*/, _a.sent()];
                        case 3:
                            error_8 = _a.sent();
                            if (error_8 instanceof common_1.BadRequestException || error_8 instanceof common_1.NotFoundException) {
                                throw error_8;
                            }
                            throw new common_1.BadRequestException('Error while changing the password');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!id) {
                                throw new common_1.BadRequestException('User ID is required');
                            }
                            return [4 /*yield*/, this.userRepository.findOne({ where: { id: id } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            return [4 /*yield*/, this.userRepository.delete(id)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_9 = _a.sent();
                            if (error_9 instanceof common_1.BadRequestException || error_9 instanceof common_1.NotFoundException) {
                                throw error_9;
                            }
                            throw new common_1.BadRequestException('Error while deleting the user');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        UsersService_1.prototype.findByRole = function (role) {
            return __awaiter(this, void 0, void 0, function () {
                var error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.userRepository.find({
                                    where: { role: role },
                                    order: { createdAt: 'DESC' }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_10 = _a.sent();
                            throw new common_1.BadRequestException('Error while retrieving users by role');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return UsersService_1;
    }());
    __setFunctionName(_classThis, "UsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersService = _classThis;
}();
exports.UsersService = UsersService;
