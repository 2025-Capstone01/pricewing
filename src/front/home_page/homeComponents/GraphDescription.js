import React from 'react';

const GraphDescription = () => {
    return (
        <div className="graph-description">
            <p>
                이 그래프는 해당 상품의 날짜별 가격 변동을 시각적으로 나타낸 것입니다.<br />
                가격 데이터는 하루 단위로 수집되며, 최신 가격 추세를 확인할 수 있습니다.
            </p>
        </div>
    );
};

export default GraphDescription;
