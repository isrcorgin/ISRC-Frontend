export default async function sitemap() {
  const baseUrl = "https://www.isrc.org.in"; // Ensure there's no trailing slash

  // Function to get all blog posts
  async function getAllPosts() {
    try {
      // Import the blogPosts data
      const { blogPosts } = await import("@/components/Blog/data/blogPosts");

      return blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`, // Adjust URL formatting based on actual structure
        lastModified: new Date(post.date), // Use the post's date as lastModified
      }));
    } catch (error) {
      console.error("Error fetching blog posts for sitemap:", error);
      return [];
    }
  }

  // Get All Posts
  const postsUrls = await getAllPosts();

  // Define static pages
  const staticPages = [
    { url: `${baseUrl}/about-us`, lastModified: new Date() },
    { url: `${baseUrl}/event`, lastModified: new Date() }, // Adjusted URL to match robots.txt
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/verify`, lastModified: new Date() },
    { url: `${baseUrl}/terms-conditions`, lastModified: new Date() },
    { url: `${baseUrl}/campus-ambassador`, lastModified: new Date() },
    {
      url: `${baseUrl}/international-campus-ambassador`,
      lastModified: new Date(),
    },
    { url: `${baseUrl}/stem-ambassador`, lastModified: new Date() },
    { url: `${baseUrl}/auth/login`, lastModified: new Date() },
    { url: `${baseUrl}/auth/signup`, lastModified: new Date() },
  ];

  // Return the sitemap array
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postsUrls,
    ...staticPages,
  ];
}
