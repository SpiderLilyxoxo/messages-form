"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

const page = () => {
  const route = useRouter()
  const [info, setInfo] = useState({
    email: "",
    password:  ""
  })
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!info.email || !info.password) {
      setError("Нужно заполнить все поля.");
    }

    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false
      })
      if (res?.error) {
        setError("Invalid Credentials")
        setPending(false);
        return
      }
      route.replace("/")
      
    } catch (err) {
      setPending(false);
      setError("Что то пошло не так.");
    }
  };


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-lime-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Войти в Аккаунт
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Почта
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-lime-700 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Пароль
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="p-3 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-lime-700 sm:text-sm sm:leading-6"
                  onChange={(e) => handleInput(e)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-lime-800 text-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-lime-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-lime-700"
                disabled={pending ? true : false}
              >
                {pending? "Выполняется Вход..." : "Войти"}
              </button>
            </div>
            <div className='flex justify-center'>

            <p className="text-sm font-light">
                      Еще не зарегистрированны? <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Зарегистрироваться</a>
                  </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
