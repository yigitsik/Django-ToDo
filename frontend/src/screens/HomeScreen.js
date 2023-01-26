import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TaskBox from '../components/Taskbox'
import TaskList from '../components/Tasklist'


function HomeScreen({ history }) {
    

    return (
        <div>
        
        <div className="row align-items-md-stretch">
           <TaskBox/>
           <TaskList/>
        </div>
        </div>
    )
}

export default HomeScreen
