const nodeExternals = require('webpack-node-externals')
const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.1.0/css/brands.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.1.0/css/fontawesome.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#fff',
    background: '#1abc9c'
  },

  /*
  ** Global CSS
  */
  css: [
      {
          src: '@/assets/style/app.styl',
          lang: 'styl'
      }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
   '~plugins/vuetifyinit.js',
   '~plugins/firebaseinit.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [
      '~/plugins/vuetifyinit.js'
    ],
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }      
    }
  }
}
