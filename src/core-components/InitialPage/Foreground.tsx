import Icon from '@/components/Icon'
import Logo from '@/assets/svg/logo.svg?react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import Container from '@/components/Container'
import BlurText from "@/components/BlurText";
import AnimatedContent from '@/components/AnimatedContent'
import { HoverButton } from "@/components/HoverButton"
import { NavLink } from 'react-router'

export default function Foreground() {

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <Container className="relative z-10 min-h-screen flex flex-col items-center justify-center">
            <Icon svg={Logo}></Icon>
            <div className='flex flex-col gap-1 mt-18 text-center'>
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={true}
                    duration={1.2}
                    initialOpacity={0.1}
                    animateOpacity
                    scale={1.2}
                    threshold={0.2}
                    delay={0.1}
                >
                    <Text variant={"m-text-xl"} className="text-center">Point of view!</Text>
                </AnimatedContent>
                <BlurText
                    text='Get ready to jump into nostalgia and exploring. Show your "pov", review and create a list of your favorite movies of all time'
                    delay={50}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="font-lato text-[20px] opacity-78 text-gray-100 justify-center text-center"
                />
            </div>

            <div className='flex flex-col gap-5 mt-12'>
                <NavLink to="/signup">
                    <Button variant={"primary"} className="">Get Started</Button>
                </NavLink>
                <NavLink to='/login'>
                    <HoverButton>Log in</HoverButton>
                </NavLink>
            </div>
        </Container>
    )
}
