"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      country: "CA",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("submit");
    setSubmitError(null);
    try {
      const result = await signUpWithEmail(data);
      if (result?.success) {
        console.log("success");
        router.push("/");
        return;
      }

      setSubmitError(result?.error ?? "Sign up failed. Please try again.");
    } catch (e) {
      console.log(e);
      toast.error("Failed to create account");
      setSubmitError("Sign up failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up</h1>

      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("VALIDATION ERRORS:", errors);
        })}
        className="space-y-5"
      >
        <InputField
          name="name"
          label="Full name"
          placeholder="John Smith"
          register={register}
          error={errors.name}
          validation={{ required: "Name is required", minLength: 2 }}
        />

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
            message: "Email address required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start Investing"}
        </Button>

        {submitError && (
          <p className="text-red-500 text-sm text-center">{submitError}</p>
        )}
      </form>

      <FooterLink
        text="Already have an account?"
        linkText="Sign in"
        href="/sign-in"
      />
    </>
  );
};

export default SignUp;
