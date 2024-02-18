"use client";

import { useEffect, useState } from "react";
import { arrayMoveImmutable } from "array-move";
import FormItem from "./FormItem";

type Item = {
  SMS: {
		text: "",
		position: 1,
		buttonValue: "",
		defaultButtons: [],
		inlineButtons: [],
  }
}

let information = ""

const Filters = ({ channels, setChannels, searchParams }: any) => {
  const [info, setInfo] = useState({
    SMS: {
		text: "",
		position: 1,
		buttonValue: "",
		defaultButtons: [],
		inlineButtons: [],
    },
    VK: {
      text: "",
      position: 2,
      buttonValue: "defaultKeyboard",
      defaultButtons: [],
      inlineButtons: [],
    },
    Telegram: {
      text: "",
      position: 3,
      buttonValue: "defaultKeyboard",
      defaultButtons: [],
      inlineButtons: [],
    },

    WhatsApp: {
      text: "",
      position: 4,
      buttonValue: "defaultKeyboard",
      defaultButtons: [],
      inlineButtons: [],
    },
  });

  useEffect(() => {
    const arr: string[] = []
    for (const property in info) {
      const item = info[property as keyof Item]
      if (item.position != 0) {
        arr.splice(item.position - 1, 0, property)
      }
    }
      setChannels([...arr])
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(info);
  };
  

  const updatePosition = (item: string, value: string) => {
    const fromIndex = channels.indexOf(item);
    let toIndex = channels.indexOf(item);
    if (value === "up") {
      toIndex -= 1;
    } else {
      toIndex += 1;
    }
    const copyArr = arrayMoveImmutable(channels, fromIndex, toIndex);
    setChannels(copyArr);
  };

  const saveOptions = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch("api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({options: info}),
      });
      if (res.ok) {
        information = await res.json()
      } 
    } catch (err) {
      console.log(err);
      
    }
  };

  const getOptions = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    try {
      const res = await fetch("api/settings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const req = await res.json()
      
      if (Object.keys(req).length > 0) {
        setInfo(() => ({...req[0].options}))
      }
      

      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      {channels.map((el: string, index: number) => {
        return (
          <FormItem
            key={el}
            param={el}
            numb={index + 1}
            info={info}
            setInfo={setInfo}
            setChannels={setChannels}
            channels={channels}
            updatePosition={updatePosition}
            searchParams={searchParams}
          />
        );
      })}
      <div className="flex ">
      <button className="py-1 px-2 hover:underline decoration-2 rounded-xl m-2 font-sm" onClick={(e) => getOptions(e)}>
          Применить настройки
        </button>
        <button className="bg-lime-800 text-gray-50 hover:bg-lime-700 font-bold py-2 px-3 rounded-xl m-2">
          Отправить Сообщения
        </button>
        <button className="py-1 px-2 hover:underline decoration-2 rounded-xl m-2 font-sm" onClick={(e) => saveOptions(e)}>
          Сохранить настройки
        </button>
        {/* отобразить статус запроса */}
      </div>
    </form>
  );
};

export default Filters;
