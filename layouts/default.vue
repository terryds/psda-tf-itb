<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
          <nuxt />
      </v-container>
    </v-content>
    <v-footer
        height="auto"
        color="blue-grey darken-4"
      >
        <v-layout
          justify-center
          row
          wrap
        >
          <v-flex
            
            py-3
            text-xs-center
            white--text
            xs12
          >
            &copy;2018 — Made by <a href="http://terryds.github.io" target="_blank" class="copyright"><strong>Terry Djony</strong></a>
          </v-flex>
        </v-layout>
      </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Login / Edit', to: '/editProfile' }
        ],
        miniVariant: false,
        title: 'PSDA TF ITB'
        // links: [
        //   'Home',
        //   'About Us',
        //   'Team',
        //   'Services',
        //   'Blog',
        //   'Contact Us'
        // ]
      }
    }
  }
</script>

<style scoped>


  a.copyright {
    outline: none;
    text-decoration: none;
    padding: 2px 1px 0;
  }

  a.copyright:link {
    color: #C5CAE9 !important;
  }


  a.copyright:focus {
    border-bottom: 1px solid;
    background: #BAE498;
  }

  a.copyright:hover {
    border-bottom: 1px solid;     
    background: #CDFEAA;
  }

  a.copyright:active {
    background: #265301;
    color: #CDFEAA;
  }
</style>