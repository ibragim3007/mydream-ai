import { languages } from '@/shared/config/constants/languages/languages';
import { useLang } from '@/shared/hooks/useLangStore';
import { useTheme } from '@/shared/hooks/useTheme';
import SettingsItem from '@/shared/ui/elements/SettingsItem';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Modal } from 'react-native';
import LangItem from './LangItem';

export default function LanguagePicker() {
  const colors = useTheme();
  const { lang, setLang } = useLang();
  const currentLanguage = languages.find(language => language.code === lang);

  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <Grid>
      <SettingsItem
        leftIcon={<MaterialIcons name="language" size={24} color={colors.text.primary} />}
        title="Language"
        onPress={toggleModal}
        rightPrefix={currentLanguage?.label}
      />
      <Modal visible={open} animationType="fade" transparent>
        <ModalContainer onClose={toggleModal}>
          <Grid width="80%">
            <Paper width="100%" space="sm">
              {languages.map(language => (
                <LangItem
                  isPicked={lang === language.code}
                  key={language.code}
                  label={language.label}
                  flag={language.flag}
                  onPress={() => {
                    setLang(language.code);
                    toggleModal();
                  }}
                />
              ))}
            </Paper>
          </Grid>
        </ModalContainer>
      </Modal>
    </Grid>
  );
}
