import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, MenuItem } from '@material-ui/core';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
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

const Employee = () => {
    const paperstyle = {
        padding: '20px 20px',
        width: 600,
        margin: '20px auto'
    }

    const [code, setCode] = useState(null);
    const [name, setName] = useState(null);
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState(101);
    const [mobile, setMobile] = useState(null);
    const [deptId, setDeptId] = useState(null);

    const [departments, setDepartments] = useState([]);
    const [genders, setGenders] = useState([]);

    const handleDateChange = (date) => {
        setDob(date);
    };

    const classes = useStyles();

    const onFormSumit = (e) => {
        e.preventDefault();
        if (!code || code.length < 4) {
            toast.warning('Code Should Be 4 Charecter!');
            document.getElementById('code').focus();
            return;
        }
        if (!name) {
            toast.warning('Please Add Name!');
            document.getElementById('name').focus();
            return;
        }
        if (name.length > 35) {
            toast.warning('Name Should Be Less Then 35 Charecter!');
            document.getElementById('name').focus();
            return;
        }
        const data = { code, name, dob, gender, mobile, deptId };
        axios.post("http://localhost:8084/api/employee/create-emp", data).then(
            (res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setCode('');
                    setName('');
                    setDob(null);
                    setGender(101);
                    setMobile('');
                    setDeptId('');
                } else {
                    toast.warning(res.data.message);
                    if (res.data.message === 'Code Should Be 4 Charecter' || res.data.message === 'Code Should Be Unique') {
                        document.getElementById('code').focus();
                    }
                    if (res.data.message === 'Name Should Not Be Null' || res.data.message === 'Name Should Be less than 35 Charecter') {
                        document.getElementById('name').focus();
                    }
                }
            },
            err => {
                toast.warning('Save Failed !')
                console.log('get Empoyee err', err);
            }
        )
    }

    useEffect(() => {
        axios.get("http://localhost:8084/api/employee/find-gender-list").then(
            (res) => {
                if (res.data.success) {
                    setGenders(res.data.items);
                }
            },
            err => {
                console.log('get department err', err);
            }
        )
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
    }, [])

    return (
        <Container className="mt-5">
            <Paper elevation={3} style={paperstyle}>
                <h1 className="h2Stly h1-custom-two">Add Employee</h1>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={onFormSumit}>
                    <TextField id="code" label="Code" variant="outlined" fullWidth value={code} onChange={(e) => setCode(e.target.value)} />
                    <TextField id="name" label="Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid justifyContent="space-around">
                            <KeyboardDatePicker disableToolbar variant="outlined" format="dd/MM/yyyy"
                                margin="normal" id="dob" label="Date of Birth" value={dob} fullWidth
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <TextField
                        id="gender" select label="Select Gender" value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        helperText="Please select your gender" variant="outlined" fullWidth>
                        {genders.map((option) => (
                            <MenuItem key={option.genderNo} value={option.genderNo}>
                                {option.genderName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField id="mobile" label="Mobile" variant="outlined" fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <TextField
                        id="department" select label="Select Department" value={deptId}
                        onChange={(e) => setDeptId(e.target.value)}
                        helperText="Please select your department" variant="outlined" fullWidth>
                        {departments.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div className="text-center">
                        <Button type="submit" variant="contained" color="primary" className={classes.button} startIcon={<SaveIcon />} >
                            Save
                        </Button>
                        <Link to="/"><Button className="btn-gohome ms-2" type="button" variant="contained">Go Back Home </Button> </Link>
                    </div>

                </form>
            </Paper>
        </Container>
    );
};

export default Employee;