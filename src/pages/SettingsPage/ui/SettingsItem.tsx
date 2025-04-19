import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { Pressable } from 'react-native';

interface SettingItemProps {
  title: string;
  prefix?: string;
  leftIcon?: React.ReactNode;
  rightIcon: React.ReactNode;
  onPress?: () => void;
  removeSeparator?: boolean;
}

export default function SettingItem({
  title,
  prefix,
  leftIcon,
  rightIcon,
  removeSeparator,
  onPress,
}: SettingItemProps) {
  const colors = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Grid
        style={{ borderRadius: 16 }}
        // height={50}
        color={colors.background.secondary}
        row
        padding={8}
        align="center"
        justfity="space-between"
        width="100%"
      >
        <Grid row align="center" space="md">
          {leftIcon && (
            <Grid padding={8} color={colors.background.neutral} style={{ borderRadius: 8 }}>
              {leftIcon}
            </Grid>
          )}
          <Typography weight="medium">{title}</Typography>
        </Grid>
        <Grid>{rightIcon}</Grid>
      </Grid>
      {/* {removeSeparator || <Separator marginVertical={4} />} */}
    </Pressable>
  );
}
