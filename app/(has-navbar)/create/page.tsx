import { PostCard } from "@/components/post-card";
import Link from "next/link";

const CreatePage = () => {
  return (
    <div>
      {" "}
      <Link href={"/"}>Go</Link>
      <PostCard key={0} />
    </div>
  );
};

export default CreatePage;
