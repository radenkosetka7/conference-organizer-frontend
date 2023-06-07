import React, { useState, useEffect } from 'react';
import './Accordion.css';
import QRCode from 'qrcode';
import Accordion from "./Accordion";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedConference} from "../../redux-store/conferenceSlice";
import VisitorsModal from "../VisitorsModal/VisitorsModal";
import MarksModal from "../MarksModal/MarksModal";
import AddMark from "../MarksModal/AddMark";
import Delete from "../Delete/Delete";
const AccordionItem = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [qrCode, setQRCode] = useState('');
    const {role} = useSelector((state) => state.users);
    const dispath = useDispatch();
    const [showVisitors,setShowVisitors]= useState(false);
    const [showMarks,setShowMarks]= useState(false);
    const [rateConference,setRateConference]= useState(false);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const [conferenceForDelete, setConferenceForDelete] = useState({});

    const handleObrisi = (conference) => {
        console.log("obrisi", conference);
        setConferenceForDelete(conference);
        setShowDeleteModal(true);
    };

    const onClose = () =>
    {
        setShowDeleteModal(false);
    };

    const handleOpenRateConferenceModal = () => {
        setRateConference(true);
    };

    const handleCloseRateConferenceModal = () => {
        setRateConference(false);
    };

    const handleOpenVisitorsModal = () => {
        setShowVisitors(true);
    };

    const handleCloseVisitorsModal = () => {
        setShowVisitors(false);
    };

    const handleOpenMarksModal = () => {
        setShowMarks(true);
    };

    const handleCloseMarksModal = () => {
        setShowMarks(false);
    };
    const formattedDate = (date) =>
        new Date(date).toLocaleDateString('en-US', {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

    const generateQRCode = (text) => {
        QRCode.toDataURL(text, (err, url) => {
            if (err) {
                console.error(err);
                return;
            }
            setQRCode(url);
        });
    };

    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    const handleSetConference = (arg) => {
        dispath(setSelectedConference(arg));
    }

    useEffect(() => {
        if (props.arg.url) {
            generateQRCode(props.arg.url);
        } else {
            const { name, start, end, location, room } = props.arg;
            const data = {
                name: name,
                start: formattedDate(start),
                end: formattedDate(end),
                location: location.name,
                room: props.arg.moderator ? room.name : "",
            };
            generateQRCode(JSON.stringify(data));
        }
    }, [props.arg.url, props.arg.name, props.arg.start, props.arg.end, props.arg.location, props.arg.moderator, props.arg.room]);

    return (
        <div className="accordion-item">
            <div className={props.arg && props.arg.moderator ? "accordion-title-event" : "accordion-title"} onClick={() => setIsActive(!isActive)}>
                <div>{props.arg.name}</div>
                {props.arg && props.arg.creator && props.arg.finished === false && role === 0 &&(
                    <>
                        <button className="button-edit"
                            onClick={() => {
                                handleSetConference(props.arg);
                            }}

                        >
                            Edit
                        </button>
                        <button className="button-delete"
                            onClick={() => handleObrisi(props.arg)}>
                            Delete
                        </button>
                    </>
                )}
                {props.arg && props.arg.creator && props.arg.finished === true && role === 0 &&(
                    <>
                        <button className="button-delete1"
                                onClick={() => handleObrisi(props.arg)}>
                            Delete
                        </button>
                    </>
                )}
                {showDeleteModal && <Delete onSave={props.onSave} onClose={onClose} conference={conferenceForDelete} idConf={conferenceForDelete.id} />}
                {props.arg && props.arg.creator && props.arg.finished === true && role === 1 && (
                    <>
                        <button className="button-edit" onClick={handleOpenRateConferenceModal}>Rate the conference
                       </button>
                        {rateConference && <AddMark show={rateConference} onClose={handleCloseRateConferenceModal}/>}
                    </>
                )}
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && (
                <div className={props.arg && props.arg.moderator ? "accordion-content-event" : "accordion-content"}>
                    <div style={{marginBottom:"15px"}}>
                        <label>Name: </label>
                        <span>{props.arg.name}</span>
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        <label>Start: </label>
                        <span>{formattedDate(props.arg.start)}</span>
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        <label>End: </label>
                        <span>{formattedDate(props.arg.end)}</span>
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        <label>Location: </label>
                        <span>{props.arg.location.name}</span>
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        {props.arg && props.arg.moderator && role !== 1 ? (
                            <>
                                <label>Moderator: </label>
                                <span>{props.arg.moderator.first_name + ' ' + props.arg.moderator.last_name}</span>
                            </>
                        ) : null}
                        {props.arg && props.arg.creator && role !== 0 ? (
                            <>
                                <label>Creator: </label>
                                <span>{props.arg.creator.first_name + ' ' + props.arg.creator.last_name}</span>
                            </>
                        ) : null}
                    </div>

                    <div style={{marginBottom:"15px"}}>
                        {props.arg && props.arg.url !== null && (
                            <>
                        <label>URL: </label>
                        <a href={props.arg.url} target="_blank" rel="noopener noreferrer">
                            {props.arg.url}
                        </a>
                            </>)}
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        { props.arg && props.arg.creator && (
                        <>
                            <label>Marks: </label>
                            <button className="button" onClick={handleOpenMarksModal}>
                            MARKS
                            </button>
                            {showMarks && <MarksModal arg={props.arg} show={showMarks} onClose={handleCloseMarksModal}/>}
                        </>)
                        }
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        {props.arg && props.arg.moderator && (
                            <>
                                <label>Room: </label>
                                <span>{props.arg.room.name}</span>
                            </>
                        )}
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        {props.arg && props.arg.moderator && (
                            <>
                                <label>Event type: </label>
                                <span>{props.arg.event_type.name}</span>
                            </>
                        )}
                    </div>
                    <div style={{marginBottom:"15px"}}>
                        { props.arg && props.arg.moderator && (
                            <>
                                <label>Visitors: </label>
                                <button className="button" onClick={handleOpenVisitorsModal}>
                                    VISITORS
                                </button>
                                {showVisitors && <VisitorsModal arg={props.arg} show={showVisitors} onClose={handleCloseVisitorsModal}/>}
                            </>)
                        }
                    </div>
                    <div className="qr-code-container">
                        <img src={qrCode} alt="QR Code" />
                    </div>
                    {props.arg && props.arg.creator && <Accordion events={props.arg.events} />}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
