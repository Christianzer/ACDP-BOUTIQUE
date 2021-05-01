import http from '@/services'
export function connexion(data) {
    return http.post('/connexion.php', data)
}

export function information(type,matricule){
    return http.get('/getusers.php',{
        params:{
            type_util:type,
            matricule:matricule
        }
    })
}