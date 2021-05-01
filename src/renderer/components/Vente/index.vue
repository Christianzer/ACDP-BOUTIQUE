<template>
  <div class="container-fluid p-3">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Caissier PVC</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Gestion Vente</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Vente du {{this.created}}</b-breadcrumb-item>
      </b-breadcrumb>
      <b-button variant="danger" :to="{name : 'panier'}">
        ALLER AU PANIER
      </b-button>
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

            <template v-slot:cell(consulter)="row">
              <b-button
                  size="sm"
                  variant="primary"
                  class="mr-1"
                  v-if="!row.item.consulter && row.item.quantite > 0"
                  :disabled="row.item.consulter"
                  @click="row.item.consulter = true, ajouterPanier(JSON.parse(JSON.stringify(row.item)))"
              >
                Ajouter au panier
              </b-button>
              <b-button
                  size="sm"
                  variant="warning"
                  class="mr-1"
                  v-if="row.item.consulter"
                  :disabled="row.item.consulter"
              >
                Deja Ajouté au panier
              </b-button>
              <b-button
                  size="sm"
                  variant="danger"
                  class="mr-1"
                  v-if="row.item.quantite === 0"
                  :disabled="row.item.quantite === 0"
              >
                Stock Epuisé
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
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "index",
  computed: {
    ...mapGetters(['valeurs','info','messages'])
  },
  data(){
    return {
      created : '',
      nbre_article:0,
      dataArticle:JSON.parse(localStorage.getItem('articles_prod')),
      isLoading: false,
      currentPage: 1,
      perPage: 10,
      totalRows: null,
      selectedCode: null,
      filter :"",
      selected : false,
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
          label:'Quantite Disponible',
          sortable: true
        },
        {
          key: 'prix',
          sortable: true
        },
        {
          key: 'consulter',
          label: 'Action',
          sortable: true
        }
      ]
    }
  },
  methods: {
    async ajouterPanier(dataArticle){
      let article = []
      if (JSON.parse(localStorage.getItem('produits'))){
        article = JSON.parse(localStorage.getItem('produits'))
      }else {
        article = []
      }
      article.push(dataArticle)
      localStorage.setItem('produits',JSON.stringify(article))
    }
  },
  created() {
    this.totalRows = this.dataArticle.length
    var fruits = []
    if (JSON.parse(localStorage.getItem('produits'))){
      fruits = JSON.parse(localStorage.getItem('produits'))
    }else {
      fruits = []
    }
    for (let index = 0;index < fruits.length;index++){
      for (let index2 = 0;index2 < this.dataArticle.length;index2++){
        if (fruits[index].id_article === this.dataArticle[index2].id_article){
          this.dataArticle[index2].consulter = true
        }
      }
    }
    this.isLoading = false
    this.isLoading = true
  }
}
</script>

<style scoped>

</style>