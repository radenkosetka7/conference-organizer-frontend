import React, {useEffect, useState} from 'react';
import AccordionItem from "./AccordionItem";
import './Accordion.css';
import {useDispatch, useSelector} from "react-redux";
import {getAllConferences} from "../../redux-store/conferenceSlice";
import SearchComponent from "../../components/Search/SearchComponent";
import FilterComponent from "../../components/Filter/FilterComponent";
import DateComponent from "../../components/Date/DateComponent";
import AddConference from "../AddConference/AddConference";

const Accordion = (props) => {

    const dispatch = useDispatch();
    const {confs} = useSelector((state) => state.conferences);
    const {role} = useSelector((state) => state.users);
    const events = props.events;
    const [searchValue, setSearchValue] = useState('');
    const [selectValue, setSelectValue] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showAddModal, setshowAddModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    function convertDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const convertedDate = `${year}-${month}-${day}`;
        return convertedDate;
    }
    const handleSaveObrisi = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleAddConference = () => {
        setshowAddModal(true);
    };

    const handleClose = () => {
        setshowAddModal(false);
    };

    useEffect(() => {

        if (selectValue === undefined) {
            setSelectValue(null);
        }
        if (startDate === undefined) {
            setStartDate(null);
        }
        if (endDate === undefined) {
            setEndDate(null);
        }
        if (searchValue === '' && selectValue === null && startDate === null && endDate === null) {
            dispatch(getAllConferences({}));
        }
        else if (searchValue !== '' && selectValue === null && startDate === null && endDate === null) {
            dispatch(getAllConferences({search: searchValue}));
        }
        else if (searchValue === '' && selectValue !== null && startDate === null && endDate === null) {
            dispatch(getAllConferences({finished: selectValue}));
        }
        else if (searchValue === '' && selectValue === null && startDate !== null && endDate !== null) {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getAllConferences({start: convertedStart, end: convertedEnd}));
        }
        else if (searchValue !== '' && selectValue !== null && startDate === null && endDate === null)
        {
            dispatch(getAllConferences({search: searchValue, finished: selectValue}));
        }
        else if (searchValue !== '' && selectValue === null && startDate !== null && endDate !== null)
        {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getAllConferences({search: searchValue, start: convertedStart, end: convertedEnd}));
        }
        else if (searchValue === '' && selectValue !== null && startDate !== null && endDate !== null)
        {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getAllConferences({finished: selectValue, start: convertedStart, end: convertedEnd}));
        }
        else if (searchValue !== '' && selectValue !== null && startDate !== null && endDate !== null)
        {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getAllConferences({search: searchValue, finished: selectValue, start: convertedStart, end: convertedEnd}));
        }
    }, [dispatch, searchValue, selectValue, startDate, endDate,refreshKey]);

    const onSearchConferences = (value) => {
        setSearchValue(value);
    };

    const onSelectConferences = (value) => {
        setSelectValue(value);
    }

    const handleDateChanged = (dates) => {
        if (dates) {
            const [startDate, endDate] = dates;
            setStartDate(startDate.toDate());
            setEndDate(endDate.toDate());
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    }


    return (
        <div>
            {props.events ? (
                    <>
                    </>
                ) :
                <>
                    <div style={{display: 'flex'}}>
                        <div style={{flex: 1}}>
                            <SearchComponent onSearchConferences={onSearchConferences}/>
                        </div>
                        <div style={{flex: 1}}>
                            <FilterComponent onSelectConferences={onSelectConferences}/>
                        </div>
                        <div style={{flex: 1}}>
                            <DateComponent handleDateChanged={handleDateChanged}/>
                        </div>
                    </div>
                </>}
            <div className="accordion">
                {props.events ? (
                    events.map((event) => (
                        <AccordionItem key={event.id} arg={event} onSave={handleSaveObrisi}/>
                    ))
                ) : (
                    confs.map((conf) => (
                        <AccordionItem key={conf.id} arg={conf} onSave={handleSaveObrisi}/>

                    ))
                )}
            </div>
            {showAddModal && (
                <AddConference onClose={handleClose} onSave={handleSaveObrisi} />
            )}
            {
                !events && role === 0 && (
                    <button className="round-button" onClick={handleAddConference} title="Create New Conference">+</button>
                )
            }
        </div>
    );
};

export default Accordion;