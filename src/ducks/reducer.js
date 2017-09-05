// ===== INITIAL STATE ===== //

const initialState = {
	memories: [],
	totalUnread: null,
	user: {
		id: null
	}
}

// ===== VARIABLES - ACTION TYPES ===== //

const GET_MEMORIES = "GET_MEMORIES";
const GET_USER_INFO = "GET_USER_INFO";
const TOTAL_UNREAD_MEMORIES = "TOTAL_UNREAD_MEMORIES";

// ===== REDUCER ===== //

export default function reducer (state = initialState, action) {
	switch(action.type) {
		case GET_MEMORIES:
			return Object.assign({}, state, {memories: action.payload})
		case GET_USER_INFO:
			return Object.assign({}, state, {user: action.payload})
		case TOTAL_UNREAD_MEMORIES:
			return Object.assign({}, state, {totalUnread: action.payload})
		default:
			return state
	}
}

// ===== FUNCTIONS - ACTION CREATORS ===== //

export function getMemories(memory) {
	return {
		type: GET_MEMORIES,
		payload: memory
	}
}

export function getUserInfo(user) {
	return {
		type: GET_USER_INFO,
		payload: user
	}
}

export function totalUnreadMemoriesById(count){
	return {
		type: TOTAL_UNREAD_MEMORIES,
		payload: count
	}
}