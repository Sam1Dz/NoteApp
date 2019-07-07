const initialState = {
    notes: [],
    isLoading: false,
    isFinish: false,
    isError: false
}

export default notes = (state = initialState, action) => {
	switch (action.type) {
		// READ DATA NOTE
		case 'GET_NOTES_PENDING':
		return {
			...state,
			isLoading: true
		}
		case 'GET_NOTES_FULFILLED':
		return {
			...state,
			isLoading: false,
			isFinish: true,
			notes: action.payload.data.values
		}
		case 'GET_NOTES_REJECTED':
        return {
        	...state,
            isLoading: false,
            isError: true
        }

        // ADD NOTE
        case 'ADD_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'ADD_NOTE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            notes: [...state.notes, action.payload.data.values]
        }
        case 'ADD_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

        // EDIT NOTE
        case 'EDIT_NOTE_PENDING':
        return {
            ...state,
            isLoading: true,
            isError: false
        }

        case 'EDIT_NOTE_FULFILLED':
        if (true) {}
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            notes: state.notes.map(note => (note.id_note == action.payload.data.values.id_note) ? action.payload.data.values : note)
        }

        case 'EDIT_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }

		default:
            return state;
	}
}