//#1 List all people. (200)
db.people.find();
//#2 Count all people. (200)
db.people.find().count();
//#3 List all people in Arizona. (6)
db.people.find({ state: "Arizona" });
//#4 List all males in Arizona. (2)
db.people.find({ state: "Arizona" }, { gender: "Male" });
//#5 List all people in Arizona plus New Mexico. (8)
db.people.find({ $or: [{ state: "Arizona" }, { state: "New Mexico" }] });
//#6 List all people under age 40. (90)
db.people.find({ age: { $lt: 40 } });
//#7 ist all females in Florida between the ages of 40 and 45 (inclusive). (4)
db.people.find({
  $and: [
    { state: "Florida" },
    { gender: "Female" },
    { age: { $gte: 40 } },
    { age: { $lte: 45 } },
  ],
});
//#8 List people whose first name starts with "H". (2)
db.people.find({ first_name: /^H/ });
//#9 List all people in Michigan, sorted by first name. (6)
db.people.find({ state: "Michigan" }).sort({ first_name: 1 });
//#10 List all people who live in Virginia or are named Virginia
db.people.find({ $or: [{ state: "Virginia" }, { first_name: "Virginia" }] });
//#11 List the names of people under age 30. Only display their first and last name.
db.people.find({ age: { $lt: 30 } }, { first_name: true, last_name: true });
//#12 List all people in Montana. Display all information except age.
db.people.find({ state: "Montana" }, { age: false });
//#13 List the email addresses of people with a ".edu" email. Only display the email.
db.people.find({ email: /.edu$/ }, { email: true });
//---------PT 2 ----------------
//#1 Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({
  first_name: "Jonathon",
  last_name: "Zug",
  email: "aaaa@bbb.ccc",
  gender: "Male",
  age: 27,
  state: "North Dakota",
  children: [],
});
//#2 Add another person. They should have at least two children.
db.people.insertOne({
  first_name: "Rick",
  last_name: "Sanchez",
  email: "impickrick@mltvs.com",
  gender: "Male",
  age: 62,
  state: "Washington",
  children: [
    { name: "Beth", age: 45 },
    { name: "Morty", age: 15 },
  ],
});
//#3 Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne(
  { first_name: "Clarence" },
  { $set: { state: "South Dakota" } }
);
//#4 Update Rebecca Hayes. Remove her email address.
db.people.updateOne(
  { first_name: "Rebecca", last_name: "Hayes" },
  { $unset: { email: 1 } }
);
//#5 Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } });
//#6 Jerry Baker has updated information. Replace with a new document: ??? idk about this one
db.people.replaceOne({last_name:'Baker-Mendez'},{
  first_name: "Jerry",
  last_name: "Baker-Mendez",
  email: "jerry@classic.ly",
  gender: "Male",
  age: 28,
  state: "Vermont",
  children: [
    { name: "Alan", age: 18 },
    { name: "Jenny", age: 3 },
  ],
})
//#7 Delete Wanda Bowman
db.people.deleteOne({first_name:'Wanda',last_name:'Bowman'})
//#8 Delete everyone who does not have an email address specified
db.people.deleteMany({email:null})
