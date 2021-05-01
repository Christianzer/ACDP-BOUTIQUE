<template>
  <div class="container-fluid p-3">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Caissier PVC</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Panier</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="card shadow mb-4">
      <div class="card-header py-3 text-uppercase font-weight-bold">
        Panier Article
      </div>
      <div class="card-body">
        <table class="tftable" border="1">
          <tr>
            <th>Code Article</th>
            <th>Libelle Article</th>
            <th>Quantité disponible</th>
            <th>Prix</th>
            <th>Quantité achété</th>
            <th>Total</th>
            <th></th>
          </tr>
          <tr v-for="selected in produit" :key="selected.id_article">
            <td style="width: 8%"><h6>{{selected.code_article}}</h6></td>
            <td style="width: 25%;"><h6>{{selected.libelle_article}}</h6></td>
            <td style="width: 9%"><h5 class="text-center">{{selected.quantite - 1}}</h5></td>
            <td style="width: 10%"><h5 class="text-center">{{selected.prix}}</h5></td>
            <td>
              <b-row>
                <b-col cols="3" class="text-center">
                  <b-button variant="outline-danger" @click="diminuer(selected.id_article)" :disabled="selected.quantite_acheter <= 1">
                    -
                  </b-button>
                </b-col>
                <b-col cols="6" class="text-center">
                  <h4>{{selected.quantite_acheter}}</h4>
                </b-col>
                <b-col cols="3" class="text-center">
                  <b-button variant="outline-primary" @click="augmenter(selected.id_article)" :disabled="selected.quantite === 1">
                    +
                  </b-button>
                </b-col>
              </b-row>
            </td>
            <td style="width: 20%"><h4 class="text-primary">{{selected.quantite_acheter * selected.prix}} FCFA</h4></td>
            <td><button class="btn btn-danger" @click="supprimerProduits(selected.id_article)"><i class="fa fa-trash fa-lg"></i></button></td>
          </tr>
        </table>
        <br>
        <div class="text-right">
          <h2 class="text-uppercase text-right text-danger font-weight-bolder" v-if="produit.length > 0"> TOTAL : {{ total }} FCFA</h2>
        </div>
        <b-row class="mt-4 text-left">
          <b-col>
            <b-button variant="success" class="mr-1" @click="afficherPaiement = true" v-if="total > 0">Passer à la caisse maintenant</b-button>
          </b-col>
          <b-col></b-col>
          <b-col cols="3"></b-col>
          <b-col class="text-right">
            <b-button variant="danger" @click="vider" class="mr-1">Vider le panier</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="card shadow mb-4" v-if="afficherPaiement === true">
      <div class="card-header py-3 text-uppercase font-weight-bold">
        Mode de Paiement
      </div>
      <div class="card-body">
        <b-card no-body>
          <b-tabs pills card vertical>
            <b-tab title="Paiement en espèces" active>
              <b-card-text>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Montant à payer"
                        label-for="input-horizontal"
                    >
                      <b-form-input v-model="total" disabled></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Montant versé"
                        label-for="input-horizontal"
                    >
                      <b-form-input type="number" v-model="montant_deposer" min="0"></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Montant à rendre"
                        label-for="input-horizontal"
                    >
                      <b-form-input type="number" v-model="monnaie" disabled></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row justify-content-end">
                  <b-button variant="primary mr-3" type="button" @click="Loading = true,achat(1)">Payer {{montant_deposer}} FCFA</b-button>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Paiement par mobile money">
              <b-card-text>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Type de reseau"
                        label-for="input-horizontal"
                    >
                      <b-form-select v-model="selectedType" :options="typeMobile"></b-form-select>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="3"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Numero Telephone"
                        label-for="input-horizontal"
                    >
                      <b-form-input v-model="numero_telephone"></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Montant à payer"
                        label-for="input-horizontal"
                    >
                      <b-form-input v-model="total" disabled></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Montant versé"
                        label-for="input-horizontal"
                    >
                      <b-form-input type="number" v-model="montant_deposer" min="0"></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        label-cols-sm="4"
                        label-cols-lg="5"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Montant à rendre"
                        label-for="input-horizontal"
                    >
                      <b-form-input type="number" v-model="monnaie" disabled></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row justify-content-end">
                  <b-button variant="primary mr-3" type="button" @click="Loading = true,achat(2)">Payer {{montant_deposer}} FCFA</b-button>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Paiemenent par carte de crédit">
              <b-card-text>
                  <b-alert show variant="warning"><h6 class="alert-link">Nous acceptons que les cartes VISA</h6></b-alert>
                  <b-card no-body>
                    <b-tabs v-model="tabIndex" active-nav-item-class="font-weight-bold text-uppercase text-success" card>
                      <b-tab title="INFORMATION CB">
                        <div class="row">
                          <div class="col-md-8">
                            <b-form-group label="Numéro carte">
                              <b-form-input v-model="numCb"/>
                            </b-form-group>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-8">
                            <b-form-group label="Nom du proprietaire">
                              <b-form-input v-model="nomPropio"/>
                            </b-form-group>
                          </div>
                        </div>
                        <div class="row">
                          <b-alert show variant="info">
                            <h6 class="alert-heading text-uppercase text-danger font-weight-bold text-center">Date expiration</h6>
                            <div class="row">
                              <div class="col-md-6">
                                <b-form-group label="Mois">
                                  <b-form-input type="input" min="1" max="12"/>
                                </b-form-group>
                              </div>
                              <div class="col-md-6">
                                <b-form-group label="Année">
                                  <b-form-input type="input"/>
                                </b-form-group>
                              </div>
                            </div>
                          </b-alert>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <b-form-group label="CVV">
                              <b-form-input />
                            </b-form-group>
                          </div>
                        </div>
                      </b-tab>
                      <b-tab title="INFORMATION PAIMENT">
                        <div class="row">
                          <div class="col-md-6">
                            <b-form-group
                                label-cols-sm="4"
                                label-cols-lg="5"
                                content-cols-sm
                                content-cols-lg="7"
                                label="Montant à payer"
                                label-for="input-horizontal"
                            >
                              <b-form-input v-model="total" disabled></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <b-form-group
                                label-cols-sm="4"
                                label-cols-lg="5"
                                content-cols-sm
                                content-cols-lg="7"
                                label="Montant versé"
                                label-for="input-horizontal"
                            >
                              <b-form-input type="number" v-model="montant_deposer" min="0"></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <b-form-group
                                label-cols-sm="4"
                                label-cols-lg="5"
                                content-cols-sm
                                content-cols-lg="7"
                                label="Montant à rendre"
                                label-for="input-horizontal"
                            >
                              <b-form-input type="number" v-model="monnaie" disabled></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </b-card>
                <div class="row">
                  <div class="col-6" align="left" >
                    <b-button-group class="mt-3" v-show="prec == true">
                      <b-button squared variant="success" @click="precedent">Précedent</b-button>
                    </b-button-group>
                  </div>
                  <div class="col-6 text-right" >
                    <b-button-group class="mt-3" v-if="prec==false">
                      <b-button squared variant="success" @click="suivant">Suivant</b-button>
                    </b-button-group>
                    <b-button-group class="mt-3" v-else>
                      <b-button variant="primary" @click="Loading = true,achat(3)">Payer {{montant_deposer}} FCFA</b-button>
                    </b-button-group>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <b-overlay :show="Loading" no-wrap>
    </b-overlay>

  </div>
