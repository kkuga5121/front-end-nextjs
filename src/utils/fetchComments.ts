import httpService from "@/service/httpService";
import { IComment } from "@/types/comment.type";

export interface CreateComment{
    content: string;
    userId: string;
    blogId: string;
}

export async function addCommentPost(payload: CreateComment) {
  
    try {
        const response = await httpService.post<any>(`/comment`,payload);
    
        return response;
    } catch (error: any) {
      return error.message 
    } 
}
export async function updateComment(id:string,payload: CreateComment) {
  
    try {
        const response = await httpService.patch<any>(`/comment/${id}`,payload);
    
        return response;
    } catch (error: any) {
      return error.message 
    } 
}
export async function deleteCommentt(id:string) {
  
    try {
        const response = await httpService.delete<any>(`/comment/${id}`);
    
        return response;
    } catch (error: any) {
      return error.message 
    } 
}


