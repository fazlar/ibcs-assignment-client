import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./../App.css"

const DeleteDept = () => {

    const { id } = useParams();

    function confirmDelete(e) {
        console.log('isconfirm', id);
        if (!id) {
            toast.warning('Id Not Found!');
            return;
        }
        axios.delete("http://localhost:8082/api/department/delete-dept", { data: { id: id } }).then(
            (res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    // findDept();
                } else {
                    toast.warning('Delete Failed !');
                }
            },
            err => {
                toast.warning('Delete Failed !');
                console.log('find employee err', err);
            }
        )
    }

    return (
        <div>
            <Modal.Dialog>
                <Modal.Header className="con-title" closeButton>
                    <Modal.Title>Please Make Sure ?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3 style={{ color: 'red' }}>Do You Want To Delete?</h3>
                </Modal.Body>

                <Modal.Footer>
                    <Link to={"/add-dept"}>
                        <Button onClick={() => confirmDelete(true)} variant="contained" color="primary">Yes</Button>
                        <Button style={{ margin: '5px' }} variant="contained" color="secondary">No</Button>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default DeleteDept;