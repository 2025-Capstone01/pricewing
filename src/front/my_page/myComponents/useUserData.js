import { useEffect, useState } from 'react';

const useUserData = () => {
    const [userId, setUserId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem('email');

    useEffect(() => {
        if (!email) {
            setLoginError(true);
            return;
        }

        fetch(`/api/users/id?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.user_id) {
                    setUserId(data.user_id);
                    setLoginError(false);
                } else {
                    setLoginError(true);
                }
            })
            .catch(() => setLoginError(true));
    }, [email]);

    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        Promise.all([
            fetch('/api/categories').then(res => res.json()),
            fetch(`/api/likes?user_id=${userId}`).then(res => res.json())
        ])
            .then(([cats, likes]) => {
                setCategories(cats);
                setFavoriteProducts(likes);
            })
            .catch(() => setLoginError(true))
            .finally(() => setLoading(false));
    }, [userId]);

    return {
        userId,
        categories,
        favoriteProducts,
        loginError,
        loading
    };
};

export default useUserData;
