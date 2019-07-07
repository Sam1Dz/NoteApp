const initialState = {
    category: [],
    isLoading: false,
    isFinish: false,
    isError: false
}

export default category = (state = initialState, action) => {
	switch (action.type) {
		// READ DATA NOTE
		case 'GET_CATEGORY_PENDING':
		return {
			...state,
			isLoading: true
		}
		case 'GET_CATEGORY_FULFILLED':
		return {
			...state,
			isLoading: false,
			isFinish: true,
			category: action.payload.data.values
		}
		case 'GET_CATEGORY_REJECTED':
        return {
        	...state,
            isLoading: false,
            isError: true
        }

        // ADD CATEGORY
        case 'ADD_CATEGORY_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'ADD_CATEGORY_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFinish: true,
            category: [...state.category, action.payload.data.values]
        }
        case 'ADD_CATEGORY_REJECTED':
        return {
            ...state,
            isLoading: false,
            isError: true
        }
		default:
            return state;
	}
}