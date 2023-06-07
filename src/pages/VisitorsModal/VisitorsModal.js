import { Button, Modal } from 'antd';
const VisitorsModal = ({arg,show,onClose}) => {
    const title1=`${arg.name} Visitors`;
    return (
        <>
            <Modal maskClosable={false} title={title1} footer={[
                <Button key="cancel" onClick={onClose} bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}>
                    Cancel
                </Button>
            ]} open={show} onCancel={onClose}>
                <ul style={{padding:0, listStyle:"none"}}>
                    { arg.event_visitors.length>0 && arg.event_visitors.map((user) => (
                        <li style={{fontSize:16}} key={user.id}>
                            {user.visitor.first_name} {user.visitor.last_name}
                        </li>
                    ))}
                    {
                        arg.event_visitors.length<1 && (
                            <li style={{fontSize:16}}>
                                There is no visitors for this event!
                            </li>
                        )
                    }
                </ul>
            </Modal>
        </>
    );
};
export default VisitorsModal;