import { Button, Modal } from 'antd';

const MarksModal = ({arg,show,onClose}) => {
    const title1=`${arg.name} Marks`;
    return (
        <>
            <Modal title={title1} footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>
            ]} open={show} onCancel={onClose} bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}>
                <ul style={{padding:0, listStyle:"none"}}>
                    {arg.ratings.map((user) => (
                        <li style={{fontSize:16}} key={user.id}>
                            <p>------------</p>
                            <div><label>Stars: {user.stars}</label></div>
                           <div> <label>Comment: {user.comment}</label></div>
                           <div> <label>User: {user.user.first_name} {user.user.last_name}</label></div>
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    );
};
export default MarksModal;