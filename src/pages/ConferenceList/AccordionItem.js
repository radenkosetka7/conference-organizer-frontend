import React, {useEffect, useState} from 'react';
import './Accordion.css';
import QRCode from 'qrcode';
import Accordion from "./Accordion";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedConference} from "../../redux-store/conferenceSlice";
import VisitorsModal from "../VisitorsModal/VisitorsModal";
import MarksModal from "../MarksModal/MarksModal";
import AddMark from "../MarksModal/AddMark";
import Delete from "../Delete/Delete";
import EditConference from "../EditConference/EditConference";
import {createEventVisitor, deleteEventVisitor, getEventVisitor} from "../../redux-store/eventSlice";
import {eventRegister, eventUnregister} from "../../constant/constants";

const AccordionItem = (props) => {

    const [isActive, setIsActive] = useState(false);
    const [qrCode, setQRCode] = useState('');
    const {role} = useSelector((state) => state.users);
    const {user} = useSelector((state) => state.users);
    const dispath = useDispatch();
    const [showVisitors, setShowVisitors] = useState(false);
    const [showMarks, setShowMarks] = useState(false);
    const [rateConference, setRateConference] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [conferenceForDelete, setConferenceForDelete] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [conferenceForEdit, setConferenceForEdit] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleObrisi = (conference) => {
        console.log("obrisi", conference);
        setConferenceForDelete(conference);
        setShowDeleteModal(true);
    };
    const handleEdit = (conference) => {
        console.log("edit", conference);
        setConferenceForEdit(conference);
        setShowEditModal(true);
    };


    const onClose = () => {
        setShowDeleteModal(false);
        setShowEditModal(false);
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

    const handleLeftEvent = (arg) => {

        setSuccessMessage(eventUnregister);
        setTimeout(() => {

            setSuccessMessage('');
            const date = new Date();
            if (formattedDate(date) < formattedDate(arg.start)) {
                dispath(getEventVisitor({event: arg.id, visitor: user.id})).then((response) => {
                    dispath(deleteEventVisitor({id: response.payload[0].id})).then(response => {
                        props.onSave();
                    }).catch((error) => {
                    });
                }).catch((error) => {
                });
            }

        }, 2000);


    }
    const handleAttendEvent = (arg) => {
        const visitorRequest = {
            event: arg.id,
            visitor: user.id
        };
        setSuccessMessage(eventRegister);



        setTimeout(() => {
            setSuccessMessage('');
            dispath(createEventVisitor({value: visitorRequest}))

            props.onSave();
        }, 2000);
    }


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
            const {name, start, end, location, room} = props.arg;
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
            <div className={props.arg && props.arg.moderator ? "accordion-title-event" : "accordion-title"}>
                <div>{props.arg.name}</div>
                {props.arg && props.arg.creator && props.arg.finished === 0 && role === 0 && (
                    <>
                        <button className="button-edit"
                                onClick={() => {
                                    handleEdit(props.arg);
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
                {props.arg && props.arg.creator && role === 0 && (
                    <>
                        <button className="button-delete1"
                                onClick={() => handleObrisi(props.arg)}>
                            Delete
                        </button>
                    </>
                )}
                {successMessage.length>0 && (
                    <p style={props.arg.event_visitors.some((v) => v.visitor.id === user.id) === true?{color:"red"}:{color:"blue"}}>{successMessage}</p>
                )}
                {
                    props.arg && props.arg.event_type && props.arg.finished === 0 && formattedDate(new Date()) < formattedDate(props.arg.start) && props.arg.event_visitors.some((v) => v.visitor.id === user.id) === false && role === 2 && (
                        <button className="button-edit1"
                                onClick={() => {
                                    handleAttendEvent(props.arg);
                                }}

                        >
                            Attend
                        </button>
                    )
                }

                {
                    props.arg && props.arg.event_type && props.arg.finished === 0 && formattedDate(new Date()) < formattedDate(props.arg.start) && props.arg.event_visitors.some((v) => v.visitor.id === user.id) === true && role === 2 && (
                        <button className="button-edit1"
                                onClick={() => {
                                    handleLeftEvent(props.arg);
                                }}

                        >
                            Left
                        </button>
                    )
                }
                {showDeleteModal && <Delete onSave={props.onSave} onClose={onClose} conference={conferenceForDelete}
                                            idConf={conferenceForDelete.id}/>}
                {showEditModal &&
                    <EditConference onSave={props.onSave} onClose={onClose} conference={conferenceForEdit}/>}
                {props.arg && props.arg.creator && props.arg.finished === true && role === 1 && (
                    <>
                        <button className="button-edit" onClick={handleOpenRateConferenceModal}>Rate the conference
                        </button>
                        {rateConference && <AddMark show={rateConference} onClose={handleCloseRateConferenceModal}/>}
                    </>
                )}
                <div>{isActive ? (
                    <button className={"my-button"} onClick={() => setIsActive(!isActive)}>-</button>
                ) : (<button className={"my-button"} onClick={() => setIsActive(!isActive)}>+</button>)}</div>
            </div>
            {isActive && (
                <div className={props.arg && props.arg.moderator ? "accordion-content-event" : "accordion-content"}>
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
                        {props.arg && props.arg.moderator && props.arg.room && (
                            <>
                                <label>Room: </label>
                                <span>{props.arg.room.name}</span>
                            </>
                        )}
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        {props.arg && props.arg.moderator && props.arg.event_type && (
                            <>
                                <label>Event type: </label>
                                <span>{props.arg.event_type.name}</span>
                            </>
                        )}
                    </div>
                    <div style={{marginBottom: "15px"}}>
                        {props.arg && props.arg.moderator && (
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
                    {props.arg && props.arg.creator && <Accordion events={props.arg.events}/>}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
