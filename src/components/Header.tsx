import { NavLink } from 'react-router'

import Icon from './Icon'
import Logo from '@/assets/svg/logo.svg?react'
import Container from './Container'
import Text from './Text'

export default function Header() {
    const pages = ['Explore', 'Reviewed', 'Watch-List', 'Profile']

    return (
        <header>
            <Container className='flex flex-col items-center gap-5 lg:gap-8 p-14'>
                <NavLink to="/explore">
                    <Icon svg={Logo} className='cursor-pointer w-13 sm:w-14 lg:w-16'></Icon>
                </NavLink>

                <div className='flex gap-5 lg:gap-8'>
                    {pages.map((item, index) => (
                        <NavLink key={index} to={`/${item.toLowerCase()}`}>
                            <Text
                                key={index}
                                variant={"dm-text-sm"}
                                className='cursor-pointer border-b border-transparent hover:border-gray-100 transition-colors duration-300'
                            >
                                {item}
                            </Text>
                        </NavLink>

                    ))}
                </div>

            </Container>
        </header>
    )
}
