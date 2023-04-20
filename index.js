require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employeescollection = require("./models/Employees");
const HistorySparepartsPickupcollection = require("./models/HistorySparepartsPickup");
const HistorySparepartsReturncollection = require("./models/HistorySparepartsReturn");
const Sparepartscollection = require("./models/Spareparts");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    // mongodb://127.0.0.1:27017
    // process.env.MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//Routes go here
app.get("/", (req, res) => {
  res.send({ title: "welcome" });
});

var SubIDEmployees;
var SubIDSpareparts;
var SparepartsPickupSubIDSet;

// /////////////////////////////// Login ///////////////////////////////
app.post("/login", async function Login(req, reply) {
  const { Username, Password } = req.body;
  try {
    const checkUsername = await Employeescollection.findOne({
      Username: Username,
    });
    const checkPassword = await Employeescollection.findOne({
      Password: Password,
    });
    if (checkUsername && checkPassword) {
      reply.send("exist");
    } else {
      reply.send("notexist");
    }
  } catch (error) {
    reply.send("notexist");
  }
});

// /////////////////////////////// Employees collection ///////////////////////////////
// Add
app.post("/addEmployees", async function AddEmployees(req, reply) {
  const body = req.body;
  const result = await Employeescollection.create(body);
  // console.log("Found documents =>", result);
  reply.send(result);
});

// Get
app.get("/getEmployees", async function GetEmployees(req, res) {
  const findResult = await Employeescollection.find();

  if (findResult) {
    res.json(findResult);
  } else {
    res.send("Something went wrong.");
  }
});

// Get GeneralClerk
app.get(
  "/getEmployeeGeneralClerk",
  async function GetEmployeeGeneralClerk(req, reply) {
    const findResult = await Employeescollection.find({
      Role: "พนักงานทั่วไป",
    });
    // console.log("Found documents =>", findResult);
    reply.send(findResult);
  }
);

// Get WarehouseClerk
app.get(
  "/getEmployeeWarehouseClerk",
  async function GetEmployeeWarehouseClerk(req, reply) {
    const findResult = await Employeescollection.find({
      Role: "พนักงานคลัง",
    });
    // console.log("Found documents =>", findResult);
    reply.send(findResult);
  }
);

