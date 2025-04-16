import { useGetDreams } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';
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
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      style={{ height: '100%' }}
      ListHeaderComponent={headerComponent}
      data={data}
      ItemSeparatorComponent={() => <Grid height={15} />}
      renderItem={({ item }) => {
        const analysis = getDreamAnalysisResponse(item.analyzeText);
        return (
          <DreamItem
            id={item.id}
            date={new Date(item.createdAt).toDateString()}
            title={item.title}
            description={analysis?.summary || item.inputText}
            onPress={onPressDreamCard}
          />
        );
      }}
      contentContainerStyle={{
        paddingVertical: 80,
        paddingHorizontal: HORIZONTAL_PADDINGS,
      }}
    />
  );
}
