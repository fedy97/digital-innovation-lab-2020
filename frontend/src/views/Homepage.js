import React from 'react';
import {Button, Space, Badge, Divider, Row, Col} from 'antd';
import CustomLayout from '../components/CustomLayout';
import HomeCard from '../components/common/HomeCard.js';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { NotificationOutlined } from '@ant-design/icons';
import dashboard from '../assets/lottie/dashboard.json';
import LottieFile from "../components/common/LottieFile";

const { Title } = Typography;

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

const Homepage = (props) => {
    return (
        <CustomLayout
            title="Homepage"
            breadcrumbFirst="Central Safety System"
            pageAction={<PageActions/>}
        >
            <div className="full-height">
                <Title level={2}>Features</Title>
                <Row gutter={16}>
                    <Col span={8}>
                        <HomeCard
                            title="Search"
                            url="/search/"
                            className="home-card-translations"
                        />
                    </Col>
                    <Col span={8}>
                        <HomeCard
                            title="Analysis"
                            url="/analysis"
                            className="home-card-unpublished"
                        />
                    </Col>
                    <Col span={8}>
                        <HomeCard
                            title="Dashboards"
                            url="/dashboards"
                            className="home-card-languages"
                        />
                    </Col>
                </Row>
                <Row>
                </Row>
                <Divider />
                <Title level={2}>Dashboard Preview</Title>
                <LottieFile file={dashboard} width={"65%"}/>
            </div>
        </CustomLayout>
    );
};


export default Homepage;