"use client";

import React, { useEffect } from "react";
import Modal from "./Modal";
import {
    useSessionContext,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    // console.log(supabaseClient)
    const router = useRouter();
    const { session } = useSessionContext();
    // console.log(session);
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!isOpen) {
            onClose();
        }
    };

    return (
        <Modal
            title="Welcome Back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={() => {
                onChange;
            }}
        >
            <Auth
                theme="dark"
                magicLink
                //!TODO: Try to add login form phone number too
                providers={["github", "google"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            },
                        },
                    },
                }}
            />
        </Modal>
    );
};

export default AuthModal;
