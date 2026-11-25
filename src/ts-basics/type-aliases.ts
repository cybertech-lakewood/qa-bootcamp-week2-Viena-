type Student = {
  id: number;
  name: string;
  passed: boolean;
};

let studentOne: Student = {
  id: 1,
  name: "Sky",
  passed: true,
};

console.log("Student:", studentOne.name, "Passed:", studentOne.passed);