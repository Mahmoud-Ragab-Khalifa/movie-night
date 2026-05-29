"use client";

import CustomInput from "@/components/CustomInput";
import { ActionState } from "@/types/actionState";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "../_actions/updateProfile";
import { Button } from "@/components/Button";
import { UserProfile } from "@/types/userProfile";
import Image from "next/image";
import UploadImage from "@/components/UploadImage";

const Form = ({ userProfile }: { userProfile: UserProfile }) => {
  const [selectedImage, setSelectedImage] = useState(
    userProfile.image_url ?? "",
  );

  const formData = new FormData();

  Object.entries(userProfile).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image_url") {
      formData.append(key, value.toString());
    }
  });

  const initialState: ActionState = {
    status: null,
    message: "",
    formData,
    errors: {},
  };

  const [state, action, pending] = useActionState(
    updateProfile.bind(null, userProfile.id),
    initialState,
  );

  useEffect(() => {
    if (state && state.message && state.status && !pending) {
      if (state.status === 200) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [pending, state]);

  return (
    <form action={action} className="grid gap-5">
      <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-5 xl:gap-10">
        <div className="grid gap-5 flex-1">
          <CustomInput
            id="userName"
            name="userName"
            type="text"
            label="User Name"
            error={state.errors?.userName}
            defaultValue={
              (state.formData?.get("userName") as string) ??
              formData.get("user_name")
            }
          />

          <CustomInput
            id="email"
            name="email"
            type="email"
            label="Email"
            error={state.errors?.email}
            defaultValue={formData.get("email") as string}
            readOnly
            className="opacity-40"
          />

          <CustomInput
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            error={state.errors?.fullName}
            defaultValue={
              (state.formData?.get("fullName") as string) ??
              formData.get("full_name")
            }
          />

          <CustomInput
            id="phone"
            name="phone"
            type="text"
            label="Phone Number"
            error={state.errors?.phone}
            defaultValue={
              (state.formData?.get("phone") as string) ?? formData.get("phone")
            }
          />

          <CustomInput
            id="bio"
            name="bio"
            type="text"
            label="Bio"
            error={state.errors?.bio}
            defaultValue={
              (state.formData?.get("bio") as string) ?? formData.get("bio")
            }
          />
        </div>

        <div className="group relative w-50 h-50 overflow-hidden rounded-full mx-auto">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="user"
              fill
              sizes="200px"
              className="object-cover object-center"
            />
          )}

          <div
            className={`absolute top-0 left-0 w-full h-full bg-surface ${selectedImage && "group-hover:opacity-50 opacity-0 transition-opacity duration-300"}`}
          >
            <UploadImage setSelectedImage={setSelectedImage} />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="default"
        disabled={pending}
      >
        {pending ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default Form;
