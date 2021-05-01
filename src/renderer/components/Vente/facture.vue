<template>
  <div class="container-fluid p-3">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <b-breadcrumb>
        <b-breadcrumb-item>Caissier PVC</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Facture</b-breadcrumb-item>
      </b-breadcrumb>

    </div>

    <div class="text-center p-5" v-if="Loading === false">
      <b-spinner variant="primary" style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
      <b-spinner variant="primary" type="grow" style="width: 5rem; height: 5rem;" label="Spinning"></b-spinner>
    </div>
    <div v-else>
      <div id="essaie">
        <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="5">
                <table>
                  <tr>
                    <td class="title">
                      <img src="@/components/Logo.png" style="width:100%; max-width:150px;">
                    </td>
                    <td class="font-weight-bold text-primary">
                      FACTURE N°: {{informationPaiement.code_facture}}<br> FACTURE FAIT LE : {{informationPaiement.created}}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="5">
                <table>
                  <tr>
                    <td class="font-weight-bold text-primary">
                      ACDP BOUTIQUE<br> 12345 ABIDJAN SUD<br> COCODY RIVIERA FAYA
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="heading">
              <td colspan="5" class="text-uppercase text-danger font-weight-bold">Information Methode de paiement</td>
            </tr>

            <tr class="details">
              <td colspan="4">Check</td>
              <td>1000</td>
            </tr>

            <tr class="heading">
              <td>CODE ARTICLE</td>
              <td>LIBELLE ARTICLE</td>
              <td>PRIX UNITAIRE</td>
              <td class="text-uppercase">Quantité</td>
              <td>PRIX TOTAL</td>
            </tr>

            <tr class="item" v-for="articles in articlesPayer" :key="articles.id_article">
              <td style="font-size: 16px" class="text-primary font-weight-bold">{{articles.code_article}}</td>
              <td style="font-size: 16px" class="text-primary font-weight-bold">{{articles.libelle_article}}</td>
              <td style="font-size: 16px" class="text-primary font-weight-bold">{{articles.prix_article}}</td>
              <td style="font-size: 16px" class="text-primary font-weight-bold">{{articles.quantite_acheter}}</td>
              <td style="font-size: 16px" class="text-primary font-weight-bold">{{articles.payer_article}}</td>
            </tr>
            <tr class="total">
              <td colspan="4"></td>
              <td style="font-size: 16px" class="text-success font-weight-bold text-uppercase">Total : {{ informationPaiement.montant_total }} FCFA</td>
            </tr>
            <tr class="total">
              <td colspan="4"></td>
              <td style="font-size: 16px" class="text-primary font-weight-bold text-uppercase">Versement : {{ informationPaiement.somme_vers }} FCFA</td>
            </tr>
            <tr class="total">
              <td colspan="4"></td>
              <td style="font-size: 16px" class="text-danger font-weight-bold text-uppercase">à rendre : {{ informationPaiement.somme_rendu }} FCFA</td>
            </tr>
          </table>
        </div>
      </div>
      <br>
      <div align="right">
        <b-button variant="danger" @click="Loading = true">
          ANNULER L'IMPRESSION
        </b-button>
        <b-button variant="primary" @click="icpPrintPdf">
          IMPRIMER LA FACTURE
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
const electron = require('electron')
import { jsPDF } from "jspdf"
const ipcRenderer = require('electron').ipcRenderer
const {dialog} = require('electron').remote
var fs = require('fs')
// Importing BrowserWindow from Main
const BrowserWindow = electron.remote.BrowserWindow;
import html2pdf from "html2pdf.js"
import moment from "moment";
import {mapGetters} from "vuex";
export default {
  name: "facture",
  data() {
    return {
      Loading : false,
      articlesPayer : [],
      informationPaiement:[]
    }
  },
  computed : {
    ...mapGetters(['factures','infopaiement'])
  },
  methods : {
    async chargerDonne(code_facture){
      await this.$store.dispatch('afficherFacture',code_facture).then(() => {
        this.articlesPayer = this.factures
      }).catch((e) => {
        console.log(e)
      })
    },
    async paiementfacture(code_facture){
      await this.$store.dispatch('informationPaiement',code_facture).then(() => {
        this.informationPaiement = this.infopaiement
      }).catch((e) => {
        console.log(e)
      })
    },
    imprimer () {
      var dateJour = moment().format('YYYY-MM-DD')
      var element = document.getElementById('essaie')
      var opt = {
        margin: 0,
        filename: 'FACTURE DU :' + dateJour + '.pdf',
        image: {type: 'jpeg', quality: 1},
        html2canvas: {
          dpi: 192,
          scale: 4,
          letterRendering: true,
          useCORS: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true,
          floatPrecision: 16,
          orientation: 'portrait'
        }
      }
      html2pdf().from(element).set(opt).save()
    },
    ecriture(){
      var element = document.getElementById('essaie').innerHTML
      console.log(element)
      dialog.showSaveDialog({defaultPath: 'database'}, (filename) => {
        if (filename === undefined) {
          return
        }
        var element = new Blob(document.getElementById('essaie').innerHTML)
        fs.writeFile(filename + '.pdf', element, function (err) {
          if (err) throw err;
          console.log('Fichier mis à jour !');
        });
      })
    },
    icpPrintPdf(){
      var element = document.getElementById('essaie')
      let range = new Range();
      range.setStart(element, 0);
      range.setEndAfter(element, 0);
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(range);
      ipcRenderer.send('exportSelectionToPDF');
    },
    printjspdf(){
      const pdf = new jsPDF('p', 'pt', 'a4')
      pdf.html(document.getElementById('essaie'), {
        callback: function (pdf) {
          pdf.save('facturetest.pdf');
        }
      });
    },
    windowsPrint(){
      var getMyFrame = document.getElementById('essaie');
      getMyFrame.focus();
      getMyFrame.contentWindow.print();
    },
    testelectronprint(){
      var element = document.getElementById('essaie')
      var options = {
        silent: false,
        printBackground: true,
        color: true,
        margin: {
          marginType: 'printableArea'
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1
      }
      let win = BrowserWindow.getFocusedWindow();
      win.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log('Print Initiated');
      });
    }
  },
  created() {
    this.Loading = false
    var code_facture = JSON.parse(localStorage.getItem('code_facture'))
    this.chargerDonne(code_facture)
    this.paiementfacture(code_facture)
    this.Loading = true
  }
}
</script>

<style scoped lang="scss">
#essaie {
  font-size: 14px;
  width: 98%;
}

.invoice-box table {
  width: 100%;
}


.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 10px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 10px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 10px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.item input {
  padding-left: 5px;
}

.invoice-box table tr.item td:first-child input {
  margin-left: -5px;
  width: 100%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 60px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
  sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}

</style>