import { IZodiacItem } from '@/entities /userTags/types/types';
import { useUserTags } from '@/entities /userTags/userTags.repository';
import ZodiacSignPicker from '@/module/Fields/ZodiacSignPicker/ZodiacSignPicker';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

export default function ZodiacSignScreen() {
  const { updateZodiacSign, zodiacSign } = useUserTags();

  const onChooseZodiacSign = (sign: IZodiacItem) => {
    updateZodiacSign(sign);
  };

  return (
    <SafeWrapper>
      <Typography>ZOdiac sign</Typography>
      <ZodiacSignPicker onChange={onChooseZodiacSign} value={zodiacSign} />
    </SafeWrapper>
  );
}
