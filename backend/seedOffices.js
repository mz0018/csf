const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const Office = require("./src/models/offices/OfficesSchema");

const offices = [
  { officeId: 1, officeCode: "MMO" },
  { officeId: 2, officeCode: "SWD" },
  { officeId: 3, officeCode: "CRO" },
  { officeId: 4, officeCode: "MAO" },
  { officeId: 5, officeCode: "ACC" },
  { officeId: 6, officeCode: "MTO" },
  { officeId: 7, officeCode: "MEO" },
  { officeId: 8, officeCode: "BPL" },
  { officeId: 9, officeCode: "HR" },
  { officeId: 10, officeCode: "MBO" },
  { officeId: 11, officeCode: "PDO" },
  { officeId: 12, officeCode: "AGR" },
  { officeId: 13, officeCode: "MHO" },
  { officeId: 14, officeCode: "GSO" },
  { officeId: 15, officeCode: "DRR" },
  { officeId: 16, officeCode: "MRK" },
  { officeId: 17, officeCode: "SLT" },
  { officeId: 18, officeCode: "OSC" },
  { officeId: 19, officeCode: "TSM" },
  { officeId: 20, officeCode: "IT" }
];

async function seedOffices() {
  try {
    await connectDB();
    for (const office of offices) {
      const exists = await Office.findOne({ officeId: office.officeId });
      if (!exists) {
        await Office.create(office);
        console.log(`Inserted: ${office.officeCode}`);
      } else {
        console.log(`Skipped (already exists): ${office.officeCode}`);
      }
    }
    console.log("Seeding complete!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding offices:", err);
  }
}

seedOffices();
