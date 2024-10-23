import { IBlog } from "./blog.type";

// User interface
export interface IUser {
    id: string; // Unique identifier for the user
    username: string; // Unique username for the user
    blogs: IBlog[]; // Array of blogs authored by the user
    comments: Comment[]; // Array of comments made by the user
  }