import { Button, Modal } from 'antd';

const MarksModal = ({arg,show,onClose}) => {
    const title1=`${arg.name} Marks`;

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
    return (
        <>
            <Modal maskClosable={false} title={title1} footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>
            ]} open={show} onCancel={onClose} bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}>
                <ul style={{padding:0, listStyle:"none"}}>
                    { arg.ratings.length>0 && arg.ratings.map((user) => (
                        <li style={{fontSize:16}} key={user.id}>
                            <p>------------</p>
                            <div><label>Stars: {user.stars}</label></div>
                           <div> <label>Comment: {user.comment}</label></div>
                           <div> <label>User: {user.user.first_name} {user.user.last_name}</label></div>
                            <div> <label>Date: {formattedDate(user.date)}</label></div>
                        </li>
                    ))}
                    {
                        arg.ratings.length<1 && (
                            <li style={{fontSize:16}}>
                                There is no given marks for this conference!
                            </li>
                        )
                    }
                </ul>
            </Modal>
        </>
    );
};
export default MarksModal;