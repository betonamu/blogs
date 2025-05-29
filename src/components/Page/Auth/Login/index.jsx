"use client";

import { useRouter } from "next/navigation";
import Form from "rc-field-form";

import { Button } from "@/components/Common/Button";
import { FormItem } from "@/components/Common/Form";
import { STORAGE_KEYS } from "@/constants";
import { paths } from "@/constants/paths";
import { login } from "@/services/auth";
import { setCookie } from "@/utils/cookie";
import { Input } from "@/components/ui/input";
import Flex from "@/components/Common/Flex";

const Login = () => {
    const { push } = useRouter();
    const handleSubmit = async (values) => {
        console.log("Form submitted with values:", values);
        const res = await login(values);
        if (res.success) {
            const { token, expiresIn } = res.data;
            setCookie(STORAGE_KEYS.TOKEN, token, { domain: "localhost", expires: expiresIn });
            push(paths.home);
        } else {
            console.error("Login failed:", res.data);
            // Handle login failure (e.g., show error message)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
            <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm border border-white/40">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h1>

                <Form
                    onFinish={handleSubmit}
                    initialValues={{ email: "admin@admin.com", password: "123456" }}
                >
                    <Flex direction="col" gap={20}>
                        <FormItem
                            name="email"
                            rules={[
                                { validate: (v) => !!v, message: "Email is required" },
                                {
                                    validate: (v) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
                                    message: "Invalid email format",
                                },
                            ]}
                        >
                            <Input type="email" placeholder="Email" />
                        </FormItem>

                        <FormItem
                            name="password"
                            rules={[
                                { validate: (v) => !!v, message: "Password is required" },
                                {
                                    validate: (v) => v.length >= 6 && v.length <= 30,
                                    message: "Password must be 6–30 characters",
                                },
                            ]}
                        >
                            <Input type="password" placeholder="Password" />
                        </FormItem>

                        <Button type="submit">Sign In</Button>
                    </Flex>
                </Form>
            </div>
        </div>
    );
};

export default Login;
