import { Outlet, useLocation } from 'react-router'
import Text from "@/components/Text";
import AnimatedContent from './AnimatedContent';
import BlurText from './BlurText';
import { textVariants } from '@/variants/text-variants';
import { useAuth } from "@/context/AuthContext";

export default function MainContent() {
    const location = useLocation()
    const currentPath = location.pathname
    const { user } = useAuth();

    let titleText = ''
    let subText = ''

    if (currentPath.includes('/explore')) {
        titleText = `Welcome, ${user?.name}!`
        subText = "Here's what we've been watching…"
    } else if (currentPath.includes('/reviewed')) {
        titleText = 'Such a good taste!'
        subText = "Here's what you've reviewed so far..."
    } else if (currentPath.includes('/watch-list')) {
        titleText = 'Which movie are you watching today?'
        subText = "Here's what you added to your Watch List..."
    } else if (currentPath.includes('/profile')) {
        titleText = 'This is your profile'
        subText = "Here's what you can do..."
    } else if (currentPath.includes('/movie')) {
        titleText = 'About the movie'
        subText = "Here's what you need to know..."
    }

    return (
        <section className="flex-1 flex flex-col">
            <div className="flex flex-col items-center gap-1 m-12 text-center">
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
                    <Text variant="dm-text-lg">{titleText}</Text>
                </AnimatedContent>
                <BlurText
                    text={subText}
                    delay={50}
                    animateBy="words"
                    direction="top"
                    className={`flex justify-center ${textVariants({ variant: "l-text-md" })}`}
                />
            </div>

            <div className={`
                flex-1 w-full max-w-6xl rounded-t-2xl
                bg-gradient-content-bg mx-auto flex
                shadow-[inset_0_8px_20px_rgba(0,0,0,0.25)]`}>
                <Outlet />
            </div>
        </section>
    )
}
