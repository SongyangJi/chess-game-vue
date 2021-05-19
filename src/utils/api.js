import axios from 'axios'

export const postRequest = (url,data) => {
    return axios.post(url,data);
}

export const getRequest = (url)=> {
    return axios.get(url);
}


export const deleteRequest = (url)=> {
    return axios.delete(url);
}

export const putRequest = (url,data)=> {
    return axios.put(url,data);
}
