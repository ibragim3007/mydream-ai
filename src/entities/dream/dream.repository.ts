import { createDream, deleteDream, getDream, getDreams } from '@/shared/api/entities/dream/dream.api';
import { CreateDreamDto, DreamsQueryDto } from '@/shared/api/entities/dream/dream.types';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getDreamKeys = ['dream'];
export const useGetDreamById = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: getDreamKeys,
    queryFn: () => getDream(id),
  });

  return { data, isLoading, isError };
};

const getDreamsKeys = ['dreams'];
export const useGetDreams = (params?: DreamsQueryDto) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: getDreamsKeys,
    queryFn: () => getDreams(params),
  });

  return { data, isLoading, isError };
};

export const useCreateDream = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: getDreamsKeys,
    mutationFn: (payload: CreateDreamDto) => createDream(payload),
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: getDreamsKeys,
      });
    },
  });

  const createDreamFunction = async (payload: CreateDreamDto) => {
    return await handleMutation(() => mutateAsync(payload));
  };

  return {
    createDreamFunction,
    isPending,
    isError,
  };
};

export const useDeleteDream = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (id: string) => deleteDream(id),
  });

  const deleteDreamFunction = async (id: string) => {
    return await handleMutation(() => mutateAsync(id));
  };

  return {
    deleteDreamFunction,
    isPending,
    isError,
  };
};
