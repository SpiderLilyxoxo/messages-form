import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

type User = {
	email: string,
	username: string,
	password: string
}

const login =  async (credentials: User) => {
	try {
		connectToDatabase()
		const user = await User.findOne({email: credentials.email})
		if (!user) throw new Error("Wrong Credentials.")
		const isCorrect = await bcrypt.compare(credentials.password, user.password)
		if (!isCorrect) throw new Error("Wrong Password.")
		return user
	} catch (error) {
		throw new Error("Something went wrong.")
	}
}

export const authOptions = {
	pages:  {
		signIn: "/sign-in"
	},
	providers: [
		CredentialsProvider({
		  name: 'credentials',
		  credentials: {},
		  async authorize(credentials: User) {
			try {
				const user = await login(credentials)
				return user
			} catch (error) {
				throw new Error("Failed to Sign In.")
			}
		  }
		})
	  ],
	  callbacks: {
		async jwt({token, user}) {
			if (user) {
				token.username = user.username;
				token.email =  user.email
				token.id = user.id
			}
			
			return token
		},
		async session({session, token}) {
			if (token) {
				session.user.username = token.username;
				session.user.email =  token.email
				session.user.id = token.id
			}
			return session
		}
	  }
  }

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}