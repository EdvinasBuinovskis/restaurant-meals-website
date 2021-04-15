/* eslint-disable react/prop-types */
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Card, CardBody, CardText, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap'

export default function Activity({ kcal }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activity, setActivity] = useState('Choose activity');
    const [weight, setWeight] = useState('');
    const [minutes, setMinutes] = useState('');
    const [minOrH, setMinOrH] = useState('minutes');
    const toggle = () => setDropdownOpen(prevState => !prevState);

    // useEffect(() => {
    //     console.log(activity)
    // }, activity);
    const metValues = [
        {
            activityName: "Bicycling",
            met: 7.5
        },
        {
            activityName: "Running",
            met: 7
        },
        {
            activityName: "Walking",
            met: 3.5
        },
        {
            activityName: "Swimming",
            met: 6
        }
    ];
    function handleClick() {
        if (activity != "Choose activity" && weight != '') {
            const value = metValues.filter(obj => obj.activityName === activity)[0].met;
            const kcalPerMin = value * 3.5 * weight / 200;
            const activityMin = Math.round(kcal / kcalPerMin);
            if (activityMin >= 60) {
                // setMinutes(Math.round(activityMin / 60, 1));
                const hours = Math.floor(activityMin / 60);
                const minutes = activityMin % 60;
                if (minutes <= 9) {
                    setMinutes(`${hours}:0${minutes}`);
                } else {
                    setMinutes(`${hours}:${minutes}`);
                }
                setMinOrH("hour");
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
                    <CardTitle tag="h5">Burn thous calories by</CardTitle>
                    {
                        activity === "Choose activity" || minutes === "" ? (
                            <CardText tag="h5"><FontAwesomeIcon icon={faGrinBeamSweat} />Choose activity and enter your weight</CardText>
                        ) : (
                            <CardText tag="h5"><FontAwesomeIcon icon={faGrinBeamSweat} />{activity} for {minutes} {minOrH}</CardText>
                        )
                    }
                    {/* <CardText tag="h5"><FontAwesomeIcon icon={faGrinBeamSweat} />{activity} for {minutes} minutes</CardText> */}
                    {/* <CardText tag="h5"><FontAwesomeIcon icon={faWalking} />60 min</CardText>
                    <CardText tag="h5"><FontAwesomeIcon icon={faRunning} />60 min</CardText>
                    <CardText tag="h5"><FontAwesomeIcon icon={faBiking} />60 min</CardText> */}
                    {/* 
                    <InputGroup>
                        <Input onChange={(e) => setWeight(e.target.value)}/>
                        <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                                Choose activity
                            </DropdownToggle>
                            <DropdownMenu onChange={(e) => setActivity(e.target.value)}>
                                <DropdownItem value="Bicycling">Bicycling</DropdownItem>
                                <DropdownItem value="Running">Running</DropdownItem>
                                <DropdownItem value="Walking">Walking</DropdownItem>
                                <DropdownItem value="Swimming">Swimming</DropdownItem>
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup> */}

                    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                        <DropdownToggle caret>
                            {activity}
                        </DropdownToggle>
                        <DropdownMenu onClick={(e) => setActivity(e.target.value)}>
                            {/* <DropdownMenu onClick={handleClick}> */}
                            <DropdownItem value="Bicycling">Bicycling</DropdownItem>
                            <DropdownItem value="Running">Running</DropdownItem>
                            <DropdownItem value="Walking">Walking</DropdownItem>
                            <DropdownItem value="Swimming">Swimming</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Input onChange={(e) => setWeight(e.target.value)} />
                    <Button onClick={handleClick}>Calculate</Button>

                </CardBody>
            </Card>
        </div>
    )
}
