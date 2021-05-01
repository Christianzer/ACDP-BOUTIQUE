import http from '@/services'
export function insertion(data){
    return http.post('/article/insertion.php',data)
}

export function listes(created) {
    return http.get('/article/listes.php',{
        params:{
            created:created
        }
    })
}

export function modification(data) {
    return http.post('/article/modifier.php',data)
}

export function suppression(data) {
    return http.post('/article/supprimer.php',data)
}