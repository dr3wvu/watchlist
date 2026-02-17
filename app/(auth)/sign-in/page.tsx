"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInWithEmail } from "@/lib/actions/auth.actions";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const onSubmit = async (data: SignInFormData) => {
    setSubmitError(undefined);
    try {
      //
      const result = await signInWithEmail(data);
      if (result.success) {
        router.push("/");
      }
      console.log(result);
      setSubmitError(result.error);
    } catch (e) {
      console.log(e);
      toast.error("Sign in failed", {
        description: e instanceof Error ? e.message : "Failed to sign in",
      });
      setSubmitError("Sign in failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className="form-title">Welcome Back</h1>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("VALIDATION ERRORS:", errors);
        })}
        className="space-y-5"
      >
        <InputField
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter password"
          type="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In" : "Sign In"}
        </Button>

        {submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )}

        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
