-- commands.sql

-- Create the blogs table
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

-- Insert at least two blogs into the table
INSERT INTO blogs (author, url, title, likes) VALUES
  ('John Doe', 'https://example.com/blog1', 'Blog 1 Title', 10),
  ('Jane Smith', 'https://example.com/blog2', 'Blog 2 Title', 5);
