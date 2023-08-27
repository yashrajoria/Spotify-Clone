"use client";

import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";
import React, { useEffect, useState } from "react";

interface ModalProviderProps {
    products: ProductWithPrice[]
}

// This component serves as a Modal Provider, responsible for managing modal-related functionality.
const ModalProvider: React.FC<ModalProviderProps> = ({
    products
}) => {
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
            <SubscribeModal products={products} />
        </div>
    );
};

export default ModalProvider;
