<template v-if="loading">
  <div>
    <div v-if="loading">
      <div class="text-xs-center">
        <p>Please wait...</p>
         <v-progress-circular
           :size="40"
           color="primary"
           indeterminate
         ></v-progress-circular>
       </div>
    </div>


    <div v-if="user">
      <v-layout align-center row>
        <v-flex xs2 sm2 md1>
          <v-avatar size="36px">
            <img
              :src="user.photoURL"
              :alt="user.displayName"
            >
          </v-avatar>
        </v-flex>

        <v-flex sm5 md3 xs4>
          <strong v-html="user.displayName"></strong>
        </v-flex>
      </v-layout>
      
      <v-alert :value="true" type="warning" v-if="!items.length">
        Silahkan isi form dibawah ini
      </v-alert>

      <v-card flat>
        <v-snackbar v-model="snackbar" absolute top right color="success">
          <span>Registration successful!</span>
          <v-icon dark>check_circle</v-icon>
        </v-snackbar>
        <InputForm @userHasSubmitted="handleOnSubmit"/>
      </v-card>
      
<!--       <ul>
        <li v-for="item in items">{{ item }}
          <button @click="removeItem(item)">&times;</button>
        </li>
      </ul> -->
      <br />
      <v-btn color="error" @click="remove">Remove</v-btn>
      <br />
      <v-btn color="error" @click="signOut">Sign Out</v-btn>
    </div>


    <div  v-if="!user && !loading">
      <v-btn color="info" @click="signInWithGoogle">Sign in with Google</v-btn>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import InputForm from '@/components/InputForm'
  // import {auth, GoogleProvider} from '@/services/fireinit'

  export default {
    beforeCreate() {
      const db = firebase.database();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          this.$bindAsArray('items', db.ref(`items/${user.uid}`))
        }
        this.loading = false
      })
    },
    data() {
      return {
        loading: true,
        user: null,
        items: [],
        item: '',
        snackbar: false,
      }
    },
    methods: {
      signInWithGoogle() {
        const GoogleProvider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(GoogleProvider).then((result) => {
          this.user = result.user
        }).catch(err => console.log(error))
      },
      signOut() {
        firebase.auth().signOut().then(() => {
          this.user = null
        }).catch(err => console.log(error))
      },
      remove() {
        this.$firebaseRefs.items.remove()
      },
      handleOnSubmit(formInput) {
        this.$firebaseRefs.items.set({formInput}).then(() => {
          this.snackbar = true
        })
      }
    },
    components: {
      InputForm
    }
  }
</script>