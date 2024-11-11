import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    // To determine if the user is learner, educator, or tutor
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        rquired: true
    },

    suffix: {
        type: String,
        required: false
    },
    
    userType: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    // Used for learner and tutor accounts. This is the array of classes they are enrolled in. 
    enrolledClasses: {
        type: Array,
        required: false 
    },

    // Used for educator accounts. This is the array of different classes the educator made. 
    instructorClasses: {
        type: Array,
        required: false
    },

    // Used for tutor accounts. It is the list of what subjects they are good at. 
    tutorSubjects: {
        type: Array,
        required: false
    },

    resources: {
        type: Array,
        required: false
    },

    assignments: {
        type: Array,
        required: false
    },

    notifications: {
        type: Array,
        required: false
    }
    
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);

export default User;