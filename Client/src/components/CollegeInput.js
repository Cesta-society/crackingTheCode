import React, {useState} from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Example = (props) => {
    const [name, setName] = useState("")
    state = {
        name: ""
    }
    handleChange = (event) => {
        setName( event.target.value );
    }
    onSubmit = e => {
        e.preventDefault()
        console.log(`${name}`)
    }
    return (
        <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
                <Label for="collegeName">College Name</Label>
                <Input type="email" value={name} onChange={handleChange} name="email" id="collegeName" placeholder="College Name" />
            </FormGroup>
        </Form>
    );
}

export default Example;