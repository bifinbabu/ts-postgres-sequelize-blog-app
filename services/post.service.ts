import { CreatePostDTO } from "../dtos/post.dto";
import { Post, PostAttributes } from "../models/Post";
import { User } from "../models/User";

export class PostService {
  public async createPost(
    data: CreatePostDTO,
    userId: number
  ): Promise<PostAttributes> {
    return await Post.create({
      title: data.title,
      description: data.description,
      userId,
    });
  }

  public async fetchPosts(): Promise<PostAttributes[]> {
    return await Post.findAll({
      attributes: ["id", "title", "userId", "description"],
    });
  }

  public async fetchPostById(id: string): Promise<PostAttributes | null> {
    return await Post.findOne({
      where: { id },
      include: [
        { model: User, attributes: ["id", "name", "email"], as: "userAlias" },
      ],
    });
  }

  public async updatePost(
    id: string,
    data: CreatePostDTO,
    user: number
  ): Promise<PostAttributes> {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      throw { status: 404, message: "Post not found" };
    }
    if (post.userId !== user) {
      throw {
        status: 403,
        message: "You don't have permission to update this post",
      };
    }
    const updatedPost = await Post.update(data, {
      where: { id },
      returning: true,
    });
    // return post;
    return updatedPost[1][0];
  }
}
