import Link from 'next/link';
import { useEffect, useState } from 'react'
import { FilterOptions, Filter } from '@/constants';
import { Button } from './FormItem';

const ModalWindow = ({searchParams, info, setInfo}: any) => {
  const [urlStatus, setUrlStatus] = useState(true)
  const item = FilterOptions[searchParams.param as keyof Filter]
  const keyboard = info[searchParams.param].buttonValue ==  "defaultKeyboard" ? "defaultButtons" : "inlineButtons"
  const maxTextLength = searchParams.buttonValue == "defaultKeyboard" ? item.defaultButtonsLength : item.inlineButtonsLength
  
  useEffect(() => {
    
      const btnAvailable = searchParams.buttonValue == "defaultKeyboard"  ? item.defaultButtonsUrl : item.inlineButtonsUrl
      const btnType = searchParams.buttonValue == "defaultKeyboard"  ? item.defaultButtonsUrlValue : item.inlineButtonsUrlValue
      if (btnAvailable) {
        if (btnType) {
          if (keyboard ==="defaultButtons"  ) {
            setUrlStatus(item.defaultButtonsUrlValue! - info[searchParams.param][keyboard].map((o: Button ) => o.url ).length > 0)
            
          } else {
            setUrlStatus(item.inlineButtonsUrlValue! - info[searchParams.param][keyboard].map((o: Button ) => o.url ).length > 0 )
          }
        } 
      } else {
        setUrlStatus(false)
      }

  }, [])

  const [value, setValue] = useState({
    value: "",
    url:  ""
  })
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const handleSubmit = () => {
    
    if (value.value.length > 0 && !info[searchParams.param][keyboard].find((o: Button ) => o.value == value.value ) ) {
      setInfo((prev: {}) => ({
        ...prev,
        [searchParams.param]: {
          text: info[searchParams.param].text,
          position: info[searchParams.param].position,
          buttonValue: info[searchParams.param].buttonValue,
          defaultButtons: searchParams?.buttonValue == "defaultKeyboard" ? [...info[searchParams.param].defaultButtons, value] : info[searchParams.param].defaultButtons,
          inlineButtons: searchParams?.buttonValue == "inlineKeyboard" ? [...info[searchParams.param].inlineButtons, value]  : info[searchParams.param].inlineButtons
        },
      }));
    }
  }
    
	return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-8 border w-6/12 shadow-lg rounded-md bg-white" >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">Создать {searchParams?.buttonValue === "defaultKeyboard" ?  "стандартную кнопку" : "inline-кнопку"} {searchParams?.param} </h3>
            <div className="mt-2 px-7 py-3">
            <div>
              <div className="mt-2">
                <input
                  id="value"
                  name="value"
                  type="value"
                  placeholder="Текст кнопки..."
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-lime-700 sm:text-sm sm:leading-6"
                  maxLength={maxTextLength ? maxTextLength : undefined}
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="url"
                  name="url"
                  type="url"
                  placeholder={urlStatus ? "Ссылка" : "Нельзя приложить ссылку"}
                  className="p-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-lime-700 sm:text-sm sm:leading-6"
                  disabled={urlStatus ? false : true}
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>
            </div>
            <div className="flex flex-col justify-center mt-4">

              <Link
                href="/"
                className='flex justify-center'
              >
              <button onClick={() => handleSubmit()} type="submit" className="flex bg-lime-700 text-gray-50 hover:bg-lime-600 font-bold py-2 px-4 text-md rounded-xl m-1" >
                Создать кнопку
              </button>
              </Link>
              <Link
                href="/"
                className='pt-3'
              >Закрыть окно</Link>
            </div>
          </div>
        </div>
      </div>
	  );
}

export default ModalWindow