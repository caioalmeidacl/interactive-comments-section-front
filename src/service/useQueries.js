import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllComments, createComment, createReply } from './api';

export const useFetchComments = () => {
    return useQuery({
        queryKey: ['comments'],
        queryFn: getAllComments,
        onError: error => console.log('Erro ao buscar comentarios', error.message),
    });
};

export const useAddComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content }) => createComment(content),
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
        mutationFn: ({ content, parentId }) => createReply(content, parentId),
        onSuccess: () => {
            // Atualiza os dados no cache
            queryClient.invalidateQueries(['comments']);
        },
    });
};
