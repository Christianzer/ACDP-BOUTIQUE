import {acheter} from '@/api/achat'
const achats = {
    state : {
        code_facture : "",
    },
    mutations : {
        SET_CODE_FACTURE: (state, code_facture) => {
            state.code_facture = code_facture
        },

    },
    actions : {
        faireAchat({commit},data){
            const datas = JSON.stringify(data)
            return new Promise((resolve, reject) => {
                acheter(datas).then(response => {
                    const data = response.data
                    console.log(data)
                    commit('SET_CODE_FACTURE', data.code_facture)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}
export default achats