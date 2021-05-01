import http from '@/services'
export function listes_caissier(){
    return http.get('/initialisation/liste_caissier.php')
}

export function factures(code_facture,created){
    return http.get('/achat/facture.php',{
        params:{
            created:created,
            code_facture:code_facture
        }
    })
}

export function mode_paiement(code_facture,created){
    return http.get('/achat/mode_paiement.php',{
        params:{
            created:created,
            code_facture:code_facture
        }
    })
}