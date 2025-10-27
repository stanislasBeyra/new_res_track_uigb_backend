"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
var core_1 = require("@nestjs/core");
var platform_express_1 = require("@nestjs/platform-express");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var all_exceptions_filter_filter_1 = require("../src/common/filters/all-exceptions.filter.filter");
var http_exception_filter_filter_1 = require("../src/common/filters/http-exception.filter.filter");
var database_exception_filter_filter_1 = require("../src/common/filters/database-exception.filter.filter");
var validation_exception_filter_filter_1 = require("../src/common/filters/validation-exception.filter.filter");
var transform_interceptor_1 = require("../src/common/interceptors/transform.interceptor");
var logging_interceptor_1 = require("../src/common/interceptors/logging.interceptor");
var app_module_1 = require("../src/app.module");
var express_1 = __importDefault(require("express"));
var expressApp = (0, express_1.default)();
// Cache de l'application pour éviter de la recréer à chaque requête
var cachedApp = null;
function createApp() {
    return __awaiter(this, void 0, void 0, function () {
        var adapter, app, allowedOrigins, config, document_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (cachedApp) {
                        return [2 /*return*/, cachedApp];
                    }
                    adapter = new platform_express_1.ExpressAdapter(expressApp);
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule, adapter)];
                case 1:
                    app = _b.sent();
                    // Validation globale
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        whitelist: true,
                        forbidNonWhitelisted: true,
                        transform: true,
                        transformOptions: {
                            enableImplicitConversion: true,
                        },
                    }));
                    // Interceptors globaux
                    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor());
                    // Filters globaux
                    app.useGlobalFilters(new all_exceptions_filter_filter_1.AllExceptionsFilter(), new validation_exception_filter_filter_1.ValidationExceptionFilter(), new http_exception_filter_filter_1.HttpExceptionFilter(), new database_exception_filter_filter_1.DatabaseExceptionFilter());
                    allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || '*';
                    app.enableCors({
                        origin: allowedOrigins,
                        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                        credentials: true,
                        allowedHeaders: '*',
                    });
                    // Prefix global
                    app.setGlobalPrefix('api', {
                        exclude: ['/', 'health', 'metrics', 'docs', 'upload'],
                    });
                    // Configuration Swagger
                    if (process.env.SWAGGER_ENABLED !== 'false') {
                        config = new swagger_1.DocumentBuilder()
                            .setTitle('Restrack API')
                            .setDescription('API pour le système de suivi de résidence étudiante')
                            .setVersion('1.0')
                            .addTag('Users', 'Gestion des utilisateurs')
                            .addBearerAuth({
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                            name: 'JWT',
                            description: 'Enter JWT token',
                            in: 'header',
                        }, 'JWT-auth')
                            .build();
                        document_1 = swagger_1.SwaggerModule.createDocument(app, config);
                        swagger_1.SwaggerModule.setup('docs', app, document_1, {
                            swaggerOptions: {
                                persistAuthorization: true,
                            },
                            customSiteTitle: 'Restrack API Documentation',
                        });
                    }
                    return [4 /*yield*/, app.init()];
                case 2:
                    _b.sent();
                    cachedApp = expressApp;
                    return [2 /*return*/, expressApp];
            }
        });
    });
}
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var app, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, createApp()];
                case 1:
                    app = _a.sent();
                    app(req, res);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error initializing app:', error_1);
                    res.status(500).json({ error: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
