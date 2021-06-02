//--- PEOPLE Collection ---
db.people.aggregate([

]);
//#1 Average age: Expected Result: 41.41
db.people.aggregate([
    {
      $group: {
        _id: null,
        averagePrice: { $avg: "$age" },
      },
    },
  ]);

//#2 Average age by gender: Expected Result: Female: 42.04, Male: 40.60
db.people.aggregate([
    {
      $group: {
        _id: "$gender",
        averagePrice: { $avg: "$age" },
      },
    },
  ]);
//#3 Number of people by gender: Expected Result: Female: 113, Male: 87
db.people.aggregate([
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
  ]);
//#4 3 oldest people: Expected Result: Phyllis Gray 81, Melissa Banks 79, Walter Bishop 76
db.people.aggregate([
    { $sort: { age: -1 } }, 
    { $limit: 3 }
]);
//#5 5 youngest people, display only their names as one value (first + " " + last) and their ages
// Expected Result: Nicholas Hunter 17, Kenneth Burns 18, Kathy Hayes 19, Edward Hayes 21, Steve Vasquez 21)
db.people.aggregate([
    { $sort: { age: 1 } }, 
    { $limit: 5 },
    { $project: {
        firstName: {$concat: ["$first_name"," ","$last_name"]},
        age: true,
        _id: false
    } }
]);
//#6 Average number of children: Expected Result: 2.34
db.people.aggregate([
    {
      $group: {
        _id: null,
        countChildren: {$sum: {$size:"$children"}}
      },
    },
    {$project:{
        _id: false,
        averageChildren: {$divide:["$countChildren",200]}
    }}
  ]);
//#7 Name and age of children in Michigan who are under age ten <<-- QUESTIONS
//Expected Result: Adam 0, Janice 1, Judith 3, Beverly 4, Antonio 6, Jeremy 7
db.people.aggregate([
    {$match: {
        state:"Michigan"
    }},
    {$unwind:"$children"},
    {$group:{
        _id: null,
        underTen: {"$children.age":{$lt:10}}
    }}
  ]);
//#8 Average age of child by state, sorted with oldest first
// Expected Result: Rhode Island 20, Idaho 20, Louisiana 15.7, Kentucky 13.1, Indiana 12.6, ...
db.people.aggregate([
    {$unwind:"$children"},
    {$group:{
        _id: "$state",
        averageAge: {$avg: "$children.age"}
    }},
    {$sort: {averageAge:-1}}
  ]);
//----ORDERS COLLECTION------
db.orders.aggregate([
    
])
//#9 Find the total dollar amount of all sales ever. Use the total field.
// Expected Result: 680.92
db.orders.aggregate([
    {$group: {
        _id: null,
        bitTotal: {$sum:"$total"}
    }}
])
//#10 


