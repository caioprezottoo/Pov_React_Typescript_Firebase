import Header from "@/components/Header";
import MainContent from "@/components/MainContent";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-(image:--color-gradient-background)">
            <Header />
            <MainContent />
        </div>
    )
}
