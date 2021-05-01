import http from '@/services'
export function demarersession(data){
    return http.post('/initialisation/initialiser_caisse.php',data)
}