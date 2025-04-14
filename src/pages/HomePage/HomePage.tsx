import { useAuth } from '@/entities/auth/auth.repository';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, initUser } = useAuth();

  useEffect(() => {
    void initUser();
  }, []);

  return (
    <PageWrapper>
      <SafeWrapper>
        <Typography variant="largeTitle" weight="bold">
          Hi, {user?.displayName}
        </Typography>
        {/* <ClearCacheButton /> */}
      </SafeWrapper>
    </PageWrapper>
  );
}
