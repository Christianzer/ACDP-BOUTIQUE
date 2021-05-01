import http from '@/services'
export function acheter(data){
    return http.post('/achat/achat.php',data)
}