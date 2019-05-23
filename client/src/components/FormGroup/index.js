import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export default props => (
    <FormGroup>
        <Label for={props.name}>{props.children}</Label>
        <Input 
            type={props.type} 
            name={props.name}
            value={props.value}
            onChange={props.onInputChange}
            placeholder={props.placeholder}
        />
    </FormGroup>
)