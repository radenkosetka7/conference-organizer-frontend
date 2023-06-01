    import styled from './EditConference.module.css';
    import { useForm } from 'react-hook-form';
    import { registration } from '../../api/auth.service';
    import { useState } from 'react';
    import { useEffect } from "react";
    import { Link, useNavigate } from 'react-router-dom';
    import { useDispatch, useSelector } from "react-redux";
    
    //toast notifications
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import {getStaffUser} from "../../redux-store/userSlice";
    import {getEventTypes, getLocations} from "../../redux-store/utilSlice";

    
    const EditConference = () => {


        const dispatch = useDispatch();
        const {staffs} = useSelector((state) => state.users);
        const {eventTypes} = useSelector((state)=>state.utils);
        const conference= useSelector((state) => state.conferences.selectedConf);
        const [events, setEvents] = useState(conference?.events || []);
        const [showEvents, setShowEvents] = useState(false);
        const [showRezervacije, setShowRezervacije] = useState(false);
        const { register, handleSubmit, getValues, formState: { errors } } = useForm();
        const [expandedDogadjajId, setExpandedDogadjajId] = useState(null);
        const [isChanged, setIsChanged] = useState(false);

        const handleResursChange = () =>
        {
            setIsChanged(true);
        };

        const handleDogadjajChanged = (eventIndex, event) => {
            setEvents((prevEvents) => {
                const updatedEvents = [...prevEvents];
                updatedEvents[eventIndex] = event;
                return updatedEvents;
            });
            setIsChanged(true);
        };

        const calculateTotalLength = () =>
        {

        };
        const [dogadjajVremena, setDogadjajVremena] = useState({});


        const handleSave = (request) =>
        {
            if(isChanged)
            {
                console.log("to je request ", request);
            }
        }


        useEffect(() => {
            dispatch(getStaffUser());
            dispatch(getLocations({}));
            dispatch(getEventTypes({}));

        }, []);

        const notify = () => {
            toast.success('Conference successfully updated!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    
        return (
            <div>
                <div className={styled.linearGradient}>
                    <form className={styled.form}>
                        <p className={styled["form-title"]}>Edit conference</p>
    
                        <div className={styled["input-container"]}>
                            <label htmlFor="name" style={{fontSize:16}}>Name:</label>
                            <input
                                type="text"
                                className="input"
                                name="name"
                                value={conference.name}
                                onChange={handleResursChange}
                                placeholder="Name"
                                {...register("name", {
                                    required: true,
                                    minLength: 3
                                })} />
                            {errors.name && errors.name.type === "required" && (
                                <p className={styled.errorFirsField}>Required field</p>
                            )}
                            {errors.name && errors.name.type === "minLength" && (
                                <p className={styled.errorFirsField}>3 characters minimum.</p>
                            )}
                        </div>
                            <div className={styled["input-container"]}>
                                <label style={{fontSize:16}} htmlFor="start">Start:</label>
                            <input
                                type="datetime-local"
                                className="input"
                                name="start"
                                value={conference.start}
                                placeholder="Start"
                                {...register("start", {
                                    required: true,
                                })} />
    
                            {errors.start && errors.start.type === "required" && (
                                <p className={styled.errorSecondField}>Required field</p>
                            )}
                            </div>
    
                        <div className={styled["input-container"]}>
                            <label style={{fontSize:16}} htmlFor="end">End:</label>
                            <input
                                type="datetime-local"
                                className="input"
                                name="end"
                                value={conference.end}
                                placeholder="End"
                                {...register("end", {
                                    required: true,
                                })} />
    
                            {errors.end && errors.end.type === "required" && (
                                <p className={styled.errorSecondField}>Required field</p>
                            )}
    
                        </div>
    
                        <div className={styled["input-container"]}>
                            <label style={{fontSize:16}} htmlFor="url">Url:</label>
                            <input
                                type="text"
                                className="input"
                                name="url"
                                value={conference.url}
                                placeholder="Url"
                                {...register("url", {
                                    required: true,
                                })} />
                            {errors.url && errors.url.type === "required" &&
                                (<p className={styled.error}>Required field</p>)}
                        </div>
                        <div className={styled["eventsHeader"]}>
                            <span>Events</span>
                            <button
                                className={styled["plusButton"]}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowEvents(!showEvents);
                                }}
                            >
                                {showEvents ? "-" : "+"}
                            </button>
                        </div>
                        {showEvents && (
                            <ul className={styled["ul"]}>
                                {events.length > 0 &&
                                    events.map((event, index) => (
                                        <li key={index} className={styled["userItem"]}>
                                            <div className={styled["eventHeader"]}>
                                                <span>Event: {event.name}</span>
                                                <button
                                                    className={styled["plusButton"]}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setExpandedDogadjajId(
                                                            expandedDogadjajId === event.id
                                                                ? null
                                                                : event.id
                                                        );
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {expandedDogadjajId === event.id && (
                                                <div className={styled["editForm"]}>
                                                    <label htmlFor={`naziv-${event.id}`}>Naziv:</label>
                                                    <input
                                                        className={styled["input"]}
                                                        value={event.name}
                                                        type="text"
                                                        readOnly={false}
                                                        id={`naziv-${event.id}`}
                                                        onChange={(e) => {
                                                            handleDogadjajChanged();
                                                        }}
                                                    />
                                                    <label htmlFor={`startTime-${event.id}`}>
                                                        Start:
                                                    </label>
                                                    <input
                                                        type={"datetime-local"}
                                                        className={styled["input"]}
                                                        selected={
                                                            dogadjajVremena[event.id] ||
                                                            new Date(event.startTime)
                                                        }
                                                        onChange={(e) => {
                                                            handleDogadjajChanged();
                                                        }}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="MM/dd/yyyy HH:mm"
                                                        id={`startTime-${event.id}`}
                                                    />
                                                    <label htmlFor={`endTime-${event.id}`}>End:</label>
                                                    <input
                                                        type={"datetime-local"}
                                                        className={styled["input"]}
                                                        selected={
                                                            dogadjajVremena[event.id] ||
                                                            new Date(event.endTime)
                                                        }
                                                        onChange={(e) => {
                                                            handleDogadjajChanged();
                                                        }}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        timeIntervals={15}
                                                        dateFormat="MM/dd/yyyy HH:mm"
                                                        id={`endTime-${event.id}`}
                                                    />
                                                    {event.url && (
                                                        <>
                                                            <label htmlFor={`url-${event.id}`}>Url:</label>
                                                            <input
                                                                className={styled["input"]}
                                                                value={event.url}
                                                                type="text"
                                                                id={`url-${event.id}`}
                                                                onChange={(e) => {
                                                                    handleDogadjajChanged(
                                                                    );
                                                                }}
                                                            />
                                                        </>
                                                    )}
                                                    <label htmlFor={`moderator-${event.moderator.id}`}>
                                                        Moderator:
                                                    </label>
                                                    <select
                                                        className={styled["selekt"]}
                                                        onChange={(e) => {
                                                            handleDogadjajChanged();
                                                        }}
                                                    >
                                                        {staffs.map((moderator) => (
                                                            <option key={moderator.id} value={moderator.username}>
                                                                {moderator.first_name + " "+ moderator.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label
                                                        htmlFor={`tipDogadjaja-${event.event_type.id}`}
                                                    >
                                                        Tip Dogadjaja:
                                                    </label>
                                                    <select
                                                        className={styled["selekt"]}
                                                        onChange={(e) => {
                                                            handleDogadjajChanged();
                                                        }}
                                                    >
                                                        {eventTypes.map((tip) => (
                                                            <option key={tip.id} value={tip.name}>
                                                                {tip.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className={styled["eventsHeader"]}>
                                                        <span>Rezervacije:</span>
                                                        <button
                                                            className={styled["plusButton"]}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setShowRezervacije(!showRezervacije);
                                                            }}
                                                        >
                                                            {showRezervacije ? "-" : "+"}
                                                        </button>
                                                    </div>
                                                    {showRezervacije && (
                                                        <>
                                                            {event.reserved_items.length > 0 ? (
                                                                <ul className={styled["ul"]}>
                                                                    {event.reserved_items.map((rezervacija) => (
                                                                        <li
                                                                            key={rezervacija.id}
                                                                            className={styled["userItem"]}
                                                                        >
                                                                            <label>{rezervacija.resurs.naziv}</label>

                                                                            <select
                                                                                className={styled["selekt"]}
                                                                                value={rezervacija.kolicina}
                                                                                onChange={(e) => {
                                                                                    handleResursChange();
                                                                                }}
                                                                                key={rezervacija.id}
                                                                            >
                                                                                {Array.from(
                                                                                    {
                                                                                        length: calculateTotalLength(
                                                                                            rezervacija,
                                                                                            index
                                                                                        ),
                                                                                    },
                                                                                    (_, index) => (
                                                                                        <option
                                                                                            key={index}
                                                                                            value={index + 1}
                                                                                            defaultValue={
                                                                                                index + 1 === rezervacija.kolicina
                                                                                                    ? true
                                                                                                    : undefined
                                                                                            }
                                                                                        >
                                                                                            {index + 1}
                                                                                        </option>
                                                                                    )
                                                                                )}
                                                                            </select>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p style={{ color: "red" }}>No reservations!</p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        )}
                        <button className={styled.submit} onClick={handleSave()}>Save</button>
    
                        {/*<p className={styled.error} style={{ textAlign: "center" }}>{errorEmail !== null && errorEmail}</p>*/}
                        {/*<p className={styled.error} style={{ textAlign: "center" }}>{errorPass !== null && errorPass}</p>*/}
                    </form>
                </div>
                <ToastContainer />
            </div>
        )
    }
    
    export default EditConference;
