import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ScrollArea,
  Label,
} from '../components';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Neoplasticism',
    author: 'John Doe',
    date: 'April 15, 2024',
    excerpt:
      'Neoplasticism, also known as De Stijl, was a Dutch artistic movement founded in 1917...',
    content:
      'Neoplasticism, also known as De Stijl, was a Dutch artistic movement founded in 1917. The movement was mainly about creating visual compositions with simplified orthogonal elements and primary colors. Piet Mondrian was one of the main proponents of this style.',
  },
  {
    id: 2,
    title: 'The Art of Composition',
    author: 'Jane Smith',
    date: 'April 10, 2024',
    excerpt:
      'Composition in design refers to the arrangement of visual elements in a work of art...',
    content:
      'Composition in design refers to the arrangement of visual elements in a work of art. Good composition is essential to creating balance, harmony, and visual interest. In the context of Neoplasticism, Mondrian used composition to create a sense of equilibrium with simple geometric forms.',
  },
  {
    id: 3,
    title: 'Color Theory Basics',
    author: 'Alex Johnson',
    date: 'April 5, 2024',
    excerpt:
      'Color theory is the study of how colors interact with one another and how they affect viewers...',
    content:
      'Color theory is the study of how colors interact with one another and how they affect viewers. The primary colors (red, blue, yellow) used in Neoplasticism each evoke different emotional responses and create different visual weights in compositions.',
  },
];

export const BlogSample = () => {
  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);

  const handleSelectPost = (id: number) => {
    setSelectedPost(id === selectedPost ? null : id);
  };

  const selectedPostData = blogPosts.find((post) => post.id === selectedPost);

  return (
    <Box>
      <Box>
        <Label size="lg" theme="blue">
          Mondrian Design Blog
        </Label>

        <Box>
          <Box>
            <ScrollArea>
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      By {post.author} • {post.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      theme={selectedPost === post.id ? 'blue' : 'neutral'}
                      onClick={() => handleSelectPost(post.id)}
                    >
                      {selectedPost === post.id ? 'Close' : 'Read More'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </Box>

          {selectedPostData && (
            <Box>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedPostData.title}</CardTitle>
                  <CardDescription>
                    By {selectedPostData.author} • {selectedPostData.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{selectedPostData.content}</p>
                </CardContent>
                <CardFooter>
                  <Button theme="yellow">Share</Button>
                  <Box />
                  <Button theme="neutral" onClick={() => setSelectedPost(null)}>
                    Back
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
