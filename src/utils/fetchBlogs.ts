
import httpService from "@/service/httpService";
import { Tag } from "@/types/blog.type";

export interface CreateBlog{
    title:string;
    content: string;
    community:Tag;
    userId: string;
}
export async function addBlogPost(payload: CreateBlog) {
  
    try {
        const response = await httpService.post<any>(`/blog`,payload);
    
        return response;
    } catch (error: any) {
      return error.message 
    } 
}
export async function updateBlogPost(id:string,payload: CreateBlog) {
  
    try {
        const response = await httpService.patch<any>(`/blog/${id}`,payload);
    
        return response;
    } catch (error: any) {
      return error.message 
    } 
}
export async function deleteBlogPost(id:string) {
  
    try {
        const response = await httpService.delete<any>(`/blog/${id}`);
    
        return response;
    } catch (error: any) {
      return error.message 
    } 
}


