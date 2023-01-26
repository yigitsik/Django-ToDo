import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import {deleteTask, listTasks, updateTask} from '../actions/taskActions'
import { Modal } from "react-bootstrap";

//import "../Style/style.css";
import axios from "axios";

const TaskList = (history) => {

	const dispatch = useDispatch()
	const userLogin = useSelector(state => state.userLogin);
	const taskList = useSelector(state => state.taskList);
	const { error, loading, userInfo } = userLogin;

	const [isModalActive, setIsModalActive] = useState(false);
	const [selectedItem, setSelectedItem] = useState(0)

	const initialState = {
		title: "",
		priority: '1',
		status: '0',
	};
	


	const [data, setData] = useState(initialState);


	const handleInputChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,

		});
	};


	useEffect(() => {

		if (userInfo) {

			dispatch(listTasks())
        } 
		else {
            console.log(history);
        }

	}, [dispatch, userInfo]);


	const updateButtonHandler = (id) => {
		setSelectedItem(id)
		setIsModalActive(!isModalActive)
	}

	const updateHandler = (e,id) => {
		e.preventDefault();
		dispatch(updateTask(selectedItem, data))
		updateButtonHandler()

	}

	const deleteHandler = (e, id) => {
		e.preventDefault();

		dispatch(deleteTask(id))

	}

	return (
		<div className="col-md-8">

<Modal show={isModalActive} onHide={updateButtonHandler} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Update Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<div className="row mb-3">
						<label htmlFor="inputTask" className="col-sm-3 col-form-label">
							Title
						</label>
						<div className="col-sm-10">
							<input
								type="text"
								className="form-control"
								id="inputTask"
								name="title"
								value={data.title}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="priority" className="col-sm-3 col-form-label">
							Priority
						</label>
						<div className="col-sm-10">
							<select
								id="priority"
								className="form-select"
								name="priority"
								value={data.priority}
								
								onChange={handleInputChange}>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="5">Five</option>
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="status" className="col-sm-3 col-form-label">
							Status
						</label>
						<div className="col-sm-10">
							<select
								id="status"
								className="form-select"
								name="status"
								value={data.status}
								onChange={handleInputChange}
								aria-label="Default select example">
								<option value="0">Pending</option>
								<option value="1">Completed</option>
							</select>
						</div>
					</div>
					<button
						type="button"
						className="btn btn-primary"
						onClick={(e) => updateHandler(e,document.getElementById("taskIdField"))}
					>
						Save Changes
					</button>
				</form>
			</Modal.Body>
		</Modal>

			<div className="h-100 p-4 bg-light border rounded-3">
				<h2 className="text-center">Task List</h2> <br />
				{userLogin ?
					(taskList.loading ? <span className="loader">LOADING...</span> :
						(taskList.tasks ?
							(<>
								<div className="table-responsive table-fixed">
									<table className="table table-striped">
										<thead className="thead-dark">
											<tr>
												<th scope="col">#</th>
												<th scope="col">Title</th>
												<th scope="col">Priority</th>
												<th scope="col">Status</th>
												<th scope="col">Action</th>
											</tr>
										</thead>
										<tbody>
											{taskList.tasks.length > 0 &&
												taskList.tasks.map((task) => (
													<tr key={task.id}>
														<th id="taskIdField" scope="row">{task.id}</th>
														<td>{task.title}</td>
														<td>{task.priority}</td>
														<td>{task.status === "0" ? "Pending" : "Completed"}</td>
														<td>
															<button
																className="btn btn-warning"
																onClick={() => updateButtonHandler(task.id)}
															>
																Update
															</button> {" "}
															<button
																className="btn btn-danger"
																onClick={(e) => deleteHandler(e, task.id)}
															>
																Delete
															</button>
														</td>

													</tr>)
												)
											}
										</tbody>
									</table>
								</div>
							</>):<span className="error">There is no task yet</span> 
						)
					)
					:
					(
						<h1 className="text-center">Please Login</h1>
					)}
			</div>
		</div >
	);
};

export default TaskList;

