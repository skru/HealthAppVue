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
            theme_color: "#FFFFFF",
            icons: [
            {
                "src": "/images/63e4d167-5a5d-1544-f252-22ee8814ac5e.webPlatform.png",
                "sizes": "44x44",
                "type": "image/png"
            },
            {
                "src": "/images/b38d77b1-b0ae-14ae-5aac-2dff817c0682.webPlatform.png",
                "sizes": "48x48",
                "type": "image/png"
            },
            {
                "src": "/images/bd78e30e-fd08-1e48-1d34-cbbd57e47e0e.webPlatform.png",
                "sizes": "1240x600",
                "type": "image/png"
            },
            {
                "src": "/images/6b508f7f-2915-1fd6-e75e-c5d0c7fce704.webPlatform.png",
                "sizes": "300x300",
                "type": "image/png"
            },
            {
                "src": "/images/3a443b2e-be5b-7a8a-64c5-e87b25fc83d5.webPlatform.png",
                "sizes": "150x150",
                "type": "image/png"
            },
            {
                "src": "/images/b2c80737-3742-9162-f44a-1decb6c9344d.webPlatform.png",
                "sizes": "88x88",
                "type": "image/png"
            },
            {
                "src": "/images/20d06e1f-75e3-0a5b-5eef-eed218628adf.webPlatform.png",
                "sizes": "24x24",
                "type": "image/png"
            },
            {
                "src": "/images/ee49e7fd-e049-13f4-177d-92d473c70838.webPlatform.png",
                "sizes": "50x50",
                "type": "image/png"
            },
            {
                "src": "/images/1e0c975e-3b82-05fa-a69b-7d533a88fc79.webPlatform.png",
                "sizes": "620x300",
                "type": "image/png"
            },
            {
                "src": "/images/af06e6bb-3f14-ad46-b518-68e5b5fe5ff4.webPlatform.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/images/9424dcaa-4e01-7139-dda8-0b3a0ea23940.webPlatform.png",
                "sizes": "144x144",
                "type": "image/png"
            },
            {
                "src": "/images/5a7d90d8-b75d-441e-011e-92b85a8e7cae.webPlatform.png",
                "sizes": "96x96",
                "type": "image/png"
            },
            {
                "src": "/images/b4254a25-14de-ffbe-c5d4-89e53c5a7466.webPlatform.png",
                "sizes": "72x72",
                "type": "image/png"
            },
            {
                "src": "/images/0f35cab8-a05c-27af-7cf1-aea7d957e731.webPlatform.png",
                "sizes": "36x36",
                "type": "image/png"
            },
            {
                "src": "/images/71e4bb96-a1b4-dc5e-94e7-8abce26fba73.webPlatform.png",
                "sizes": "1024x1024",
                "type": "image/png"
            },
            {
                "src": "/images/18664bfc-2aa8-2436-3e95-15c265fd5deb.webPlatform.png",
                "sizes": "180x180",
                "type": "image/png"
            },
            {
                "src": "/images/416a5c79-371d-efb1-2b0d-e8aef2901554.webPlatform.png",
                "sizes": "152x152",
                "type": "image/png"
            },
            {
                "src": "/images/c9cbc645-6002-89b4-4660-a5afd1da0532.webPlatform.png",
                "sizes": "120x120",
                "type": "image/png"
            },
            {
                "src": "/images/bbe6b163-5098-ea8d-273e-71d50670dba7.webPlatform.png",
                "sizes": "76x76",
                "type": "image/png"
            }
        ],
        }
    }
}