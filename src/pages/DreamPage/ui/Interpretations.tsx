import ScientificImage from '@/assets/Interpretations/forest-o3.png';
import EsotericImage from '@/assets/Interpretations/flowers2-o3.png';
import SelfDevelopmentImage from '@/assets/Interpretations/lamp-o3.png';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import InterpretationItem from '@/shared/ui/elements/InterpretationItem';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';

interface InterpretationsProps {
  analysis: SleepDataResponse;
  isActive?: boolean;
}

export default function Interpretations({ analysis, isActive }: InterpretationsProps) {
  return (
    <Grid paddingHorizontal={HORIZONTAL_PADDINGS} space="md">
      <Typography weight="extra-bold" variant="title-2">
        Interpretations
      </Typography>
      <Grid space="md">
        <InterpretationItem
          isBlocked={false}
          title="Esoteric interpretation"
          text={analysis.interpretations.esoteric}
          image={EsotericImage}
          description={'Hidden signs and soul messages.\nSymbols guide inner awareness.'}
        />
        <InterpretationItem
          isBlocked={!isActive}
          title="Scientific interpretation"
          text={analysis.interpretations.scientific}
          image={ScientificImage}
          description={'Dreams reflect brain activity.\nThey reveal stress and emotion.'}
        />
        <InterpretationItem
          isBlocked={!isActive}
          title="Self development interpretation"
          text={analysis.interpretations.self_development}
          image={SelfDevelopmentImage}
          description={'Dreams mirror growth and change.\nThey help unlock potential.'}
        />
      </Grid>
    </Grid>
  );
}
