import { useUserTags } from '@/entities/userTags/userTags.repository';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

export default function HomePage() {
  const { name } = useUserTags();
  return (
    <PageWrapper>
      <SafeWrapper>
        <Typography>Hi, {name}</Typography>
      </SafeWrapper>
    </PageWrapper>
  );
}
