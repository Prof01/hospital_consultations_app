import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Form, 
    FormGroup, 
    InputGroupText, 
    Input, 
    Button, 
    InputGroup, 
    InputGroupAddon 
} from 'reactstrap';
import { getPatientConsultations } from '../actions/consultationActions';
import { clearErrors } from '../actions/errorActions';
import Loader from './Loader';
import PatientConsultationList from './PatientConsultationList';

export default function Search() {
    const dispatch = useDispatch();
    const [folderNumber, setfolderNumber] = useState('')
    const { isAuthenticated } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.consultation);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(clearErrors())
        dispatch(getPatientConsultations(folderNumber))
    }
    const loadingMsg = 'Please wait...';
    return (
        <Fragment>
        {isAuthenticated ? '' :
        <div className='border border-info p-4 mb-2'>
            <h4 className='text-secondary'>Search For Patient Consultations Below:</h4>
            {loading ? 
            <div className='text-center'>
                <Loader loadingMsg={loadingMsg} />
            </div> : ''}
            <Form onSubmit={onSubmit} className='d-flex'>
                <FormGroup >
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>Search:</InputGroupText>
                        </InputGroupAddon>
                        <Input 
                        type="text" 
                        onChange={e => setfolderNumber(e.target.value)}
                        placeholder="Enter Folder Number" 
                        required
                        />
                        <InputGroupAddon addonType="append">
                            <Button type='submit' color='success'>
                            Submit
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </Form>
            <div className='mt-4'>
                <PatientConsultationList />
            </div>
        </div>
        }
    </Fragment>
    )
}
