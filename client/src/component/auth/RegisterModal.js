import React, { useState, useEffect } from 'react'
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
 } from 'reactstrap';
import { registerOfficer } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';


function RegisterModal() {
    const dispatch = useDispatch();
    const [modal, toggle] = useState(false);
    const { isAuthenticated, isLoading } = useSelector(state => state.auth);
    const { msg } = useSelector(state => state.error);
    const [registrationData, setRegistrationData] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    
    const toggleModal = () => {
        //Clear Errors
        dispatch(clearErrors())
        toggle(!modal)
    }

    useEffect(() => {
        const { modal } = registrationData;
       //If authenticated close modal
       if(modal) {
            if(isAuthenticated) {
                toggleModal();
            }
        }

    })


    const onChange = e => {
        setRegistrationData({...registrationData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        
        const { fullName, email, password } = registrationData;

        //Register An Officer object
        const officer = {
            fullName,
            email,
            password
        }
        dispatch(clearErrors())
        //Attempt to Register An Officer
        dispatch(registerOfficer(officer));
    }

    const loadingMsg = 'Proccessing...';
    return (
        <div>
                <NavLink onClick={toggleModal} href='#' >
                Register
                </NavLink>

                <Modal
                isOpen={modal}
                toggle={toggleModal}
                >
                    <ModalHeader toggle={toggleModal}>Register</ModalHeader>
                    <ModalBody>
                    { msg?.msg ? <Alert color='danger'>{ msg?.msg }</Alert> : null }
                    {isLoading ? 
                    <div className='text-center'>
                        <Loader loadingMsg={loadingMsg}/>
                    </div> : ''}
                        <Form onSubmit={onSubmit}>
                            <FormGroup>
                                <Label for='fullName'>Name</Label>
                                <Input
                                    type='text'
                                    name='fullName'
                                    id='name'
                                    placeholder='Enter Name'
                                    className='mb-3'
                                    onChange={event => onChange(event)}
                                    required
                                />

                                <Label for='email'>Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Enter Email'
                                    className='mb-3'
                                    onChange={event => onChange(event)}
                                    required
                                />

                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Enter Password'
                                    className='mb-3'
                                    onChange={event => onChange(event)}
                                    required
                                />

                                <Button
                                color='dark'
                                className='mt-2'
                                block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
    )
}

export default RegisterModal;