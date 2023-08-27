"use client"
// Import necessary types and functions from different modules
import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";


// Define the structure of the context data
type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}
// Create a context to hold the user-related data
export const UserContext = createContext<UserContextType | undefined>(
    undefined
)

// Define a Props interface for the context provider component
export interface Props {
    [propName: string]: any
};

// Define the UserContextProvider component that will wrap your application and provide the user context
export const MyUserContextProvider = (props: Props) => {
    // Retrieve session information, user data, and Supabase client from hooks
    const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
    const user = useSupaUser();

    // Extract access token from the session, if available
    const accessToken = session?.access_token ?? null;

    // State variables to manage loading and user details
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    // Functions to fetch user details and subscription information from Supabase
    const getUserDetails = () => supabase.from("users").select("*").single();
    const getSubscription = () => supabase.from("subscriptions").select("*, prices(*,products(*))").in("status", ["trialing", "active"]).single()

    // Use effect to load user details and subscription when user changes
    useEffect(() => {
        // Check if user is available and data is not being loaded
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);
            // Fetch user details and subscription in parallel
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (results) => {
                    const userDetailsPromise = results[0];
                    const subscriptionPromise = results[1];

                    // Check if user details were successfully fetched
                    if (userDetailsPromise.status === "fulfilled") {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    // Check if subscription information was successfully fetched
                    if (subscriptionPromise.status === "fulfilled") {
                        setSubscription(subscriptionPromise.value.data as Subscription);
                    }

                    // Data loading is complete
                    setIsLoadingData(false);
                }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            // Reset user details and subscription when user is not available
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);

    // Create the value object to be provided by the context
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    // Provide the context value to the wrapped components
    return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be within a MyUserContextProvider")
    }
    return context
}
