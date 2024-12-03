import { SingplePost } from "@/app/types/types";
import Link from "next/link";

export default function PostCard({ post }: { post: SingplePost }) {
  return (
    <div className="m-3">
      <h2 className="font-bold text-xl py-10  text-error font-sans">{post?.title}</h2>
      <pre className="font-sans break-word whitespace-pre-wrap">
        {post.content?.slice(0, 300)}
      </pre>{" "}
      <Link href={`/posts/${post._id}`}>
        <span className="  link-primary py-1 my-auto rounded-lg ">
          Read more
        </span>
      </Link>
      <br />
    </div>
  );
}
