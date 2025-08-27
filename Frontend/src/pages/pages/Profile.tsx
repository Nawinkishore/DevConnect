
    import { Pencil } from "lucide-react"
    import { Badge } from "../../components/ui/badge"
    import { Link } from "react-router-dom"
    import { Input } from "../../components/ui/input"
    import { Textarea } from "../../components/ui/textarea"
    import { Button } from "../../components/ui/button"
    import { Label } from "../../components/ui/label"
    import { useState } from "react"
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from "../../components/ui/dialog"
    const Profile = () => {
        const [formData, setFormData] = useState({
            bannerImage: "",
            image: "",
            name: "",
            pronoun: "",
            skill: "",
            location: "",
            about: "",
            experience: ""
        });
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
        const handleOnClick = (e: React.FormEvent) => {
            e.preventDefault(); 
            console.log(formData);
        };
        return (
            <section>
                <div className='flex w-full p-6 h-screen '>
                    <div className='w-9/12 h-96  border rounded-3xl'>
                        <div className="h-48 bg-black rounded-tr-3xl rounded-tl-2xl relative">
                            <div className="w-36 h-36 bg-red-500 rounded-full absolute -bottom-15  left-10"></div>
                            <Dialog >
                                <DialogTrigger asChild>
                                    <Pencil className="text-black absolute -bottom-15 right-10 hover:cursor-pointer" />
                                </DialogTrigger>

                                <DialogContent className="max-w-lg max-h-[100vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                        <DialogDescription>
                                            Update your profile details and images here.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form className="flex flex-col gap-4" onSubmit={handleOnClick}>
                                        {/* Banner Image */}
                                        <div className="space-y-2">
                                            <Label htmlFor="banner">Banner Image</Label>
                                            <Input id="banner" type="file" accept="image/*" name="bannerImage" value={formData.bannerImage} onChange={handleInputChange} />
                                        </div>

                                        {/* Profile Image */}
                                        <div className="space-y-2">
                                            <Label htmlFor="profile">Profile Image</Label>
                                            <Input id="profile" type="file" accept="image/*" name="image" value={formData.image} onChange={handleInputChange} />
                                        </div>

                                        {/* Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="Enter your name" name="name" value={formData.name} onChange={handleInputChange} />
                                        </div>

                                        {/* Pronoun */}
                                        <div className="space-y-2">
                                            <Label htmlFor="pronoun">Pronoun</Label>
                                            <Input id="pronoun" placeholder="he/him, she/her, they/them..." name="pronoun" value={formData.pronoun} onChange={handleInputChange} />
                                        </div >

                                        {/* Skill */}
                                        <div className="space-y-2">
                                            <Label htmlFor="skill">Skill</Label>
                                            <Input id="skill" placeholder="e.g. Web Developer, Designer" name="skill" value={formData.skill} onChange={handleInputChange} />
                                        </div>

                                        {/* Location */}
                                        <div   className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input id="location" placeholder="Enter your location" name="location" value={formData.location} onChange={handleInputChange} />
                                        </div>

                                        {/* About */}
                                        <div className="space-y-2">
                                            <Label htmlFor="about">About</Label>
                                            <Textarea id="about" placeholder="Tell us about yourself..."  name="about" value={formData.about} onChange={handleInputChange} />
                                        </div>

                                        {/* Experience */}
                                        <div className="space-y-2">
                                            <Label htmlFor="experience">Experience</Label>
                                            <Textarea id="experience" placeholder="Your past experience..." name="experience" value={formData.experience} onChange={handleInputChange} />
                                        </div>

                                        {/* Save Button */}
                                        <Button  type="submit" className="mt-4">Save Changes</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="ml-10">
                            <h1 className='text-3xl font-bold  mt-16 flex items-center gap-2'>John Doe <span className="font-light text-xs">He/Him</span></h1>
                            <p>Web Developer | MERN Stack, Redux Thunk</p>
                            <p>Tamil Nadu, India.</p>
                            <main className="space-x-2">
                                <Badge asChild variant="destructive">
                                    <Link to="/">Verified</Link>
                                </Badge>
                                <Badge asChild>
                                    <Link to="/">Github</Link>
                                </Badge>
                            </main>


                        </div>
                        {/* ABOUT */}
                        <div className="h-9/12 bg-white border mt-10 rounded-2xl p-6 space-y-2">
                            <h1 className="text-2xl font-bold">About</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            <h1 className="text-2xl font-bold ">Experience</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                        </div>


                    </div>
                    <div>

                    </div>
                </div>
                {/* Dialog moved to Pencil icon above */}
            </section>
        )
    }

    export default Profile
