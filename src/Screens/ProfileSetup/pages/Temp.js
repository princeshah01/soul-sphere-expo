const formData = new FormData();

// Convert JSON data into FormData
const userData = {
  bio: "hi",
  dob: "Sun Feb 02 2025",
  email: "sandeep@gmail.np",
  fullName: "prince raj sah",
  gender: "Male",
  interests: ["Travel", "Sports"],
  locationCoordinates: [30.7334, 76.7797], // [longitude, latitude]
  locationName: "Chandigarh, India",
  preferenceGender: "Male",
  userName: "princeraj018179",
};

// Append text fields
Object.keys(userData).forEach((key) => {
  formData.append(key, JSON.stringify(userData[key])); // Convert arrays & objects to JSON strings
});

// Handle profile picture (convert URI to file)
const profilePicUri = userData.profilePic; // Replace with real file input if needed
const profilePicFile = {
  uri: profilePicUri,
  name: "profile.jpg",
  type: "image/jpeg",
};
formData.append("profilePic", profilePicFile);

// Handle multiple images (twoBestPics)
const twoBestPics = [
  { uri: userData.twoBestPics[0], name: "bestpic1.jpg", type: "image/jpeg" },
  { uri: userData.twoBestPics[1], name: "bestpic2.jpg", type: "image/jpeg" },
];

twoBestPics.forEach((file, index) => {
  formData.append(`twoBestPics`, file); // Must match backend field name
});

// Send FormData via Fetch API
fetch("http://localhost:5000/api/profilesetup", {
  method: "PUT",
  body: formData,
})
  .then((res) => res.json())
  .then((data) => console.log("Upload Success:", data))
  .catch((err) => console.error("Upload Error:", err));
