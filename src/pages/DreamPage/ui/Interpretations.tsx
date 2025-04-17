import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import InterpretationItem from '@/shared/ui/elements/InterpretationItem';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import EsotericImage from '@/assets/Interpretations/flowers.png';

interface InterpretationsProps {
  analysis: SleepDataResponse;
}

export default function Interpretations({ analysis }: InterpretationsProps) {
  return (
    <Grid paddingHorizontal={HORIZONTAL_PADDINGS} space="md">
      <InterpretationItem
        isBlocked={false}
        title="Esoteric interpretation"
        text={analysis.interpretations.esoteric}
        image={EsotericImage}
      />
      <Paper space="sm">
        <Typography variant="headline" weight="bold">
          Esoteric
        </Typography>
        <Typography>{analysis.interpretations.esoteric}</Typography>
      </Paper>
      <Paper space="sm">
        <Typography variant="headline" weight="bold">
          Scientific
        </Typography>
        <Typography>{analysis.interpretations.scientific}</Typography>
      </Paper>
      <Paper space="sm">
        <Typography variant="headline" weight="bold">
          Self_development
        </Typography>
        <Typography>{analysis.interpretations.self_development}</Typography>
      </Paper>
    </Grid>
  );
}
