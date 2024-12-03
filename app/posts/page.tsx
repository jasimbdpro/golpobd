import PostCard from "@/components/post-card";

export default async function Posts() {
  const apiUrl = "/api/get-all";

  try {
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 10,
      },
    });
    const posts = await response.json();

    return (
      <div>
        {posts.map((i: { _id: string; title: string; content: string }) => (
          <PostCard key={i._id} post={i} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
