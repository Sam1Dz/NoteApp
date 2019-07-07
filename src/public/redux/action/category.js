import axios from 'axios';

const IP = 'http://192.168.43.3:2001';

export const getCategory = () => {
	return {
		type: 'GET_CATEGORY',
		payload: axios.get(IP+'/data/category')
	}
}

export const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: axios.post(IP+'/send/category', data)
    }
}