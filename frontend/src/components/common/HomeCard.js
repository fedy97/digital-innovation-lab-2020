import React, {useRef} from 'react';
import { Card } from 'antd';
import Lottie from "react-lottie";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const HomeCard = (props) => {

    let lottieOptions = {};

    if (props.animationFile != null) {
        lottieOptions = {
            loop: true,
            autoplay: true,
            animationData: props.animationFile,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            },
        }
    }

        return (
            <Card className={props.className}>
                <Link to={props.url}>
                    <div>
                        {(props.animationFile != null) ?
                            <Lottie options={lottieOptions} style={{width: "75%"}}/>
                            : null
                        }
                        <h2>{props.title}</h2>
                    </div>
                </Link>
            </Card>
        );
    };

    HomeCard.props = {
        animationFile: PropTypes.string,
        url: PropTypes.string,
        className: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
    };

export default HomeCard;