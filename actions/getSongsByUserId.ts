import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const getSongsByUserId = async (): Promise<Song[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError.message);
      return [];
    }

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    }

    return (data as any) || [];
  } catch (error) {
    console.error("An error occurred while fetching songs:", error);
    return [];
  }
};

export default getSongsByUserId;
