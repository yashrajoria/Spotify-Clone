"use client"
import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer'
import React from 'react'
import PlayerContent from './PlayerContent';

const Player = () => {
    const player = usePlayer();

    const { song } = useGetSongById(player.activeId);
    console.log(player)
    console.log(song)

    const songUrl = useLoadSongUrl(song!)
    console.log(songUrl)
    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className='fixed bottom-0 w-full bg-black py-2 h-[80px] px-4'>
            <PlayerContent
                song={song}
                key={songUrl}
                songUrl={songUrl}
            />
        </div>
    )
}

export default Player