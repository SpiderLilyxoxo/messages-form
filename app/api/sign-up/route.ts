import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"

export async function POST(req: any) {
	try {
		await connectToDatabase()
		
		const {username, email, password} = await req.json()
		const exists = await User.findOne({$or:[{email},{username}]})
		if (exists) {
			return NextResponse.json({message: "Никнейм или Почта уже существуют."}, {status: 500})
		}
		const hashedPassword = await bcrypt.hash(password, 10)
		await User.create({ username, email, password: hashedPassword})
		return NextResponse.json({message: "User Signed Up!"}, {status: 201})
	} catch (error) {
		console.log("Connect Error", error);
		return NextResponse.json({message: "Возникла ошибка при Регистрации пользователя."}, {status: 500})
	}
}