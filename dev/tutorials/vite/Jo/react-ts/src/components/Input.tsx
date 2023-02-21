import React, {useState} from "react";

interface InputProps {
    placeHolder: string;
    type?: string;
    value?: string;
    onChange?: (event : React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
    const [value, setValue] = useState(props.value || "");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        //props.onChange && props.onChange(event);
        console.log(event.target.value);
    }

    return (
        <div className="input">
            <input type={props.type || "text"} value={value} onChange={handleChange} placeholder={props.placeHolder} />
        </div>
    )
}
