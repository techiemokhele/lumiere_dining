import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { NewsletterPostModel } from "@/models/NewsletterPost";
import User from "@/models/User";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const post = await NewsletterPostModel.findOne({ id: params.id }).lean();
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Collect all unique userIds from comments and replies
  const userIds = new Set<string>();
  post.comments?.forEach(
    (c: { userId: string; replies?: { userId: string }[] }) => {
      userIds.add(c.userId);
      c.replies?.forEach((r) => userIds.add(r.userId));
    },
  );

  // Fetch all users in one query
  const users = await User.find(
    { _id: { $in: Array.from(userIds) } },
    { _id: 1, profileImage: 1 },
  ).lean();

  const imageMap = new Map(
    users.map((u: { _id: { toString(): string }; profileImage?: string }) => [
      u._id.toString(),
      u.profileImage ?? "",
    ]),
  );

  // Hydrate userImage on every comment and reply
  const hydrated = {
    ...post,
    comments: post.comments?.map(
      (
        c: {
          userId: string;
          replies?: ({ userId: string } & Record<string, unknown>)[];
        } & Record<string, unknown>,
      ) => ({
        ...c,
        userImage: imageMap.get(c.userId) ?? "",
        replies: c.replies?.map((r) => ({
          ...r,
          userImage: imageMap.get(r.userId) ?? "",
        })),
      }),
    ),
  };

  return NextResponse.json(hydrated);
}
