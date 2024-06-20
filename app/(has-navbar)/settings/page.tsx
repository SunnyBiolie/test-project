"use client";

import { useState } from "react";
import { createUser, createCategory, createPost } from "@/action/prisma";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="space-x-4">
      <button onClick={() => createUser()}>Create user</button>
      <button onClick={() => createCategory()}>Create Category</button>
      <button onClick={() => createPost()}>Create Post</button>
    </div>
  );
};

export default SettingsPage;
