import { Pencil } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from '../../store/profile/profilleSlice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { getProfileById } from "../../store/profile/profilleSlice";
import type { RootState, AppDispatch } from "../../store/store";

const Profile = () => {
  // Backend base URL for images
  const backendUrl = "http://localhost:5000"; // Change to your backend URL if different
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  const { profile, loading, error } = useSelector((state: RootState) => state.profile)
 

  useEffect(() => {
    if (id) {
      dispatch(getProfileById())
    }
  }, [id, dispatch])

  const [formData, setFormData] = useState({
  bannerImage: null,
  image: null,
  name: "",
  pronoun: "",
  skill: "",
  location: "",
  about: "",
  experience: ""
});


 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  if (type === "file" && e.target instanceof HTMLInputElement) {
    const files = e.target.files;
    setFormData({
      ...formData,
      [name]: files && files.length > 0 ? files[0] : null
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleOnClick = (e: React.FormEvent) => {
  e.preventDefault();
  
  const fd = new FormData();
  if (formData.bannerImage) fd.append("bannerImage", formData.bannerImage);
  if (formData.image) fd.append("image", formData.image);
  fd.append("name", formData.name);
  fd.append("pronoun", formData.pronoun);
  fd.append("skill", formData.skill);
  fd.append("location", formData.location);
  fd.append("about", formData.about);
  fd.append("experience", formData.experience);

  dispatch(updateProfile(fd)); // Pass FormData, not object
};


  const user = useSelector((state: RootState) => state.auth.user)
  console.log(user)

  return (
    <section>
      <div className='flex w-full p-6 h-screen '>
        <div className='w-9/12 h-max border rounded-3xl'>
          <div className="h-48 bg-black rounded-tr-3xl rounded-tl-2xl relative">
            {/* Banner Image */}
            <img
              src={profile?.bannerImage ? `${backendUrl}/uploads/${profile.bannerImage}` : undefined}
              alt="Banner"
              className="w-full h-48 object-cover rounded-tr-3xl rounded-tl-2xl"
              style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            />
            {/* Profile Image */}
            <img
              src={profile?.image ? `${backendUrl}/uploads/${profile.image}` : undefined}
              alt="Profile"
              className="w-36 h-36 rounded-full absolute -bottom-15 left-10 border-4 border-white object-cover"
              style={{ zIndex: 1 }}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Pencil className="text-black absolute -bottom-15 right-10 hover:cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[100vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your profile details and images here.</DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleOnClick}>
                  <div className="space-y-2">
                    <Label htmlFor="banner">Banner Image</Label>
                    <Input id="banner" type="file" accept="image/*" name="bannerImage" onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile">Profile Image</Label>
                    <Input id="profile" type="file" accept="image/*" name="image" onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" name="name" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pronoun">Pronoun</Label>
                    <Input id="pronoun" placeholder="he/him, she/her, they/them..." name="pronoun" value={formData.pronoun} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill">Skill</Label>
                    <Input id="skill" placeholder="e.g. Web Developer, Designer" name="skill" value={formData.skill} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter your location" name="location" value={formData.location} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <Textarea id="about" placeholder="Tell us about yourself..." name="about" value={formData.about} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea id="experience" placeholder="Your past experience..." name="experience" value={formData.experience} onChange={handleInputChange} />
                  </div>
                  <Button type="submit" className="mt-4">Save Changes</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="ml-10 p-3">
            <h1 className='text-3xl font-bold mt-16 flex items-center gap-2'>
              {profile?.name || ""}
              <span className="font-light text-xs">{profile?.pronoun || ""}</span>
            </h1>
            <p>{user.email}</p>
            <p>{profile?.skill || ""}</p>
            <p>{profile?.location || ""}</p>
            <main className="space-x-2">
              <Badge asChild variant="destructive">
                <Link to="/">Verified</Link>
              </Badge>
              <Badge asChild>
                <Link to="/">Github</Link>
              </Badge>
            </main>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
