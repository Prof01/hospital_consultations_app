import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Alert, 
    Container, 
    ListGroup, 
    ListGroupItem 
} from "reactstrap";

function PatientConsultationList() {
    const { patientConsultation } = useSelector(state => state.consultation);
    const { msg } = useSelector(state => state.error);
   
    return (
        <Container>
                { msg?.msg === 'Patient Does Not Exist' ? <Alert color='danger'>{ msg?.msg }</Alert> : null }                
                { msg?.msg === 'Patient Does Not Exist' ? '' :
                <ListGroup>
                        {patientConsultation?.map(({_id, patientName, folderNumber, patientComplaint, doctorAssessment, diagnosis, drugsPrescribed, doctorName, date}, index) => (
                            <div key={_id} >                                    
                                <ListGroupItem className="mb-2 bg-success rounded">
                                <details>
                                    <summary>
                                        <div className='text-dark bg-info'>
                                            <div className='border p-2 d-flex'>
                                                <div className='w-50'><b>Name of Patient: </b>{patientName}</div>
                                                <div><b>Folder Number: </b>{folderNumber}</div>
                                            </div>
                                            <div className='border p-2 d-flex'>
                                                <div className='w-50'><b>Date: </b>{date.slice(0, -14)}</div>
                                                <div><b>Time: </b>{date.slice(11, -8)}GMT</div>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className='bg-light' >
                                        <div className='border p-2'>
                                            <b>Patient Complaint: </b><br/>
                                            {patientComplaint}
                                        </div>
                                        <div className='border p-2'>
                                            <b>Doctor Assessment/Test: </b><br/>
                                            {doctorAssessment}
                                        </div>
                                        <div className='border p-2'>
                                            <b>Diagnosis: </b><br/>
                                            {diagnosis}
                                        </div>
                                        <div className='border p-2'>
                                            <b>Prescribed Drugs: </b><br/>
                                            {drugsPrescribed}
                                        </div>
                                        <div className='border p-2'>
                                            <b>Consultation By:</b>
                                            <div>Doctor: {doctorName}</div>
                                        </div>
                                    </div>
                                    </details>
                                </ListGroupItem>
                            </div>
                        ))}
                </ListGroup>
                    }
            </Container>
    )
}

export default PatientConsultationList;