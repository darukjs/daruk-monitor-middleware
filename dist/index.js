"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitor_1 = require("./libs/monitor");
const auth = require("basic-auth");
function default_1(options) {
    let monitor;
    return async function DarukMonitor(ctx, next) {
        if (ctx.request && /^\/monitor\//.test(ctx.request.url)) {
            const authRes = doAuth(ctx, options.auth);
            if (authRes) {
                try {
                    if (!monitor)
                        monitor = getMonitor();
                    let result = monitor.getAnalytics(ctx);
                    if (result) {
                        ctx.body = await result;
                    }
                }
                catch (e) {
                    ctx.body = e.message;
                }
            }
        }
        await next();
    };
    function getMonitor() {
        return new monitor_1.default();
    }
}
exports.default = default_1;
function doAuth(ctx, authOptions) {
    const credentials = auth(ctx.req);
    const { name, password } = authOptions;
    const errorCode = 401;
    if (credentials && name === credentials.name && password === credentials.pass)
        return true;
    ctx.status = errorCode;
    ctx.set('WWW-Authenticate', 'Basic realm="daruk"');
    ctx.body = 'Access denied';
    return false;
}
//# sourceMappingURL=index.js.map