<template>
  <b-modal ref="my-modal" :hide-footer="true" :title="title">
    <form @submit.prevent="save">
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Code Article"
          >
            <b-form-input v-model="formData.code_article"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Libellé Article">
            <b-form-input v-model="formData.libelle_article"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <b-form-group
              label="Quantité Article"
          >
            <b-form-input type="number" v-model="formData.quantite"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-6">
          <b-form-group
              label="Prix Article">
            <b-form-input type="number" v-model="formData.prix"></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="row justify-content-end">
        <b-button variant="success mr-3" type="submit">enregistrer</b-button>
        <b-button @click="closeModal">fermer</b-button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: "form",
  computed: {
    ...mapGetters(['info','messages'])
  },
  props: {
    selectedTA: {},
    editMode: Boolean
  },
  data() {
    return {
      selected : null,
      created : "",
      title:"Mise à jour Catalogue Article",
      formData: {
        id_article:null,
        code_article: "",
        libelle_article: "",
        quantite:0,
        prix:0
      }
    }
  },
  methods: {
    showModal() {
      if (this.editMode === true) {
        this.selected = this.selectedTA.id_article
        this.formData.code_article = this.selectedTA.code_article
        this.formData.libelle_article = this.selectedTA.libelle_article
        this.formData.quantite = this.selectedTA.quantite
        this.formData.prix = this.selectedTA.prix
      } else {
        this.formData.code_article = ''
        this.formData.libelle_article = ''
        this.formData.quantite = 0
        this.formData.prix = 0
      }
      this.$refs['my-modal'].show()
    },
    closeModal() {
      this.$refs['my-modal'].hide()
    },
    async save(){
      this.created = moment().format('YYYY-MM-DD')
      var data = {
        code_article : this.formData.code_article,
        libelle_article : this.formData.libelle_article,
        created : this.created,
        quantite : parseInt(this.formData.quantite),
        prix : parseFloat(this.formData.prix)
      }
      if (this.editMode === true){
        await this.$store.dispatch('modifierArticle',data).then(() => {
          this.closeModal()
          this.$parent.ListeArticle()
          Toast.fire({
            icon: this.info,
            title: this.messages
          })

        }).catch((e) => {
          console.log(e)
        })
      }else {
        await this.$store.dispatch('insererArticle',data).then(() => {
          this.closeModal()
          this.$parent.ListeArticle()
          Toast.fire({
            icon: this.info,
            title: this.messages
          })

        }).catch((e) => {
          console.log(e)
        })
      }

    }
  }
}
</script>

<style scoped>

</style>