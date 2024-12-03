import { SingplePost } from "@/app/types/types";

interface PageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostDetails({ params }: PageProps) {
  const { postId } = await params;
  console.log(postId);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://doya-01.netlify.app//api/get-all"
      : "http://localhost:3000/api/get-all";

  const response = await fetch(apiUrl);
  const posts: SingplePost[] = await response.json();
  const post = posts.find((i) => i._id === postId);

  return (
    <div className="m-3">
      <h2 className="font-bold text-xl py-10 text-error font-sans">
        {post?.title}
      </h2>
      <pre className="break-words whitespace-pre-wrap font-sans">
        {post?.content}
      </pre>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://doya-01.netlify.app//api/get-all"
      : "http://localhost:3000/api/get-all";

  const response = await fetch(apiUrl);
  const posts = await response.json();
  const post = posts.find((i: SingplePost) => i._id === postId);

  return {
    title: post?.title,
    description: post?.content.slice(0, 50),
  };
}
