import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import {deleteConference} from "../../redux-store/conferenceSlice";
import classes from "./Delete.module.css"
const Delete = (props) => {
    const { onClose, conference,  idConf } = props;
    const dispatch = useDispatch();

    const handleObrisi = () => {

        dispatch(deleteConference({ id:idConf }))
            .then((response) => {
                console.log("response !", response);
                onClose(); // Zatvorite modal nakon brisanja konferencije
                props.onSave();
            })
            .catch((error) => {
                console.error("Greška prilikom brisanja konferencije:", error);
            });
    };

    return (
        <Modal>
            <div className={classes.obrisi}>
                <div className={classes.obrisiContent}>
                    <h3>Are you sure you want to delete {conference.name}?</h3>
                    <button onClick={handleObrisi}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </Modal>
    );
};

export default Delete;