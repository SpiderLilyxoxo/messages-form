"use client"
import { Networks } from '@/constants'
import { useEffect } from 'react'

const Channels = ({setChannels, channels, channelsChange}: any) => {

	const updateChannels = (value: string, status: boolean) => {
		if (status) {
			setChannels([...channels, value])
		} else {
			setChannels(channels.filter((a: string )=>
			value != a
			))
		}
	}
	
	return (
		<>
		{Networks.map((el, i) => {
			return (
				<div className="flex items-center p-4" key={el} >
			<input id={el} type="checkbox" value="" className="w-4 h-4 bac accent-gray-500 rounded focus:ring-lime-700 "
			onChange={e => updateChannels(e.target.id, e.target.checked)} 
			checked={channels.includes(el)}/>
			<label htmlFor={el} className="ms-2 text-sm font-medium ">{el}</label>
		</div>
			)
		})}
	
		</>
	)
  
}

export default Channels