import React from "react";
import {Breadcrumb, Layout, Typography} from "antd";
import PropTypes from 'prop-types';

const {Header, Content, Footer} = Layout;
const { Title } = Typography;

const CustomLayout = (props) => {

    const {children} = props;

    return (
        <Layout>
            <main className="ant-pro-basicLayout-children-content-wrap">
                <div className="header">
                    <div className="ant-pro-grid-content">
                        <div className="ant-page-header has-breadcrumb ant-page-header-ghost ant-page-header-compact">
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>{props.breadcrumbFirst}</Breadcrumb.Item>
                                <Breadcrumb.Item>{props.breadcrumbSecond}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="ant-page-header-heading">
                                <div className="ant-page-header-heading-left">
                                    <Title level={1}>
                                        {props.title}
                                    </Title>
                                </div>
                                <div className="ant-page-header-content">
                                    {props.pageAction}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Content style={{padding: '0 50px'}}>
                    <div className="container">
                        <div className="ant-card-body">
                            {children}
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Group 7 ©2020 Central Safety System </Footer>
            </main>
        </Layout>
    );
};

export default CustomLayout;

CustomLayout.defaultProps = {};

CustomLayout.props = {
    breadcrumbFirst: PropTypes.string,
    breadcrumbSecond: PropTypes.string,
    title: PropTypes.string.isRequired,
    pageAction: PropTypes.elementType,
};
