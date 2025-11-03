import Icon from '../../components/Icon'
import Logo from '../../assets/svg/logo.svg?react'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Container from '../../components/Container'

export default function FirstSection() {
    return (
        <Container className='min-h-screen flex flex-col items-center justify-center'>
            <Icon svg={Logo}></Icon>
            <div className='flex flex-col gap-1 mt-18'>
                <Text variant={"m-text-xl"}>Point of view!</Text>
                <Text variant={"l-text-lg"} className='text-center'>Get ready to jump into nostalgia and exploring. Show your “pov”, review and create a list of your favorite movies of all time!</Text>
            </div>

            <div className='flex flex-col gap-5 mt-12'>
                <Button variant={"primary"}>Get Started</Button>
                <Button variant={"secondary"}>Sign in</Button>
            </div>
        </Container>
    )
}
