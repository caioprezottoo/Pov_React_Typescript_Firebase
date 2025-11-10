import Button from "@/components/Button"
import Input from "@/components/Input"
import Text from "@/components/Text"
import Arrow from "@/assets/svg/arrowblack.svg?react"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/components/Firebase"
import { useNavigate } from "react-router"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleRegister = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/explore")
        } catch (error) {
            alert(error);
        }
    }

    return (
        <form
            className="min-h-screen flex lg:justify-start"
            onSubmit={handleRegister}
        >
            <div className="w-full flex flex-col gap-10 justify-center mx-10 sm:mx-30 lg:mx-40">
                <Text variant="dm-text-lg">Let's get you started!</Text>

                <div className="flex flex-col gap-3">
                    <div>
                        <Text variant="l-text-md" className="ml-4">
                            Email
                        </Text>
                        <Input
                            variant="primary"
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </div> <div>
                        <Text variant="l-text-md" className="ml-4">
                            Password
                        </Text>
                        <Input
                            variant="primary"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                </div>

                <Button
                    variant="secondary"
                    icon={Arrow}
                    type="submit"
                />

            </div>
        </form>
    )
}
