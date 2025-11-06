import { NavLink, Outlet, useLocation } from "react-router";

import SignupBg from '@/assets/svg/signupbg.svg'
import LoginBg from '@/assets/svg/loginbg.svg'
import Icon from "@/components/Icon";
import Arrow from "@/assets/svg/arrow.svg?react"

export default function AuthLayout() {
    const location = useLocation()
    const currentPath = location.pathname

    let backgroundImage = ''

    if (currentPath.includes('/signup')) {
        backgroundImage = SignupBg
    } else if (currentPath.includes('/login')) {
        backgroundImage = LoginBg
    }

    const bgStyle = {
        backgroundImage: `url(${backgroundImage})`
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={bgStyle}
        >
            <NavLink to='/'>
                <Icon svg={Arrow} className="absolute top-14 left-10 z-20 cursor-pointer" />
            </NavLink>

            <Outlet />
        </div>
    )
}
