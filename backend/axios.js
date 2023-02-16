import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://172.16.16.180:9000'
})

export default instance