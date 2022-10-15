import React from 'react'
import { useSelector } from "react-redux"

export default function AdminLoginOnly({ element }) {
    const { login } = useSelector(state => state.auth)
    return login.admin ? element : "UnAuthorized Access"
}
