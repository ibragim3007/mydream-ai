import { useGetDreams } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import DreamItem from '@/shared/ui/elements/DreamItem';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { router } from 'expo-router';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DreamsListProps {
  headerComponent: React.ComponentType<any>;
}

export default function DreamsList({ headerComponent }: DreamsListProps) {
  const { data, isLoading, isError } = useGetDreams();
  const insets = useSafeAreaInsets();
  const onPressDreamCard = (id: string) => {
    router.push(`/screens/dream/${id}`);
  };

  if (isError) {
    return <Typography>Error loading dreams</Typography>;
  }

  return (
    <Grid>
      <FlatList
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        style={{ height: '100%' }}
        ListHeaderComponent={headerComponent}
        data={data}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <Grid height={15} />}
        ListFooterComponent={() => {
          if (isLoading)
            return (
              <Grid marginVertical={10}>
                <LoaderIndicator />
              </Grid>
            );
        }}
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
          paddingBottom: 80,
          paddingHorizontal: HORIZONTAL_PADDINGS,
          paddingTop: insets.top,
        }}
      />
    </Grid>
  );
}
