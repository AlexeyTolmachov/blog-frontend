// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import DOMPurify from 'dompurify';

// const Blog = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/news');
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const renderContent = (content) => {
//     const cleanHTML = DOMPurify.sanitize(content);
//     return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
//   };

//   return (
//     <div>
//       <h1>Blog</h1>
//       {posts.map(post => (
//         <div key={post._id}>
//           <h2>{post.title}</h2>
//           {renderContent(post.content)}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Blog;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './Blog.css'; // Імпортуємо стилі

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const renderContent = (content) => {
    const cleanHTML = DOMPurify.sanitize(content);
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
  };

  return (
    <div className="Blog">
      <div className="content-container">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <h2>{post.title}</h2>
            {renderContent(post.content)}
            {post.image && <img src={post.image} alt={post.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

