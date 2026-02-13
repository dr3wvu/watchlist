import { connectToDatabase } from "../database/mongoose";

async function main() {
  try {
    await connectToDatabase();
    console.log("DB connection Success");
    process.exit(0);
  } catch (err) {
    console.log("Error DB connection faild");
    console.error(err);
    process.exit(1);
  }
}

main();
