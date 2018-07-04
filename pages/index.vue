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
            <span class="title">Bio</span>
            <p>{{ profile.bio }}</p>
            <span class="title">Lab</span>
            <p>{{ profile.lab || "Belum ada" }}</p>
            <span class="title">Kerja Praktek</span>
            <p>{{ profile.kp || "Belum ada" }}</p>
            <span class="title">Pengalaman Kerja</span>
            <p>{{ profile.work || "Belum ada" }}</p>
            <span class="title">Skills</span>
            <div>
              <v-chip v-for="tech in profile.tech" color="primary" text-color="white" :key="tech">{{tech}}</v-chip>
            </div>
            <br />

            <span class="title">Pengalaman Kerja</span>
            <p>{{ profile.work || "Belum ada" }}</p>
            <span class="title">Social Media</span>
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
        const arr = await Object.entries(result)

        let res = [];
        arr.forEach(function(item) {
          res.push(item[1]["formInput"]);
        })
        this.users = res;
      },
      handleOpenProfile(item) {
          this.dialog = !this.dialog;
          this.profile = item;
      }
    },
    created() {
      this.getAllItems();
    }
  }
</script>