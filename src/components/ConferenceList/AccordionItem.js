import React, { useState, useEffect } from 'react';
import './Accordion.css';
import QRCode from 'qrcode';
import Accordion from "./Accordion";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const AccordionItem = ({ arg }) => {

    const [isActive, setIsActive] = useState(false);
    const [qrCode, setQRCode] = useState('');
    const {role} = useSelector((state) => state.users);

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

    useEffect(() => {
        if (arg.url) {
            generateQRCode(arg.url);
        } else {
            const { name, start, end, location, room } = arg;
            const data = {
                name: name,
                start: formattedDate(start),
                end: formattedDate(end),
                location: location.name,
                room: arg.moderator ? room.name : "",
            };
            generateQRCode(JSON.stringify(data));
        }
    }, [arg.url, arg.name, arg.start, arg.end, arg.location, arg.moderator, arg.room]);

    return (
        <div className="accordion-item">
            <div className={arg && arg.moderator ? "accordion-title-event" : "accordion-title"} onClick={() => setIsActive(!isActive)}>
                <div>{arg.name}</div>
                {arg && arg.creator && (
                    <>
                        <Link
                            to="/login"
                            className={`home underline ${activeLink === 'edit' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('edit')}
                            style={{ color: "white", textDecoration: "none", fontSize:"14px", marginLeft:"150px", marginRight:"-250px" }}
                        >
                            Edit
                        </Link>
                        <Link
                            to="/login"
                            className={`home underline ${activeLink === 'delete' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('delete')}
                            style={{ color: "red", textDecoration: "none", fontSize:"14px", marginLeft:"100px", marginRight:"-140px" }}
                        >
                            Delete
                        </Link>
                    </>
                )}
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && (
                <div className={arg && arg.moderator ? "accordion-content-event" : "accordion-content"}>
                    <div>
                        <label>Name: </label>
                        <span>{arg.name}</span>
                    </div>
                    <div>
                        <label>Start: </label>
                        <span>{formattedDate(arg.start)}</span>
                    </div>
                    <div>
                        <label>End: </label>
                        <span>{formattedDate(arg.end)}</span>
                    </div>
                    <div>
                        <label>Location: </label>
                        <span>{arg.location.name}</span>
                    </div>
                    <div>
                        {arg && arg.moderator && role !== 1 ? (
                            <>
                                <label>Moderator: </label>
                                <span>{arg.moderator.first_name + ' ' + arg.moderator.last_name}</span>
                            </>
                        ) : null}
                        {arg && arg.creator && role !== 0 ? (
                            <>
                                <label>Creator: </label>
                                <span>{arg.creator.first_name + ' ' + arg.creator.last_name}</span>
                            </>
                        ) : null}
                    </div>

                    <div>
                        {arg && arg.url !== null && (
                            <>
                        <label>URL: </label>
                        <a href={arg.url} target="_blank" rel="noopener noreferrer">
                            {arg.url}
                        </a>
                            </>)}
                    </div>
                    <div>
                        { arg && arg.creator && (
                        <>
                            <label>Marks: </label>
                            <Link
                            to="/login"
                            className={`home underline ${activeLink === 'marks' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('marks')}
                            style={{ color: "black", textDecoration: "none", fontSize:"14px" }}
                            >
                            Marks
                            </Link>
                        </>)
                        }
                    </div>
                    <div>
                        {arg && arg.moderator && (
                            <>
                                <label>Room: </label>
                                <span>{arg.room.name}</span>
                            </>
                        )}
                    </div>
                    <div>
                        {arg && arg.moderator && (
                            <>
                                <label>Event type: </label>
                                <span>{arg.event_type.name}</span>
                            </>
                        )}
                    </div>
                    <div>
                        { arg && arg.moderator && (
                            <>
                                <label>Visitors: </label>
                                <Link
                                    to="/login"
                                    className={`home underline ${activeLink === 'visitors' ? 'active' : ''}`}
                                    onClick={() => handleLinkClick('visitors')}
                                    style={{ color: "black", textDecoration: "none", fontSize:"14px" }}
                                >
                                    Visitors
                                </Link>
                            </>)
                        }
                    </div>
                    <div className="qr-code-container">
                        <img src={qrCode} alt="QR Code" />
                    </div>
                    {arg && arg.creator && <Accordion events={arg.events} />}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
