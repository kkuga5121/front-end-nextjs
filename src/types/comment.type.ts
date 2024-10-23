import { IBlog } from "./blog.type";
import { IUser } from "./user.type";

// Comment interface
export interface IComment {
    id: string; // Unique identifier for the comment
    createdAt: Date; // Timestamp of when the comment was created
    updatedAt: Date; // Timestamp of when the comment was last updated
    content: string; // Content of the comment
    userId: string; // Reference to the user who made the comment (User ID)
    user: IUser; // Relation to the User model
    blogId: string; // Reference to the blog associated with the comment
    blog: IBlog; // Relation to the Blog model
  }