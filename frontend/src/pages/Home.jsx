import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Home = () => {

    // const [user, setUser] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();    
    const [url, setUrl] = useState("");

    const handleSubmitUrl = async (e) => {
        try {
            e.preventDefault();
            const repoName = url.split('/').slice(-2).join('/');
            if (localStorage.getItem(repoName)) {
                navigate(`/summary?repo=${repoName}`);
                return;
            }
            const token = Cookies.get("authToken");
            console.log(token)
            const response = await fetch("http://127.0.0.1:5000/get-repo-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ repo_url: url })
            });
            const repoData = await response.json();
            localStorage.setItem(repoName, JSON.stringify(repoData));
            console.log(repoData);
            navigate(`/summary?repo=${repoName}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {
                user ? (
                    <>
                        <p className='text-4xl'>Welcome {user?.username}!</p>
                        <div className="flex w-full mt-8 max-w-4xl items-center space-x-2">
                            <form onSubmit={handleSubmitUrl} className="flex flex-col w-full space-y-4">
                                <Input type="text" placeholder="Paste your Github Repo URL" onChange={(e) => setUrl(e.target.value)} />
                                <Button type="submit">Submit</Button>
                            </form>
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
