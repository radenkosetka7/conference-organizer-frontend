import {updateConference} from "../../redux-store/conferenceSlice";
import {updateEvent} from "../../redux-store/eventSlice";
import {getEventTypes, updateReservedItem} from "../../redux-store/utilSlice";
import classes from "./EditConference.module.css";
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Modal from '../Modal/Modal'
import {getStaffUser} from "../../redux-store/userSlice";

const EditConference = (props) => {
    const konferencija = props.conference;
    const events = konferencija.events;
    const user = useSelector((state) => state.users);

    const [expandedDogadjajId, setExpandedDogadjajId] = useState(null);
    const [expandedResursId, setExpandedResursId] = useState(null);
    const {onClose} = props;
    const [imeKonferencije, setImeKonferencije] = useState(konferencija.name);
    const [startTimeKonferencije, setStartTimeKonferencije] = useState(
        konferencija.start
    );
    const [showInnerModal, setShowInnerModal] = useState(false);
    const [endTimeKonferencija, setEndTimeKonferencija] = useState(
        konferencija.end
    );
    const [urlKonferencije, setUrlKonferencije] = useState(konferencija.url);

    const [showDogadjaje, setShowDogadjaje] = useState(false);
    const [showRezervacije, setShowRezervacije] = useState(false);
    // const [showDogadjaj, setShowDogadjaj] = useState(false);
    const [showMess, setShowMess] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessRez, setShowMessRez] = useState(false);
    const [messageRez, setMessageRez] = useState("");
    const [showMessKonf, setShowMessKonf] = useState(false);
    const [messageKonf, setMessageKonf] = useState("");

    const [showErrorMess, setShowErrorMess] = useState(false);

    //ostane broj lokacija trebala bih ovde citati iz baze ispocetka svaki put
    const lokacije = useSelector((state) => state.utils.locations);
    const moderatori = useSelector((state) => state.users.staffs);
    const tipovi_dogadjaja = useSelector(
        (state) => state.utils.eventTypes
    );

    const [moderatorDOgadjaja, setModeratorDOgadjaja] = useState("");
    const [tipDogadjaja, setTipDogadjaja] = useState("");
    const [urlDogadjaja, setUrlDOgadjaja] = useState("");
    const [krajDogadjaja, setKrajDogadjaja] = useState("");
    const [startDogadjaja, setStartDogadjaja] = useState("");
    const [imeDogadjaja, setImeDogadjaja] = useState("");
    const dispatch = useDispatch();
    const [selectedKolicina, setSelectedKolicina] = useState(0);
    const [rezervacijaId,setRezervacijaId]=useState(null);


    useEffect(()=>{
        dispatch(getEventTypes({}));
        dispatch(getStaffUser());
    },[]);
    useEffect(() => {
        console.log("expanded dogadjaj ", expandedDogadjajId);
        if (expandedDogadjajId !== null) {
            const dogadjaj = events.find((dog) => dog.id === expandedDogadjajId);
            console.log("dogadjaj", dogadjaj);
            const tip1 = parseInt(dogadjaj.event_type.id, 10);
            setTipDogadjaja(tip1);
            const moderator1 = parseInt(dogadjaj.moderator.id, 10);
            setModeratorDOgadjaja(moderator1);
            setImeDogadjaja(dogadjaj.name);
            setStartDogadjaja(dogadjaj.start);
            setKrajDogadjaja(dogadjaj.end);
            setUrlDOgadjaja(dogadjaj.url);
        }
    }, [lokacije, moderatori, tipovi_dogadjaja, expandedDogadjajId, events]);
    const handleUrlDOgadjajaChanged = (value) => {
        setUrlDOgadjaja(value);
    };

    const handleSpremiDogadjaj = () => {
        console.log("startDogadjaja", startDogadjaja);
        console.log("krajDogadjaja", krajDogadjaja);
        console.log("imeDogadjaja", imeDogadjaja);
        console.log("urlDOgadjaja", urlDogadjaja);
        console.log("id konf", konferencija.id);
        console.log("tip dogadjaja", tipDogadjaja);
        console.log("lokacija konf", konferencija.location);
        console.log("moderator dogadjaja", moderatorDOgadjaja);

        const dogadjaj = {
            start: startDogadjaja,
            end: krajDogadjaja,
            name: imeDogadjaja,
            url: urlDogadjaja,
            conference: konferencija.id,
            event_type: tipDogadjaja,
            moderator: moderatorDOgadjaja,
        };

        // setNizDOgadjaja((prevNiz) => [...prevNiz, noviDogadjaj]);

        console.log("dokadjaj Za bekend", dogadjaj);
        console.log("idDOgadjaja", expandedDogadjajId);

        dispatch(
            updateEvent({
                id: expandedDogadjajId,
                value: dogadjaj,
            })
        )
            .then((response) => {
                console.log("response dogadjaja", response);
                console.log("spremi dogadjaj");
                setShowMess(true);
                setMessage("Uspješno ste sačuvali izmjene!");
                console.log(" setShowMess", showMess);
                //treba vidjeti payload.status==200

                const timer = setTimeout(() => {
                    setShowMess(false);
                    setMessage("");
                    setExpandedDogadjajId(null);
                }, 1000);
            })
            .catch((error) => {
            });

        // setShowDogadjaj(false); ovo mozdaaa treba
        // setExpandedDogadjajId(null);
    };

    const handleSpremiResurs = () => {
        console.log("kolicina", selectedKolicina);
        console.log("dogadjajId", expandedDogadjajId);
        console.log("resursId", expandedResursId);

        const rezervacijaRequest = {
            quantity: selectedKolicina,
            event: expandedDogadjajId,
            resource_item: expandedResursId,
        };
        console.log("resurs Za bekend", rezervacijaRequest);
        console.log("sta je rezervacija id za backend", rezervacijaId);
        dispatch(
            updateReservedItem({
                id: rezervacijaId,
                value: rezervacijaRequest,
            })
        )
            .then((response) => {
                setShowMessRez(true);
                setMessageRez("Uspješno ste sačuvali izmjene!");
                //treba vidjeti payload.status==200

                const timer = setTimeout(() => {
                    setShowMessRez(false);
                    setMessageRez("");
                    setExpandedResursId(null);
                }, 1000);
            })
            .catch((error) => {
            });
        // setExpandedResursId(null);
    };
    const handleModalDOgadjaj = (dogadjajId) => {
        console.log("otvori ");
        setExpandedDogadjajId(dogadjajId);
    };

    const handleModalResurs = (resursId, dogadjajId,rezervacijaNum) => {
        setExpandedResursId(resursId);
        setExpandedDogadjajId(dogadjajId);
        setRezervacijaId(rezervacijaNum);
        console.log("rezervacijaId ", resursId);
        console.log("dogadjajId ", dogadjajId);
    };

    const handleCloseResursModal = () => {
        setExpandedResursId(null);
        //setExpandedDogadjajId(null);
    };

    const handleOdustaniOdDogadjaja = (e) => {
        e.preventDefault();
        setExpandedDogadjajId(null);
    };

    const handleImeDogadjajaChanged = (value) => {
        setImeDogadjaja(value);
    };

    const handleDogadjaji = (e) => {
        e.preventDefault();
        setShowDogadjaje(!showDogadjaje);
        // setShowInnerModal(true);
        console.log("show inner", showInnerModal);
    };
    const handleRezervacije = (e) => {
        e.preventDefault();
        setShowRezervacije(!showRezervacije);
    };

    const handleImeChanged = (e) => {
        setImeKonferencije(e.target.value);
    };

    const handleStartTimeChanged = (e) => {
        setStartTimeKonferencije(e.target.value);
    };

    const handleEndTimeChanged = (e) => {
        setEndTimeKonferencija(e.target.value);
    };

    const handleUrlChanged = (e) => {
        setUrlKonferencije(e.target.value);
    };

    const handleModeratorChange = (e) => {
        const moderator1 = parseInt(e.target.value, 10);
        setModeratorDOgadjaja(moderator1);
    };
    const handleTipDOgadjajaChanged = (e) => {
        const tip1 = parseInt(e.target.value, 10);
        setTipDogadjaja(tip1);
    };
    const handleKrajDOgadjajaChanged = (e) => {
        setKrajDogadjaja(e.target.value);
    };
    const handleStartDOgadjajaChanged = (e) => {
        setStartDogadjaja(e.target.value);
    };

    const handleSave = () => {
        console.log("startTimeKonferencije", startTimeKonferencije);
        console.log("endTimeKonferencija", endTimeKonferencija);
        console.log("imeKonferencije", imeKonferencije);
        console.log("urlKonferencije", urlKonferencije);

        const konferencijaRequest = {
            start: startTimeKonferencije,
            end: endTimeKonferencija,
            name: imeKonferencije,
            url: urlKonferencije,
        };

        console.log("id konf", konferencija.id);
        console.log("konferencija Za bekend", konferencijaRequest);
        console.log("id konferencijeeee", konferencija.id);

        dispatch(
            updateConference({
                id: konferencija.id,
                value: konferencijaRequest,
            })
        )
            .then((response) => {
                console.log("rezultat konferencije", response);
                setShowMessKonf(true);
                setMessageKonf("Uspješno ste sačuvali izmjene!");
                console.log(" setShowMess", showMess);
                //treba vidjeti payload.status==200

                const timer = setTimeout(() => {
                    setShowMessKonf(false);
                    setMessageKonf("");
                    onClose();
                    props.onSave();
                }, 1000);
            })
            .catch((error) => {
            });
        // setExpandedResursId(null); onCLose()????
        console.log("pozvace se funkcije");
        /* onClose();
        props.onSave();*/
    };

    return (
        <Modal>
            <div className={`${classes.userDetailsContainer} ${classes.scrollable}`}>
                <h2 className={classes.naslov}>Edit {konferencija.name}</h2>
                {showErrorMess && <p>You have not made any changes!</p>}

                <div className={classes.konfDetails}>
                    <div className={classes.formRow}>
                        <div className={classes.formLabelIme}>
                            <label>
                                <strong style={{fontSize:"16px"}}>Name:</strong>
                            </label>
                        </div>
                        <div>
                            <input
                                className={classes.formInputIme}
                                value={imeKonferencije}
                                onChange={handleImeChanged}
                                type="text"
                                id="ime"
                                name="ime"
                            />
                        </div>
                    </div>

                    <div className={classes.formRow}>
                        <div className={classes.formLabelIme}>
                            <label>
                                <strong style={{fontSize:"16px"}}>Start:</strong>
                            </label>
                        </div>
                        <div>
                            <input
                                className={classes.formInputIme}
                                value={startTimeKonferencije}
                                onChange={handleStartTimeChanged}
                                type="datetime-local"
                                id="startTime"
                                name="startTime"
                            />
                        </div>
                    </div>
                    <div className={classes.formRow}>
                        <div className={classes.formLabelIme}>
                            <label>
                                <strong style={{fontSize:"16px"}}>End:</strong>
                            </label>
                        </div>
                        <div>
                            <input
                                className={classes.formInputIme}
                                value={endTimeKonferencija}
                                onChange={handleEndTimeChanged}
                                type="datetime-local"
                                id="endTime"
                                name="endTime"
                            />
                        </div>
                    </div>

                    {konferencija.url && (
                        <div className={classes.formRow}>
                            <div className={classes.formLabelIme}>
                                <label>
                                    <strong style={{fontSize:"16px"}}>Url:</strong>
                                </label>
                            </div>
                            <div>
                                <input
                                    className={classes.formInputIme}
                                    value={urlKonferencije}
                                    onChange={handleUrlChanged}
                                    type="text"
                                    id="url"
                                    name="url"
                                />
                            </div>
                        </div>
                    )}

                    <div className={classes.dogadjajiHeader}>
                        <span>Events </span>
                        <button className={classes.plusButton} onClick={handleDogadjaji}>
                            {showDogadjaje ? "-" : "+"}
                        </button>
                    </div>
                    {showDogadjaje && (
                        <ul className={classes.zaUl}>
                            {events.length > 0 &&
                                events.map((dogadjaj) => (
                                    <li>
                                        <div className={classes.dogadjajiHeader}>
                                            <span>{dogadjaj.name}</span>
                                            <button
                                                className={classes.plusButton}
                                                onClick={() => handleModalDOgadjaj(dogadjaj.id)} // Dodajte onClick događaj za otvaranje moda
                                            >
                                                {expandedDogadjajId === dogadjaj.id ? "-" : "+"}
                                            </button>
                                        </div>
                                        {expandedDogadjajId === dogadjaj.id && (
                                            <Modal>
                                                <div
                                                    className={`${classes.userDetailsContainer} ${classes.scrollable}`}
                                                >
                                                    <div className={classes.konfDetails}>
                                                        <div className={classes.formRow}>
                                                            <div className={classes.formLabelIme}>
                                                                <label>
                                                                    <strong style={{fontSize:"16px"}}>Name:</strong>
                                                                </label>
                                                            </div>

                                                            <div>
                                                                <input
                                                                    className={classes.formInputIme}
                                                                    value={imeDogadjaja}
                                                                    onChange={(e) =>
                                                                        handleImeDogadjajaChanged(e.target.value)
                                                                    }
                                                                    type="text"
                                                                    id="imeDOgadjaja"
                                                                    name="imeDOgadjaja"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className={classes.formRow}>
                                                            <div className={classes.formLabelIme}>
                                                                <label>
                                                                    <strong style={{fontSize:"16px"}}>Start:</strong>
                                                                </label>
                                                            </div>

                                                            <div>
                                                                <input
                                                                    className={classes.formInputIme}
                                                                    value={startDogadjaja}
                                                                    onChange={handleStartDOgadjajaChanged}
                                                                    type="datetime-local"
                                                                    id="startDogadjaja"
                                                                    name="startDogadjaja"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={classes.formRow}>
                                                            <div className={classes.formLabelIme}>
                                                                <label>
                                                                    <strong style={{fontSize:"16px"}}>End:</strong>
                                                                </label>
                                                            </div>


                                                            <input
                                                                className={classes.formInputIme}
                                                                value={krajDogadjaja}
                                                                onChange={handleKrajDOgadjajaChanged}
                                                                type="datetime-local"
                                                                id="krajDogadjaja"
                                                                name="krajDogadjaja"
                                                            />
                                                        </div>
                                                        <div>
                                                            {dogadjaj.url && (
                                                                <div>
                                                                    <div className={classes.formRow}>
                                                                        <div className={classes.formLabelIme}>
                                                                            <label>
                                                                                <strong style={{fontSize:"16px"}}>Url:</strong>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <input
                                                                            className={classes.formInputIme}
                                                                            value={urlDogadjaja}
                                                                            onChange={(e) =>
                                                                                handleUrlDOgadjajaChanged(
                                                                                    e.target.value
                                                                                )
                                                                            }
                                                                            type="text"
                                                                            id="urlDogadjaja"
                                                                            name="urlDogadjaja"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className={classes.formRowM}>
                                                            <div className={classes.formselectLabel}>
                                                                <label>
                                                                    <strong style={{fontSize:"16px"}}>Moderator:</strong>
                                                                </label>
                                                            </div>
                                                            <div className={classes.formInputIme}>
                                                                <select
                                                                    className={classes.selekt}
                                                                    onChange={handleModeratorChange}
                                                                >
                                                                    {moderatori.map((moderator) => (
                                                                        <option
                                                                            key={moderator.id}
                                                                            value={moderator.id}
                                                                        >
                                                                            {moderator.first_name} {moderator.last_name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className={classes.formRowM}>
                                                            <div className={classes.formselectLabel}>
                                                                <label>
                                                                    <strong style={{fontSize:"16px"}}>Event type:</strong>
                                                                </label>
                                                            </div>
                                                            <div className={classes.formInputIme}>
                                                                <select
                                                                    className={classes.selekt}
                                                                    onChange={handleTipDOgadjajaChanged}
                                                                >
                                                                    {tipovi_dogadjaja.map((tip) => (
                                                                        <option key={tip.id} value={tip.id}>
                                                                            {tip.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className={classes.dogadjajiHeader}>
                                                            <span>Reservations </span>
                                                            <button
                                                                className={classes.plusButton}
                                                                onClick={handleRezervacije}
                                                            >
                                                                {showRezervacije ? "-" : "+"}
                                                            </button>
                                                        </div>

                                                        {showRezervacije &&
                                                            expandedDogadjajId === dogadjaj.id && (
                                                                <>
                                                                    {dogadjaj.reserved_items.length > 0 ? (
                                                                        <ul
                                                                            className={`${classes.zaUlResursa} ${
                                                                                expandedResursId ? classes.pom : ""
                                                                            }`}
                                                                        >
                                                                            {dogadjaj.reserved_items.map(
                                                                                (rezervacija) => (
                                                                                    <li key={rezervacija.id}>
                                                                                        <div
                                                                                            className={
                                                                                                classes.dogadjajiHeader
                                                                                            }
                                                                                        >
                                              <span>
                                                {rezervacija.resource_item.name}
                                              </span>
                                                                                            <button
                                                                                                className={classes.plusButton}
                                                                                                onClick={() =>
                                                                                                    handleModalResurs(
                                                                                                        rezervacija.resource_item.id,
                                                                                                        dogadjaj.id,
                                                                                                        rezervacija.id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {expandedResursId ===
                                                                                                rezervacija.resource_item.id
                                                                                                    ? "-"
                                                                                                    : "+"}
                                                                                            </button>
                                                                                        </div>

                                                                                        {expandedResursId ===
                                                                                            rezervacija.resource_item.id && (
                                                                                                <Modal
                                                                                                    resurs={expandedResursId}>
                                                                                                    {/* Sadržaj moda za prikaz rezervacije */}
                                                                                                    <div
                                                                                                        className={
                                                                                                            classes.userResursContainer
                                                                                                        }
                                                                                                    >
                                                                                                        <h3>Reservation
                                                                                                            details</h3>
                                                                                                        <div
                                                                                                            className={
                                                                                                                classes.prezervacija
                                                                                                            }
                                                                                                        >
                                                                                                            <p>
                                                                                                                Resource:{" "}
                                                                                                                {rezervacija.resource_item.name}
                                                                                                            </p>
                                                                                                            <p>
                                                                                                                Quantity:{" "}
                                                                                                                {rezervacija.quantity}
                                                                                                            </p>
                                                                                                        </div>

                                                                                                        <div
                                                                                                            className={
                                                                                                                classes.divZaKolicinu
                                                                                                            }
                                                                                                        >
                                                                                                            <div>
                                                                                                                <label>
                                                                                                                    <strong style={{fontSize:"16px"}}>
                                                                                                                        New
                                                                                                                        quantity
                                                                                                                        :
                                                                                                                    </strong>
                                                                                                                </label>
                                                                                                            </div>

                                                                                                            <div
                                                                                                                className={
                                                                                                                    classes.formInputIme
                                                                                                                }
                                                                                                            >
                                                                                                                <select
                                                                                                                    value={
                                                                                                                        selectedKolicina ||
                                                                                                                        rezervacija.quantity
                                                                                                                    }
                                                                                                                    onChange={(e) => {
                                                                                                                        setSelectedKolicina(
                                                                                                                            parseInt(
                                                                                                                                e.target.value
                                                                                                                            )
                                                                                                                        );
                                                                                                                        // Obrada promene vrednosti selekcije...
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {Array.from(
                                                                                                                        {
                                                                                                                            length:
                                                                                                                            rezervacija.resource_item
                                                                                                                                .number,
                                                                                                                        },
                                                                                                                        (_, index) => (
                                                                                                                            <option
                                                                                                                                key={index + 1}
                                                                                                                                value={index + 1}
                                                                                                                            >
                                                                                                                                {index + 1}
                                                                                                                            </option>
                                                                                                                        )
                                                                                                                    )}
                                                                                                                </select>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        {showMessRez && (
                                                                                                            <diV>
                                                                                                                <p
                                                                                                                    className={classes.mess}
                                                                                                                >
                                                                                                                    {messageRez}
                                                                                                                </p>
                                                                                                            </diV>
                                                                                                        )}
                                                                                                        <div
                                                                                                            className={
                                                                                                                classes.buttonDOgadjaji
                                                                                                            }
                                                                                                        >
                                                                                                            <button
                                                                                                                className={
                                                                                                                    classes.buttonD
                                                                                                                }
                                                                                                                onClick={
                                                                                                                    handleSpremiResurs
                                                                                                                }
                                                                                                            >
                                                                                                                Save
                                                                                                            </button>
                                                                                                            <button
                                                                                                                className={
                                                                                                                    classes.buttonD
                                                                                                                }
                                                                                                                onClick={
                                                                                                                    handleCloseResursModal
                                                                                                                }
                                                                                                            >
                                                                                                                Cancel
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Modal>
                                                                                            )}
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                        </ul>
                                                                    ) : (
                                                                        <p>
                                                                            There are no reservations available for this
                                                                            one
                                                                            an event.

                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                        {showMess && (
                                                            <diV>
                                                                <p className={classes.mess}>{message}</p>
                                                            </diV>
                                                        )}

                                                        <div className={classes.buttonDOgadjaji}>
                                                            <button
                                                                className={classes.buttonD}
                                                                onClick={handleSpremiDogadjaj}
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                className={classes.buttonD}
                                                                onClick={handleOdustaniOdDogadjaja}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                {showMessKonf && (
                    <diV>
                        <p className={classes.mess}>{messageKonf}</p>
                    </diV>
                )}
                <div className={classes.buttonDOgadjaji}>
                    <button className={classes.buttonD} onClick={handleSave}>
                        Save
                    </button>
                    <button className={classes.buttonD} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditConference;