import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";
import React from "react";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }
  try {
    const { data: imageData } = supabaseClient.storage
      .from("images")
      .getPublicUrl(song.image_path);

    return imageData.publicUrl;
  } catch (err) {
    console.log(err);
  }
};

export default useLoadImage;
