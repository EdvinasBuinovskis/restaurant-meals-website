/* eslint-disable react/prop-types */
import React from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap'

export default function Search({ searchTerm, setSearchTerm }) {

    return (
        <div>
            <Form>
                <FormGroup>
                    <Label for="mealSearch">Search</Label>
                    <Input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        type="search"
                        name="search"
                        id="mealSearch"
                        placeholder="Enter search term"
                    />
                </FormGroup>
            </Form>
        </div>
    )
}
