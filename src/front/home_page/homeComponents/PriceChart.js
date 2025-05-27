import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import styles from './PriceChart.module.css';

const PriceChart = ({ data, originalPrice }) => {
    if (!originalPrice) return <p>가격 정보가 없습니다.</p>;


    // chartData 그대로 전달 (서버에서 연장된 today 데이터 포함)
    const chartData = [
        {
            date: '정가 기준',
            price: Number(originalPrice),
        },
        ...data.map((item) => ({
            date: item.checked_at.slice(0, 10),
            price: Number(item.price),
        })),
    ];

    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                    {/* 정가 기준선 */}
                    <ReferenceLine
                        y={originalPrice}
                        label={{ value: "정가", position: "right", fill: "red", fontSize: 12 }}
                        stroke="red"
                        strokeDasharray="4 4"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;

