import { Button } from '../components/ui/button';
import React from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Clock, Scissors, FileText } from "lucide-react"; 
import logo from '../assets/logo.png';
import { IoMdTime } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import { MdOutlineNoteAlt } from "react-icons/md";

export const Home = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
                {/* Hero Section */}
                <div className="text-center">
                    <div className="text-5xl font-extrabold mb-10 font-mono">
                       <h1>Overwhelmed by</h1>
                        <h1>large codebases?</h1>
                    </div>
                    <p className="text-lg text-gray-300 font-mono">
                        Generate visualizations and file summaries instantly with ease
                    </p>
                </div>
                <div className="w-full max-w-4xl">
                    <div className="flex w-full mt-8 max-w-4xl items-center space-x-2">
                        <Input type="repo-url" placeholder="Paste your Github Repo URL" />
                        <Button type="submit">Submit</Button>
                    </div>
                </div>

                {/* Problem Section */}
                <div className="mt-16 w-full max-w-6xl text-center">
                    <h2 className="text-md font-mono">THE PROBLEM WE SOLVE</h2>
                    <h3 className="text-3xl font-semibold mb-8">
                        Freshers get overwhelmed by large codebases
                    </h3>

                    {/* Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <Card className="bg-gray-800 text-white">
                            <CardHeader>
                                <IoMdTime  className="h-10 w-10 mx-auto text-gray-400" />
                                <CardTitle className="mt-4">Time Consuming</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    Manually navigating large codebases takes significant time and effort, especially for freshers.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 2 */}
                        <Card className="bg-gray-800 text-white">
                            <CardHeader>
                                <BiDetail className="h-10 w-10 mx-auto text-gray-400" />
                                <CardTitle className="mt-4">Risk of Missing Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    Important components and connections in the codebase can be easily overlooked, leading to confusion.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Card 3 */}
                        <Card className="bg-gray-800 text-white">
                            <CardHeader>
                                <MdOutlineNoteAlt className="h-10 w-10 mx-auto text-gray-400" />
                                <CardTitle className="mt-4">Lack of Context</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    Without clear summaries, understanding how files interact becomes an uphill battle.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};