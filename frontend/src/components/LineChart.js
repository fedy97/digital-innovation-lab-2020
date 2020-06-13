import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

const LineChart = (props) => {
    const {data} = props;

    const config = {
        title: {
            visible: true,
            text: 'People Crowd',
        },
        description: {
            visible: true,
            text:
                'Via Golgi',
        },
        padding: [20, 100, 30, 80],
        forceFit: true,
        data,
        xField: 'datetime',
        yField: 'people',
        seriesField: 'name',
        xAxis: {
            type: 'dateTime',
            label: {
                visible: true,
                autoHide: true,
            },
        },
        yAxis: {
            formatter: v => `${(v / 1)} People`,
        },
        legend: {
            visible: false,
        },
        label: {
            visible: true,
            type: 'line',
        },
        animation: {
            appear: {
                animation: 'clipingWithData',
            },
        },
        smooth: true,
    };
    return <Line {...config} />;
};

export default LineChart;
