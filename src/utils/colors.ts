import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";

// 匯出Tailwind顏色定義
export const customColors = resolveConfig(tailwindConfig)?.theme?.colors;
