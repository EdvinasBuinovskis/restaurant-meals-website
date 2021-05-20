/* eslint-disable react/prop-types */
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap'

export default function Activity({ kcal }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activity, setActivity] = useState('Pasirinkite veiklą');
    const [weight, setWeight] = useState('');
    const [minutes, setMinutes] = useState('');
    const [minOrH, setMinOrH] = useState('minutes');
    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        if (localStorage.getItem("userWeight")) {
            setWeight(localStorage.getItem("userWeight"));
        }
    }, []);

    const metValues = [
        {
            activityName: "Važinėdami dviračiu",
            met: 7.5
        },
        {
            activityName: "Bėgiodami",
            met: 7
        },
        {
            activityName: "Vaikščiodami",
            met: 3.5
        },
        {
            activityName: "Plaukdami",
            met: 6
        }
    ];

    function handleClick() {
        if (activity != "Pasirinkite veiklą" && weight != '') {
            const value = metValues.filter(obj => obj.activityName === activity)[0].met;
            const kcalPerMin = value * 3.5 * weight / 200;
            const activityMin = Math.round(kcal / kcalPerMin);
            localStorage.setItem("userWeight", weight);
            if (activityMin >= 60) {
                const hours = Math.floor(activityMin / 60);
                const minutes = activityMin % 60;
                if (minutes <= 9) {
                    setMinutes(`${hours}:0${minutes}`);
                } else {
                    setMinutes(`${hours}:${minutes}`);
                }
                setMinOrH("valandų");
            } else {
                setMinutes(activityMin);
                setMinOrH("minutes");
            }
        }
    }

    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Sudeginkite kalorijas</CardTitle>
                    {
                        activity === "Pasirinkite veiklą" || minutes === "" ? (
                            <CardText tag="h5">Pasirinkite veiklą ir įveskite savo svorį</CardText>
                        ) : (
                            <CardText tag="h5">{activity} {minutes} {minOrH}</CardText>
                        )
                    }

                    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                        <DropdownToggle color="primary" caret>
                            {activity}
                        </DropdownToggle>
                        <DropdownMenu onClick={(e) => setActivity(e.target.value)}>
                            {/* <DropdownMenu onClick={handleClick}> */}
                            <DropdownItem value="Važinėdami dviračiu">Važinėdami dviračiu</DropdownItem>
                            <DropdownItem value="Bėgiodami">Bėgiodami</DropdownItem>
                            <DropdownItem value="Vaikščiodami">Vaikščiodami</DropdownItem>
                            <DropdownItem value="Plaukdami">Plaukdami</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Input defaultValue={weight} onChange={(e) => setWeight(e.target.value)} />
                    <MDBBtn color="primary" onClick={handleClick}>Skaičiuoti</MDBBtn>

                </CardBody>
            </Card>
        </>
    )
}
