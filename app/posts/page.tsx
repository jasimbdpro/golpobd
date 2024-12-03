import PostCard from "@/components/post-card";

export default async function Posts() {
  // Conditionally set the API URL based on the environment
  const apiUrl = `${process.env.BASE_URL}/api/get-all`;

  try {
    // Fetch data from the API
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
