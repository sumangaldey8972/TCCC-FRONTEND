
import { Field, ErrorMessage, Formik, Form } from "formik";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

interface SigninFormProps {
    onSubmit: (values: {
        userName: string;
        password: string;
    }) => void;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()

    // Signup validation
    const signinValidationSchema = Yup.object({
        userName: Yup.string()
            .required("Username or Email is required")
            .test("is-valid-username-or-email", "Enter a valid email or username", (value) => {
                if (!value) return false;

                const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                const isUsername = /^[a-zA-Z0-9_]{3,}$/.test(value); // username: 3+ chars, letters/numbers/_

                return isEmail || isUsername;
            }),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Minimum 8 characters")
    });

    const handleNavigate = () => {
        router.push("/auth/sign-up")
    }

    return (
        <>
            <div className="text-left mb-8">
                <h2 className="text-2xl font-semibold text-text-primary mb-2">
                    Admin |   Login
                </h2>
            </div>

            <Formik
                initialValues={{ userName: "", password: "" }}
                validationSchema={signinValidationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-text-primary/60 mb-2 flex items-center gap-2">
                                <User className="w-4 h-4 text-text-primary/70" />
                                Enter Username or Email
                            </label>
                            <Field
                                type="text"
                                name="userName"
                                placeholder="Enter your trading username"
                                className={`text-text-primary w-full rounded-xl bg-bg-secondary border p-4 focus:outline-none transition-all duration-300 ${errors.userName && touched.userName
                                    ? "border-red-500 ring-2 ring-red-500/20 shake"
                                    : "border border-bg-secondary focus:border-[#6EE7B7] focus:ring-2 focus:ring-[#6EE7B7]/20"
                                    }`}
                            />
                            <ErrorMessage
                                name="userName"
                                component="p"
                                className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-text-primary/60 mb-2 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-text-primary/70" />
                                Password
                            </label>
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create secure password"
                                    className={`text-text-primary w-full rounded-xl bg-bg-secondary border p-4 pr-12 focus:outline-none transition-all duration-300 ${errors.password && touched.password
                                        ? "border-red-500 ring-2 ring-red-500/20 shake"
                                        : "border border-bg-secondary focus:border-[#6EE7B7] focus:ring-2 focus:ring-[#6EE7B7]/20"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#4965d2] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="p"
                                className="text-red-500 text-sm mt-2 flex items-center gap-1"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#3B82F6] to-[#6EE7B7] hover:from-[#2563EB] hover:to-[#10B981] transition-all duration-300 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none shadow-lg shadow-[#4965d2]/20"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>

                        {/* Security notice */}
                        <div className="text-center">
                            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                                🔒 SSL Encrypted • 256-bit Security
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default SigninForm;