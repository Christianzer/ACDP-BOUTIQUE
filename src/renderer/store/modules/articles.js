import {insertion,listes,modification,suppression} from '@/api/article'
import {initialiser} from '@/api/catalogue'
const articles = {
    state : {
        info : "",
        valeurs: [],
        messages:"",
    },
    mutations : {
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_VALEURS: (state, valeurs) => {
            state.valeurs = valeurs
        },
        SET_MESSAGES: (state, messages) => {
            state.messages = messages
        }
    },
    actions : {
        afficherListe({commit},datejour){
            const date = datejour
            return new Promise((resolve, reject) => {
                listes(date).then(response => {
                    const data = response.data
                    commit('SET_VALEURS', data.element)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        insererArticle({commit},data){
            const datas = JSON.stringify(data)
            return new Promise((resolve, reject) => {
                insertion(datas).then(response => {
                    const data = response.data
                    commit('SET_INFO', data.info)
                    commit('SET_MESSAGES', data.message)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        modifierArticle({commit},data){
            const datas = JSON.stringify(data)
            return new Promise((resolve, reject) => {
                modification(datas).then(response => {
                    const data = response.data
                    commit('SET_INFO', data.info)
                    commit('SET_MESSAGES', data.message)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        supprimerArticle({commit},data){
            const datas = JSON.stringify(data)
            return new Promise((resolve, reject) => {
                suppression(datas).then(response => {
                    const data = response.data
                    commit('SET_INFO', data.info)
                    commit('SET_MESSAGES', data.message)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        initialisation({commit},data){
            return new Promise((resolve, reject) => {
                initialiser(data.today,data.hier).then(response => {
                    console.log(response.data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })

        }
    }
}
export default articles