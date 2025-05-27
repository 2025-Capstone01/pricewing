import React, { useEffect, useState } from "react";
import { sendToAI } from '../../api/aiService';

const PriceAnalysisAI = ({ priceHistory, productTitle, originalPrice}) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!priceHistory || priceHistory.length === 0) return;

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const inputData = {
            price_history: priceHistory,
            product_title: productTitle,
            original_price: originalPrice,
        };

        //Calling SendToAI API to get access to AI server on EC2
        const data = await sendToAI(inputData);

        //const res = await fetch("http://54.166.111.157:5000/api/message", {
          //method: "POST",
          //headers: { "Content-Type": "application/json" },
          //body: JSON.stringify({
            //price_history: priceHistory,
            //product_title: productTitle,
            //original_price: originalPrice,
            //}),
        //});
        //const data = await res.json();
        setSummary(data.summary);
      } catch (error) {
        setSummary("요약을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [priceHistory, productTitle, originalPrice]);

  return (
    <div
        className="ai-summary"
        style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#f5f7fa",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#333",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
        }}>

      <h4 style={{ color: "#0070f3", marginBottom: "0.5rem" }}>
        {productTitle} 가격 변동 요약
      </h4>
      {loading ?
        <p style={{ fontStyle: "italic", color: "#666" }}>요약 불러오는 중...</p> : <p>{summary}</p>}
    </div>
  );
};

export default PriceAnalysisAI;
