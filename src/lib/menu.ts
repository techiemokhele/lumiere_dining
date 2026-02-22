import { connectDB } from "./mongodb";
import { MenuSection } from "@/models/MenuSection";

export async function getMenuData() {
  await connectDB();
  const sections = await MenuSection.find({}).lean();
  return sections;
}
