import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {createTask} from '../actions/taskActions'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const initialState = {
	title: "",
	priority: '1',
	status: '0',
	deadline:''
};

const TaskBox = () => {

 	const [data, setData] = useState(initialState);
	const userLogin = useSelector(state => state.userLogin);
	const { error, loading, userInfo } = userLogin;
	const dispatch = useDispatch()
	const [deadline, setDeadline] = useState(new Date());



	const handleInputChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};




	const addTaskHandler = (e) => {
		e.preventDefault();

		if (!userInfo) {
			alert("Please Login First!");
			return;
		}

		if (!data["title"] || !data["deadline"]) {
			alert("Please Enter Full Data");
			return;
		}

		const pdata = {}
		pdata["title"] = data["title"]
		pdata["status"] = data["status"]
		pdata["priority"] = data["priority"]
		pdata["deadline"] = data["deadline"]
		pdata["user"] = userInfo.id

		dispatch(createTask(pdata))

		console.log(pdata);
	};

	return (
		<div className="col-md-4">
			<div className="h-100 p-5 text-white bg-dark rounded-3">
				<h2>Add Task</h2>
				<br />
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
								onChange={(e) => handleInputChange(e)}
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
								onChange={(e) => handleInputChange(e)}
								value={data.priority}
							>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
								<option value="4">Four</option>
								<option value="5">Five</option>
							</select>
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="inputTask" className="col-sm-3 col-form-label">
							Deadline
						</label>
						<div className="col-sm-10">
							<input
								type="date"
								className="form-control"
								id="deadline"
								name="deadline"
								value={data.deadline}
								onChange={(e) => handleInputChange(e)}
							/>
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
								aria-label="Default select example"
								value={data.status}
								onChange={(e) => handleInputChange(e)}
							>
								<option value="0">Pending</option>
								<option value="1">Completed</option>
							</select>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-primary button"
						onClick={(e) => addTaskHandler(e)}
					>
						Add Task
					</button>
				</form>
			</div>
		</div>
	);
};

export default TaskBox;
