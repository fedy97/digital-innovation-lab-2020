import React from 'react';
import {Button, Space, Typography} from 'antd';
import CustomLayout from '../components/CustomLayout';
import LottieFile from "../components/common/LottieFile";
import file from "../assets/lottie/analysis.json";
const { Title } = Typography;
const PageActions = () => {
    return (
        <div className="antd-pro-pages-list-card-list-style-contentLink">
            <Space>
                <Button>
                    Operation
                </Button>
                <Button type="primary">
                    Add new
                </Button>
            </Space>
        </div>
    );
};

const DashboardsPage = (props) => {
    return (
        <CustomLayout
            title="Dashboards"
            breadcrumbFirst="Central Safety System"
            pageAction={<PageActions/>}
        >
            <Title level={2}>Dashboards:</Title>
            <Title level={4}>Soon available</Title>
            <LottieFile file={file} width={"65%"}/>
        </CustomLayout>
    );
};


export default DashboardsPage;