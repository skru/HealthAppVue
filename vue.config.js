//var webpack = require('webpack')

module.exports = {
//     mode: 'production',
//     plugins: [
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('production')
//         })
//     ],
    pwa: {
        workboxOptions: {
            skipWaiting: true,
            exclude: [
              ".htaccess"
            ]
        },
        themeColor: "#FFFFFF",
        msTileColor: '#000000',
    	appleMobileWebAppCapable: 'yes',
    	appleMobileWebAppStatusBarStyle: 'white',
        manifestOptions: {
            name: "ProactiveHealthCare",
        	short_name: "PHC",
        	start_url: "https://jm1179.xyz/",
        	display: "standalone",
            theme_color: "#FFFFFF"
        }
    }
}