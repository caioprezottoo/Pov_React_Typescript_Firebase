import { Outlet, useLocation } from 'react-router'
import Text from "@/components/Text";

export default function MainContent() {
    const location = useLocation()
    const currentPath = location.pathname

    let titleText = ''
    let subText = ''

    if (currentPath.includes('/explore')) {
        titleText = 'Welcome Back!'
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
    }

    return (
        <section className="flex-1 flex flex-col">
            <div className="flex flex-col items-center gap-1 m-12">
                <Text variant="dm-text-lg">{titleText}</Text>
                <Text variant="l-text-md">{subText}</Text>
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
