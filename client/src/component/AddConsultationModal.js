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
    Alert
 } from 'reactstrap';
 import { addConsultation, clearSuccess } from '../actions/consultationActions';
 import { clearErrors } from "../actions/errorActions";
 import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
 

function AddConsultationModal() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { msg } = useSelector(state => state.error);
    const { msg:success, loading } = useSelector(state => state.consultation);
    const [modal, toggle] = useState(false);
    const [consultationData, setConsultationData] = useState({
        patientName: '',
        folderNumber: '',
        patientComplaint: '',
        doctorAssessment: '',
        diagnosis: '',
        drugsPrescribed: ''
    })
    
    const toggleModal = () => {
        //Clear Success msg and Errors Messages
        dispatch(clearSuccess())
        dispatch(clearErrors())
        toggle(!modal)
    }

    useEffect(() => {
       //If success close modal
       if(modal) {
            if(success === "Success") {
                toggleModal();
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])


    const onChange = e => {
        setConsultationData({...consultationData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        const { fullName } = user;
        const {
            patientName,
            folderNumber,
            patientComplaint,
            doctorAssessment,
            diagnosis,
            drugsPrescribed 
        } = consultationData;

        //Add New Consultaion object
        const consultation = {
            patientName,
            folderNumber,
            patientComplaint,
            doctorAssessment,
            diagnosis,
            drugsPrescribed,
            doctorName: fullName
        }

        //Attempt to Add New Consultaion
        dispatch(addConsultation(consultation));
    }

    const loadingMsg = 'Please wait';
    return (
        <div>

            <Button
            color='dark'
            className='mb-3'
            onClick={toggleModal}
            >New Consultation</Button>

                <Modal
                isOpen={modal}
                toggle={toggleModal}
                >
                    <ModalHeader toggle={toggleModal}>New Consultation</ModalHeader>
                    <ModalBody>
                        { msg?.msg ? <Alert color='danger'>{ msg?.msg }</Alert> : null }
                        {loading ?
                        <div className='text-center'> 
                            <Loader loadingMsg={loadingMsg}/>
                        </div> : ''}
                        <Form onSubmit={onSubmit}>
                            <FormGroup>
                                <Label for='patientName'>Patient Name</Label>
                                <Input
                                    type='text'
                                    name='patientName'
                                    id='patientName'
                                    placeholder='Name of Patient'
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='folderNumber'>Folder Number</Label>
                                <Input
                                    type='text'
                                    name='folderNumber'
                                    id='folderNumber'
                                    placeholder='Folder Number'
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='patientComplaint'>Patient Complaint</Label>
                                <Input
                                    type='textarea'
                                    name='patientComplaint'
                                    id='patientComplaint'
                                    placeholder='Patient Complaint'
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='doctorAssessment'>Doctor's Assessment/Test</Label>
                                <Input
                                    type='textarea'
                                    name='doctorAssessment'
                                    id='doctorAssessment'
                                    placeholder='Doctor Assessment'
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='diagnosis'>Diagnosis</Label>
                                <Input
                                    type='text'
                                    name='diagnosis'
                                    id='diagnosis'
                                    placeholder='Diagnosis'
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='drugsPrescribed'>Drugs Prescribed</Label>
                                <Input
                                    type='textarea'
                                    name='drugsPrescribed'
                                    id='drugsPrescribed'
                                    placeholder='Drugs Prescribed'
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                color='success'
                                className='mt-2'
                                block
                                >Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
    )
}

export default AddConsultationModal;