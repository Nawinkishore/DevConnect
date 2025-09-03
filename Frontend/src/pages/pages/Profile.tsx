import { Pencil } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfileById } from "../../store/profile/profilleSlice";
import { backendUrl } from "../../api/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import ShinyText from "../../components/ShinyText";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { RootState, AppDispatch } from "../../store/store";

const backendBaseUrl = "http://localhost:5000";

const Profile = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { profile } = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState({
    bannerImage: null as File | null,
    image: null as File | null,
    name: "",
    pronoun: "",
    skill: "",
    location: "",
    about: "",
  });

  // Fetch profile on mount
  useEffect(() => {
    if (id) {
      dispatch(getProfileById(id)); // pass id
    }
  }, [id, dispatch]);

  // Sync profile -> form
  useEffect(() => {
    if (profile) {
      setFormData({
        bannerImage: null,
        image: null,
        name: profile.name || "",
        pronoun: profile.pronoun || "",
        skill: profile.skill || "",
        location: profile.location || "",
        about: profile.about || "",
      });
    }
  }, [profile]);

  const getImageUrl = (imgPath?: string) =>
    imgPath ? `${backendBaseUrl}/uploads/${imgPath.replace(/\\/g, "/")}` : undefined;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePronounChange = (value: string) => {
    setFormData((prev) => ({ ...prev, pronoun: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();

    if (formData.bannerImage) fd.append("bannerImage", formData.bannerImage);
    if (formData.image) fd.append("image", formData.image);

    fd.append("name", formData.name);
    fd.append("pronoun", formData.pronoun);
    fd.append("skill", formData.skill);
    fd.append("location", formData.location);
    fd.append("about", formData.about);

    dispatch(updateProfile(fd));
    setDialogOpen(false);
  };

  return (
    <section className="flex w-full p-6 min-h-screen">
      <div className="w-9/12 border rounded-3xl bg-white shadow-md ">
        {/* Banner */}
        <div className="h-64 rounded-t-3xl relative  bg-gray-200">
          {profile?.bannerImage && (
            <img
              src={getImageUrl(profile.bannerImage)}
              alt="Banner"
              className="w-full h-full object-cover rounded-t-3xl"
            />
          )}
          {/* Profile Image */}
          {profile?.image && (
            <img
              src={getImageUrl(profile.image)}
              alt="Profile"
              className="w-36 h-36 rounded-full absolute -bottom-16 left-10 border-4  object-cover z-10"
            />
          )}
          {/* Edit Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
              >
                <Pencil className="w-5 h-5 text-gray-700" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile details and images here.
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="banner">Banner Image</Label>
                  <Input
                    id="banner"
                    type="file"
                    accept="image/*"
                    name="bannerImage"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="profile">Profile Image</Label>
                  <Input
                    id="profile"
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Pronoun</Label>
                  <Select id="pronoun" value={formData.pronoun} onValueChange={handlePronounChange} name="pronoun" className="w-full">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your pronoun" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="he/him">he/him</SelectItem>
                      <SelectItem value="she/her">she/her</SelectItem>
                      <SelectItem value="they/them">they/them</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="skill">Skill</Label>
                  <Textarea
                    id="skill"
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="mt-2">
                  Save Changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Profile Info */}
        <div className="ml-10 p-3 mt-20">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {profile?.name}
            {profile?.pronoun && (
              <span className="text-xs bg-black text-white p-1 rounded-2xl">
                <ShinyText
                  text={profile.pronoun}
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </span>
            )}
          </h1>
          <p className="text-gray-700">{profile?.skill}</p>
          <p className="text-gray-500">{profile?.location}</p>
          <div className="">
            <h2 className="font-semibold">About</h2>
            <p className="text-sm text-gray-600">{profile?.about}</p>
          </div>
          <main className="space-x-2 mt-3">
            <Badge asChild>
              <Link to="/">Github</Link>
            </Badge>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Profile;
