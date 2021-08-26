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
 import { clearSuccess, updateConsultation } from '../actions/consultationActions';
 import { clearErrors } from "../actions/errorActions";
 import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
 
function UpdateConsultationModal({_id}) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { consultations, msg:success, loading } = useSelector(state => state.consultation);
    const { msg } = useSelector(state => state.error);
    const [modal, toggle] = useState(false);

    // eslint-disable-next-line  
    const filteredData = consultations?.filter( patient =>{
        if(patient._id === _id) {  
            return patient
        }

      })

      const consultation = filteredData[0]
    const [consultationData, setConsultationData] = useState({
        patientName: consultation?.patientName,
        folderNumber: consultation?.folderNumber,
        patientComplaint: consultation?.patientComplaint,
        doctorAssessment: consultation?.doctorAssessment,
        diagnosis: consultation?.diagnosis,
        drugsPrescribed: consultation?.drugsPrescribed,
        id: consultation?._id
    })
    
    const toggleModal = () => {
        //Clear Success msg and Errors Messages
        dispatch(clearSuccess())
        dispatch(clearErrors())
        toggle(!modal)
    }

    useEffect(() => {

        //If Success close modal
       if(modal) {
            if(success === 'Success') {
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
            drugsPrescribed,
            id 
        } = consultationData;

        //Update Consultaion object
        const consultation = {
            patientName,
            folderNumber,
            patientComplaint,
            doctorAssessment,
            diagnosis,
            drugsPrescribed,
            doctorName: fullName,
            id
        }

        //Attempt to Update Consultaion
        dispatch(updateConsultation(consultation));
    }

    const loadingMsg = 'Updating changes...';
    return (
        <div>

                <Button
                color='danger'
                className='mb-1'
                onClick={toggleModal}
                >Edit</Button>
                <Modal
                isOpen={modal}
                toggle={toggleModal}
                >
                    <ModalHeader toggle={toggleModal}>Update Patient Consultation</ModalHeader>
                        {loading ? 
                        <div className='text-center'>
                            <Loader loadingMsg={loadingMsg}/>
                        </div> : ''}
                    <ModalBody>
                        { msg?.msg ? <Alert color='danger'>{ msg?.msg }</Alert> : null }
                        <Form onSubmit={onSubmit}>
                            <FormGroup>
                                <Label for='patientName'>Patient Name</Label>
                                <Input
                                    type='text'
                                    name='patientName'
                                    id='patientName'
                                    placeholder='Name of Patient'
                                    defaultValue={consultation?.patientName}
                                    onChange={e => onChange(e)}
                                    />
                                    
                            </FormGroup>
                            <FormGroup>
                                <Label for='folderNumber'>Folder Number</Label>
                                <Input
                                    type='text'
                                    name='folderNumber'
                                    id='folderNumber'
                                    placeholder='Folder Number'
                                    defaultValue={consultation?.folderNumber}
                                    onChange={e => onChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='patientComplaint'>Patient Complaint</Label>
                                <Input
                                    type='textarea'
                                    name='patientComplaint'
                                    id='patientComplaint'
                                    placeholder='Patient Complaint'
                                    defaultValue={consultation?.patientComplaint}
                                    onChange={e => onChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='doctorAssessment'>Doctor's Assessment/Test</Label>
                                <Input
                                    type='textarea'
                                    name='doctorAssessment'
                                    id='doctorAssessment'
                                    placeholder='Doctor Assessment'
                                    defaultValue={consultation?.doctorAssessment}
                                    onChange={e => onChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='diagnosis'>Diagnosis</Label>
                                <Input
                                    type='text'
                                    name='diagnosis'
                                    id='diagnosis'
                                    placeholder='Diagnosis'
                                    defaultValue={consultation?.diagnosis}
                                    onChange={e => onChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='drugsPrescribed'>Drugs Prescribed</Label>
                                <Input
                                    type='textarea'
                                    name='drugsPrescribed'
                                    id='drugsPrescribed'
                                    placeholder='Drugs Prescribed'
                                    defaultValue={consultation?.drugsPrescribed}
                                    onChange={e => onChange(e)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button
                                color='danger'
                                className='mt-2 text-light'
                                block
                                >Save Changes</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
    )
}

export default UpdateConsultationModal;