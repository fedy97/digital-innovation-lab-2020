import React from 'react';
import {Button, Space, Row, Col, Form, Input, Badge, Divider, Avatar, DatePicker} from 'antd';
import CustomLayout from '../components/CustomLayout';
import { UserOutlined } from '@ant-design/icons';
import { NotificationOutlined } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;

const PageActions = () => {
    return (
        <div className="antd-pro-pages-list-card-list-style-contentLink">
            <Space>
                <div>
                    <Badge dot>
                        <NotificationOutlined />
                    </Badge>
                </div>
                <Divider/>
                <div>
                    <Avatar style={{ backgroundColor: 'red' }} icon={<UserOutlined />} />
                    Giulio Fumagalli
                </div>
            </Space>
        </div>
    );
};

const SearchPage = (props) => {
    const [form] = Form.useForm();
    const dateTimeFormat = 'YYYY-MM-DD';

    const handleEventSubmit = async () => {
        let formValues = await form.validateFields();
        console.log(formValues);
    };

    return (
        <CustomLayout
            title="Search"
            breadcrumbFirst="Central Safety System"
            pageAction={<PageActions/>}
        >
            <Row>
                <Form
                    form={form}
                    layout="horizontal"
                >
                    <Row gutter={16}>
                        <Col span={11}>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{required: true, message: 'please enter the address',},]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name="rangePicker"
                                label="From / To"
                                rules={[{required: true, message: 'please enter the period',},]}
                            >
                                <RangePicker
                                    // value={
                                    //     [moment(newEvent?.start, dateTimeFormat), moment(newEvent?.end, dateTimeFormat)]}
                                    //defaultValue={rangeDateTime}
                                    //onChange={(v) => setRangeDateTime(v)}
                                    format={dateTimeFormat}
                                    // onChange={onChange}
                                    // onOk={onOk}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Button onClick={handleEventSubmit} type="primary">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </CustomLayout>
    );
};


export default SearchPage;