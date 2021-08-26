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
import { loginOfficer } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';


function LoginModal() {
    const dispatch = useDispatch();
    const { isAuthenticated, isLoading } = useSelector(state => state.auth);
    const { msg } = useSelector(state => state.error);
    const [modal, toggle] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    
    const toggleModal = () => {
        //Clear Errors
        dispatch(clearErrors())
        toggle(!modal)
    }

    useEffect(() => {
       //If authenticated close modal
       if(modal) {
            if(isAuthenticated) {
                toggleModal();
            }
        }

    })


    const onChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = loginData;

        // Login An Officer Object
        const officer = {
            email,
            password
        }

        dispatch(clearErrors())
        //Attempt to Login
        dispatch(loginOfficer(officer));

    }

    const loadingMsg = 'Authenticating Officer...';
    return (
        <div>
                <NavLink onClick={toggleModal} href='#' >
                Login
                </NavLink>

                <Modal
                isOpen={modal}
                toggle={toggleModal}
                >
                    <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    { msg?.msg ? <Alert color='danger'>{ msg?.msg }</Alert> : null }
                    {isLoading ? 
                    <div className='text-center'>
                        <Loader loadingMsg={loadingMsg} />
                    </div> : ''}
                        <Form onSubmit={onSubmit}>
                            <FormGroup>
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
                                >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
    )
}

export default LoginModal;