import React from 'react';
import {Button, Space, Typography} from 'antd';
import CustomLayout from '../components/CustomLayout';
import file from "../assets/lottie/analytics.json";
import LottieFile from "../components/common/LottieFile";
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

const AnalysisPage = (props) => {
    return (
        <CustomLayout
            title="Analysis"
            breadcrumbFirst="Central Safety System"
            pageAction={<PageActions/>}
        >
            <Title level={2}>Analysis:</Title>
            <Title level={4}>Soon available</Title>
            <LottieFile file={file} width={"65%"}/>
        </CustomLayout>
    );
};


export default AnalysisPage;