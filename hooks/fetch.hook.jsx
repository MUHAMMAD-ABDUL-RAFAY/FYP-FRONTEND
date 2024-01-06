import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper'

// axios.defaults.baseURL = 'https://mernloginbackend.azurewebsites.net:443';

// let isLocal = window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')
// let isSlow = window.location.href.includes('profilepro-slow')
// let isFast = window.location.href.includes('profilepro-fast')

// if(isLocal){
//     console.log('running on local')
//     axios.defaults.baseURL = 'http://localhost:4589'
// }
// else if(isSlow){
//     console.log('running on slow ring')
//     axios.defaults.baseURL = 'https://profileprobackend-slow.azurewebsites.net:443'
// }
// else if(isFast){
//     console.log('running on fast ring')
//     axios.defaults.baseURL = 'https://profileprobackend-fast.azurewebsites.net:443'
// }
// else{
//     console.log('running on production')
//     axios.defaults.baseURL = 'https://profileprobackend.azurewebsites.net:443'
// }
//axios.defaults.baseURL = 'http://localhost:4589'


let isLocal = window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')
let isSlow = window.location.href.includes('crowdhawk')
// let isFast = window.location.href.includes('crowdhawk')

if(isLocal){
    console.log('running on local')
    axios.defaults.baseURL = 'http://localhost:4589'
}
else if(isSlow){
    console.log('running on slow ring')
    axios.defaults.baseURL = 'https://accespasswebbackend-prod.azurewebsites.net:443'

}
// else if(isSlow){
//     console.log('running on slow ring')
//     axios.defaults.baseURL = 'https://accespasswebbackend-canary.azurewebsites.net:443'
// }
// else if(isFast){
//     console.log('running on fast ring')
//     axios.defaults.baseURL = 'https://accespasswebbackend-primary.azurewebsites.net:443'
// }
// else{
//     console.log('running on production')
//     axios.defaults.baseURL = 'https://accespasswebbackend-prod.azurewebsites.net:443'
// }




/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const { username } = !query ? await getUsername() : '';
                
                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}