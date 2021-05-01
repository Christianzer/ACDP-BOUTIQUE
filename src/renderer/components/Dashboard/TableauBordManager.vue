<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Manager PVC</b-breadcrumb-item>
        <b-breadcrumb-item>Tableau de bord</b-breadcrumb-item>
        <b-breadcrumb-item>Inventaire du {{this.created}}</b-breadcrumb-item>
      </b-breadcrumb>
      <b-button variant="primary" @click="openModal">Selectionner date</b-button>
    </div>
    <div v-if="Loading === false">
      <div class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">NOMBRE ARTICLE</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{total_article}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">TOTAL QUANTITE ARTICLE</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{total_quantite}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">TOTAL PRIX</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{a_vendre}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">QUANTITE VENDU</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{total_quantite_vendu}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">TOTAL VENDU</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{total_vente_vendu}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">TOTAL QUANTITE RESTANT</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{quantite_restant}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success-perso shadow h-100 py-1">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs-perso font-weight-bold text-primary text-uppercase mb-1">TOTAL PRIX RESTANT</div>
                  <div class="h4 mb-0 font-weight-bold text-gray-800">{{total_restant}}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Date ref="modal"></Date>
  </div>
</template>

<script>
import moment from "moment";
import Date from "./Date";
import {mapGetters} from 'vuex'
export default {
  name: "TBM",
  data () {
    return {
      Loading : false,
      created : ''
    }
  },
  computed: {
    ...mapGetters(['total_article','total_quantite','a_vendre','total_restant','quantite_restant','total_vente_vendu','total_quantite_vendu'])
  },
  components: {
    Date
  },
  methods: {
    async LoadCatalogue(created){
      this.Loading = false
      this.created = created
      await this.$store.dispatch('afficherCatalogue',created).then(() => {
        console.log('ok')
      }).catch((e) => {
        console.log(e)
      })
      this.Loading = true
    },
    openModal () {
      this.$refs.modal.showModal()
    },
  },

  created() {
    this.created = moment().format('YYYY-MM-DD')
    this.LoadCatalogue(this.created)
  },
}
</script>

<style scoped>
.border-left-success-perso {
  border-left: 0.50rem solid #1cc88a !important;
}

.text-xs-perso {
  font-size: .8rem;
}

</style>