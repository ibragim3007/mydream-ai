import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable } from 'react-native';

interface SettingItemProps {
  title: string;
  prefix?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  removeSeparator?: boolean;
  danger?: boolean;
}

export default function SettingItem({
  title,
  prefix,
  leftIcon,
  rightIcon,
  removeSeparator,
  danger,
  onPress,
}: SettingItemProps) {
  const colors = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Grid
        style={{ borderRadius: 16 }}
        // height={50}
        color={danger ? colors.background.negative : colors.background.secondary}
        row
        padding={7}
        align="center"
        justfity="space-between"
        width="100%"
      >
        <Grid row align="center" space="sm">
          {leftIcon && (
            <Grid
              padding={8}
              // color={danger ? colors.background.negative : colors.background.neutral}
              style={{ borderRadius: 8 }}
            >
              {leftIcon}
            </Grid>
          )}
          <Grid>
            <Typography weight="medium">{title}</Typography>
            {prefix && (
              <Typography weight="light" variant="caption-1">
                {prefix}
              </Typography>
            )}
          </Grid>
        </Grid>

        {rightIcon ? rightIcon : <Entypo name="chevron-right" size={24} color={colors.text.secondary} />}
      </Grid>
      {/* {removeSeparator || <Separator marginVertical={4} />} */}
    </Pressable>
  );
}
