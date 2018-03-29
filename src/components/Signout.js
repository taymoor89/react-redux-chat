import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'

export default ({ signout }) => {
    return (
        <Button onClick={signout} size="lg" block>
            Signout
        </Button>
    ) 
}