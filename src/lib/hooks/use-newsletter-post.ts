import { useEffect, useState, useCallback } from "react";

export interface Reply {
  _id: string;
  userId: string;
  userName: string;
  userImage?: string;
  text: string;
  likes: string[];
  createdAt: string;
}

export interface Comment {
  _id: string;
  userId: string;
  userName: string;
  userImage?: string;
  text: string;
  likes: string[];
  replies: Reply[];
  createdAt: string;
}

export interface NewsletterPostData {
  likes: string[];
  comments: Comment[];
}

export function useNewsletterPost(postId: string) {
  const [data, setData] = useState<NewsletterPostData>({
    likes: [],
    comments: [],
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    fetch(`/api/newsletter/${postId}`)
      .then((r) => r.json())
      .then((d) => {
        setData({ likes: d.likes ?? [], comments: d.comments ?? [] });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const likePost = async (userId: string, userName: string) => {
    const res = await fetch(`/api/newsletter/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName }),
    });
    const json = await res.json();
    setData((prev) => ({ ...prev, likes: json.likes }));
  };

  const addComment = async (
    userId: string,
    userName: string,
    userImage: string,
    text: string,
    userEmail: string,
  ) => {
    const res = await fetch(`/api/newsletter/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, userName, userImage, text, userEmail }),
    });
    const json = await res.json();
    setData((prev) => ({ ...prev, comments: json.comments }));
  };

  const likeComment = async (
    commentId: string,
    userId: string,
    userName: string,
  ) => {
    const res = await fetch(
      `/api/newsletter/${postId}/comment/${commentId}/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName }),
      },
    );
    const json = await res.json();
    setData((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c._id === commentId ? { ...c, likes: json.likes } : c,
      ),
    }));
  };

  const addReply = async (
    commentId: string,
    userId: string,
    userName: string,
    userImage: string,
    text: string,
  ) => {
    const res = await fetch(
      `/api/newsletter/${postId}/comment/${commentId}/reply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userName, userImage, text }),
      },
    );
    const json = await res.json();
    setData((prev) => ({ ...prev, comments: json.comments }));
  };

  return { data, loading, likePost, addComment, likeComment, addReply };
}
