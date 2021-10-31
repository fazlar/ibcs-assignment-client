import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { EmpContext } from './EmpContext';
import { toast } from 'react-toastify';
import "./../App.css"


const EmpDetails = () => {

    const [emp, setEmp] = useContext(EmpContext);
    const [employees, setEmpoyees] = useState([]);

    useEffect(() => {
        findEmployees();
    }, [])

    const findEmployees = () => {
        axios.get("http://localhost:8084/api/employee/find-emp-list").then(
            (res) => {
                if (res.data.success && res.data.items) {
                    setEmpoyees(res.data.items);
                } else {
                    toast.warning(res.data.message);
                }
            },
            err => {
                toast.warning('Emplyee Not Found!')
                console.log('find employee err', err);
            }
        )
    }

    // const deleteEmp = (e) => {
    //     if (!e.id) {
    //         toast.warning('Id Not Found!');
    //         return;
    //     }
    //     axios.delete("http://localhost:8081/api/employee/delete-emp", { data: { id: e.id } }).then(
    //         (res) => {
    //             if (res.data.success) {
    //                 toast.success(res.data.message)
    //                 findEmployees();
    //             } else {
    //                 toast.warning(res.data.message);
    //             }
    //         },
    //         err => {
    //             toast.warning('Delete Failed!');
    //             console.log('Delete employee err', err);
    //         }
    //     )
    // }

    const editEmp = (emp) => {
        setEmp(emp);
    }

    return (
        <div className="container">
            <h1 className="h2Stly h1-all">Employee Details</h1>
            <div className="all-wrapper-inner">
                <Table striped bordered hovr className="table-custom">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Mobile</th>
                            {/* <th>Department Id</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(emp =>
                                <tr>
                                    <td>{emp.code}</td>
                                    <td>{emp.name}</td>
                                    <td>{new Intl.DateTimeFormat(['ban', 'id']).format(new Date(emp.dob))}</td>
                                    {/* <td>{new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(emp.dob))}</td> */}
                                    <td>{emp.genderName}</td>
                                    <td>{emp.mobile}</td>
                                    {/* <td>{emp.deptId}</td> */}

                                    <td style={{ width: 280 }}>
                                        <Link to={"/emp-details"}>
                                            <Button variant="contained" className='action_button  btn btn-custom' onClick={() => editEmp(emp)}>Details</Button>
                                        </Link>
                                        <Link to={"/edit-emp"}>
                                            <Button type="button" variant="contained" className='action_button  btn btn-custom' color="primary" onClick={() => editEmp(emp)}>Edit</Button>
                                        </Link>
                                        <Link to={"/delete-emp/" + emp.id}>
                                            <Button type="button" variant="contained" className='action_button btn btn-custom' color="secondary" >Delete</Button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            </div>

        </div>
    );
};

export default EmpDetails;