import { createSlice } from "@reduxjs/toolkit";

const ProfileSetupSlice = createSlice({
  name: "ProfileSetup",
  initialState: {
    profilePic: "",
    fullname: "",
    email: "",
    dob: "",
    gender: "",
    bio: "",
    locationName: "",
    locationCoordinates: {},
    interests: [],
    twoBestPics: [],
    preferenceGender: "",
  },
  reducers: {
    firstPage: (state, action) => {
      state.profilePic = action.payload.profilePic;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
      state.bio = action.payload.bio;
    },
    secondPage: (state, action) => {
      state.locationName = action.payload.locationName;
      state.locationCoordinates = action.payload.locationCoordinates;
      state.interests = action.payload.interests;
    },
    thirdPage: (state, action) => {
      state.twoBestPics = action.payload.twoBestPics;
      state.preferenceGender = action.payload.preferenceGender;
    },
  },
});

export const { firstPage, secondPage, thirdPage } = ProfileSetupSlice.actions;

export default ProfileSetupSlice.reducer;
