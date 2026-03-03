import connectDB from "@/config/mongodb";
import User from "@/models/User";

async function run() {
  await connectDB();
  const result = await User.updateMany(
    { profileImage: { $regex: /^data:image/ } },
    { $set: { profileImage: "" } },
  );
  console.log(`Updated ${result.modifiedCount} users`);
  process.exit(0);
}

run();
