import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout({ setDrawerOpen }) {
    return (
        <>
            <NavBar onOpenCart={() => setDrawerOpen(true)} />
            <Outlet />
        </>
    )
}