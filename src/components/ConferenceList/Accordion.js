import React, {useEffect, useState} from 'react';
import AccordionItem from "./AccordionItem";
import './Accordion.css';
import {useDispatch, useSelector} from "react-redux";
import {getAllConferences} from "../../redux-store/conferenceSlice";
const Accordion = (props) => {

    const dispatch = useDispatch();
    const {confs} = useSelector((state) => state.conferences);
    const {role} = useSelector((state) => state.users);
    const events = props.events;

    useEffect(() => {
        dispatch(getAllConferences({}));
    }, [dispatch]);

    const [searchValue, setSearchValue] = useState("");
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


    return (
        <div>
            <div className="accordion">
                {props.events ? (
                    events.map((event) => (
                        <AccordionItem key={event.id} arg={event}/>
                    ))
                ) : (
                    confs.map((conf) => (
                        <AccordionItem key={conf.id} arg={conf}/>

                    ))
                )}
            </div>
            {
                !events && role === 0 && (
                    <button className="round-button" title="Create New Conference">+</button>
                )
            }
        </div>
    );
};

export default Accordion;