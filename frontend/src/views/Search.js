import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Button, Col, DatePicker, Divider, Form, Input, Radio, Row, Space, message} from 'antd';
import CustomLayout from '../components/CustomLayout';
import {NotificationOutlined, UserOutlined} from '@ant-design/icons';
import LineChart from "../components/LineChart";
import MessageView from "../components/common/MessageView";

const {RangePicker} = DatePicker;

const mockdata = require("../assets/data.json");

const PageActions = () => {
    return (
        <div className="antd-pro-pages-list-card-list-style-contentLink">
            <Space>
                <div>
                    <Badge dot>
                        <NotificationOutlined/>
                    </Badge>
                </div>
                <Divider/>
                <div>
                    <Avatar style={{backgroundColor: 'red'}} icon={<UserOutlined/>}/>
                    Giulio Fumagalli
                </div>
            </Space>
        </div>
    );
};

const SearchPage = (props) => {
    const [data, setData] = useState(null);

    const asyncFetch = (url, headers) => {
        fetch(url,
            {
                method: 'GET',
                headers: headers,
                resolveWithFullResponse: true,
            })
            .then(response => response.json())
            .then(json => setData(json?.data?.infos))
            .catch(error => {
                message.error('Fetch error');
            });
    };

    const [form] = Form.useForm();
    const dateTimeFormat = 'YYYY-MM-DD';

    const handleEventSubmit = async () => {
        let formValues = await form.validateFields();
        console.log(formValues);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');

        let url = 'https://central-safety-system.herokuapp.com/api/v1/infos';
        asyncFetch(url, headers);
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
                        <Col span={7}>
                            <Form.Item
                                name="address"
                                label="Address:"
                                rules={[{required: true, message: 'please enter the address',},]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="rangePicker"
                                label="From / To:"
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
                        <Col span={9}>
                            <Form.Item
                                name="filter"
                                label="Filter:"
                            >
                                <Radio.Group defaultValue="Crowd">
                                    <Radio.Button value="TrackRoutes">TrackRoutes</Radio.Button>
                                    <Radio.Button value="Crimes">Crimes</Radio.Button>
                                    <Radio.Button value="Crowd">Crowd</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Button onClick={handleEventSubmit} type="primary">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row>
                <Col span={24} padding={8}>
                    {
                        (data != null) ? (
                            <LineChart
                                data={data}
                            />
                        ) : (
                            <MessageView
                                type='shield'
                                title='Make a search'
                                subtitle='Fill all fields and make your search'
                            />
                        )
                    }

                </Col>
            </Row>
        </CustomLayout>
    );
};


export default SearchPage;