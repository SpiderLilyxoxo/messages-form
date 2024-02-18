import { connectToDatabase } from '@/lib/database';
import { NextResponse } from 'next/server';
import User from '@/lib/database/models/user.model';
import Settings from '@/lib/database/models/settings.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';


export async function POST(request: any) {
	const session = await getServerSession(authOptions)
	const {options} =  await request.json()
	
	try {
		await connectToDatabase()
		const info = await Settings.findOne({owner: session.user.id})
		console.log(Object.keys(info).length );
		
		if (Object.keys(info).length > 0 ) {
			return NextResponse.json({message: "Настройки уже созданы."}) 
		}
		await Settings.create({ options: options, owner: session.user.id })
		
		return NextResponse.json({message: "Настройки Сохранены!"}, {status: 201}) 
	} catch (error) {
		console.log("Ошибка подключения", error);
		return NextResponse.json({message: "Не получилось сохранить настройки."}, {status: 500})
	}
}

export async function GET() {
	const session = await getServerSession(authOptions)
	
	try {
		await connectToDatabase()

		const info = await Settings.find({owner: session.user.id})
		
		return NextResponse.json(info)
	} catch (error) {
		console.log("Ошибка подключения", error);
		return NextResponse.json({message: "Не получилось найти настройки."}, {status: 500})
	}
}

