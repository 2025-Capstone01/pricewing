import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const PriceChart = ({ history }) => {
    if (!history || history.length === 0) return null;

    return (
        <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={history}>
                    <XAxis dataKey="checked_at" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#1a73e8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
