import PostCard from "@/components/post-card";

export default async function Posts() {
  const apiUrl = `${process.env.BASE_URL}/api/get-all`;

  try {
    // Load data from the API
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 10,
      },
    });
    const reversableposts = await response.json();
    const posts = [...reversableposts].reverse();

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
