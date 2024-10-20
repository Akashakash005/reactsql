import React, { useState, useEffect } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetching the blog data from the public folder
  useEffect(() => {
    fetch("/blog.json")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);

  return (
    <main>
      <h2>Blogs & journal</h2>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p>{blog.summary}</p>
              <a href={blog.continueReading}>Continue Reading</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Blog;
