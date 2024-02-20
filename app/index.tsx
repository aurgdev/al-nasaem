import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { i18n, t } = useTranslation(["languages"]);
  console.log(i18n.languages);

  //array with all supported languages
  const languages = [
    { name: "ar", label: `${t("languages:arabic")}` },
    { name: "en", label: `${t("languages:english")}` },
  ];
  const LanguageItem = ({ name, label }: { name: string; label: string }) => (
    <Pressable
      style={[
        styles.link,
        { alignItems: i18n.language === "ar" ? "flex-end" : "flex-start" },
      ]}
      onPress={() => {
        i18n.changeLanguage(name); //changes the app language
        // router.back();
      }}
    >
      <View
        style={[
          styles.links,
          { flexDirection: i18n.language === "ar" ? "row-reverse" : "row" },
        ]}
      >
        {/* {i18n.language === name && (
          <AntDesign
            style={{ paddingHorizontal: 2 }}
            name="check"
            size={20}
            color="black"
          />
        )} */}
        <Text
          style={[
            styles.title,
            { paddingHorizontal: i18n.language === name ? 0 : 24 },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <LanguageItem {...lang} key={lang.name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  links: {
    display: "flex",
  },
  link: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    // elevation: 1,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 16,
  },
});
