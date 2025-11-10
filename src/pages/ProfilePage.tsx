import Button from "@/components/Button";
import { auth } from "@/components/Firebase";
import Text from "@/components/Text";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";

export default function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();


    if (!user) return (
        <div className="flex items-center justify-center w-full">
            <Text variant={"l-text-sm"}>Loading...</Text>
        </div>
    )

    async function handleLogout() {
        try {
            await auth.signOut()
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-6 flex flex-col items-center justify-center w-full gap-10">

            <div className="gap-3 text-center">
                <Text as="p" variant="l-text-md">Name: {user.name}</Text>
                <Text as="p" variant="l-text-md">Email: {user.email}</Text>
            </div>
            <Button variant={'primary'} onClick={handleLogout}>Logout</Button>
        </div>
    );
}
