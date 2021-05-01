import http from '@/services'
export function initialiser(toaday,hier){
    return http.get('/catalogue/initialiser.php',{
        params:{
            todayjour:toaday,
            hierjour:hier

        }
    })
}

export function information(created){
    return http.get('/catalogue/information.php',{
        params:{
            created:created
        }
    })
}