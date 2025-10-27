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
exports.LoggingInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var LoggingInterceptor = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoggingInterceptor = _classThis = /** @class */ (function () {
        function LoggingInterceptor_1() {
            this.logger = new common_1.Logger('HTTP');
        }
        LoggingInterceptor_1.prototype.intercept = function (context, next) {
            var _this = this;
            var request = context.switchToHttp().getRequest();
            var method = request.method, url = request.url, body = request.body, headers = request.headers;
            var userAgent = headers['user-agent'] || '';
            var ip = headers['x-forwarded-for'] || request.ip;
            var now = Date.now();
            // Log de la requête entrante
            this.logger.log("\uD83D\uDCE5 ".concat(method, " ").concat(url, " - IP: ").concat(ip, " - User-Agent: ").concat(userAgent.substring(0, 50), "..."));
            // Log du body si présent (sauf mot de passe)
            if (body && Object.keys(body).length > 0) {
                var sanitizedBody = __assign({}, body);
                if (sanitizedBody.password) {
                    sanitizedBody.password = '***HIDDEN***';
                }
                this.logger.debug("\uD83D\uDCE6 Body: ".concat(JSON.stringify(sanitizedBody)));
            }
            return next.handle().pipe((0, operators_1.tap)({
                next: function (data) {
                    var response = context.switchToHttp().getResponse();
                    var statusCode = response.statusCode;
                    var delay = Date.now() - now;
                    _this.logger.log("\uD83D\uDCE4 ".concat(method, " ").concat(url, " - Status: ").concat(statusCode, " - ").concat(delay, "ms"));
                },
                error: function (error) {
                    var delay = Date.now() - now;
                    _this.logger.error("\u274C ".concat(method, " ").concat(url, " - Error: ").concat(error.message, " - ").concat(delay, "ms"));
                },
            }));
        };
        return LoggingInterceptor_1;
    }());
    __setFunctionName(_classThis, "LoggingInterceptor");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoggingInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoggingInterceptor = _classThis;
}();
exports.LoggingInterceptor = LoggingInterceptor;
