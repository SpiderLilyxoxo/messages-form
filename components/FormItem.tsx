import { useEffect, useState } from "react";
import Image from "next/image";
import { FilterOptions, Filter } from '@/constants'
import Link from 'next/link';
import ModalWindow from './ModalWindow';


export type Button = {
  value: string,
  url: string
}

const FormItem = ({ param, numb, info, setInfo, setChannels, channels, updatePosition, searchParams }: any) => {
  const show = searchParams?.show;

  useEffect(() => {
    setInfo((prev: {}) => ({
      ...prev,
      [param]: {
        text: info[param].text,
        position: numb,
        buttonValue: info[param].buttonValue,
        defaultButtons: info[param].defaultButtons,
        inlineButtons: info[param].inlineButtons,
      },
    }));
  }, []);
  
  const item = FilterOptions[param as keyof Filter]
  const buttonValue = info[param].buttonValue == "defaultKeyboard" ? item.defaultButtonsLength : item.inlineButtonsLength
  const maxTextLength = buttonValue === null ? 20 : buttonValue

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfo((prev: {}) => ({
      ...prev,
      [param]: {
        text: e.target.value,
        position: numb,
        buttonValue: info[param].buttonValue,
        defaultButtons: info[param].defaultButtons,
        inlineButtons: info[param].inlineButtons,
      },
    }));
  };

  const removeFilter = () => {
    setChannels(channels.filter((a: string) => param != a));
    setInfo((prev: {}) => ({
      ...prev,
      [param]: {
        text: info[param].text,
        position: 0,
        buttonValue: info[param].buttonValue,
        defaultButtons: info[param].defaultButtons,
        inlineButtons: info[param].inlineButtons,
      },
    }));
  };

  const updateButtonValue = (value: string) => {
    setInfo((prev: {}) => ({
      ...prev,
      [param]: {
        text: info[param].text,
        position: numb,
        buttonValue: value,
        defaultButtons: info[param].defaultButtons,
        inlineButtons: info[param].inlineButtons,
      },
    }));
  }

  const removeDefaultButton = (value: string) => {
    setInfo((prev: {}) => ({
      ...prev,
      [param]: {
        text: info[param].text,
        position: numb,
        buttonValue: info[param].buttonValue,
        defaultButtons: info[param].defaultButtons.filter((el: Button) => el.value != value),
        inlineButtons: info[param].inlineButtons,
      },
    }));
  }
  const removeInlineButton = (value: string) => {
    setInfo((prev: {}) => ({
      ...prev,
      [param]: {
        text: info[param].text,
        position: numb,
        buttonValue: info[param].buttonValue,
        defaultButtons: info[param].defaultButtons,
        inlineButtons: info[param].inlineButtons.filter((el: Button) => el.value != value)
      },
    }));
  }
  

  return (
    <div className="mb-2 flex flex-col justify-start items-start w-11/12">
      <div className="flex justify-items-stretch w-full justify-between pt-2">
        <div className="flex justify-center items-center">
          <div className="font-bold mr-2">{numb}.</div>
          <label htmlFor="" className="block text-sm  font-medium">
            Отправить через <strong>{param}</strong>
          </label>
        </div>
        <div className="flex justify-center items-center">
          {numb === 1 ? (
            <Image
              src="/assets/icons/down.png"
              width={12}
              height={24}
              alt="Down"
              className="cursor-pointer"
              onClick={() => updatePosition(param, "down")}
            />
          ) : (
            <div className="flex flex-col">
              <Image
                src="/assets/icons/top.png"
                width={12}
                height={24}
                alt="Up"
                className="cursor-pointer mb-1"
                onClick={() => updatePosition(param, "up")}
              />
              <Image
                src="/assets/icons/down.png"
                width={12}
                height={24}
                alt="Down"
                className="cursor-pointer"
                onClick={() => updatePosition(param, "down")}
              />
            </div>
          )}
          <Image
            src="/assets/icons/delete.png"
            width={16}
            height={12}
            alt="Delete"
            className="flex ml-2 cursor-pointer"
            onClick={() => removeFilter()}
          />
        </div>
      </div>
      <div className='w-full'>
        <textarea
        id=""
        className=" resize-none block w-full pb-40 p-6 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-lime-700"
        value={info[param].text}
        maxLength={item.maxSymbols ? item.maxSymbols : undefined}
        onChange={(e) => handleInput(e)}
      />
      </div>
      <div className='flex justify-items-stretch w-full justify-between'>
      {item.maxSymbols && (
        <div className='text-sm'>Длина сообщения {info[param].text.length} / {item.maxSymbols}</div>
      )}
      {item.defaultButtons && item.inlineButtons && (
          <fieldset className='flex flex-col mt-2 items-end'>
            <div className="flex items-center mb-2">
              <input id={`default${param}`} type="radio" name={param} value="defaultKeyboard" className="w-3 h-3 border-lime-700  accent-lime-700 "
              onChange={e => updateButtonValue(e.target.value)} 
              checked={info[param].buttonValue === "defaultKeyboard"}
              />
              <label htmlFor={`default${param}`}  className="block ms-2  text-xs font-medium ">
                Стандартная клавиатура
              </label>
            </div>
          
            <div className="flex items-center mb-4">
              <input id={`inline${param}`}  type="radio" name={param} value="inlineKeyboard" className="w-3 h-3 border-lime-700 accent-lime-700"
              onChange={e => updateButtonValue(e.target.value)} 
              checked={info[param].buttonValue === "inlineKeyboard"}
              />
              <label htmlFor={`inline${param}`}  className="block ms-2 text-xs font-medium ">
                Inline-клавиатура
              </label>
            </div>
          </fieldset>
        )}
      </div>


        {info[param].buttonValue === "inlineKeyboard" && (
        <div className='grid grid-cols-1 gap-2 w-full'>
          {info[param].inlineButtons.map((el: Button) => {
            return (
              <div className='flex w-full  justify-between items-center' key={el.value}>
                <button className=" w-full bg-lime-600 text-gray-50 text-xs py-2 px-3 rounded-lg "  disabled>
                   {el.value.length > maxTextLength ? el.value.slice(0, maxTextLength) + "..." : el.value}  {el.url ? "🔗 " : ""}
          </button>
                  <Image
              src="/assets/icons/delete.png"
              width={18}
          height={3}
              alt="Delete"
              className="flex ml-1 cursor-pointer h-5"
              onClick={() => removeInlineButton(el.value)}
            />
              </div>
            )
          })}
          {
          item.inlineButtonsValue === null && (
            <Link href={`/?show=true&param=${param}&buttonValue=${info[param].buttonValue}&maxDefaultButtonsLength=${item.defaultButtonsLength}&maxInlineButtonsLength=${item.inlineButtonsLength}&defaultButtonsUrl=${item.defaultButtonsUrl}&inlineButtonsUrl=${item.inlineButtonsUrl}&inlineButtonsUrlValue=${item.inlineButtonsUrlValue}`}
             className=" flex bg-lime-600 text-gray-50 font-bold text-xs  py-2 px-3 rounded-lg " data-modal-target="default-modal" data-modal-toggle="default-modal" type="button">
            <div className='w-full  text-center '>Создать кнопку (∞)</div>
        </Link>
          ) 
        }
        {
        item.inlineButtonsValue! - info[param].inlineButtons.length > 0 && (
            <Link href={`/?show=true&param=${param}&buttonValue=${info[param].buttonValue}&maxDefaultButtonsLength=${item.defaultButtonsLength}&maxInlineButtonsLength=${item.inlineButtonsLength}&defaultButtonsUrl=${item.defaultButtonsUrl}&inlineButtonsUrl=${item.inlineButtonsUrl}&inlineButtonsUrlValue=${item.inlineButtonsUrlValue}`}
            className=" flex bg-lime-600 text-gray-50 font-bold text-xs py-2 px-3 rounded-lg text-center " data-modal-target="default-modal" data-modal-toggle="default-modal" type="button">
           <div className='w-full  text-center '>Создать кнопку ({item.inlineButtonsValue! - info[param].inlineButtons.length})</div>
       </Link>
           )
        }
        </div>
      )}
      {info[param].buttonValue === "defaultKeyboard" && (
        <div className='grid grid-cols-4 gap-2 w-full'>
        {info[param].defaultButtons.map((el: Button)=> {
          return (
            <div className='flex min-w-full justify-items-stretch justify-between items-center' key={el.value}>

             <button className=" w-full bg-lime-600 text-gray-50 text-xs py-2 px-3 rounded-lg " disabled>
              {el.value.length > 8 ? el.value.slice(0, 7) + "..." : el.value} {el.url ? "🔗 " : ""} 
      </button>
              <Image
          src="/assets/icons/delete.png"
          width={18}
          height={3}
          alt="Delete"
          className="flex ml-1 cursor-pointer h-5"
          onClick={() => removeDefaultButton(el.value)}
        />
            </div>

          )
        })}
        {
          item.defaultButtonsValue === null && (
            <Link href={`/?show=true&param=${param}&buttonValue=${info[param].buttonValue}&maxDefaultButtonsLength=${item.defaultButtonsLength}&maxInlineButtonsLength=${item.inlineButtonsLength}&defaultButtonsUrl=${item.defaultButtonsUrl}&inlineButtonsUrl=${item.inlineButtonsUrl}&inlineButtonsUrlValue=${item.inlineButtonsUrlValue}`} 
            className=" flex bg-lime-600 text-gray-50 font-bold text-xs py-2 px-3 rounded-lg text-center" data-modal-target="default-modal" data-modal-toggle="default-modal" type="button">
            <div className='w-full  text-center '>Создать кнопку (∞)</div>
        </Link>
          ) 
        }
        {
        item.defaultButtonsValue! - info[param].defaultButtons.length > 0 && (
            <Link href={`/?show=true&param=${param}&buttonValue=${info[param].buttonValue}&maxDefaultButtonsLength=${item.defaultButtonsLength}&maxInlineButtonsLength=${item.inlineButtonsLength}&defaultButtonsUrl=${item.defaultButtonsUrl}&inlineButtonsUrl=${item.inlineButtonsUrl}&inlineButtonsUrlValue=${item.inlineButtonsUrlValue}`} 
            className=" flex bg-lime-600 text-gray-50 font-bold text-xs py-2 px-3 rounded-lg text-center" data-modal-target="default-modal" data-modal-toggle="default-modal" type="button">
           <div className='w-full  text-center '>Создать кнопку ({item.defaultButtonsValue! - info[param].defaultButtons.length})</div>
       </Link>
           )
        }
        
      </div>
      )}

       {show && <ModalWindow  searchParams={searchParams} info={info} setInfo={setInfo}/>}
    </div>
  );
};

export default FormItem;
