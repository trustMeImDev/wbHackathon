import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context';
import { useEffect, useState } from 'react';

export const Home = () => {

    // const [user, setUser] = useState(null);
    const [url, setUrl] = useState("");
    const { isLoggedIn, user } = useAuth();

    const handleSubmitUrl = async() => {
        
    };

    useEffect(() => {

    }, []);

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {
                user ? (
                    <>
                        <p className='text-4xl'>Welcome {user?.username}!</p>
                        <div className="flex w-full mt-8 max-w-4xl items-center space-x-2">
                            <Input type="text" placeholder="Paste your Github Repo URL" onChange={(e)=>setUrl(e.target.value)}/>
                            <Button type="submit">Submit</Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <div className="loader animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600"></div>
                    </div>
                )
            }
        </div>
    )
}
