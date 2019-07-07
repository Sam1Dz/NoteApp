import axios from 'axios';

const IP = 'http://192.168.43.3:2001';

export const getNotes = () => {
	return {
		type: 'GET_NOTES',
		payload: axios.get(`${IP}/data/note`)
	}
}

export const addNote = (data) => {
    return {
        type: "ADD_NOTES",
        payload: axios.post(IP+'/send/note', data)
    }
}

export const editNote = (id, data) => {
	return {
		type: "EDIT_NOTE",
		payload: axios.patch(`${IP}/edit/note/${id}`, data)
	}
}

export const deleteNote = (id) => {
	return {
		type: "DELETE_NOTE",
		payload: axios.delete(`${IP}/delete/note/${id}`)
	}
}