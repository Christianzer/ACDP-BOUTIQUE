import {demarersession} from '@/api/manager'
const manager = {
    state : {
        info : "",
        messages:"",
    },
    mutations : {
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_MESSAGES: (state, messages) => {
            state.messages = messages
        }
    },
    actions : {
        updateSession({commit},data){
            const datas = JSON.stringify(data)
            return new Promise((resolve, reject) => {
                demarersession(datas).then(response => {
                    const data = response.data
                    commit('SET_INFO', data.info)
                    commit('SET_MESSAGES', data.message)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}
export default manager