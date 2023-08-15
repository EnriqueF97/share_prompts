"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/posts`
      );
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (postToDelete) => {
    console.log("Delete?");
    const hasConfirmed = confirm(
      "You really wanna delete this nice prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${postToDelete._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter(
          (post) => post._id !== postToDelete._id
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.log("Error trying to delete that post");
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
