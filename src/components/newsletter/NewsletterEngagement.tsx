"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Heart,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
  CornerDownRight,
} from "lucide-react";
import { cn, timeAgo } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  useNewsletterPost,
  type Comment,
} from "@/lib/hooks/use-newsletter-post";
import { UserAvatar } from "../UserAvatar";

interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function ReplyItem({
  reply,
  currentUserId,
  currentUserName,
  onLike,
}: {
  reply: Comment["replies"][number];
  currentUserId: string;
  currentUserName: string;
  onLike: (commentId: string, userId: string, userName: string) => void;
}) {
  const liked = reply.likes.includes(currentUserId);

  return (
    <div className="flex gap-3 pl-8">
      <UserAvatar src={reply.userImage} alt={reply.userName} size={26} />
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white">
            {reply.userName}
          </span>
          <span className="text-xxs text-white-60">
            {timeAgo(reply.createdAt)}
          </span>
        </div>
        <p className="text-xs text-white-60 leading-relaxed">{reply.text}</p>
        <button
          onClick={() => onLike(reply._id, currentUserId, currentUserName)}
          disabled={!currentUserId}
          className={cn(
            "flex items-center gap-1 text-xxs transition-colors w-fit",
            liked ? "text-crimson-500" : "text-white-60 hover:text-crimson-400",
          )}
        >
          <Heart size={11} className={liked ? "fill-crimson-500" : ""} />
          {reply.likes.length > 0 && <span>{reply.likes.length}</span>}
        </button>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  currentUserId,
  currentUserName,
  currentUserImage,
  onLikeComment,
  onAddReply,
}: {
  comment: Comment;
  currentUserId: string;
  currentUserName: string;
  currentUserImage: string;
  onLikeComment: (commentId: string, userId: string, userName: string) => void;
  onAddReply: (
    commentId: string,
    userId: string,
    userName: string,
    userImage: string,
    text: string,
  ) => void;
}) {
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const [showReplies, setShowReplies] = useState<boolean>(false);

  const liked = comment.likes.includes(currentUserId);

  const submitReply = () => {
    if (!replyText.trim() || !currentUserId) return;
    onAddReply(
      comment._id,
      currentUserId,
      currentUserName,
      currentUserImage,
      replyText,
    );
    setReplyText("");
    setShowReplyInput(false);
    setShowReplies(true);
  };

  return (
    <div className="flex gap-3">
      <UserAvatar src={comment.userImage} alt={comment.userName} size={32} />
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            {comment.userName}
          </span>
          <span className="text-xxs text-white-60">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-xs text-white-60 leading-relaxed">{comment.text}</p>

        <div className="flex items-center gap-4 mt-0.5">
          <button
            onClick={() =>
              onLikeComment(comment._id, currentUserId, currentUserName)
            }
            disabled={!currentUserId}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors",
              liked
                ? "text-crimson-500"
                : "text-white-60 hover:text-crimson-400",
            )}
          >
            <Heart size={13} className={liked ? "fill-crimson-500" : ""} />
            {comment.likes.length > 0 && <span>{comment.likes.length}</span>}
          </button>

          {currentUserId && (
            <button
              onClick={() => setShowReplyInput((p) => !p)}
              className="flex items-center gap-1 text-xs text-white-60 hover:text-white transition-colors"
            >
              <CornerDownRight size={13} />
              Reply
            </button>
          )}

          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies((p) => !p)}
              className="flex items-center gap-1 text-xs text-white-60 hover:text-white transition-colors"
            >
              {showReplies ? (
                <ChevronUp size={13} />
              ) : (
                <ChevronDown size={13} />
              )}
              {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {showReplyInput && (
          <div className="flex gap-2 mt-1">
            <UserAvatar
              src={currentUserImage}
              alt={currentUserName}
              size={24}
            />
            <div className="flex flex-1 gap-2 items-center bg-burgundy-900/60 border border-burgundy-700 rounded-xl px-3 py-2">
              <input
                className="flex-1 bg-transparent text-xs text-white placeholder:text-white-60 outline-none"
                placeholder={`Reply to ${comment.userName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && submitReply()
                }
              />
              <button
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="text-crimson-500 hover:text-crimson-400 disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}

        {showReplies && comment.replies.length > 0 && (
          <div className="flex flex-col gap-3 mt-2">
            {comment.replies.map((r) => (
              <ReplyItem
                key={r._id}
                reply={r}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                onLike={(replyId, userId, userName) =>
                  onLikeComment(replyId, userId, userName)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function NewsletterEngagement({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const { data, loading, likePost, addComment, likeComment, addReply } =
    useNewsletterPost(postId);

  const [commentText, setCommentText] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  const sessionUser = session?.user as SessionUser | undefined;
  const currentUserId = sessionUser?.id ?? "";
  const currentUserName = sessionUser?.name ?? "Guest";
  const currentUserImage = sessionUser?.image ?? "";

  const postLiked = data.likes.includes(currentUserId);
  const INITIAL_COUNT = 5;
  const visibleComments = showAllComments
    ? data.comments
    : data.comments.slice(0, INITIAL_COUNT);
  const hiddenCount = data.comments.length - INITIAL_COUNT;

  const submitComment = () => {
    if (!commentText.trim() || !currentUserId) return;
    addComment(currentUserId, currentUserName, currentUserImage, commentText);
    setCommentText("");
  };

  return (
    <div className="flex flex-col gap-6">
      <Separator className="bg-burgundy-700" />

      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            currentUserId && likePost(currentUserId, currentUserName)
          }
          disabled={!currentUserId}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all",
            postLiked
              ? "bg-crimson-600 border-crimson-600 text-white"
              : "border-burgundy-700 text-white-60 hover:border-crimson-600 hover:text-white",
          )}
        >
          <Heart size={16} className={postLiked ? "fill-white" : ""} />
          {data.likes.length > 0
            ? `${data.likes.length} Like${data.likes.length !== 1 ? "s" : ""}`
            : "Like this article"}
        </button>

        <div className="flex items-center gap-1.5 text-sm text-white-60">
          <MessageCircle size={16} />
          <span>
            {data.comments.length} comment
            {data.comments.length !== 1 ? "s" : ""}
          </span>
        </div>

        {!currentUserId && (
          <p className="text-xs text-white-60 ml-auto">
            Sign in to like or comment
          </p>
        )}
      </div>

      {currentUserId && (
        <div className="flex gap-3 items-start">
          <UserAvatar src={currentUserImage} alt={currentUserName} size={36} />
          <div className="flex flex-1 gap-3 items-center bg-burgundy-800 border border-burgundy-700 rounded-2xl px-4 py-3 focus-within:border-crimson-600 transition-colors">
            <input
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white-60 outline-none"
              placeholder="Share your thoughts..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && submitComment()
              }
            />
            <button
              onClick={submitComment}
              disabled={!commentText.trim()}
              className="text-crimson-500 hover:text-crimson-400 disabled:opacity-40 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {data.comments.length > 0 && (
        <div className="flex flex-col gap-1">
          <div
            className={cn(
              "flex flex-col gap-5 transition-all",
              showAllComments ? "max-h-[600px] overflow-y-auto pr-2" : "",
            )}
          >
            {visibleComments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                currentUserImage={currentUserImage}
                onLikeComment={likeComment}
                onAddReply={addReply}
              />
            ))}
          </div>

          {hiddenCount > 0 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="mt-3 text-sm text-crimson-500 hover:text-crimson-400 font-semibold flex items-center gap-1 transition-colors"
            >
              <ChevronDown size={16} />
              Read {hiddenCount} more comment{hiddenCount !== 1 ? "s" : ""}
            </button>
          )}
          {showAllComments && data.comments.length > INITIAL_COUNT && (
            <button
              onClick={() => setShowAllComments(false)}
              className="mt-3 text-sm text-white-60 hover:text-white flex items-center gap-1 transition-colors"
            >
              <ChevronUp size={16} />
              Show less
            </button>
          )}
        </div>
      )}

      {!loading && data.comments.length === 0 && (
        <p className="text-xs text-white-60">
          Be the first to leave a comment.
        </p>
      )}
    </div>
  );
}
