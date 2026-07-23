import { IconEye, IconEyeCancel, IconEyeClosed } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: string;
  bgColor: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  borderColor?: string;
  message?: string;
  isRequired?: boolean;
  spaceBottom?: boolean;
  spaceTop?: boolean;
}

export default function Input(props: Props) {
  const [ vis, setVis ] = useState(false);

  const eyeClass = "absolute top-1/2 -translate-y-1/2 right-3 h-full cursor-pointer"

  return (
    <div
    className={"flex flex-col justify-start items-start " + props.width + " " + (props.spaceBottom && props.spaceTop ? "my-3" : props.spaceBottom ? "mb-3" : props.spaceTop && "mb-3")}> 
      <label
      className="text-sm">
        {props.label} <span className="text-red-600"> {props.isRequired && "*"} </span>
      </label>

      {
        props.type === "password" ?
        <div
        className="w-full relative">
          <input
          type={vis ? "text" : "password"}
          className={"rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full " + " " + props.className + " " + props.bgColor + " " + props.borderColor}
          placeholder={props.placeholder}
          required={props.isRequired}
          value={props.value}
          name={"credifox-key-" + props.name}
          onChange={(e) => { props.onChange(e) }} />

          {
            vis ?
            <IconEye
            size={20}
            className={eyeClass}
            onClick={() => setVis(prev => prev ? false : true)} />
            :
            <IconEyeClosed
            size={20}
            className={eyeClass}
            onClick={() => setVis(prev => prev ? false : true)} />
          }
        </div>
        :
        <input
        type={props.type || "text"}
        className={"rounded-sm py-2 px-4 outline-none duration-400 border focus:border-orange-600 w-full " + " " + props.className + " " + props.bgColor + " " + props.borderColor}
        placeholder={props.placeholder}
        required={props.isRequired}
        value={props.value}
        name={"credifox-key-" + props.name}
        onChange={(e) => { props.onChange(e) }} />
      }

      <p
      className="text-sm text-neutral-500">
        {props.message}
      </p>
    </div>
  )
}