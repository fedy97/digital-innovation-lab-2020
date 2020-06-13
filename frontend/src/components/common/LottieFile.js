import React from "react";
import Lottie from "react-lottie";
import PropTypes from 'prop-types';



const LottieFile = (props) => {

    let lottieOptions = {
        loop: props.loop,
        autoplay: true,
        animationData: props.file,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    };

    return (
        <div>
            <Lottie options={lottieOptions} style={{width: props.width}}/>
        </div>
    );
};

export default LottieFile;

LottieFile.defaultProps = {
    loop: true,
    width: "65%"
};

LottieFile.props = {
    file: PropTypes.string.isRequired,
    loop: PropTypes.bool,
    width: PropTypes.string,
};