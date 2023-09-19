const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        createProxyMiddleware("external-interviews/request",
        {
            target:"https://api.intervue.io",
            changeOrigin:true
        })
    )
}