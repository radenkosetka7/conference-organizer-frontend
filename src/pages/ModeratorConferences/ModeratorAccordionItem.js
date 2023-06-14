import React, {useEffect, useState} from 'react';
import './ModeratorAccordion.css'
import QRCode from 'qrcode';
import {useDispatch, useSelector} from "react-redux";
import VisitorsModal from "../VisitorsModal/VisitorsModal";
import MarksModal from "../MarksModal/MarksModal";
import AddMark from "../MarksModal/AddMark";
import ModeratorAccordion from "./ModeratorAccordion";
import {getAllModeratorConferences} from "../../api/conference.service";

const ModeratorAccordionItem = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [qrCode, setQRCode] = useState('');
    const {user} = useSelector((state) => state.users);
    const dispath = useDispatch();
    const [showVisitors, setShowVisitors] = useState(false);
    const [showMarks, setShowMarks] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [conferenceForRate, setConferenceForRate] = useState({});

    const onClose = () => {
        setShowRateModal(false);
    }


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


    const handleRate = (conference) => {
        setShowRateModal(true);
        setConferenceForRate(conference);
    };

    useEffect(() => {
        if (props.arg.url) {
            generateQRCode(props.arg.url);
        } else {
            const {name, start, end, location, room} = props.arg;
            const data = {
                name: name,
                start: formattedDate(start),
                end: formattedDate(end),
                location: location.name,
                room: props.arg.event_type ? room.name : "",
            };
            generateQRCode(JSON.stringify(data));
        }
    }, []);


    return (
        <div className="accordion-item">
            <div className={props.arg && props.arg.event_type ? "accordion-title-event" : "accordion-title"}>
                <div>{props.arg.name}</div>
                {
                    props.arg && props.arg.ratings && props.arg.ratings.some(rating => rating.user.id === user.id) === false && props.arg.creator && props.arg.finished === 1 && (
                        <button className="button-edit"
                                onClick={() => {
                                    handleRate(props.arg);
                                }}

                        >
                            Rate the conference
                        </button>
                    )
                }
                {showRateModal && <AddMark onSave={props.onSave} show={showRateModal} onClose={onClose} arg={conferenceForRate}/>}
                <div>{isActive ? (
                    <button className={"my-button"} onClick={() => setIsActive(!isActive)}>-</button>
                ) : (<button className={"my-button"} onClick={() => setIsActive(!isActive)}>+</button>)}</div>
            </div>
            {isActive && (
                <div className={props.arg && props.arg.event_type ? "accordion-content-event" : "accordion-content"}>
                    <div style={{marginBottom: "15px"}}>
                        <label>Name: </label>
                        <span>{props.arg.name}</span>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label>Start: </label>
                        <span>{formattedDate(props.arg.start)}</span>
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        <label>End: </label>
                        <span>{formattedDate(props.arg.end)}</span>
                    </div>
                    {props.arg.location && (<div style={{marginBottom: "15px"}}>
                        <label>Location: </label>
                        <span>{props.arg.location?.name}</span>
                    </div>)}
                    <div style={{marginBottom: "15px"}}>
                        {props.arg && props.arg.creator ? (
                            <>
                                <label>Creator: </label>
                                <span>{props.arg.creator.first_name + ' ' + props.arg.creator.last_name}</span>
                            </>
                        ) : null}
                    </div>

                    {props.arg.url && (

                        <div style={{marginBottom: "15px"}}>
                            <label>URL: </label>
                            <a href={props.arg.url} target="_blank" rel="noopener noreferrer">
                                {props.arg.url}
                            </a>
                        </div>
                    )}

                    {props.arg && props.arg.creator && (
                        <>
                            <div style={{marginBottom: "15px", paddingBottom: "30px"}}>
                                <label>Marks: </label>
                                <button className="button" onClick={handleOpenMarksModal}>
                                    MARKS
                                </button>
                                {showMarks &&
                                    <MarksModal arg={props.arg} show={showMarks} onClose={handleCloseMarksModal}/>}
                            </div>
                        </>)
                    }
                    <div style={{marginBottom: "15px"}}>
                        {props.arg && props.arg.event_type && (
                            <>
                                <label>Room: </label>
                                <span>{props.arg.room.name}</span>
                            </>
                        )}
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        {props.arg && props.arg.event_type && (
                            <>
                                <label>Event type: </label>
                                <span>{props.arg.event_type.name}</span>
                            </>
                        )}
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        {props.arg && props.arg.event_type && (
                            <>
                                <label>Visitors: </label>
                                <button className="button" onClick={handleOpenVisitorsModal}>
                                    VISITORS
                                </button>
                                {showVisitors && <VisitorsModal arg={props.arg} show={showVisitors}
                                                                onClose={handleCloseVisitorsModal}/>}
                            </>)
                        }
                    </div>
                    <div className="qr-code-container">
                        <img src={qrCode} alt="QR Code"/>
                    </div>
                    {props.arg && props.arg.creator && <ModeratorAccordion events={props.arg.events}/>}

                </div>
            )}
        </div>
    );
};

export default ModeratorAccordionItem;
