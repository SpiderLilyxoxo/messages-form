"use client";

import { useSession, signOut } from "next-auth/react";
import Channels from '@/components/Channels';
import Filters from '@/components/Filters';
import { useEffect, useState } from 'react';
import ModalWindow from '@/components/ModalWindow';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Home({ searchParams }: SearchParamProps) {
  const { data, status } = useSession();
  const [channels, setChannels] = useState([]);

  return (
    <div className="flex flex-col items-center min-h-screen w-screen text-lime-900">
      <nav className="flex justify-end p-2 w-full md:w-8/12">
        <header className="flex p-2">
          {/* ВЫБРАТЬ НАСТРОйКУ */}
          <div className="flex text-base font-bold p-2 pr-4">
            {data?.user?.username}{" "}
          </div>
          <button
            className="text-sm font-semibold bg-lime-800 text-gray-50 hover:bg-lime-700  py-2 px-4 rounded-xl "
            onClick={() => signOut()}
          >
            {" "}
            Выйти 
            <span aria-hidden="true">&rarr;</span>
          </button>
        </header>
      </nav>

      <div className="relative flex py-5 items-end w-full md:w-7/12">
        <div className="flex-grow border-t border-gray-800 opacity-10"></div>
      </div>

      <div className="flex flex-col p-2 w-full md:w-8/12 rounded-lg py-1.5 shadow-xl border-solid justify-center " >
          <div className='flex flex-row justify-center'>
            <Channels setChannels={setChannels} channels={channels}/>
          </div>
            <Filters channels={channels} setChannels={setChannels} searchParams={searchParams}/>
      </div>
    </div>
  );
}
