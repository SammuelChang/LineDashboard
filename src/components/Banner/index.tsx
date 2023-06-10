import { Children } from "react";
import { textVariants, paddingVariants } from "../../utils/setting";

export default function Banner(props: any) {
  const { title, type, sample, children } = props;

  return (
    <div
      className={`h-min-12 ${paddingVariants[type]} bg-light-500 dark:bg-dark-700  ${textVariants[type]} font-bold rounded-lg text-3xl flex justify-center items-center my-4 relative`}
    >
      {title}
      {children}
    </div>
  );
}
