import { useEffect } from 'react';
import Cookies from 'js-cookie';
import {useNavigate } from 'react-router';

export const Authenticated = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            Cookies.set('authToken', token);
            navigate('/home');
        }
    }, []);

    return (
        <div className='flex justify-center items-center text-center'>
            Loading...
        </div>
    )
}
