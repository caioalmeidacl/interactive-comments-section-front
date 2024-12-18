import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllComments,
  createComment,
  createReply,
  updateScore,
  deleteComment,
  getLikedCommentsByMe,
  updateComment,
} from "./api";

export const useFetchComments = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: getAllComments,
    onError: (error) => console.log(error.message),
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content }) => createComment(content),
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
    onError: (error) => console.log(error),
  });
};

export const useAddReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, parentId }) => createReply(content, parentId),
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
    onError: (error) => console.log(error),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteComment(id),
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
    onError: (error) => console.log(error),
  });
};

export const useUpdateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ score, id, hasLiked }) => updateScore(score, id, hasLiked),
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
    onError: (error) => console.log(error),
  });
};

export const useGetLikedCommentsByMe = () => {
  return useQuery({
    queryKey: ["likedComments"],
    queryFn: getLikedCommentsByMe,
    onError: (error) => console.log(error.message),
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, id }) => updateComment(content, id),
    onSuccess: () => queryClient.invalidateQueries(["comments"]),
    onError: (error) => console.log(error),
  });
};
