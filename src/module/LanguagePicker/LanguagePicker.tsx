import { languages } from '@/shared/config/constants/languages/languages';
import { useLang } from '@/shared/hooks/useLangStore';
import { useTheme } from '@/shared/hooks/useTheme';
import SettingsItem from '@/shared/ui/elements/SettingsItem';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import LangItem from './LangItem';
import { useTranslation } from 'react-i18next';
import { normalizedSize } from '@/shared/utils/size';

export default function LanguagePicker() {
  const colors = useTheme();
  const { t } = useTranslation();
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
        title={t('settings-page.language-title')}
        onPress={toggleModal}
        rightPrefix={currentLanguage?.label}
      />
      <Modal visible={open} animationType="fade" transparent>
        <ModalContainer onClose={toggleModal}>
          <Grid width="90%">
            <Paper color="#000000ab" width="100%" space="sm">
              <ScrollView style={{ maxHeight: normalizedSize(500) }}>
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
              </ScrollView>
            </Paper>
          </Grid>
        </ModalContainer>
      </Modal>
    </Grid>
  );
}
