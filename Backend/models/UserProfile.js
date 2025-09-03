import mongoose  from "mongoose";
const userProfileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bannerImage: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    pronoun: {
        type: String,
        default: ""
    },
    skill: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: ""
    }
},{timestamps: true})

const Profile = mongoose.model("Profile", userProfileSchema);
export default Profile; 