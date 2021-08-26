import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';
import { getConsultations } from '../actions/consultationActions';
import AddConsultationModal from './AddConsultationModal';
import ConsultationList from './ConsultationList';

export default function Consultations() {
    const dispatch = useDispatch();
    const { consultations } = useSelector(state => state.consultation);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getConsultations())
        }
    }, [dispatch, isAuthenticated])

    const handleChange = (e) => {
		setFilter(e.target.value)
	}
    
    const [sortData, setFilter] = useState('');

    // eslint-disable-next-line  
  const filteredConsultations = consultations?.filter( patient =>{
    if(sortData === null) {
        return patient
    }
    if(patient?.folderNumber.toLowerCase().includes(sortData.toLowerCase())||patient?.patientName.toLowerCase().includes(sortData.toLowerCase())){
        return patient
    }
  })

    return (
        <div>
            { isAuthenticated ?
            <Form>
                <FormGroup 
                className='mb-2 d-flex'
                >
                    <div>
                        <AddConsultationModal />
                    </div>
                    <div style={{marginLeft: '40%', width:'40vw'}}>
                        <Label className='w-25'><b>Search: </b></Label>
                        <Input 
                        type="text" 
                        onChange={e => handleChange(e)}
                        placeholder="Enter Folder Number or Patient Name" 
                        />
                    </div>
                </FormGroup>
                <ConsultationList filteredData={filteredConsultations}/>
                {filteredConsultations.length === 0 ? <h2 className='text-secondary'>No Consultation Found</h2> : '' }
            </Form>
            : ''}
        </div>
    )
}
