import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import { toast } from 'react-toastify';
import "./../App.css"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Department() {
    const paperstyle = {
        padding: '20px 20px',
        width: 600,
        margin: '20px auto'
    }
    const acButton = {
        padding: '5px 5px',
        margin: '5px'
    }
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [active, setActive] = useState(null);
    const [departments, setDepartments] = useState([]);

    const handleChange = (event) => {
        setActive(event.target.checked);
    };

    const classes = useStyles();

    const onFormSumit = (e) => {
        e.preventDefault();
        if (!name) {
            toast.warning('Please Add Department Name!');
            document.getElementById('name').focus();
            return;
        };
        const department = { id, name, active };
        if (id) {
            updateDepartment(department);
        } else {
            saveDepartment(department);
        }

    }
    function saveDepartment(department) {
        axios.post("http://localhost:8084/api/department/create-dept", department).then(
            (res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setActive(false);
                    setName('');
                    findDept();
                } else {
                    toast.warning('Save Failed !');
                }
            },
            err => {
                toast.warning('Save Failed !');
                console.log('Department save err', err);
            }
        )
    }
    function updateDepartment(department) {
        axios.put("http://localhost:8084/api/department/update-dept", department).then(
            (res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setId(null);
                    setActive(false);
                    setName('');
                    findDept();
                } else {
                    toast.warning('Update Failed !');
                }
            },
            err => {
                toast.warning('Update Failed !');
                console.log('Department Update err', err);
            }
        )
    }

    const findDept = () => {
        axios.get("http://localhost:8084/api/department/find-dept-list").then(
            (res) => {
                if (res.data.success) {
                    setDepartments(res.data.items);
                }
            },
            err => {
                console.log('get department err', err);
            }
        )
    }

    useEffect(() => {
        findDept();
    }, [])

    // const deleteDept = (e) => {
    //     axios.delete("http://localhost:8082/api/department/delete-dept", { data: { id: e.id } }).then(
    //         (res) => {
    //             if (res.data.success) {
    //                 toast.success(res.data.message);
    //                 findDept();
    //             } else {
    //                 toast.warning('Delete Failed !');
    //             }
    //         },
    //         err => {
    //             toast.warning('Delete Failed !');
    //             console.log('find employee err', err);
    //         }
    //     )
    // }

    const editDept = (dept) => {
        setId(dept.id);
        setName(dept.name);
        setActive(dept.active ? true : false);
        document.getElementById('name').focus();
        // console.log('edit obj ', name, active);
    }

    return (
        <Container className="mt-5" >
            <Paper elevation={3} style={paperstyle}>
                <h1 className="h2Stly h1-custom-two">Add Dempartment</h1>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={onFormSumit}>
                    <TextField id="name" style={{ width: '440px' }} label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={active}
                                onChange={handleChange}
                                name="active"
                                color="primary"
                            />
                        }
                        label="Active"
                    />
                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className={classes.button} startIcon={<SaveIcon />} >
                            Save
                        </Button>

                        <Link to="/"><Button className="btn-gohome ms-2" type="button" variant="contained">Go Back Home </Button> </Link>
                    </div>
                </form>

            </Paper>
            <Paper elevation={3} style={paperstyle}>
                <h1 className="h2Stly h1-custom-two">Department List</h1>
                {departments.map(dept => (
                    <Paper elevation={3} style={{ nargin: "10px", padding: "15px", textAlign: "left" }} key={dept.id}>
                        <b>Name:</b> {dept.name}<br />
                        <b>Active:</b> {dept.active ? 'Active' : 'Inactive'}
                        <div className="btn-area-right">
                            <Button type="button" style={acButton} variant="contained" color="primary" onClick={() => editDept(dept)}>Edit</Button>
                            <Link to={"/delete-dept/" + dept.id}>
                                <Button type="button" style={acButton} variant="contained" color="secondary"  >Delete</Button>
                            </Link>
                        </div>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
