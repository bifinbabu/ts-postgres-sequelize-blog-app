import { Request, Response, NextFunction } from "express";
import { CreatePostDTO } from "../dtos/post.dto";
import { PostService } from "../services/post.service";

class PostController {
  public postService = new PostService();

  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postData: CreatePostDTO = req.body;
      const data = await this.postService.createPost(postData, req.user.id);
      res.status(201).json({ message: "Post created successfully", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };

  public fetchPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.postService.fetchPosts();
      res.status(201).json({ message: "All posts fetched successfully", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };
}

export default PostController;
