import {
   
    TASK_CREATE_FAIL,
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
    TASK_LIST_RESET,    
    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS

} from '../constants/taskConstants'


export const taskListReducer = (state = {}, action) => {

    switch (action.type) {
        case TASK_LIST_REQUEST:
            return { loading: true, tasks: [] }

        case TASK_LIST_SUCCESS:
            return{ loading: false, tasks: action.payload}

        case TASK_LIST_FAIL:
            return { loading: false, error: action.payload }

        case TASK_LIST_RESET:
            return { loading: false, error: action.payload }

        case TASK_CREATE_REQUEST:
            return { loading: true, tasks: [] }

        case TASK_CREATE_SUCCESS:

            return { loading: false, tasks: action.payload}

        case TASK_CREATE_FAIL:
            return { loading: false, error: action.payload }


        case TASK_DELETE_REQUEST:
            return { loading: true, tasks: [] }

        case TASK_DELETE_SUCCESS:

            return { loading: false, tasks: action.payload }

        case TASK_DELETE_FAIL:
            return { loading: false, error: action.payload }


        case TASK_UPDATE_REQUEST:
            return { loading: true }

        case TASK_UPDATE_SUCCESS:
            return { state, loading: false, tasks: action.payload }

        case TASK_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
