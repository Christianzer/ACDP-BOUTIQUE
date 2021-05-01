import {listes_caissier,factures,mode_paiement} from '@/api/caissier'
import moment from "moment"
const caissier = {
    state : {
        donnees:[],
        factures:[],
        infopaiement:[],
    },
    mutations : {
        SET_DONNEES: (state, donnees) => {
            state.donnees = donnees
        },
        SET_FACTURE:(state,factures) => {
            state.factures = factures
        },
        SET_PAIEMENT:(state,infopaiement) => {
            state.infopaiement = infopaiement
        }
    },
    actions : {
        afficherCaissier({commit}) {
            return new Promise((resolve, reject) => {
                listes_caissier().then(response => {
                    const data = response.data
                    commit('SET_DONNEES', data.element)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        afficherFacture({commit},datafacture) {
            var dateJour = moment().format('YYYY-MM-DD')
            const code_facture = datafacture
            return new Promise((resolve, reject) => {
                factures(code_facture,dateJour).then(response => {
                    const data = response.data
                    commit('SET_FACTURE', data.element)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        informationPaiement({commit},datafacture) {
            var dateJour = moment().format('YYYY-MM-DD')
            const code_facture = datafacture
            return new Promise((resolve, reject) => {
                mode_paiement(code_facture,dateJour).then(response => {
                    const data = response.data
                    commit('SET_PAIEMENT', data.paiement)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default caissier