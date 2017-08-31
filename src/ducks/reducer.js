// ===== INITIAL STATE ===== //

const initialState = {
	KEY: 'VALUE'
}

// ===== VARIABLES ===== //

const VARIABLE_NAME = VARIABLE_NAME;

// ===== REDUCER ===== //

export default function reducer (state = initialState, action) {
	switch(action.type) {
		case VARIABLE_NAME:
			return Object.assign({}, state, {VARIABLE_NAME: action.payload})
		default:
			return state
	}
}

// ===== FUNCTIONS ===== //

export function variableName(parameter) {
	return {
		type: VARIABLE_NAME,
		payload: parameter
	}
}