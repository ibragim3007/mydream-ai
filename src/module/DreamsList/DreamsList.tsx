import { useGetDreams } from '@/entities/dream/dream.repository';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import DreamItem from '@/shared/ui/elements/DreamItem';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { router } from 'expo-router';
import { ActivityIndicator, FlatList } from 'react-native';

interface DreamsListProps {
  headerComponent: React.ComponentType<any>;
}

export default function DreamsList({ headerComponent }: DreamsListProps) {
  const { data, isLoading, isError } = useGetDreams();

  const onPressDreamCard = (id: string) => {
    router.push(`/screens/dream/${id}`);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Typography>Error loading dreams</Typography>;
  }

  return (
    <FlatList
      style={{ height: '100%' }}
      ListHeaderComponent={headerComponent}
      data={data}
      ItemSeparatorComponent={() => <Grid height={20} />}
      renderItem={({ item }) => (
        <DreamItem
          id={item.id}
          date={new Date(item.createdAt).toDateString()}
          title={item.title}
          description={item.inputText}
          onPress={onPressDreamCard}
        />
      )}
      contentContainerStyle={{
        paddingVertical: 80,
        paddingHorizontal: HORIZONTAL_PADDINGS,
      }}
    />
  );
}
