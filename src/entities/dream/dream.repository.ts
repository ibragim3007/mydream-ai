import { createDream, deleteDream, getDream, getDreams } from '@/shared/api/entities/dream/dream.api';
import { CreateDreamDto, DreamsQueryDto } from '@/shared/api/entities/dream/dream.types';
import { handleMutation } from '@/shared/utils/handleMutation';
import { useMutation, useQuery } from '@tanstack/react-query';

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
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (payload: CreateDreamDto) => createDream(payload),
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
