import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import ParticipantItem from '@/shared/ui/elements/ParticipantItem';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { ScrollView } from 'react-native';

interface ParticipantsProps {
  analysis: SleepDataResponse;
}

export default function Participants({ analysis }: ParticipantsProps) {
  return (
    <Grid space="sm">
      <Typography weight="extra-bold" marginLeft={HORIZONTAL_PADDINGS}>
        Characters — {analysis.characters.length}
      </Typography>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDINGS / 2 }}
      >
        <Grid row space="md">
          {analysis.characters.map((character, index) => (
            <ParticipantItem name={character.name} role={character.role} key={index} />
          ))}
        </Grid>
      </ScrollView>
    </Grid>
  );
}
