import React from 'react';
import {Button, Space} from 'antd';
import CustomLayout from '../components/CustomLayout';

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
            content
        </CustomLayout>
    );
};


export default DashboardsPage;