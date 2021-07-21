const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/predictSimilarity",{
            target:"http://3f2234c3193b.ngrok.io",
            secure:false,
            changeOrigin:true,
        })
    );

    app.use(
        proxy("/predictVoice",{
            target:"http://3f2234c3193b.ngrok.io",
            secure:false,
            changeOrigin:true,
        })
    )
}