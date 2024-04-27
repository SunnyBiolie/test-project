import { PostCard } from "@/components/post-card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center py-6 overflow-auto">
      <PostCard imageSrc="https://telegraph-image-bak.pages.dev/file/32a611706725087d0baf4.jpg" />
      <PostCard imageSrc="https://telegraph-image-bak.pages.dev/file/a15a128ff0c223df756f5.jpg" />
      <PostCard imageSrc="https://telegraph-image-bak.pages.dev/file/46f15bee836bd7179f604.jpg" />
    </div>
  );
}
