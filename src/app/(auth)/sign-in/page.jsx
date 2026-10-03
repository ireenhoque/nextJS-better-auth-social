"use client";

import { signIn } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
    Button,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    Link,
    TextField,
} from "@heroui/react";
import { useState } from "react";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        console.log("form data:", {
            email,
            password,
        });

        const { data: resData, error } = await signIn.email({
            email,
            password,
            callbackURL: "/",
        });

        console.log("after submit:", resData, error);

        if (error) {
            setErrorMessage(
                error.message || "Invalid email or password."
            );
            return;
        }

        console.log("Login successful:", resData);
    };

    return (
        <div className="min-h-screen">
            <div className="w-full max-w-md px-6 py-10">
                <h2 className="mb-6 text-2xl font-bold">
                    Please Sign in
                </h2>

                <Form
                    className="flex w-full flex-col items-start gap-5"
                    onSubmit={onSubmit}
                >
                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="w-full"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email address";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>

                        <Input placeholder="john@example.com" />

                        <FieldError />
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        name="password"
                        className="w-full"
                        type={isVisible ? "text" : "password"}
                        validate={(value) => {
                            if (!value) {
                                return "Password is required";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>

                        <InputGroup className="w-full">
                            <InputGroup.Input
                                name="password"
                                placeholder="Enter your password"
                                type={isVisible ? "text" : "password"}
                            />

                            <InputGroup.Suffix className="pe-0">
                                <Button
                                    type="button"
                                    isIconOnly
                                    aria-label={
                                        isVisible
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    size="sm"
                                    variant="ghost"
                                    onPress={() =>
                                        setIsVisible((prev) => !prev)
                                    }
                                >
                                    {isVisible ? (
                                        <Eye className="size-4" />
                                    ) : (
                                        <EyeSlash className="size-4" />
                                    )}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>

                        <FieldError />
                    </TextField>

                    {/* Error */}
                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <Button type="submit">
                            Sign In
                        </Button>

                        <Button
                            type="reset"
                            variant="secondary"
                            onPress={() => setErrorMessage("")}
                        >
                            Reset
                        </Button>
                    </div>
                </Form>

                <p>
                    <small>Forgot Password?
                        <Link
                        className="text-blue-500 underline"
                        href="/forgot-password">Click here</Link></small>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;