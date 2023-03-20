import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const RedirectLoading = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
            count === 0 && toast.error('Please Login then you can  access...', { theme: "colored" });
            count === 0 && navigate("/login");

        }, 1000);
        return () => clearInterval(interval);
    }, [navigate, count])
    return (
        <Loading />
    )
}
export default RedirectLoading
