import React, { useEffect, useState } from "react"
import app from "./base.js"
import { auth } from "firebase"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const list = process.env.REACT_APP_ADMIN_EMAILS.split("|")
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			setCurrentUser(user)
		})
	}, [])

	useEffect(() => {
		if (currentUser && !list.includes(currentUser.email))
			app.auth().signOut()
	}, [currentUser])
	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	)
}
