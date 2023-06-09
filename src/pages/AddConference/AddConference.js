import classes from "./AddConference.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createReservedItem, getLocations,getEventTypes} from "../../redux-store/utilSlice";
import {createEvent} from "../../redux-store/eventSlice";
import {createConference} from "../../redux-store/conferenceSlice";
import {getStaffUser} from "../../redux-store/userSlice";
import Modal from "../Modal/Modal";

const AddConference = (props) => {
    const [nizDOgadjaja, setNizDOgadjaja] = useState([]);
    const [nizResursa, setNizResursa] = useState([]);
    const [resursSacuvan, setResursSacuvan] = useState(false);
    const [dogadjajSacuvan, setDogadjajSacuvan] = useState(false);

    const [dogadjajIsOnline, setDogadjajIsOnline] = useState(false);
    const [lokacijuPrikazi, setLokacijuPrikazi] = useState(false);
    const [kolicinaResursa, setKolicinaResursa] = useState(0);

    const { onClose } = props;
    const [imeKonferencije, setImeKonferencije] = useState("");
    const [startTimeKonferencije, setStartTimeKonferencije] = useState("");
    const [endTimeKonferencija, setEndTimeKonferencija] = useState("");
    const [urlKonferencije, setUrlKonferencije] = useState("");
    const [urlKonfChecked, setUrlKonfChecked] = useState(false);
    const [lokacijaKonferencije, setLokacijaKonferencije] = useState("");
    const [lokacijaKonfChecked, setLokacijaKonfChecked] = useState(false);
    const [showDogadjaje, setShowDogadjaje] = useState(false);
    const [showResurse, setShowResurse] = useState(false);

    const [showErrorMess, setShowErrorMess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessZaResurs, setShowErrorMessZaResurs] = useState(false);

    const lokacije = useSelector((state) => state.utils.locations);
    const moderatori = useSelector((state) => state.users.staffs);
    const tipovi_dogadjaja = useSelector(
        (state) => state.utils.eventTypes
    );
    const [selectedLocation, setSelectedLocation] = useState({});
    const [imeDOgadjaja, setImeDogadjaja] = useState("");
    const [startTimeDogadjaja, setStartTimeDogadjaja] = useState("");
    const [endTimeDogadjaja, setEndTimeDogadjaja] = useState("");
    const [urlDogadjaja, setUrlDogadjaja] = useState("");
    const [sobaDogadjaja, setSobaDogadjaja] = useState("");
    const [resursDogadjaja, setResursDOgadjaja] = useState("");

    const [moderatorDOgadjaja, setModeratorDOgadjaja] = useState("");
    const [tipDogadjaja, tsetTipDogadjaja] = useState("");
    const dispatch = useDispatch();


    useEffect(() =>{
        dispatch(getStaffUser());
        dispatch(getLocations({}));
        dispatch(getEventTypes({}));
    },[]);
    useEffect(() => {
        console.log("resurs iz use effect", resursDogadjaja);
    }, [
        lokacije,
        resursDogadjaja,
        moderatori,
        tipovi_dogadjaja,
        lokacijaKonferencije,
    ]);
    const handleDogadjaji = (e) => {
        e.preventDefault();
        if (lokacijaKonfChecked || urlKonfChecked) {
            if (lokacijaKonferencije === "" && urlKonferencije === "") {
                setShowErrorMess(true);
                setShowDogadjaje(false);
            } else {
                setShowErrorMess(false);
                setShowDogadjaje(!showDogadjaje);
            }
        } else {
            setShowErrorMess(true);
            if (showDogadjaje) {
                setShowDogadjaje(false);
            }
        }
    };

    const handleSpremiResurs = (e) => {
        if (resursDogadjaja === "" || kolicinaResursa === "") {
            console.log("nisi dodao resurs");
            setShowErrorMessZaResurs(true);
            setErrorMessage("Choose resource!");
            const timer = setTimeout(() => {
                setShowErrorMessZaResurs(false);
                setErrorMessage("");
            }, 1000);
        } else {
            const noviResurs = {
                quantity: kolicinaResursa,
                event: "",
                resource_item: resursDogadjaja,
            };
            console.log("resurssss", noviResurs);
            setNizResursa((prevNiz) => [...prevNiz, noviResurs]);
            setResursDOgadjaja("");
            setKolicinaResursa(0);
            setShowErrorMessZaResurs(false);
            setErrorMessage("");
            setShowResurse(false);
            setResursSacuvan(true);
        }
    };
    const handleResurskolicinaChanged = (e) => {
        console.log("kolicina", e.target.value);
        setKolicinaResursa(e.target.value);
    };

    const hadnleResursi = (e) => {
        e.preventDefault();

        setShowResurse(!showResurse);
    };
    const handleImeChanged = (e) => {
        setImeKonferencije(e.target.value);
    };
    const handleImeDOgadjaja = (e) => {
        setImeDogadjaja(e.target.value);
    };

    const handleStartTimeChanged = (e) => {
        setStartTimeKonferencije(e.target.value);
    };
    const handleStartTimeDogadjaja = (e) => {
        setStartTimeDogadjaja(e.target.value);
    };

    const handleEndTimeChanged = (e) => {
        setEndTimeKonferencija(e.target.value);
    };
    const handleEndTimeDogadjaja = (e) => {
        setEndTimeDogadjaja(e.target.value);
    };

    const handleUrlChanged = (e) => {
        setUrlKonferencije(e.target.value);
        setLokacijaKonferencije("");
    };
    const handleUrlDOgadjaja = (e) => {
        setUrlDogadjaja(e.target.value);
    };

    const handleLokacijaChanged = (e) => {
        const selectedLocationId = e.target.value;
        setLokacijaKonferencije(selectedLocationId);
        setUrlKonferencije("");

        const selectedLocationId2 = parseInt(e.target.value, 10); // Pretvori u numerički tip
        setLokacijaKonferencije(selectedLocationId2);

        const selectedLocation1 = lokacije.find(
            (lokacija) => lokacija.id === selectedLocationId2
        );
        setSelectedLocation(selectedLocation1);
        console.log("selectedLocation", selectedLocation);
        console.log("resursi na lokaciji", selectedLocation.resurs);

        setUrlKonferencije("");
    };
    const handleSObaChanged = (e) => {
        const selectedSoba2 = parseInt(e.target.value, 10);
        setSobaDogadjaja(selectedSoba2);
    };
    const handleResursChanged = (e) => {
        const selectedSoba2 = parseInt(e.target.value, 10);
        setResursDOgadjaja(selectedSoba2);
        console.log("resurs", resursDogadjaja);
        setKolicinaResursa("");
    };

    const handleModeratorChanged = (e) => {
        const moder2 = parseInt(e.target.value, 10);
        setModeratorDOgadjaja(moder2);
    };
    const handleTipDogadjajaCHnaged = (e) => {
        const tip2 = parseInt(e.target.value, 10);
        tsetTipDogadjaja(tip2);
    };

    const handleUrlCheckboxChanged = () => {
        setUrlKonfChecked(!urlKonfChecked);
        setLokacijaKonfChecked(false);
    };
    const handleOdustani = () => {
        setImeDogadjaja("");
        setStartTimeDogadjaja("");
        setEndTimeDogadjaja("");
        setUrlDogadjaja("");
        setSobaDogadjaja("");
        setModeratorDOgadjaja("");
        tsetTipDogadjaja("");
        setShowDogadjaje(false);
    };

    const handleLokacijaCheckboxChanged = () => {
        setLokacijaKonfChecked(!lokacijaKonfChecked);
        setUrlKonfChecked(false);
    };
    const handleSpremiDogadjaj = () => {
        if (
            (lokacijaKonfChecked === true && resursSacuvan === false) ||
            imeDOgadjaja === "" ||
            startTimeDogadjaja === "" ||
            endTimeDogadjaja === "" ||
            moderatorDOgadjaja === "" ||
            (tipDogadjaja === "" && (sobaDogadjaja === "" || urlDogadjaja === ""))
        ) {
            console.log("niste odabrali sve");
            setShowErrorMessZaResurs(true);
            setErrorMessage("Fill in all fields!");
            const timer = setTimeout(() => {
                setShowErrorMessZaResurs(false);
                setErrorMessage("");
            }, 1000);
        } else {
            const noviDogadjaj = {
                start: startTimeDogadjaja,
                end: endTimeDogadjaja,
                name: imeDOgadjaja,
                url: urlDogadjaja,
                conference: "",
                event_type: tipDogadjaja,
                location: lokacijaKonferencije,
                room: sobaDogadjaja,
                moderator: moderatorDOgadjaja,
                resursi: nizResursa,
            };
            if (urlDogadjaja === "") {
                setDogadjajIsOnline(false);
                setLokacijuPrikazi(true);
            } else {
                setDogadjajIsOnline(true);
                setLokacijuPrikazi(false);
            }

            setNizDOgadjaja((prevNiz) => [...prevNiz, noviDogadjaj]);
            setNizResursa([]);

            setImeDogadjaja("");
            setStartTimeDogadjaja("");
            setEndTimeDogadjaja("");
            setUrlDogadjaja("");
            setSobaDogadjaja("");
            setModeratorDOgadjaja("");
            setDogadjajSacuvan(true);
            tsetTipDogadjaja("");
            setShowDogadjaje(false);
        }
    };
    const handleSave = async () => {
        if (
            imeKonferencije === "" ||
            startTimeKonferencije === "" ||
            endTimeKonferencija === "" ||
            dogadjajSacuvan === false ||
            (lokacijaKonfChecked === true && resursSacuvan === false)
        ) {
            console.log("nistaa");
            setShowErrorMessZaResurs(true);
            setErrorMessage("Fill in all fields!");
            const timer = setTimeout(() => {
                setShowErrorMessZaResurs(false);
                setErrorMessage("");
            }, 1000);
        } else {
            const konferencijaRequest = {
                name: imeKonferencije,
                start: startTimeKonferencije,
                end: endTimeKonferencija,
                url: urlKonferencije,
                location: lokacijaKonferencije,
            };
            console.log("nizDOgadjaja", nizDOgadjaja);
            const noviNiz = nizDOgadjaja.map(
                ({ resursi, ...ostaliAtributi }) => ostaliAtributi
            );
            console.log("noviNiz", noviNiz);
            const conf = await dispatch(
                createConference({
                    value: konferencijaRequest,
                })
            );
            console.log("id konferencije", conf.payload.id);
            for (let dogadjaj of noviNiz) {
                dogadjaj.conference = conf.payload.id;
            }
            for (let i = 0; i < noviNiz.length; i++) {
                const dogadjajRequest = noviNiz[i];
                console.log("dogadjaj jedan po jedan", dogadjajRequest);
                const responseDog = await dispatch(
                    createEvent({
                        value: dogadjajRequest,
                    })
                );
                console.log("dogadjaj ID", responseDog.payload.id);
                for (let resurs of nizDOgadjaja[i].resursi) {
                    console.log("ovo citaaaj", responseDog);
                    resurs.event = responseDog.payload.id;
                }
                for (let resurs of nizDOgadjaja[i].resursi) {
                    console.log("resurs za dispetch", resurs);
                    const resursODG = await dispatch(
                        createReservedItem({
                            value: resurs,
                        })
                    );
                    console.log("resurs response", resursODG);
                }
            }
            onClose();
            props.onSave();
        }

    };

    return (
        <Modal>
            <div className={`${classes.userDetailsContainer} ${classes.scrollable}`}>
                <h2>New conference</h2>
                {showErrorMess && (
                    <p style={{ color: "red" }}>
                        Mark url or conference location!
                    </p>
                )}
                <div className={classes.konfDetails}>
                    <div className={classes.formRow}>
                        <div className={classes.formLabelIme}>
                            <label>
                                <strong style={{fontSize:"16px"}}>Name:</strong>
                            </label>
                        </div>
                        <div className={classes.formInputIme}>
                            <input
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
                        <div className={classes.formInputIme}>
                            <input
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
                        <div className={classes.formInputIme}>
                            <input
                                value={endTimeKonferencija}
                                onChange={handleEndTimeChanged}
                                type="datetime-local"
                                id="endTime"
                                name="endTime"
                            />
                        </div>
                    </div>

                    {!lokacijuPrikazi && (
                        <div className={classes.formRow}>
                            <div className={classes.formLabelChecked}>
                                <label>
                                    <strong style={{fontSize:"16px"}}>Url</strong>
                                </label>
                            </div>
                            <div className={classes.formChecked}>
                                <input
                                    checked={urlKonfChecked}
                                    onChange={handleUrlCheckboxChanged}
                                    type="checkbox"
                                    id="url"
                                    name="url"
                                />
                            </div>
                        </div>
                    )}
                    {urlKonfChecked && (
                        <div className={classes.formRow}>
                            <div className={classes.formLabelIme}>
                                <label>
                                    <strong style={{fontSize:"16px"}}>URL:</strong>
                                </label>
                            </div>
                            <div className={classes.formInputIme}>
                                <input
                                    value={urlKonferencije}
                                    onChange={handleUrlChanged}
                                    type="text"
                                    id="url"
                                    name="url"
                                />
                            </div>
                        </div>
                    )}
                    {!dogadjajIsOnline && (
                        <div className={classes.formRow}>
                            <div className={classes.formLabelChecked}>
                                <label>
                                    <strong style={{fontSize:"16px"}}>Location:</strong>
                                </label>
                            </div>
                            <div className={classes.formChecked}>
                                <input
                                    checked={lokacijaKonfChecked}
                                    onChange={handleLokacijaCheckboxChanged}
                                    type="checkbox"
                                    id="lokacija"
                                    name="lokacija"
                                />
                            </div>
                        </div>
                    )}
                    {lokacijaKonfChecked && !lokacijuPrikazi && (
                        <div className={classes.formRow}>
                            <div className={classes.formLabelChecked}>
                                <label>
                                    <strong style={{fontSize:"16px"}}>Location:</strong>
                                </label>
                            </div>
                            <div className={classes.formInputIme}>
                                <select
                                    value={lokacijaKonferencije}
                                    onChange={handleLokacijaChanged}
                                    id="lokacija"
                                    name="lokacija"
                                >
                                    <option value="">Choose location</option>
                                    {lokacije.map((lokacija) => (
                                        <option key={lokacija.id} value={lokacija.id}>
                                            {lokacija.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className={classes.dogadjajiHeader}>
                        <span>Dogadjaji </span>
                        <button className={classes.plusButton} onClick={handleDogadjaji}>
                            {showDogadjaje ? "-" : "+"}
                        </button>
                    </div>

                    {showDogadjaje && (
                        <div className={classes.dogKonf}>
                            <div className={classes.formRow}>
                                <div className={classes.formLabelIme}>
                                    <label>
                                        <strong style={{fontSize:"16px"}}>Name:</strong>
                                    </label>
                                </div>
                                <div className={classes.formInputIme}>
                                    <input
                                        value={imeDOgadjaja}
                                        onChange={handleImeDOgadjaja}
                                        type="text"
                                        id="imeD"
                                        name="imeD"
                                    />
                                </div>
                            </div>

                            <div className={classes.formRow}>
                                <div className={classes.formLabelIme}>
                                    <label>
                                        <strong style={{fontSize:"16px"}}>Start:</strong>
                                    </label>
                                </div>
                                <div className={classes.formInputIme}>
                                    <input
                                        value={startTimeDogadjaja}
                                        onChange={handleStartTimeDogadjaja}
                                        type="datetime-local"
                                        id="startTimeD"
                                        name="startTimeD"
                                    />
                                </div>
                            </div>
                            <div className={classes.formRow}>
                                <div className={classes.formLabelIme}>
                                    <label>
                                        <strong style={{fontSize:"16px"}}>End:</strong>
                                    </label>
                                </div>
                                <div className={classes.formInputIme}>
                                    <input
                                        value={endTimeDogadjaja}
                                        onChange={handleEndTimeDogadjaja}
                                        type="datetime-local"
                                        id="endTimeD"
                                        name="endTimeD"
                                    />
                                </div>
                            </div>
                            {urlKonfChecked && (
                                <div className={classes.formRow}>
                                    <div className={classes.formLabelIme}>
                                        <label>
                                            <strong style={{fontSize:"16px"}}>URL:</strong>
                                        </label>
                                    </div>
                                    <div className={classes.formInputIme}>
                                        <input
                                            value={urlDogadjaja}
                                            onChange={handleUrlDOgadjaja}
                                            type="text"
                                            id="urlD"
                                            name="urlD"
                                        />
                                    </div>
                                </div>
                            )}

                            {lokacijaKonfChecked && (
                                <div className={classes.formRow}>
                                    <div className={classes.formselectLabel}>
                                        <label>
                                            <strong style={{fontSize:"16px"}}>Room:</strong>
                                        </label>
                                    </div>
                                    <div className={classes.formSoba}>
                                        <select
                                            value={sobaDogadjaja}
                                            onChange={handleSObaChanged}
                                            id="soba"
                                            name="soba"
                                        >
                                            <option value="">Choose room</option>
                                            {selectedLocation?.rooms?.map((soba) => (
                                                <option key={soba.id} value={soba.id}>
                                                    {soba.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className={classes.formRowM}>
                                <div className={classes.formLabelIme}>
                                    <label>
                                        <strong style={{fontSize:"16px"}}>Moderator:</strong>
                                    </label>
                                </div>
                                <div className={classes.formInputIme}>
                                    <select
                                        value={moderatorDOgadjaja}
                                        onChange={handleModeratorChanged}
                                        id="moderator"
                                        name="moderator"
                                    >
                                        <option value="">Choose moderator</option>
                                        {moderatori?.map((moderator) => (
                                            <option key={moderator.id} value={moderator.id}>
                                                {moderator.first_name} {moderator.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={classes.formRowT}>
                                <div className={classes.formLabelType}>
                                    <label>
                                        <strong style={{fontSize:"16px"}}>Event type:</strong>
                                    </label>
                                </div>
                                <div className={classes.formInputType}>
                                    <select
                                        value={tipDogadjaja}
                                        onChange={handleTipDogadjajaCHnaged}
                                        id="tipD"
                                        name="tipD"
                                    >
                                        <option value="">Choose event type</option>
                                        {tipovi_dogadjaja?.map((tip) => (
                                            <option key={tip.id} value={tip.id}>
                                                {tip.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {lokacijaKonfChecked && (
                                <div className={classes.resursiHeader}>
                                    <span>Resources </span>
                                    <button
                                        className={classes.plusButton}
                                        onClick={hadnleResursi}
                                    >
                                        {showResurse ? "-" : "+"}
                                    </button>
                                </div>
                            )}
                            {showResurse && (
                                <div className={classes.dogKonf}>
                                    <div className={classes.formRow}>
                                        <div className={classes.formLabelChecked}>
                                            <label>
                                                <strong style={{fontSize:"16px"}}>Resource:</strong>
                                            </label>
                                        </div>
                                        <div className={classes.formResurs}>
                                            <select
                                                className={classes.resursSelect}
                                                value={resursDogadjaja}
                                                onChange={handleResursChanged}
                                                id="resurs"
                                                name="resurs"
                                            >
                                                <option value="">Choose resource</option>
                                                {selectedLocation?.resource_items?.map((r) => (
                                                    <option key={r.id} value={r.id}>
                                                        {r.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                className={classes.resursSelect}
                                                value={kolicinaResursa}
                                                onChange={handleResurskolicinaChanged}
                                                id="resursKolicina"
                                                name="resursKolicina"
                                            >
                                                <option value="">Quantity</option>
                                                {selectedLocation?.resource_items?.find(
                                                        (r) => r.id === resursDogadjaja
                                                    ) &&
                                                    Array.from(
                                                        {
                                                            length: selectedLocation.resource_items.find(
                                                                (r) => r.id === resursDogadjaja
                                                            ).number,
                                                        },
                                                        (_, index) => index + 1
                                                    ).map((num) => (
                                                        <option key={num} value={num}>
                                                            {num}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <button
                                            onClick={handleSpremiResurs}
                                            className={classes.buttonD}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className={classes.buttonDOgadjaji}>
                                <button
                                    className={classes.buttonD}
                                    onClick={handleSpremiDogadjaj}
                                >
                                    Save
                                </button>
                                <button className={classes.buttonD} onClick={handleOdustani}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {showErrorMessZaResurs && (
                    <div>
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    </div>
                )}
                <div className={classes.buttonContainer}>
                    <button className={classes.buttonD} onClick={handleSave}>Save</button>
                    <button className={classes.buttonD} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddConference;