import React, { Fragment } from 'react';
import { logoutOfficer } from "../../actions/authActions";
import { NavLink } from 'reactstrap';
import { useDispatch } from 'react-redux';

function Logout() {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(logoutOfficer())
    }
    return (
        <Fragment>
            <NavLink onClick={() => handleClick()} href='#'>
                Logout
            </NavLink>
        </Fragment>
    )
}


export default Logout;