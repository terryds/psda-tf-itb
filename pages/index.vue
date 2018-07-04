<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <data-table :users="users" @openProfile="handleOpenProfile" />
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ profile.name }}</div>
              <span class="grey--text subheading">{{ profile.nim }}</span>
            </div>
          </v-card-title>
          <v-card-text>
            <v-subheader class="title">Bio</v-subheader>
            <p>{{ profile.bio }}</p>
            <v-subheader class="title">Lab</v-subheader>
            <p>{{ profile.lab || "Belum ada" }}</p>
            <v-subheader class="title">Kerja Praktek</v-subheader>
            <p>{{ profile.kp || "Belum ada" }}</p>
            <v-subheader class="title">Pengalaman Kerja</v-subheader>
            <p>{{ profile.work || "Belum ada" }}</p>
            <v-subheader class="title">Tech</v-subheader>
            <div>
              <v-chip v-for="tech in profile.tech" color="primary" text-color="white">{{tech}}</v-chip>
            </div>
            <br />

            <v-subheader class="title">Pengalaman Kerja</v-subheader>
            <p>{{ profile.work || "Belum ada" }}</p>
            <v-subheader class="title">Social Media</v-subheader>
            <br />
            <a :href="'http://twitter.com/' + profile.twitter"  target="_blank">
              <v-btn fab dark small color="primary">
                <v-icon dark>fab fa-twitter</v-icon>
              </v-btn>
            </a>

            <a :href="'http://instagram.com/' + profile.instagram " target="_blank">
              <v-btn fab dark small color="purple darken-2">
                <v-icon dark>fab fa-instagram</v-icon>
              </v-btn>
            </a>

            <a :href="profile.linkedin"  target="_blank">
              <v-btn fab dark small color="indigo darken-3">
                <v-icon dark>fab fa-linkedin</v-icon>
              </v-btn>
            </a>

            <a :href="'http://github.com/' + profile.github" target="_blank">
              <v-btn fab dark small color="grey">
                <v-icon dark>fab fa-github</v-icon>
              </v-btn>
            </a>           

          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-flex>
  </v-layout>
</template>

<script>
  import DataTable from '@/components/DataTable'

  export default {
    components: {DataTable},
    data() {
      return {
        users: [],
        profile: {},
        dialog: false
      }
    },
    methods: {
      async getAllItems() {
        const result = await this.$axios.$get('https://psda-tf-itb.firebaseio.com/items.json');
        console.log(result)
        const arr = await Object.entries(result)
        console.log(arr)
        
        let res = [];
        arr.forEach(function(item) {
          res.push(item[1]["formInput"]);
        })
        console.log(res)
        this.users = res;
        

        // let res = [];
        // for(var key in result) {
        //   console.log(key)
        //   for(var formInput in key) {
        //     res.push(formInput)
        //   }
        // }
        // console.log(res)
      },
      handleOpenProfile(item) {
          this.dialog = !this.dialog;
          this.profile = item;
      }
    },
    created() {
      console.log("Created");
      this.getAllItems();
    }
  }
</script>