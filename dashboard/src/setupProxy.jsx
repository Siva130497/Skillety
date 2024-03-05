const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
    // Proxy for "external-interviews/request"
    app.use(
        createProxyMiddleware("/external-interviews/request",
            {
                target: "https://api.intervue.io",
                changeOrigin: true
            }
        )
    );

    // Proxy for another URL
    app.use(
        createProxyMiddleware("/BgvApi/bgv/requestCandidateVerification",
            {
                target: "http://3.108.132.101:8080",
                changeOrigin: true
            }
        )
    );
};
