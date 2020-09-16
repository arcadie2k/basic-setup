import { Post } from '../entity/Post'

export const exampleMiddleware = async (req: any, res: any, next: any) => {
  await Post.create({
    title: 'sample post'
  }).save()
  next()
} 