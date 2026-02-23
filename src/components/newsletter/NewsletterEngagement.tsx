"use client";

import { useEffect, useState } from "react";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function TimeAgo({ dateStr }: { dateStr: string }) {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    setLabel(timeAgo(dateStr));
  }, [dateStr]);

  return <span>{label}</span>;
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
            <TimeAgo dateStr={reply.createdAt} />
          </span>
        </div>
        <p className="text-xs text-white-60 leading-relaxed">{reply.text}</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onLike(reply._id, currentUserId, currentUserName)}
          disabled={!currentUserId}
          className={cn(
            "flex items-center gap-1 text-xxs transition-colors w-fit hover:bg-transparent",
            liked ? "text-crimson-500" : "text-white-60 hover:text-crimson-400",
          )}
        >
          <Heart size={11} className={liked ? "fill-crimson-500" : ""} />
          {reply.likes.length > 0 && <span>{reply.likes.length}</span>}
        </Button>
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
  const [expanded, setExpanded] = useState<boolean>(false);

  const liked = comment.likes.includes(currentUserId);
  const isLong = comment.text.length > 120;

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
            <TimeAgo dateStr={comment.createdAt} />
          </span>
        </div>
        <p
          onClick={() => isLong && setExpanded((p) => !p)}
          className={cn(
            "text-xs text-white-60 leading-relaxed transition-all duration-300",
            isLong && !expanded
              ? "line-clamp-2 cursor-pointer hover:text-white-80"
              : "",
            isLong && expanded ? "cursor-pointer" : "",
          )}
        >
          {comment.text}
        </p>

        <div className="flex items-center gap-4 mt-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onLikeComment(comment._id, currentUserId, currentUserName)
            }
            disabled={!currentUserId}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors hover:bg-transparent",
              liked
                ? "text-crimson-500"
                : "text-white-60 hover:text-crimson-400",
            )}
          >
            <Heart size={13} className={liked ? "fill-crimson-500" : ""} />
            {comment.likes.length > 0 && <span>{comment.likes.length}</span>}
          </Button>

          {currentUserId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyInput((p) => !p)}
              className="flex items-center gap-1 text-xs text-white-60 hover:text-white transition-colors hover:bg-transparent"
            >
              <CornerDownRight size={13} />
              Reply
            </Button>
          )}

          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies((p) => !p)}
              className="flex items-center gap-1 text-xs text-white-60 hover:text-white transition-colors hover:bg-transparent"
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
            <div className="flex flex-1 gap-2 items-center bg-burgundy-900/60 border-none rounded-xl px-3 py-2">
              <Input
                className="flex-1 bg-transparent text-xxs text-white placeholder:text-white-60 outline-none"
                placeholder={`Reply to ${comment.userName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && submitReply()
                }
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="text-crimson-500 hover:text-crimson-400 disabled:opacity-40 hover:bg-transparent"
              >
                <Send size={14} />
              </Button>
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
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sessionUser = mounted
    ? (session?.user as SessionUser | undefined)
    : undefined;
  const currentUserId = sessionUser?.id ?? "";
  const currentUserName = sessionUser?.name ?? "Guest";
  const currentUserEmail = mounted ? (session?.user?.email ?? "") : "";
  const currentUserImage = sessionUser?.image ?? "";

  const postLiked = data.likes.includes(currentUserId);
  const INITIAL_COUNT = 5;
  const visibleComments = showAllComments
    ? data.comments
    : data.comments.slice(0, INITIAL_COUNT);
  const hiddenCount = data.comments.length - INITIAL_COUNT;

  const submitComment = () => {
    if (!commentText.trim() || !currentUserId) return;
    addComment(
      currentUserId,
      currentUserName,
      currentUserImage,
      commentText,
      currentUserEmail,
    );
    setCommentText("");
  };

  return (
    <div className="flex flex-col gap-6">
      <Separator className="bg-burgundy-700" />

      <div className="flex flex-row items-center justify-end gap-4 min-h-[36px]">
        <Button
          onClick={() =>
            currentUserId && likePost(currentUserId, currentUserName)
          }
          disabled={!currentUserId || loading}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all hover:bg-transparent",
            loading ? "opacity-0 pointer-events-none" : "",
            postLiked
              ? "bg-crimson-600 border-crimson-600 text-white"
              : "border-burgundy-700 text-white-100 hover:border-crimson-600 hover:text-white",
          )}
        >
          <Heart size={16} className={postLiked ? "fill-white" : ""} />
          {data.likes.length > 0
            ? `${data.likes.length} Like${data.likes.length !== 1 ? "s" : ""}`
            : "Like this article"}
        </Button>

        <div
          className={cn(
            "flex items-center gap-1.5 text-xs text-white-60",
            loading ? "opacity-0" : "",
          )}
        >
          <MessageCircle size={16} />
          <span>
            {data.comments.length} comment
            {data.comments.length !== 1 ? "s" : ""}
          </span>
        </div>

        {!currentUserId && !loading && (
          <p className="text-xs text-white-60 ml-auto">
            Sign in to like or comment
          </p>
        )}
      </div>

      {currentUserId && (
        <div className="flex gap-3 items-start">
          <UserAvatar src={currentUserImage} alt={currentUserName} size={42} />
          <div className="flex flex-1 gap-3 items-center bg-burgundy-800 border border-burgundy-700 rounded-2xl px-4 py-3">
            <Textarea
              className="flex-1 bg-transparent border-none text-xxs text-white placeholder:text-white-60 outline-none resize-none overflow-hidden transition-all duration-200 leading-relaxed"
              placeholder="Share your thoughts..."
              value={commentText}
              rows={1}
              style={{ maxHeight: "calc(1.5em * 3)" }}
              onChange={(e) => {
                setCommentText(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, parseFloat(getComputedStyle(e.target).lineHeight) * 3)}px`;
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && submitComment()
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={submitComment}
              disabled={!commentText.trim()}
              className="text-crimson-500 hover:text-crimson-400 disabled:opacity-40 transition-colors bg-transparent hover:bg-transparent"
            >
              <Send size={16} />
            </Button>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllComments(true)}
              className="mt-3 text-sm text-crimson-500 hover:text-crimson-400 font-semibold flex items-center gap-1 transition-colors hover:bg-transparent"
            >
              <ChevronDown size={16} />
              Read {hiddenCount} more comment{hiddenCount !== 1 ? "s" : ""}
            </Button>
          )}
          {showAllComments && data.comments.length > INITIAL_COUNT && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllComments(false)}
              className="mt-3 text-sm text-white-60 hover:text-white flex items-center gap-1 transition-colors  hover:bg-transparent"
            >
              <ChevronUp size={16} />
              Show less
            </Button>
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
