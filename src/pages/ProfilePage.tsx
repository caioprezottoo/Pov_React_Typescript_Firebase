import Button from "@/components/Button";
import { auth, db } from "@/components/Firebase";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import Text from "@/components/Text";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

export default function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user)
        return (
            <div className="flex items-center justify-center w-full">
                <Text variant={"l-text-sm"}>Loading...</Text>
            </div>
        );

    async function handleLogout() {
        try {
            await auth.signOut();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteAccount() {
        if (
            !window.confirm(
                "Are you sure you want to delete your account? This cannot be undone."
            )
        ) {
            return;
        }

        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                alert("No user currently logged in.");
                return;
            }

            await deleteDoc(doc(db, "Users", currentUser.uid));

            await deleteUser(currentUser);

            navigate("/");
        } catch (error) {
            console.error(error);

            if (error instanceof FirebaseError) {
                if (error.code === "auth/requires-recent-login") {
                    alert("Please log in again before deleting your account.");
                    await auth.signOut();
                    navigate("/login");
                } else {
                    alert("An error occurred while deleting your account.");
                }
            }
        }
    }

    return (
        <div className="p-6 flex flex-col items-center justify-center w-full gap-10">
            <div className="gap-3 text-center">
                <Text as="p" variant="l-text-md">
                    Name: {user.name}
                </Text>
                <Text as="p" variant="l-text-md">
                    Email: {user.email}
                </Text>
            </div>

            <div className="flex flex-col gap-3">
                <Button variant="primary" onClick={handleLogout}>
                    Logout
                </Button>
                <Button variant="primary" className="bg-red text-gray-100" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </div>
        </div>
    );
}
