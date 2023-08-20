"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import PlayButton from "./PlayButton";
interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    try {
        const imagePath = useLoadImage(data);

        return (
            <div className="flex flex-col p-3 bg-neutral-400/5 gap-x-4 rounded-md cursor-pointer transition relative group items-center justify-center overflow-hidden hover:bg-neutral-400/10">
                <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                    <Image
                        src={imagePath || "/images/liked.png"}
                        fill
                        alt="Song Images"
                    />
                </div>
                <div className="flex flex-col items-start w-full p-4 gap-y-1">
                    <p className="font-semi-bold truncate w-full">{data.title}</p>
                    <p className="text-neutral-400 text-sm pb-4 w-full">By {data.author}</p>
                    <div className="absolute bottom-24 right-5"><PlayButton /></div>
                </div>
            </div>
        );
    } catch (err) {
        console.log(err);
    }
};

export default SongItem;
