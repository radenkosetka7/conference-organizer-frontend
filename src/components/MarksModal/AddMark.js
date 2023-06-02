import { Button, Modal, Input, Form, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
const AddMark = ({show,onClose}) => {
    const title1=`Rate`; // ovdje treba naziv konferencije dodati
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleFormSubmit = (values) => {
        // Provjerite valjanost unesenih podataka
        // Ako su podaci valjani, zatvorite modal
        onClose();
    };

    return (
        <>
            <Modal title={title1} footer={[
            ]} open={show} onCancel={onClose} bodyStyle={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleFormSubmit}
                    style={{ maxWidth: 600 }}
                    onClick={event => event.stopPropagation()}
                >
                    <Form.Item name="stars" label="Stars" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option"
                            allowClear
                        >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="4">5</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Comment" name="comment" rules={[
                        { required: true, message: 'Please enter a comment.' },
                        { max: 100, message: 'Comment must not exceed 100 characters.' },
                    ]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleClick}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default AddMark;