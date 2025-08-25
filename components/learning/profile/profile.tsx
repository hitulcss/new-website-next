'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronRight, LogOut, BookOpen, UserCircle, ShoppingBag, Pencil } from "lucide-react";
import { getItem, removeItem } from "@/lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const storedUser = JSON.parse(getItem("userProfile") as string);
    console.log(storedUser, "stroed user ");
    if (storedUser) {

      // const initials = parsed.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "U";

      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    removeItem("authToken");
    removeItem("userInfo");
    router.push("/");
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-10">
      <div className="text-sm text-muted-foreground mb-4 item-left">
        Home <span className="mx-1">{">"}</span>
        <span className="text-primary font-medium">My Profile</span>
      </div>

      <div className="flex flex-col items-center gap-2 mb-8">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.profilePhoto ?? ''} alt={user.name} />
          <AvatarFallback> {user.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Enroll Id:</span> {user?.enrollId ?? ''}
        </p>
      </div>

      <div className="space-y-4">
        {/* Personal Info Card */}
        <Card onClick={() => setShowPopup(true)} className="cursor-pointer hover:shadow-md transition">
          <CardContent className="flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <UserCircle className="w-6 h-10 text-primary" />
              <div>
                <p className="font-medium">Personal Information</p>
                <p className="text-sm text-muted-foreground">Edit Phone, Email, Profile Name, Address</p>
              </div>
            </div>
            <ChevronRight className="text-muted-foreground" />
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="cursor-pointer hover:shadow-md transition">
          <Link href="/learning/my-courses">
            <CardContent className="flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">Courses</p>
                  <p className="text-sm text-muted-foreground">See your enrolled courses</p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground" />
            </CardContent>
          </Link>
        </Card>

        {/* Purchases */}
        <Card className="cursor-pointer hover:shadow-md transition">
          <Link href="/learning/my-purchases">
            <CardContent className="flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium">My Purchase</p>
                  <p className="text-sm text-muted-foreground">See your purchased courses</p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground" />
            </CardContent>
          </Link>
        </Card>

        {/* Logout */}
        <Card onClick={handleLogout} className="cursor-pointer hover:shadow-md transition">
          <CardContent className="flex items-center gap-4 px-6">
            <LogOut className="w-6 h-6 text-destructive" />
            <p className="font-medium text-destructive">Logout</p>
          </CardContent>
        </Card>
      </div>

      {/* Personal Info Popup Modal */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-md bg-white rounded-2xl shadow-lg border text-black">
          <div className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Personal Information</h2>
              <Pencil className="w-5 h-5 cursor-pointer text-gray-500" />
            </div>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user?.name ?? ''}</p>
              <p><strong>Email:</strong> {user?.email ?? ''}</p>
              <p><strong>Mobile:</strong> {user?.mobile ?? ''}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
