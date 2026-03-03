"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  LoaderCircle,
  Save,
  Camera,
  KeyRound,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";
import { UserAvatar } from "@/components/UserAvatar";
import { LoaderComponent } from "@/components/LoaderComponent";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  newsletterSubscribed: boolean;
}

export default function MyProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [requestingReset, setRequestingReset] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(true);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data);
      setName(data.name);
      setPhone(data.phone);
      setNewsletterSubscribed(data.newsletterSubscribed);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, newsletterSubscribed }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();
      setProfile((prev) => (prev ? { ...prev, ...data.user } : prev));
      await updateSession({ name });

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved.",
      });
    } catch {
      toast({
        title: "Update Failed",
        description: "Could not save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image under 2MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        const res = await fetch("/api/user/upload-avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        setProfile((prev) =>
          prev ? { ...prev, profileImage: data.profileImage } : prev,
        );
        await updateSession({ image: data.profileImage });
        router.refresh();

        toast({
          title: "Photo Updated",
          description: "Your profile picture has been updated.",
        });
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast({
        title: "Upload Failed",
        description: "Could not upload image.",
        variant: "destructive",
      });
      setUploadingImage(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!session?.user?.email) return;
    setRequestingReset(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (!res.ok) throw new Error("Failed");

      toast({
        title: "Reset Email Sent",
        description: "Check your inbox for a password reset link.",
      });
    } catch {
      toast({
        title: "Request Failed",
        description: "Could not send reset email.",
        variant: "destructive",
      });
    } finally {
      setRequestingReset(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const res = await fetch("/api/user/profile", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });

      signOut({ callbackUrl: "/" });
    } catch {
      toast({
        title: "Deletion Failed",
        description: "Could not delete account.",
        variant: "destructive",
      });
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoaderComponent />
      </div>
    );
  }

  if (!profile) return null;

  const hasChanges =
    name !== profile.name ||
    phone !== profile.phone ||
    newsletterSubscribed !== profile.newsletterSubscribed;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold text-2xl lg:text-3xl text-white">
          My Profile
        </h1>
        <p className="text-sm text-white-60">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="flex flex-row items-center gap-6 p-6 rounded-2xl bg-burgundy-800">
        <label className="relative group cursor-pointer">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-burgundy-700 flex items-center justify-center">
            {profile.profileImage ? (
              <UserAvatar src={profile.profileImage} alt="Profile" size={80} />
            ) : (
              <User size={32} className="text-white-60" />
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {uploadingImage ? (
              <LoaderCircle className="animate-spin h-5 w-5 text-white" />
            ) : (
              <Camera size={20} className="text-white" />
            )}
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={uploadingImage}
            onChange={handleImageUpload}
          />
        </label>
        <div className="flex flex-col gap-1">
          <p className="font-bold text-lg text-white">{profile.name}</p>
          <p className="text-xs text-white-60">{profile.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6 rounded-2xl bg-burgundy-800">
        <h2 className="font-bold text-lg text-white">Personal Information</h2>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-xs text-white-60 uppercase">
            Full Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-burgundy-900 border-burgundy-700 text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-xs text-white-60 uppercase">
            Email Address
            <span className="text-white-60 normal-case ml-2">(read-only)</span>
          </label>
          <Input
            value={profile.email}
            disabled
            className="bg-burgundy-900 border-burgundy-700 text-white-60 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-xs text-white-60 uppercase">
            Phone Number
          </label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-burgundy-900 border-burgundy-700 text-white"
          />
        </div>

        {hasChanges && (
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-crimson-600 hover:bg-crimson-500 self-end gap-2"
          >
            {saving ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              <Save size={16} />
            )}
            <span>Save Changes</span>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-burgundy-800">
        <h2 className="font-bold text-lg text-white">Password</h2>
        <p className="text-xs text-white-60">
          We&apos;ll send a password reset link to your email address.
        </p>
        <Button
          onClick={handlePasswordReset}
          disabled={requestingReset}
          variant="outline"
          className="border-burgundy-700 text-white hover:bg-burgundy-700 self-start gap-2"
        >
          {requestingReset ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <KeyRound size={16} />
          )}
          <span>Reset Password</span>
        </Button>
      </div>

      <div className="flex flex-row items-center justify-between p-6 rounded-2xl bg-burgundy-800">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-sm text-white">
            Newsletter Subscription
          </h2>
          <p className="text-xxs text-white-60">
            Receive updates on seasonal menus and events.
          </p>
        </div>
        <Switch
          checked={newsletterSubscribed}
          onCheckedChange={(checked) => setNewsletterSubscribed(checked)}
        />
      </div>

      <Separator className="bg-burgundy-700" />

      <div className="flex flex-col gap-4 p-6 rounded-2xl border border-red-900/50 bg-red-950/20">
        <h2 className="font-bold text-lg text-red-400">Danger Zone</h2>
        <p className="text-xs text-white-60">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        {showDeleteConfirm ? (
          <div className="flex flex-row gap-3">
            <Button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-500 gap-2"
            >
              {deleting ? (
                <LoaderCircle className="animate-spin h-4 w-4" />
              ) : (
                <Trash2 size={16} />
              )}
              <span>Yes, Delete My Account</span>
            </Button>
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              variant="outline"
              className="border-burgundy-700 text-white"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowDeleteConfirm(true)}
            variant="outline"
            className="border-red-800 text-red-400 hover:bg-red-950 self-start gap-2"
          >
            <Trash2 size={16} />
            <span>Delete Account</span>
          </Button>
        )}
      </div>
    </div>
  );
}
