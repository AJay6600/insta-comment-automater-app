import type { ThemeConfig } from "antd/es/config-provider/context";

const styles = getComputedStyle(document.documentElement);

export default {
  token: {
    colorPrimary: styles.getPropertyValue("--color-primary"),
  },
  components: {
    Input: {
      activeBg: "#2e3a55",
      activeShadow: "var(--color-active-shadow)",
      activeBorderColor: "var(--color-black)",
      colorTextPlaceholder: "var(--color-grey)",
    },
  },
} satisfies ThemeConfig;
