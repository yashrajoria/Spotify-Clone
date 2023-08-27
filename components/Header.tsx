"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
// Define the HeaderProps interface
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

// Define the Header component
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const player = usePlayer();
    const authModal = useAuthModal()
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    // Handle the logout action
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh(); // Refresh the page after logout
        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged Out!!");
        }
    };

    return (
        <div
            className={twMerge(
                `first-letter:h-fit bg-gradient-to-b from-emerald-800 p-6`,
                className
            )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                {/* Previous and Next page navigation buttons */}
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()} // Go back in history
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretLeft size={35} className="text-white" />
                    </button>
                    <button
                        onClick={() => router.forward()} // Go forward in history
                        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretRight size={35} className="text-white" />
                    </button>
                </div>
                {/* Mobile navigation buttons */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                {/* User authentication buttons */}
                <div className="flex justify-between items-center gap-x-4">
                    {user ? ( // If user is logged in
                        <div className="flex gap-x-4 items-center">
                            <Button onClick={handleLogout} className="bg-white px-6 py-2">
                                Log Out
                            </Button>
                            <Button
                                onClick={() => router.push("/account")} // Navigate to account page
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        // If user is not logged in
                        <>
                            <div>
                                <Button
                                    className="bg-transparent text-neutral-300 font-medium"
                                    onClick={authModal.onOpen} // Open sign up modal
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="bg-white px-6 py-2"
                                    onClick={authModal.onOpen} // Open login modal
                                >
                                    Login
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
