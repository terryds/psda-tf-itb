<template>
  <div>
    <v-form ref="form" @submit.prevent="submit">
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field v-model="form.nim" :rules="rules.nim"  color="indigo darken-3"
              label="NIM" required></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              color="blue darken-2"
              label="Nama Lengkap"
              required
            ></v-text-field>
          </v-flex>


          <v-flex xs12 sm6>
            <v-select
              v-model="form.lab"
              :items="labs"
              color="primary"
              label="Lab / Kelompok Keahlian (pilih 'Belum ambil' bila tidak ada)"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.kp"
              color="blue darken-2"
              label="Tempat Kerja Praktek (bila sudah ambil)"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-combobox
                  v-model="form.tech"
                  :items="skills"
                  :search-input.sync="search"
                  hide-selected
                  hint="Maximum of 10 tags"
                  label="Add technology skills"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template slot="no-data">
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-combobox>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.instagram"
              color="blue darken-2"
              label="Instagram (opsional)"
              prepend-icon="fab fa-instagram"
              hint="Masukkan username instagram kamu jika ada"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.twitter"
              color="blue darken-2"
              label="Twitter (opsional)"
              prepend-icon="fab fa-twitter"
              hint="Masukkan username twitter (tidak perlu pakai @) kamu jika ada"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.linkedin"
              color="blue darken-2"
              label="LinkedIn Link Profile (opsional)"
              prepend-icon="fab fa-linkedin"
              hint="Masukkan link profile LinkedIn kamu jika ada"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.github"
              color="blue darken-2"
              label="Github (opsional)"
              prepend-icon="fab fa-github"
              hint="Masukkan username github kamu jika ada"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6>
            <v-text-field
              v-model="form.mobile"
              color="blue darken-2"
              label="Mobile Phone (opsional)"
              prepend-icon="fas fa-phonr"
              hint="Masukkan nomor handphone"
              required
            ></v-text-field>
          </v-flex>



          <v-flex xs12>
            <v-textarea
              v-model="form.bio"
              color="teal"
            >
              <div slot="label">
                Bio <small>(optional)</small>
              </div>
            </v-textarea>
          </v-flex>

          <v-flex xs12>
            <v-textarea
              v-model="form.work"
              color="teal"
            >
              <div slot="label">
                Pengalaman Kerja <small>(optional)</small>
              </div>
            </v-textarea>
          </v-flex>

          <v-flex xs12>
            <v-checkbox
              v-model="form.terms"
              color="green"
            >
              <div slot="label" @click.stop="">
                Do you accept the
                <a href="javascript:;" @click.stop="terms = true">terms</a>
                ?
              </div>
            </v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!formIsValid"
          color="primary"
          type="submit"
        >Save</v-btn>
      </v-card-actions>
    </v-form>
    <v-dialog v-model="terms" width="70%">
      <v-card>
        <v-card-title class="title">Terms</v-card-title>
        <v-card-text>
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            color="purple"
            @click="terms = false"
          >Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
  import firebase from 'firebase'
  import skills from '@/data/skills'

  export default {
    beforeCreate() {
      const db = firebase.database();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$bindAsObject('form', db.ref(`items/${user.uid}/formInput`))
        }
      })
    },
    data () {
      const defaultForm = Object.freeze({
        nim: '',
        name: '',
        bio: '',
        lab: '',
        kp: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        github: '',
        work: '',
        mobile: '',
        terms: false
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
          nim: [val => (typeof val == "string") && val.substr(0,3) == "133" && val.length == 8 || 'Maaf, hanya untuk mahasiswa Teknik Fisika ITB']
        },
        labs: ['CMD', 'Medis', 'ICA', 'CITA', 'MSIK', 'Fisbang', {text: 'Belum ambil', value: ''}],
        content: `Dengan menyetujui ini, Anda menyetujui bahwa data masukan adalah valid dan benar adanya.`,
        terms: false,
        defaultForm,

        skills: skills,
        search: null,
      }
    },
    watch: {
      tech (val) {
        if (val.length > 10) {
          this.$nextTick(() => this.tech.pop())
        }
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.nim &&
          this.form.name &&
          this.form.terms
        )
      }
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        const form = Object.assign({}, this.form);
        delete form['.key']
        delete form['.value']
        this.$emit("userHasSubmitted", form);
      }
    }
  }
</script>