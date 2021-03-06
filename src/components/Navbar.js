import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import "./../App.css"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    </Link>
                    <Link to="/add-emp">
                        <Button color="inherit">Add Employee</Button>
                    </Link>
                    <Link to="/add-dept">
                        <Button color="inherit">Add Department</Button>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        IBCS-PRIMAX Code Challenge
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
