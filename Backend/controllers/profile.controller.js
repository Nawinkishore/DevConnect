import Profile from "../models/UserProfile.js";

export const getProfileById = async (req, res) => {
    try {
        const id = req.user.id; // Assuming the JWT contains the user ID in the 'id' field
        const profile = await Profile.findOne({ userId: id });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const id = req.user.id; // Assuming the JWT contains the user ID in the 'id' field
        const bannerImage = req.files?.bannerImage?.[0]?.path;
        const image = req.files?.image?.[0]?.path;
        const { name, pronoun, skill, location, about, experience } = req.body;
        const updatedProfile = await Profile.findOneAndUpdate({ userId: id }, {
            bannerImage,
            image,
            name,
            pronoun,
            skill,
            location,
            about,
            experience
        }, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};