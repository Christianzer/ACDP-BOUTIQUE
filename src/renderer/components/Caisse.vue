<template>
  <div class="container-fluid p-3">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Manager PVC</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Initialiser caisse</b-breadcrumb-item>
      </b-breadcrumb>
    </div>

    <div class="card shadow mb-4">
      <div class="card-header py-3 text-uppercase font-weight-bold">
        LISTE DES CAISSIERS
      </div>
      <div class="card-body">
        <template v-if="isLoading === false">
          <div class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
          </div>
        </template>
        <template v-else>
          <b-col md="3" align="right">
            <b-form-input type="search" id="filterInput" v-model="filter" placeholder="Rechercher....."></b-form-input>
          </b-col>
          <br>
          <b-table
              show-empty
              head-variant="light"
              bordered
              hover
              :items="dataCaissier"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
          >

            <template v-slot:cell(statut_caissier)="row">
              <b-button
                  v-if="parseInt(row.item.statut_caissier) === 0"
                  size="sm"
                  variant="primary"
                  class="mr-1"
                  @click="initCaisse(1,row.item.matricule)"
              >
                Activer la caisse de {{row.item.nom}} {{row.item.prenoms}}
              </b-button>
              <b-button
                  v-if="parseInt(row.item.statut_caissier) === 1"
                  size="sm"
                  variant="danger"
                  class="mr-1"
                  @click="initCaisse(0,row.item.matricule)"
              >
                Desactiver la caisse de {{row.item.nom}} {{row.item.prenoms}}
              </b-button>
            </template>
          </b-table>
          <b-pagination
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0 pagination-sm"
          />
        </template>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Caisse",
  computed: {
    ...mapGetters(['donnees','info_session','messages_session'])
  },
  data () {
    return {
      dataCaissier:[],
      isLoading: false,
      currentPage: 1,
      perPage: 10,
      totalRows: null,
      filter :"",
      fields: [
        {
          key:'matricule',
          sortable:true
        },
        {
          key:'nom',
          sortable:true
        },
        {
          key:'prenoms',
          sortable:true
        },
        {
          key:'statut_caissier',
          label:' ',
          sortable:true
        },
      ]
    }
  },
  methods: {
    async ListeCaissier(){
      this.isLoading = false
      await this.$store.dispatch('afficherCaissier').then(() => {
        this.dataCaissier = this.donnees
        this.totalRows = this.donnees.length
        console.log(this.dataCaissier)
        console.log(this.totalRows)
      }).catch((e) => {
        console.log(e)
      })
      this.isLoading = true

    },
    async initCaisse(value,matricule){
      var valeur = parseInt(value)
      var data = {
        matricule:matricule,
        valeur : valeur
      }
      this.$store.dispatch('updateSession',data).then(() => {
        this.ListeCaissier()
        Toast.fire({
          icon: this.info_session,
          title: this.messages_session
        })
      }).catch((e) => {
        console.log(e)
      })

    }
  },
  created() {
    this.ListeCaissier()
  }
}
</script>

<style scoped>

</style>