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

  public fetchPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.postService.fetchPostById(req.params.id);
      res.status(201).json({ message: "Post fetched successfully", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };

  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateData = req.body as CreatePostDTO;
      const data = await this.postService.updatePost(
        req.params.id,
        updateData,
        req.user.id
      );
      res.status(201).json({ message: "Post updated successfully", data });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };

  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateData = req.body as CreatePostDTO;
      await this.postService.deletePost(
        req.params.id as unknown as number,
        req.user.id
      );
      res.status(201).json({ message: "Post deleted successfully" });
    } catch (error: any) {
      res
        .status(error.status ?? 500)
        .json({ message: error.message ?? "Something went wrong" });
    }
  };
}

export default PostController;
