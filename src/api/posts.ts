import { UUID } from "crypto";
import { supabase } from "./supabase";
import { QUERY_KEYS } from "@/query/keys";

type POST = {
    id?: UUID;
    userid?: string;
    content?: string;
    photo?: string;
    isEditing?: boolean;
    editingText?: string;
    timeStamp?: number;
};

type NewPost = Omit<POST, 'id' | 'createdAt' | 'editingText'>;

//등록된 게시글 목록 가져오기
const getPosts = async () => {
    const { data } = await supabase.from(QUERY_KEYS.POSTS).select();
    return data;
};

// 새 게시글 등록
const addPost = async (newPost: NewPost) => {
    await supabase.from(QUERY_KEYS.POSTS).insert(newPost);
};

// 게시글 수정
const updatePost = async ({ id, editingText }: POST) => {
    await supabase.from(QUERY_KEYS.POSTS).update({ content: editingText, isEditing: false }).eq('id', id);
};
  
// 게시글 삭제
const deletePost = async (id: string) => {
    await supabase.from(QUERY_KEYS.POSTS).delete().eq('id', id);
};

export {
    getPosts,
    addPost,
    updatePost,
    deletePost
};
  