// Update
app.post("/findIDEmployees", async function FindSubIDGeneralClerk(req, reply) {
  const body = req.body;
  const ConvertToString = JSON.stringify(body);
  const SliceString = ConvertToString.slice(17, 53);
  const findResult = await Employeescollection.find({
    EmpSubID: SliceString,
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);

  // Passing data another function
  SubIDEmployees = SliceString;
  // UpdateEmployees();
});
app.post("/updateEmployees", async function UpdateEmployees(req, reply) {
  const body = req.body;
  const updateResult = await Employeescollection.updateOne(
    { EmpSubID: SubIDEmployees },
    { $set: body }
  );
  // console.log("Updated documents =>", updateResult);
  reply.send(updateResult);
});

// Delete
app.post("/deleteEmployees", async function DeleteEmployees(req, reply) {
  const body = req.body;
  const ConvertToString = JSON.stringify(body);
  const SliceString = ConvertToString.slice(17, 53);
  const result = await Employeescollection.deleteMany({
    EmpSubID: SliceString,
  });
  // console.log("Delete documents =>", result);
  reply.send(result);
});

// /////////////////////////////// Spareparts collection ///////////////////////////////
// Add
app.post("/addSparepart", async function AddSparepart(req, reply) {
  const body = req.body;
  const result = await Sparepartscollection.create(body);
  // console.log("Found documents =>", result);
  reply.send(result);
});

// Get
app.get("/getSparepart", async function GetSparepart(req, res) {
  const findResult = await Sparepartscollection.find();

  if (findResult) {
    res.json(findResult);
  } else {
    res.send("Something went wrong.");
  }
});

// Update, Requisition
app.post("/findIDSpareparts", async function FindSubIDSpareparts(req, reply) {
  const body = req.body;
  const ConvertToString = JSON.stringify(body);
  const SliceString = ConvertToString.slice(18, 54);
  const findResult = await Sparepartscollection.find({
    PartSubID: SliceString,
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);

  // Passing data another function
  SubIDSpareparts = SliceString;
  // UpdateSpareparts();
});
app.post("/updateSpareparts", async function UpdateSpareparts(req, reply) {
  const body = req.body;
  const updateResult = await Sparepartscollection.updateOne(
    { PartSubID: SubIDSpareparts },
    { $set: body }
  );
  // console.log("Updated documents =>", updateResult);
  reply.send(updateResult);
});

// Delete
app.post("/deleteSpareparts", async function DeleteSpareparts(req, reply) {
  const body = req.body;
  const ConvertToString = JSON.stringify(body);
  const SliceString = ConvertToString.slice(18, 54);
  const result = await Sparepartscollection.deleteMany({
    PartSubID: SliceString,
  });
  // console.log("Delete documents =>", result);
  reply.send(result);
});

// /////////////////////////////// History Spareparts Pickup ///////////////////////////////
// Add
app.post(
  "/historySparepartPickup",
  async function HistorySparepartPickup(req, reply) {
    const body = req.body;
    const result = await HistorySparepartsPickupcollection.create(body);
    // console.log("Found documents =>", result);
    reply.send(result);
  }
);

// Get
app.get(
  "/gethistorySparepartPickup",
  async function GethistorySparepartPickup(req, reply) {
    const findResult = await HistorySparepartsPickupcollection.find({});
    // console.log("Found documents =>", findResult);
    reply.send(findResult);
  }
);

// Get AmountForReturn : { $gt: 0 }
app.get(
  "/gethistorySparepartPickupAmountForReturn",
  async function GethistorySparepartPickupAmountForReturn(req, reply) {
    const findResult = await HistorySparepartsPickupcollection.find({
      AmountForReturn: { $gt: 0 },
    });
    // console.log("Found documents =>", findResult);
    reply.send(findResult);
  }
);

// Update
app.post(
  "/findIDSparepartPickup",
  async function FindSubIDSparepartPickup(req, reply) {
    const body = req.body;
    const ConvertToString = JSON.stringify(body);
    const SliceString = ConvertToString.slice(19, 55);
    console.log("Found documents =>", SliceString);
    const findResult = await HistorySparepartsPickupcollection.find({
      SparepartsPickupSubID: SliceString,
    });
    // console.log("Found documents =>", findResult);
    reply.send(findResult);

    // Passing data another function
    SparepartsPickupSubIDSet = SliceString;
    // UpdateSparepartPickup();
  }
);
app.post(
  "/updateSparepartPickup",
  async function UpdateSparepartPickup(req, reply) {
    const body = req.body;
    // console.log("Found documents =>", body);
    const updateResult = await HistorySparepartsPickupcollection.updateOne(
      { SparepartsPickupSubID: SparepartsPickupSubIDSet },
      { $set: body }
    );
    // console.log("Updated documents =>", updateResult);
    reply.send(updateResult);
  }
);

// /////////////////////////////// History Spareparts Return ///////////////////////////////
// Add
app.post(
  "/historySparepartReturn",
  async function HistorySparepartReturn(req, reply) {
    const body = req.body;
    const result = await HistorySparepartsReturncollection.create(body);
    // console.log("Found documents =>", result);
    reply.send(result);
  }
);

// Get
app.get(
  "/gethistorySparepartReturn",
  async function GethistorySparepartReturn(req, reply) {
    const findResult = await HistorySparepartsReturncollection.find({});
    // console.log("Found documents =>", findResult);
    reply.send(findResult);
  }
);

// /////////////////////////////// Category Spareparts collection ///////////////////////////////
app.get("/getCategory1", async function GetCategory1(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "สายไฟ",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory2", async function GetCategory2(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "อุปกรณ์ไฟฟ้า",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory3", async function GetCategory3(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "น็อตหรือสกรู",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory4", async function GetCategory4(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "อุปกรณ์นิวเเมติก",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory5", async function GetCategory5(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "มอเตอร์",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory6", async function GetCategory6(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "อลูมิเนียมโปรไฟล์",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory7", async function GetCategory7(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "StandardPartMisumi",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory8", async function GetCategory8(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "เซนเซอร์",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

app.get("/getCategory9", async function getCategory9(req, reply) {
  const findResult = await Sparepartscollection.find({
    Category: "อื่นๆ",
  });
  // console.log("Found documents =>", findResult);
  reply.send(findResult);
});

// /////////////////////////////// All Category ///////////////////////////////
app.get("/getAllCategory", async function getAllCategory(req, reply) {
  const Category1 = await Sparepartscollection.find({
    Category: "สายไฟ",
  });
  const Category2 = await Sparepartscollection.find({
    Category: "อุปกรณ์ไฟฟ้า",
  });
  const Category3 = await Sparepartscollection.find({
    Category: "น็อตหรือสกรู",
  });
  const Category4 = await Sparepartscollection.find({
    Category: "อุปกรณ์นิวเเมติก",
  });
  const Category5 = await Sparepartscollection.find({
    Category: "มอเตอร์",
  });
  const Category6 = await Sparepartscollection.find({
    Category: "อลูมิเนียมโปรไฟล์",
  });
  const Category7 = await Sparepartscollection.find({
    Category: "StandardPartMisumi",
  });
  const Category8 = await Sparepartscollection.find({
    Category: "เซนเซอร์",
  });
  const Category9 = await Sparepartscollection.find({
    Category: "อื่นๆ",
  });

  let AllCategory = {
    Category1: Category1.length,
    Category2: Category2.length,
    Category3: Category3.length,
    Category4: Category4.length,
    Category5: Category5.length,
    Category6: Category6.length,
    Category7: Category7.length,
    Category8: Category8.length,
    Category9: Category9.length,
  };
  reply.send(AllCategory);
});

// /////////////////////////////// เบิกพาร์ทเเละ คืนพาร์ทในเเต่ละเดือน ปีปัจจุบัน ///////////////////////////////
app.get(
  "/MonthofPickupAndReturn",
  async function MonthofPickupAndReturn(req, reply) {
    const d = new Date();
    let year = d.getFullYear();

    // Pickup Parts
    const PickupOnJan = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 0,
    });
    const PickupOnFeb = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 1,
    });
    const PickupOnMar = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 2,
    });
    const PickupOnApr = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 3,
    });
    const PickupOnMay = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 4,
    });
    const PickupOnJun = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 5,
    });
    const PickupOnJul = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 6,
    });
    const PickupOnAug = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 7,
    });
    const PickupOnSep = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 8,
    });
    const PickupOnOct = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 9,
    });
    const PickupOnNov = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 10,
    });
    const PickupOnDec = await HistorySparepartsPickupcollection.find({
      year: year,
      month: 11,
    });

    // Return Parts
    const ReturnOnJan = await HistorySparepartsReturncollection.find({
      year: year,
      month: 0,
    });
    const ReturnOnFeb = await HistorySparepartsReturncollection.find({
      year: year,
      month: 1,
    });
    const ReturnOnMar = await HistorySparepartsReturncollection.find({
      year: year,
      month: 2,
    });
    const ReturnOnApr = await HistorySparepartsReturncollection.find({
      year: year,
      month: 3,
    });
    const ReturnOnMay = await HistorySparepartsReturncollection.find({
      year: year,
      month: 4,
    });
    const ReturnOnJun = await HistorySparepartsReturncollection.find({
      year: year,
      month: 5,
    });
    const ReturnOnJul = await HistorySparepartsReturncollection.find({
      year: year,
      month: 6,
    });
    const ReturnOnAug = await HistorySparepartsReturncollection.find({
      year: year,
      month: 7,
    });
    const ReturnOnSep = await HistorySparepartsReturncollection.find({
      year: year,
      month: 8,
    });
    const ReturnOnOct = await HistorySparepartsReturncollection.find({
      year: year,
      month: 9,
    });
    const ReturnOnNov = await HistorySparepartsReturncollection.find({
      year: year,
      month: 10,
    });
    const ReturnOnDec = await HistorySparepartsReturncollection.find({
      year: year,
      month: 11,
    });

    let LengthofPickupOnMonth = [
      PickupOnJan.length,
      PickupOnFeb.length,
      PickupOnMar.length,
      PickupOnApr.length,
      PickupOnMay.length,
      PickupOnJun.length,
      PickupOnJul.length,
      PickupOnAug.length,
      PickupOnSep.length,
      PickupOnOct.length,
      PickupOnNov.length,
      PickupOnDec.length,
    ];

    let LengthofReturnOnMonth = [
      ReturnOnJan.length,
      ReturnOnFeb.length,
      ReturnOnMar.length,
      ReturnOnApr.length,
      ReturnOnMay.length,
      ReturnOnJun.length,
      ReturnOnJul.length,
      ReturnOnAug.length,
      ReturnOnSep.length,
      ReturnOnOct.length,
      ReturnOnNov.length,
      ReturnOnDec.length,
    ];

    const resultDay = d.toLocaleDateString("th-TH", {
      year: "numeric",
    });

    const AllDataofMonth = {
      MonthofPickup: LengthofPickupOnMonth,
      MonthofReturn: LengthofReturnOnMonth,
      Year: resultDay,
    };
    reply.send(AllDataofMonth);
  }
);

// /////////////////////////////// TheMostPickedPart ///////////////////////////////
app.get("/TheMostPickedPart", async function TheMostPickedPart(req, reply) {
  const findResult = await HistorySparepartsPickupcollection.find();

  let findPartNameInData = findResult.map((x) => x.PartName);
  let filterPartNameUniq = findPartNameInData.filter(
    (e, i, a) => a.indexOf(e) === i
  );
  let DataSortParts = [];

  for (let i = 0; i < filterPartNameUniq.length; i++) {
    let filterPartNameUniqData = filterPartNameUniq[i];
    let filterPartNameUniqToString = String(filterPartNameUniqData);

    let filterFindPart = findResult.filter(
      (x) => x.PartName === filterPartNameUniqToString
    );
    let SumAmount = filterFindPart.length;
    DataSortParts.push({
      PartName: filterPartNameUniqToString,
      Amount: SumAmount,
    });
  }
  DataSortParts.sort(function (a, b) {
    return b.Amount - a.Amount;
  });
  reply.send(DataSortParts);
});

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
