<template>
  <v-card>
    <v-card-title>
      Database Mahasiswa Teknik Fisika
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Cari nim, nama, lab, skill, dan lainnya"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :custom-filter="customFilter"
      :rows-per-page-items="[10, 20, 50, {'text':'$vuetify.dataIterator.rowsPerPageAll','value':-1}]"
      must-sort
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nim }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.kp || "-" }}</td>
        <td class="text-xs-left">{{ props.item.lab || "-" }}</td>
        <td class="text-xs-left"><v-chip outline color="primary" v-for="item in props.item.tech" :key="item">{{ item }}</v-chip></td>
<!--         <td class="text-xs-right">{{ props.item.github }}</td>
        <td class="text-xs-right">{{ props.item.instagram }}</td>
        <td class="text-xs-right">{{ props.item.twitter }}</td> -->
        <td class="text-xs-left">{{ props.item.work || "-" }}</td>
        <td class="justify-center layout px-0">
          <v-btn small color="primary" @click="openProfile(props.item)">View More</v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    props: {
      users: {
        default: [],
        type: Array
      }
    },
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'NIM',
            align: 'left',
            value: 'nim'
          },
          { text: 'Nama', value: 'name' },
          { text: 'Kerja Praktek', value: 'kp' },
          { text: 'Lab', value: 'lab' },
          { text: 'Skills', value: 'tech', sortable: false },
          { text: 'Pengalaman kerja', value: 'work', sortable: false },
          // { text: 'Github', value: 'github' },
          // { text: 'Instagram', value: 'instagram' },
          // { text: 'Twitter', value: 'twitter' },
          { text: 'Actions', value: 'name', sortable: false }
        ],
      }
    },
    methods: {
      customFilter(items, search, filter) {
        search = search.toString().toLowerCase();
        if (search.trim() === '') return items;
        return items.filter(function (i) {
            return Object.keys(i).some(function (j) {
              if(Array.isArray(i[j])) {
                i[j].some(function(k) {
                  return filter(i[j][k], search)
                })
              }
              return filter(i[j], search);
            });
        });
      },
      openProfile(item) {
        this.$emit("openProfile", item)
      }
    }
  }
</script>