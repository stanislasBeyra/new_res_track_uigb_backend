"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = __importStar(require("bcryptjs"));
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(userRepository, refreshTokenRepository, jwtService, configService) {
            this.userRepository = userRepository;
            this.refreshTokenRepository = refreshTokenRepository;
            this.jwtService = jwtService;
            this.configService = configService;
        }
        AuthService_1.prototype.login = function (loginDto, ipAddress, userAgent) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordValid, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { email: loginDto.email },
                                select: ['id', 'email', 'password', 'firstName', 'lastName', 'role', 'isActive'],
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('Invalid email or password');
                            }
                            if (!user.isActive) {
                                throw new common_1.UnauthorizedException('Account is inactive. Please contact administrator.');
                            }
                            return [4 /*yield*/, bcrypt.compare(loginDto.password, user.password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                throw new common_1.UnauthorizedException('Invalid email or password');
                            }
                            return [4 /*yield*/, this.generateTokens(user, ipAddress, userAgent)];
                        case 3:
                            tokens = _a.sent();
                            // Mettre à jour lastLogin
                            return [4 /*yield*/, this.userRepository.update(user.id, { lastLogin: new Date() })];
                        case 4:
                            // Mettre à jour lastLogin
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, tokens), { user: {
                                        id: user.id,
                                        email: user.email,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        role: user.role,
                                    } })];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshAccessToken = function (refreshTokenString, ipAddress, userAgent) {
            return __awaiter(this, void 0, void 0, function () {
                var refreshToken, tokens;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepository.findOne({
                                where: { token: refreshTokenString, isRevoked: false },
                                relations: ['user'],
                            })];
                        case 1:
                            refreshToken = _a.sent();
                            if (!refreshToken) {
                                throw new common_1.UnauthorizedException('Invalid refresh token');
                            }
                            // Vérifier si le token est expiré
                            if (new Date() > refreshToken.expiresAt) {
                                throw new common_1.UnauthorizedException('Refresh token expired');
                            }
                            // Révoquer l'ancien refresh token
                            return [4 /*yield*/, this.refreshTokenRepository.update(refreshToken.id, {
                                    isRevoked: true,
                                })];
                        case 2:
                            // Révoquer l'ancien refresh token
                            _a.sent();
                            return [4 /*yield*/, this.generateTokens(refreshToken.user, ipAddress, userAgent)];
                        case 3:
                            tokens = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, tokens), { user: {
                                        id: refreshToken.user.id,
                                        email: refreshToken.user.email,
                                        firstName: refreshToken.user.firstName,
                                        lastName: refreshToken.user.lastName,
                                        role: refreshToken.user.role,
                                    } })];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (refreshTokenString) {
            return __awaiter(this, void 0, void 0, function () {
                var refreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepository.findOne({
                                where: { token: refreshTokenString },
                            })];
                        case 1:
                            refreshToken = _a.sent();
                            if (!refreshToken) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.refreshTokenRepository.update(refreshToken.id, {
                                    isRevoked: true,
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.revokeUserTokens = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.refreshTokenRepository.update({ userId: userId, isRevoked: false }, { isRevoked: true })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.generateTokens = function (user, ipAddress, userAgent) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, accessToken, refreshTokenPayload, refreshToken, expiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payload = {
                                sub: user.id,
                                email: user.email,
                                role: user.role,
                            };
                            accessToken = this.jwtService.sign(payload, {
                                expiresIn: '1h',
                            });
                            refreshTokenPayload = {
                                sub: user.id,
                                type: 'refresh',
                            };
                            refreshToken = this.jwtService.sign(refreshTokenPayload, {
                                expiresIn: '270d', // 9 mois (270 jours)
                            });
                            expiresAt = new Date();
                            expiresAt.setDate(expiresAt.getDate() + 270); // 9 mois
                            return [4 /*yield*/, this.refreshTokenRepository.save({
                                    token: refreshToken,
                                    userId: user.id,
                                    expiresAt: expiresAt,
                                    ipAddress: ipAddress,
                                    userAgent: userAgent,
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    tokenType: 'Bearer',
                                    expiresIn: 3600, // 1 heure en secondes (access token)
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.validateUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userId, isActive: true },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException('User not found or inactive');
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
