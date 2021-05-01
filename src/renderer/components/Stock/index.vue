<template>
  <div class="container-fluid p-3">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Manager PVC</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Gestion du Stock</b-breadcrumb-item>
      </b-breadcrumb>
      <b-button variant="primary" @click="openModal">Créer un nouveau article</b-button>
    </div>


    <div class="card shadow mb-4">
      <div class="card-header py-3 text-uppercase font-weight-bold">
        Article
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
              :items="dataArticle"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
          >

            <template v-slot:cell(actions)="row">
              <b-button
                  size="sm"
                  variant="outline-primary"
                  class="mr-1"
                  @click="modifier(row.item)"
              >
                modifier
              </b-button>

              <b-button
                  size="sm"
                  variant="outline-danger"
                  class="mr-1"
                  @click="supprimer(row.item)"
              >
                supprimer
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
    <Form ref="modal"></Form>
  </div>
</template>

<script>
import moment from "moment";
import Form from "./form";
import { mapGetters } from 'vuex'
export default {
  name: "index",
  computed: {
    ...mapGetters(['valeurs','info','messages'])
  },
  components: {
    Form
  },
  data () {
    return {
      created : '',
      dataArticle:[],
      isLoading: false,
      currentPage: 1,
      perPage: 10,
      totalRows: null,
      selectedCode: null,
      filter :"",
      fields: [
        {
          key: 'code_article',
          sortable: true
        },
        {
          key: 'libelle_article',
          sortable: true
        },
        {
          key: 'quantite',
          sortable: true
        },
        {
          key: 'prix',
          sortable: true
        },
        {
          key: 'created',
          label: 'Date creation',
          sortable: true
        },
        {
          key: 'actions'
        }
      ]
    }
  },
  methods: {
    openModal () {
      this.$refs.modal.editMode = false
      this.$refs.modal.showModal()
    },

    async ListeArticle(){
      this.isLoading = false
      this.created = moment().format('YYYY-MM-DD')
      await this.$store.dispatch('afficherListe',this.created).then(() => {
        this.dataArticle = this.valeurs
        this.totalRows = this.valeurs.length
        console.log(this.dataArticle)
        console.log(this.totalRows)
      }).catch((e) => {
        console.log(e)
      })
      this.isLoading = true
    },

    async modifier (dataPat) {
      this.$refs.modal.selectedTA = dataPat
      this.$refs.modal.editMode = true
      this.$refs.modal.showModal()
    },

    async supprimer (donne) {
      var data = {
        id_article : donne.id_article,
        code_article : donne.code_article,
        created : donne.created
      }
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result)=>{
        if (result.value){
          this.$store.dispatch('supprimerArticle',data).then(() => {
            this.ListeArticle()
            Toast.fire({
              icon: this.info,
              title: this.messages
            })
          }).catch((e) => {
            console.log(e)
          })
        }
      })
    },

  },
  created() {
    this.ListeArticle()
  }
}
</script>

<style scoped>

</style>