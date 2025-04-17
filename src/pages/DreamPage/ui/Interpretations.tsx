import ScientificImage from '@/assets/Interpretations/dna.png';
import EsotericImage from '@/assets/Interpretations/flowers.png';
import SelfDevelopmentImage from '@/assets/Interpretations/lamp2.png';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import InterpretationItem from '@/shared/ui/elements/InterpretationItem';
import Grid from '@/shared/ui/grid/Grid';

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
      <InterpretationItem
        isBlocked={false}
        title="Scientific interpretation"
        text={analysis.interpretations.scientific}
        image={ScientificImage}
      />
      <InterpretationItem
        isBlocked={false}
        title="Self development interpretation"
        text={analysis.interpretations.self_development}
        image={SelfDevelopmentImage}
      />
    </Grid>
  );
}
