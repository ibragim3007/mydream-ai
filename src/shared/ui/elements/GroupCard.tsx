import { useTheme } from '@/shared/hooks/useTheme';
import { PropsWithChildren } from 'react';
import Grid from '../grid/Grid';

interface GroupCardProps extends PropsWithChildren {
  title: string;
}

export default function GroupCard({ title, children }: GroupCardProps) {
  const colors = useTheme();
  return (
    <Grid>
      <Grid>{children}</Grid>
    </Grid>
  );
}
