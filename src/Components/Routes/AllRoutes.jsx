import React from 'react'
import {Routes, Route} from "react-router-dom"
import Add_user_form from '../Pages/AddUserForm'
import Login from '../Pages/Login'
import RequiredAuth from './RequiredAuth'
import UserList from '../Pages/UserList'
import UserByManager from '../Pages/UserByManager'
import EditUser from '../Pages/EditUser'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <RequiredAuth> <Add_user_form/></RequiredAuth>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/userlist' element={ <RequiredAuth> <UserList/> </RequiredAuth>} />
        <Route path='/user-add-by-manager/:id' element={<RequiredAuth> <UserByManager/> </RequiredAuth>} />
        <Route path='/edit-user/:id' element={<RequiredAuth> <EditUser/> </RequiredAuth>} />
    </Routes>
  )
}

export default AllRoutes