import { bgVariants } from "../../utils/setting";
import { BsChat, BsEmojiSmile } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { BiSticker } from "react-icons/bi";

export default function Legend({ data }: any) {
  const { title, type, value, unit } = data;
  return (
    <div
      key={title}
      className={`${bgVariants[type]} dark:bg-opacity-80 h-full w-full rounded-xl p-6 lg:p-4 text-white dark:text-opacity-90 relative`}
    >
      <div className="text-4xl font-bold pb-2 whitespace-nowrap">
        {value} {unit}
      </div>
      <div className="text-xl font-light">{title}</div>

      <div className="w-10 h-10 absolute right-4 bottom-4">
        {/* <img src={icon}></img> */}
        {type === "message" && <BsChat size="2.5rem" />}
        {type === "call" && <FiPhoneCall size="2.5rem" />}
        {type === "sticker" && <BiSticker size="3rem" />}
        {type === "emoji" && <BsEmojiSmile size="2.5rem" />}
      </div>
    </div>
  );
}
