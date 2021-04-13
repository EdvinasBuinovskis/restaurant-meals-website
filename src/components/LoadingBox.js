import React from 'react';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingBox() {
    return (
        <div>
            <FontAwesomeIcon icon={faSpinner} spin /> Loading...
        </div>
    );
}