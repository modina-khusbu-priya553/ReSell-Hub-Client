"use client";
import UpdateProfile from "@/components/Seller/Profile/UpdateProfile";

const SellerProfile = () => {
  return (
    <div className="mx-auto max-w-2xl py-4 md:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Update your personal information.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <UpdateProfile></UpdateProfile>
      </div>
    </div>
  );
};

export default SellerProfile;
