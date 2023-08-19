"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "@/types_db"

interface SuperBaseProvidersProps {
    children: React.ReactNode;
}

const SupabaseProviders: React.FC<SuperBaseProvidersProps> = ({
    children
}) => {
    const [supabaseClient] = useState(() => {
        createClientComponentClient<Database>()
    })
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
    )
}

export default SupabaseProviders