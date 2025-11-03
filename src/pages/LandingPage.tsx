import BgImage from '../assets/png/bg.png'
import FirstSection from '../core-components/Landing Page/FirstSection'

export default function LandingPage() {
    return (
        <div
            className="min-h-screen w-full bg-no-repeat bg-cover bg-start"
            style={{ backgroundImage: `url(${BgImage})` }}
        >
            <FirstSection />
        </div>
    )
}
