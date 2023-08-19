"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlay } from "react-icons/fa"

interface ListItemProps {
    image: string;
    href: string;
    name: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, href, name }) => {
    const router = useRouter();
    const onClick = () => {
        //add auth before push
        router.push(href);
    };
    return (
        <button  onClick={onClick} className="relative group flex gap-x-4 overflow-hidden items-center rounded-md bg-neutral-100/10 hover:ng-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
            <Image
                className="object-cover"
                fill
                src={image}
                alt="Image"
            />
        </div>
            <p className="font-medium truncate py-5">{name}</p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    );
};

export default ListItem;
