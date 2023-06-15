import React, {useEffect, useState} from 'react';
import './VisitorAccordion.css';
import {useDispatch, useSelector} from "react-redux";
import {getConferencesVisitor} from "../../redux-store/conferenceSlice";
import SearchComponent from "../../components/Search/SearchComponent";
import FilterComponent from "../../components/Filter/FilterComponent";
import DateComponent from "../../components/Date/DateComponent";
import VisitorAccordionItem from "./VisitorAccordionItem";

const VisitorAccordion = (props) => {

    const dispatch = useDispatch();
    const {userConfs} = useSelector((state) => state.conferences);
    const events = props.events;
    const [searchValue, setSearchValue] = useState('');
    const [selectValue, setSelectValue] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSaveObrisi = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    function convertDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const convertedDate = `${year}-${month}-${day}`;
        return convertedDate;
    }

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
            dispatch(getConferencesVisitor({}));
        }
        else if (searchValue !== '' && selectValue === null && startDate === null && endDate === null) {
            dispatch(getConferencesVisitor({search: searchValue}));
        }
        else if (searchValue === '' && selectValue !== null && startDate === null && endDate === null) {
            dispatch(getConferencesVisitor({finished: selectValue}));
        }
        else if (searchValue === '' && selectValue === null && startDate !== null && endDate !== null) {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getConferencesVisitor({start: convertedStart, end: convertedEnd}));
        }
        else if (searchValue !== '' && selectValue !== null && startDate === null && endDate === null)
        {
            dispatch(getConferencesVisitor({search: searchValue, finished: selectValue}));
        }
        else if (searchValue !== '' && selectValue === null && startDate !== null && endDate !== null)
        {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getConferencesVisitor({search: searchValue, start: convertedStart, end: convertedEnd}));
        }
        else if (searchValue === '' && selectValue !== null && startDate !== null && endDate !== null)
        {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getConferencesVisitor({finished: selectValue, start: convertedStart, end: convertedEnd}));
        }
        else if (searchValue !== '' && selectValue !== null && startDate !== null && endDate !== null)
        {
            const convertedStart = convertDate(startDate);
            const convertedEnd = convertDate(endDate);
            dispatch(getConferencesVisitor({search: searchValue, finished: selectValue, start: convertedStart, end: convertedEnd}));
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
                        <VisitorAccordionItem key={event.id} arg={event} onSave={handleSaveObrisi}/>
                    ))
                ) : (
                    userConfs.map((conf) => (
                        <VisitorAccordionItem key={conf.id} arg={conf} onSave={handleSaveObrisi}/>
                    ))
                )}
            </div>
        </div>
    );
};

export default VisitorAccordion;