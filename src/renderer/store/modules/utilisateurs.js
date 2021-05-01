import {connexion,information} from '@/api/utilisateurs'
const utilisateurs = {
    state: {
        nom_utilisateur: '',
        prenoms_utilisateur: '',
        matricule: '',
        type_utilisateur: '',
        statut: '',
        statut_caissier:''
    },
    mutations: {
        SET_NOM: (state, nom_utilisateur) => {
            state.nom_utilisateur = nom_utilisateur
        },
        SET_PRENOMS: (state, prenoms_utilisateur) => {
            state.prenoms_utilisateur = prenoms_utilisateur
        },
        SET_MATRICULE: (state, matricule) => {
            state.matricule = matricule
        },
        SET_TYPE: (state, type_utilisateur) => {
            state.type_utilisateur = type_utilisateur
        },
        SET_STATUT: (state, statut) => {
            state.statut = statut
        },
        SET_STATUT_CAISSIER: (state, statut_caissier) => {
            state.statut_caissier = statut_caissier
        }
    },
    actions: {
        connexionutilisateur({commit},data){
            const datauser = JSON.stringify(data)
            return new Promise((resolve, reject) => {
                connexion(datauser).then(response => {
                    const donne = response.data
                    commit('SET_TYPE', parseInt(donne.type_util))
                    commit('SET_MATRICULE', donne.matricule)
                    commit('SET_STATUT', donne.statut)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        informationutilisateur({ commit, state }){
            return new Promise((resolve, reject) => {
                information(state.type_utilisateur,state.matricule).then(response => {
                    const info = response.data
                    console.log(info)
                    commit('SET_NOM', info.util.nom)
                    commit('SET_PRENOMS', info.util.prenoms)
                    commit('SET_MATRICULE', info.util.matricule)
                    commit('SET_STATUT_CAISSIER', info.util.statut_caissier)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default utilisateurs