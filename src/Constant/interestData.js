const interestData = [
  { id: 1, name: "Travel", selected: false, icon: "airplane" },
  { id: 2, name: "Music", selected: false, icon: "music" },
  { id: 3, name: "Sports", selected: false, icon: "soccer" },
  { id: 4, name: "Movies", selected: false, icon: "film" },
  { id: 5, name: "Cooking", selected: false, icon: "food" },
  { id: 6, name: "Fitness", selected: false, icon: "dumbbell" },
  { id: 7, name: "Gaming", selected: false, icon: "gamepad" },
  { id: 8, name: "Art", selected: false, icon: "palette" },
  { id: 9, name: "Reading", selected: false, icon: "book" },
  { id: 10, name: "Dancing", selected: false, icon: "music-note" },
  { id: 11, name: "Fishing", selected: false, icon: "fish" },
  { id: 12, name: "Cycling", selected: false, icon: "bicycle" },
  { id: 13, name: "Technology", selected: false, icon: "laptop" },
  { id: 14, name: "Photography", selected: false, icon: "camera" },
];

export function getIcon(name) {
  const toReturn = interestData.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  return toReturn ? toReturn.icon : "alien";
}

export default interestData;
