import {information} from '@/api/catalogue'
const catalogue = {
    state : {
        total_article:0,
        total_quantite:0,
        a_vendre:0,
        total_quantite_vendu:0,
        total_vente_vendu:0,
        quantite_restant:0,
        total_restant:0
    },
    mutations : {
        SET_TOTAL_ARTICLE: (state, total_article) => {
            state.total_article = total_article
        },
        SET_TOTAL_QUANTITE: (state, total_quantite) => {
            state.total_quantite = total_quantite
        },
        SET_A_VENDRE: (state, a_vendre) => {
            state.a_vendre = a_vendre
        },
        SET_QUANTITE_VENDU: (state, total_quantite_vendu) => {
            state.total_quantite_vendu = total_quantite_vendu
        },
        SET_VENTE_VENDU: (state, total_vente_vendu) => {
            state.total_vente_vendu = total_vente_vendu
        },
        SET_QUANTITE_RESTANT: (state, quantite_restant) => {
            state.quantite_restant = quantite_restant
        },
        SET_TOTAL_RESTANT: (state, total_restant) => {
            state.total_restant = total_restant
        }
    },
    actions : {
        afficherCatalogue({commit},datejour){
            const date = datejour
            return new Promise((resolve, reject) => {
                information(date).then(response => {
                    const data = response.data
                    commit('SET_TOTAL_ARTICLE', data.total_article)
                    commit('SET_TOTAL_QUANTITE', data.total_quantite)
                    commit('SET_A_VENDRE', data.a_vendre)
                    commit('SET_QUANTITE_VENDU', data.total_quantite_vendu)
                    commit('SET_VENTE_VENDU', data.total_vente_vendu)
                    commit('SET_QUANTITE_RESTANT', data.quantite_restant)
                    commit('SET_TOTAL_RESTANT', data.total_restant)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default catalogue