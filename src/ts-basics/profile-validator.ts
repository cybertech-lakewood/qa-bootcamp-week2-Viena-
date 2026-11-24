type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};
function isNotified(user: UserProfile) {
  if (user.settings?.notifications === true) {
    return true;
  } else {
    return false;
  }
}

const user1: UserProfile = {
  id: 1,
  username: "viena",
  settings: {
    notifications: true,
  },
};

const user2: UserProfile = {
  id: 2,
  username: "Maria",
};

const user3: UserProfile = {
  id: 3,
  username: "Sky",
  settings: {},
};

console.log("User 1:", isNotified(user1));
console.log("User 2:", isNotified(user2));
console.log("User 3:", isNotified(user3));