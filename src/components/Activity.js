/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Card, CardBody, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap'

export default function Activity({ kcal }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activity, setActivity] = useState('Pasirinkite veiklą');
    const [weight, setWeight] = useState('');
    const [minutes, setMinutes] = useState('');
    const [minOrH, setMinOrH] = useState('minutes');
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const metValues = [
        {
            activityName: "Važinėdami dviračiu",
            met: 7.5
        },
        {
            activityName: "Begiodami",
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
        <div>
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
                        <DropdownToggle caret>
                            {activity}
                        </DropdownToggle>
                        <DropdownMenu onClick={(e) => setActivity(e.target.value)}>
                            {/* <DropdownMenu onClick={handleClick}> */}
                            <DropdownItem value="Važinėdami dviračiu">Važinėdami dviračiu</DropdownItem>
                            <DropdownItem value="Begiodami">Begiodami</DropdownItem>
                            <DropdownItem value="Vaikščiodami">Vaikščiodami</DropdownItem>
                            <DropdownItem value="Plaukdami">Plaukdami</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Input onChange={(e) => setWeight(e.target.value)} />
                    <Button onClick={handleClick}>Skaičiuoti</Button>

                </CardBody>
            </Card>
        </div>
    )
}
