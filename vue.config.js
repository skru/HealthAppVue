module.exports = {
    pwa: {
        workboxOptions: {
            skipWaiting: true,
//             exclude: [

//               //"assets/.htaccess"
//             ]
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