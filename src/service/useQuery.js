import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllComments, createComment, createReply } from './api';

export const useFetchComments = async () => {
    const { comments } = await getAllComments();
    return comments;
};

export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content }) => createComment(content), 
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']);
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

// Hook para adicionar uma resposta a um comentário
export const useAddReply = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, parentId }) => createReply(content, parentId),
        onSuccess: () => {
            // Atualiza os dados no cache
            queryClient.invalidateQueries(['comments']);
        },
    });
};