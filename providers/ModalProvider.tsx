"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import UploadModal from "@/components/UploadModal";
import React, { useEffect, useState } from "react";

// This component serves as a Modal Provider, responsible for managing modal-related functionality.
const ModalProvider = () => {
    // State to track whether the component is mounted or not.
    const [isMounted, setIsMounted] = useState(false);

    // useEffect hook to set 'isMounted' to true once the component is mounted.
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // If the component is not mounted yet, return null.
    // This prevents any rendering before the component is ready.
    if (!isMounted) {
        return null;
    }

    // If the component is mounted, render the modal content or components.
    return (
        <div>
            <AuthModal />
            <UploadModal />
        </div>
    );
};

export default ModalProvider;
