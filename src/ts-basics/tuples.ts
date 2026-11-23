let user: [number, string] = [10, "Barister", 145];

console.log("id:", user[0]);
console.log("Name:", user[1]);

let [id, username] = user;
console.log(`User ${id} is ${username}`);