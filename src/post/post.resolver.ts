import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/roles.decorator';
import { UserData } from 'src/auth/userData.decorator';
import { User } from 'src/user/entities/user.entity';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { FindAllPostsInput, FindAllPostsOutput } from './dtos/findAllPosts.dto';
import { FindPostByIdInput, FindPostByIdOutput } from './dtos/findPostById.dto';
import {
  FindPostByTitleInput,
  FindPostByTitleOutput,
} from './dtos/findPostByTitle.dto';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Roles('User', 'Admin')
  @Mutation((returns) => CreatePostOutput)
  createPost(
    @UserData() author: User,
    @Args('input') createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(author, createPostInput);
  }

  @Query((returns) => FindAllPostsOutput)
  findAllPosts(
    @Args('input') findAllPostsInput: FindAllPostsInput,
  ): Promise<FindAllPostsOutput> {
    return this.postService.findAllPosts(findAllPostsInput);
  }

  @Query((returns) => FindPostByIdOutput)
  findPostById(
    @Args('input') findPostByIdInput: FindPostByIdInput,
  ): Promise<FindPostByIdOutput> {
    return this.postService.findPostById(findPostByIdInput);
  }

  @Roles('Admin', 'User')
  @Mutation((returns) => EditPostOutput)
  editPost(
    @UserData() user: User,
    @Args('input') editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(user.id, editPostInput);
  }

  @Query((returns) => FindPostByTitleOutput)
  findPostByTitle(
    @Args('input') findPostByTitleInput: FindPostByTitleInput,
  ): Promise<FindPostByTitleOutput> {
    return this.postService.findPostByTitle(findPostByTitleInput);
  }
}
