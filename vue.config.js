// module.exports = {
// 	baseUrl: process.env.NODE_ENV === 'production'
// 		? '/production-sub-path/'
// 		: '/'
// }
module.exports = {
	publicPath: './',
	pwa: {
		name: 'Cloud App',
		themeColor: '#427cf7',
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',

		// настройки манифеста
		manifestOptions: {
			display: 'any',
			background_color: '#42B883'
			// ...другие настройки манифеста...
		},
	}
}