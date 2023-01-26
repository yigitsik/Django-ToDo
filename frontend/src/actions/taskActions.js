import {

    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
   
    TASK_CREATE_REQUEST,
    TASK_CREATE_FAIL,
    TASK_CREATE_SUCCESS,
    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_FAIL,


} from '../constants/taskConstants'
import axios from 'axios'


export const listTasks = () => async (dispatch, getState) => {


    try {
        dispatch({
            type: TASK_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
         `/api/tasks/`,
            config
        )

    

        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createTask = (taskData) => async (dispatch, getState) => {

    const {
        userLogin: { userInfo },
        taskList:{tasks},
    } = getState()

    dispatch({
        type: TASK_CREATE_REQUEST
    })
    
    axios
    .post("/api/tasks/create", JSON.stringify(taskData), {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    })
    .then((res) => {

        dispatch({
            type: TASK_CREATE_SUCCESS,
            payload: tasks.concat(res.data)
        })
    })
    .catch((err) => {

        dispatch({
            type: TASK_CREATE_FAIL,
            payload: err["response"] ? err.response.data : "Network Error"
        })
    });

}

export const deleteTask = (id) => async (dispatch,getState) => {

    const {
        userLogin: { userInfo },
    } = getState()

    dispatch({
        type: TASK_DELETE_REQUEST
    })
    
    
    axios
    .delete(`/api/tasks/delete/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${userInfo.token}`,
        }
    })
    .then((res) => {

        dispatch({
            type: TASK_DELETE_SUCCESS,
            payload: res.data
        })
    })
    .catch((err) => {
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: err["response"] ? err.response.data : "Network Error"
        })
    });
    
}

export const updateTask = (id,data) => async (dispatch,getState) => {

    const {
        userLogin: { userInfo },
        taskList:{tasks},
    } = getState()

    dispatch({
        type: TASK_UPDATE_REQUEST
    })

    
    axios
    .put(`/api/tasks/update/${id}`, data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${userInfo.token}`,
        }
    })
    .then((res) => {

     
        console.log(tasks.findIndex(x => x.id == id));

        tasks[tasks.findIndex(x => x.id == id)] = res.data

        console.log(tasks);

        dispatch({
            type: TASK_UPDATE_SUCCESS,
            payload:  tasks
        })
    })
    .catch((err) => {

        console.log(err);


        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: err["response"] ? err.response.data : "Network Error"
        })
    });
    
}



