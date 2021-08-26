import React, { Fragment } from 'react'
import { Spinner } from 'reactstrap'

function Loader({loadingMsg}) {
    return (
        <Fragment>
            <Spinner size="sm" type="grow" color="danger" />
            <Spinner size="sm" type="grow" color="warning" />
            <Spinner size="sm" type="grow" color="success" />
            <Spinner size="sm" type="grow" color="info" />
            <span className='text-light'>{loadingMsg}</span>
        </Fragment>
    )
}

export default Loader;