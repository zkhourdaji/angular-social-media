export interface Like {
  // TODO: user userId instead of username
  username: string;
}

export interface Comment {
  id: number;
  // userId: number;
  username: string;
  body: string;
  date: Date;
  likes?: Like[];
}

export interface Post {
  id: number;
  // TODO: use userId instead of username
  // userId: number;
  username: string;
  title: string;
  body: string;
  date: Date;
  comments?: Comment[];
  likes?: Like[];
}

export const posts: Post[] = [
  {
    id: 0,
    username: 'Zafer',
    title: 'nesciunt iure omnis dolorem tempora et accusantium',
    body: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis'
      + 'et est aut quod aut provident voluptas autem voluptas',
    date: new Date(),
    comments: [
      { id: 0, username: 'Zafer', body: 'Great post!', date: new Date() },
      { id: 1, username: 'Zafer', body: 'Another Comment', date: new Date() },
      { id: 2, username: 'Zafer', body: 'Ayye', date: new Date() },
      { id: 3, username: 'Zafer', body: 'Spam spam spam', date: new Date() },
      { id: 4, username: 'Zafer', body: 'Another Comment', date: new Date() },

    ],
    likes: [{ username: 'Test' }]
  },
  {
    id: 1,
    username: 'Jeff',
    title: 'nesciunt iure omnis dolorem tempora et accusantium',
    body: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis'
      + 'et est aut quod aut provident voluptas autem voluptas',
    date: new Date(),
    comments: [{ id: 1, username: 'Jeff', body: 'Nice post', date: new Date() }],
    likes: [{ username: 'Zafer' }]
  },
  {
    id: 2,
    username: 'Nick',
    title: 'nesciunt iure omnis dolorem tempora et accusantium',
    body: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis'
      + 'et est aut quod aut provident voluptas autem voluptas',
    date: new Date(),
    comments: [{ id: 2, username: 'Will', body: 'Thats awesome', date: new Date() }],
    likes: [{ username: 'Zafer' }]
  },
  {
    id: 3,
    username: 'Will',
    title: 'nesciunt iure omnis dolorem tempora et accusantium',
    body: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis'
      + 'et est aut quod aut provident voluptas autem voluptas',
    date: new Date(),
    comments: [{ id: 3, username: 'Nick', body: 'this is a comment', date: new Date() }],
    likes: [{ username: 'Zafer' }]
  },
];
