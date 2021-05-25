/* eslint-disable react/prop-types */
import React from 'react'
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";

export default function Search({ searchTerm, setSearchTerm }) {

    return (
        <MDBCol md="6">
            <form className="form-inline mt-4 mb-2">
                <MDBIcon icon="search" />
                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Paieška" aria-label="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} />
            </form>
        </MDBCol>

    );
}

