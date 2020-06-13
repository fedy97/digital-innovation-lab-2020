import React from "react";
import { Row, Col, Typography } from "antd";
import {CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons';
import PropTypes from 'prop-types';
import LottieFile from "./LottieFile";

import shield from '../../assets/lottie/shield.json';


const {Text} = Typography;

const MessageImg = ({type}) => {
    switch(type) {
        case 'success':
            return(<CheckCircleTwoTone twoToneColor="#52c41a"/>);
        case 'error':
            return(<CloseCircleTwoTone twoToneColor="#eb2f96"/>);
        case 'shield':
            return(<LottieFile file={shield} width={"65%"}/>);
        default:
            return (null)
    }
};

const MessageView = (props) => {
    return (
        <div>
            <Row>
                <Col span={12} offset={6}>
                    <div className="ant-result-icon">
                        <MessageImg type={props?.type}/>
                    </div>
                    <div className="ant-result-title">
                        <Text strong={true}> {props?.title} </Text>
                    </div>
                    <div className="ant-result-subtitle">
                        <Text> {props?.subtitle} </Text>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default MessageView;

MessageView.defaultProps = {
    title: '',
    subtitle: '',
    type: null,
};

MessageView.props = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string,
};