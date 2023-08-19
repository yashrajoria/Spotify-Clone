"use client"
// Import necessary modules and components
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "@/types_db"

// Define the props interface for the SupabaseProviders component
interface SuperBaseProvidersProps {
    children: React.ReactNode; // 'children' prop holds the nested components to be wrapped
}

// Define the SupabaseProviders component
const SupabaseProviders: React.FC<SuperBaseProvidersProps> = ({
    children
}) => {
    // Use state hook to manage the Supabase client instance
    const [supabaseClient] = useState(() => {
        // Create and return a Supabase client using the createClientComponentClient function
        return createClientComponentClient<Database>(); // The created client will have the specified Database type
    });

    // Wrap the nested components with the SessionContextProvider and provide the Supabase client
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
}

// Export the SupabaseProviders component as the default export
export default SupabaseProviders;