</template>

<script>
import moment from 'moment'
import {mapGetters} from "vuex";

export default {
  name: "panier",
  data() {
    return {
      Loading : false,
      save:false,
      next:false,
      prec : false,
      tabIndex: 0,
      produit : [],
      numCb:'',
      nomPropio:'',
      created : "",
      selectedType:'ORANGE',
      montant_deposer:0,
      afficherPaiement : false,
      numero_telephone:'',
      typeMobile:[
        { value: 'ORANGE', text: 'Orange' },
        { value: 'MOOV', text: 'Moov' },
        { value: 'MTN', text: 'MTN' }
      ]
    }
  },

  methods: {
    supprimerProduits(id){
      console.log(id)
      for (let index = 0;index < this.produit.length;index++){
        if (this.produit[index].id_article === id){
          this.produit.splice(index,1);
          localStorage.setItem('produits',JSON.stringify(this.produit))
        }
      }
    },

    achat(mode_paiement){
      this.Loading = true
      var dataInformation
      this.created = moment().format('YYYY-MM-DD')
      if (mode_paiement === 1){
        dataInformation = null
      }else if (mode_paiement === 2){
        dataInformation = {
          type_mobile:this.selectedType,
          numero_telephone:this.numero_telephone
        }
      }else if (mode_paiement === 3){
        dataInformation = {
          numero_carte:this.numCb,
          nomproprio:this.nomPropio
        }
      }
      var data = {
        produits : this.produit,
        mode_paiement : mode_paiement,
        created : this.created,
        montant_total : this.total,
        somme_verse:this.montant_deposer,
        somme_rendu:this.monnaie,
        information:dataInformation,
        matricule_caissier:JSON.parse(localStorage.getItem('matricule'))
      }
      this.$store.dispatch('faireAchat',data).then(() => {
        this.$store.dispatch('afficherListe',this.created).then(() => {
          localStorage.setItem('articles_prod',JSON.stringify(this.valeurs))
          localStorage.setItem('code_facture',JSON.stringify(this.code_facture))
          localStorage.removeItem('produits');
          this.$router.replace({ name: "facture" });
        }).catch((e) => {
          console.log(e)
        })
      }).catch((e) => {
        console.log(e)
      })
    },

    augmenter(id){
      for (let index = 0;index < this.produit.length;index++) {
        if (this.produit[index].id_article === id) {
          this.produit[index].quantite_acheter++
          this.produit[index].quantite--
          localStorage.setItem('produits',JSON.stringify(this.produit))
        }
      }
    },

    precedent(){
      this.tabIndex--
      this.prec = false
    },
    suivant(){
      this.tabIndex++
      this.prec = true
    },

    diminuer(id){
      for (let index = 0;index < this.produit.length;index++) {
        if (this.produit[index].id_article === id) {
          this.produit[index].quantite_acheter--
          this.produit[index].quantite++
          localStorage.setItem('produits',JSON.stringify(this.produit))
        }
      }
    },
    vider(){
      this.afficherPaiement = false
      this.produit = []
      for (const key in this.produit){
        this.produit[key].consulter = false
      }
      localStorage.setItem('produits',JSON.stringify(this.produit))
    }
  },
  computed : {
    total(){
      let t = 0;
      for (let index = 0; index < this.produit.length ; index ++){
        t += this.produit[index].prix * this.produit[index].quantite_acheter
      }
      return t
    },
    monnaie(){
      let val = 0;
      val = this.total - this.montant_deposer
      return Math.abs(val)
    },
    ...mapGetters(['code_facture','valeurs'])
  },
  created() {
    if (JSON.parse(localStorage.getItem('produits'))){
      this.produit = JSON.parse(localStorage.getItem('produits'))
    }else {
      this.produit = []
    }
  }
}
</script>

<style scoped>
.tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}
.tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
.tftable tr {background-color:#ffffff;}
.tftable td {font-size:12px;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;}
</style>