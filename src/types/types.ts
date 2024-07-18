type Tweet = {
  id: number
  content: string
  created_at: string
  userId: number
  likes_count: number
  user: User
  likes: Likes[]
}

type Coments = {
  count: number
}

type Likes = {
  userId: number
  postId: number
}
type User = {
  avatar_url: string
  created_at: string
  email: string
  id: number
  name: string
  surname: string
  username: string
}
