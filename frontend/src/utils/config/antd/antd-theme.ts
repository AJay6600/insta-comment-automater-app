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
    InputNumber: {
      activeBg: "#2e3a55",
      activeShadow: "var(--color-active-shadow)",
      activeBorderColor: "var(--color-black)",
      colorTextPlaceholder: "var(--color-grey)",
      colorText: "var(--color-white)",
    },
    Select: {
      colorTextPlaceholder: "var(--color-grey)",
      colorText: "var(--color-white)",
      selectorBg: "#26344a",
      activeOutlineColor: "var(--color-primary)",
      colorBorder: "#2e3a55",
      hoverBorderColor: "#2e3a55",
      optionSelectedBg: "var(--color-primary)",
      optionActiveBg: "var(--color-secondary)",
      multipleItemBg: "var(--gradient-primary)",
    },
    Button: {
      colorBgContainerDisabled: "var(--color-primary)",
    },
  },
} satisfies ThemeConfig;
