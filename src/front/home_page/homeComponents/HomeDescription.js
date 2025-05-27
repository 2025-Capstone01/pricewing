import React from 'react';
import styles from './HomeDescription.module.css';

const HomeDescription = () => {
    return (
            <p className={styles.description}>
                프라이스윙은 무신사 상품의 가격 변동을 분석하여 제공합니다.<br />
                상품 링크를 입력하면 해당 상품의 가격 이력을 시각적으로 확인할 수 있으며,<br />
                관심 상품의 가격이 하락하면 알림을 통해 확인할 수 있습니다.
            </p>
    );
};

export default HomeDescription;
