import { IComment } from "./comment.type";
import { IUser } from "./user.type";

// Define the Tag enum
export enum Tag {
    HISTORY = 'HISTORY',
    FOOD = 'FOOD',
    PETS = 'PETS',
    HEALTH = 'HEALTH',
    FASHION = 'FASHION',
    EXERCISE = 'EXERCISE', 
    OTHERS = 'OTHERS',
  }
// Blog interface
export interface IBlog {
    id: string; // Unique identifier for the blog
    createdAt: Date; // Timestamp of when the blog was created
    updatedAt: Date; // Timestamp of when the blog was last updated
    title: string; // Title of the blog
    content: string; // Content of the blog
    community: Tag; // Tag representing the community category
    userId: string; // Reference to the author of the blog (User ID)
    user: IUser; // Relation to the User model
    comments: IComment[]; // Array of comments associated with the blog
    _count: any; 
  }