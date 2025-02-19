/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { FaGithub } from "react-icons/fa6";

export const Login = () => {

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log(isLoggedIn)
    if (isLoggedIn) {
      window.location.href = "/home";
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg border border-gray-400">
        <h2 className="text-center text-2xl font-bold text-gray-200">
          Sign in to WB login
        </h2>
        <p className="text-center text-sm text-gray-400">
          Welcome back! Please sign in to continue
        </p>
        <Button className="w-full flex items-center justify-center gap-2" onClick={handleLogin}>
          <FaGithub /> Continue with GitHub
        </Button>

        <div className="text-center text-sm text-gray-200">
          Don't have an account?{" "}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Sign up
          </a>
        </div>

      </div>
    </div>
  )
}
