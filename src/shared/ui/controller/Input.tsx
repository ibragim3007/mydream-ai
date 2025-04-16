import { useTheme } from '@/shared/hooks/useTheme';
import { fontWeight } from '@/shared/styles/typography/typography';
import { normalizedSize } from '@/shared/utils/size';
import { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {}

export default function Input({ ...props }: InputProps) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.text.disabled}
      selectionColor={colors.accent.primary}
      style={[
        {
          borderColor: isFocused ? colors.accent.primary : colors.accent.primary_pale_transparent,
          borderWidth: 2,
          color: colors.text.primary,
          paddingHorizontal: normalizedSize(16),
          paddingVertical: normalizedSize(16),
          fontSize: normalizedSize(18),
          borderRadius: colors.styles.borderRadius,
          backgroundColor: isFocused ? colors.background.neutral : colors.background.neutral,
          fontFamily: fontWeight.medium,
        },
        props.style,
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}
