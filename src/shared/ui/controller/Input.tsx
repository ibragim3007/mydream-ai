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
      placeholderTextColor={colors.text.disabled}
      selectionColor={colors.accent.primary}
      style={{
        borderColor: isFocused ? colors.accent.primary : colors.accent.primary_pale_transparent,
        borderWidth: 2,
        color: colors.text.primary,
        paddingHorizontal: normalizedSize(20),
        paddingVertical: normalizedSize(15),
        fontSize: normalizedSize(18),
        borderRadius: colors.styles.borderRadius,
        backgroundColor: isFocused ? colors.background.primary : colors.background.neutral,
        fontFamily: fontWeight.medium,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}
