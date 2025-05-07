import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const PriceChart = ({ data }) => {
    if (!data || data.length === 0) return <p>가격 이력이 없습니다.</p>;

    // 날짜 포맷을 위한 전처리
    const chartData = data.map(item => ({
        ...item,
        date: new Date(item.checked_at).toLocaleDateString(),
        price: Number(item.price)
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;

