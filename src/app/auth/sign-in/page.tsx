"use client";

import { toastLoading, toastUpdate } from "@/app/utils/toast-message";
import appClient from "@/lib/appClient";
import SigninForm from "@/components/signin/SigninForm";
import { useDispatch } from "react-redux";
import { signin } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const SigninPage = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    // Handle signup submission
    const handleSignup = async (values: {
        userName: string;
        password: string;
    }) => {
        console.log("sign in validaiton", values)
        const toastId = toastLoading("Signing in...", {
            description: "Checking your credentials, please wait"
        })

        try {
            const res = await appClient.post("/api/auth/sign-in", values)
            console.log("checking sign in", res)
            if (res.data.status) {
                const user = res.data.user
                toastUpdate(toastId, "success", "Sign in successfull", {
                    description: res.data.message || "Signed in,"
                })
                router.push("/")
                dispatch(signin({ user }))
            } else {
                toastUpdate(toastId, "error", "Sign in error", {
                    description: res.data.message || "Signed in,"
                })
            }

        } catch (error) {
            console.log("this is an error while sign in", error)
        }


    };

    return (
        <div className="text-[#0D0D2B] overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md">
                    <div className=" rounded-2xl p-4 md:p-8 backdrop-blur-sm relative overflow-hidden">
                        <SigninForm
                            onSubmit={handleSignup}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SigninPage;