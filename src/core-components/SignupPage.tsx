import Button from "@/components/Button"
import Input from "@/components/Input"
import Text from "@/components/Text"
import Arrow from "@/assets/svg/arrowblack.svg?react"
import { useState } from "react"

export default function SignupPage() {
    const placeholder = ['Name', 'Email', 'Password']
    const [text, setText] = useState("");
    const isClear = text.trim() === "";

    return (
        <div
            className="min-h-screen flex lg:justify-start"
        >
            <div className="w-full flex flex-col gap-10 justify-center mx-10 sm:mx-30 lg:mx-40">
                <Text variant={"dm-text-lg"}>Let's get you started!</Text>

                <div>
                    {placeholder.map((item, index) => (
                        <div className="mb-5">
                            <Text key={index} variant={"l-text-md"} className="ml-4">{item}</Text>
                            <Input onChange={(e) => {
                                setText(e.target.value)
                            }} />
                        </div>
                    ))}
                </div>
                {isClear ? "" : <Button variant={"secondary"} icon={Arrow}></Button>}

            </div>
        </div>
    )
}
