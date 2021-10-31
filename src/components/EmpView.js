import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./../App.css"
import { EmpContext } from './EmpContext';

const EmpView = () => {
    const [emp, setEmp] = useContext(EmpContext);
    const [deptName, setDeptName] = useState(null);


    useEffect(() => {
        axios.get("http://localhost:8084/api/department/find-dept-by-id", { params: { deptId: emp.deptId } }).then(
            (res) => {
                if (res.data.success) {
                    setDeptName(res.data.obj.name);
                }
            },
            err => {
                console.log('get department err', err);
            }
        )
    })

    return (
        <div className="emp_details">
            <h1 className="h2Stly" >Employee Details</h1>
            <h3><b>Code:</b> {emp.code}</h3>
            <h3><b>Name:</b> {emp.name}</h3>
            <h3><b>Date of Birth:</b> {emp.dob ? new Intl.DateTimeFormat(['ban', 'id']).format(new Date(emp.dob)) : null}</h3>
            <h3><b>Gender:</b> {emp.genderName}</h3>
            <h3><b>Mobile:</b> {emp.mobile}</h3>
            {/* <h3><b>Department:</b> {emp.deptId}</h3> */}
            <h3><b>Department:</b> {deptName}</h3>
            <Link to="/">
                <Button className="btn btn-gohome mt-4" type="button" variant="contained" >Go to Home</Button>
            </Link>
        </div>
    );
};

export default EmpView;