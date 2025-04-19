import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useHeaderHeight } from '@react-navigation/elements';
import LogOutBlock from './ui/LogOutBlock';

export default function SettingsPage() {
  const headerHeight = useHeaderHeight();
  return (
    <PageWrapper>
      <SafeWrapper style={{ paddingTop: 15 + headerHeight, flex: 1 }}>
        <Typography>asd</Typography>

        <LogOutBlock />
      </SafeWrapper>
    </PageWrapper>
  );
}
