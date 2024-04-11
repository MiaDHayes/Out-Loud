import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	// set state to initially not logged in
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userInfo, setUserInfo] = useState({})

	useEffect(() => {
		console.log('userInfo has been updated:', userInfo)
	}, [userInfo])
	const value = { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }

	return (
		<>
			<UserContext.Provider value={value}>{children}</UserContext.Provider>
		</>
	)
}