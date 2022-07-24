import VirtualizedList from "./VirtualizedList";
import { Button } from "@mui/material";

export default function FileInput({
    id,
    multiple,
    onChange,
    onClear,
    variant,
    text,
    files,
    ...props
}) {
    return (
        <>
            <input
                id={id}
                type="file"
                multiple={multiple}
                onChange={onChange}
                hidden
            />
            <label htmlFor={id}>
                <Button variant={variant} component="span">
                    {text}
                </Button>
            </label>
            <Button variant={"text"} onClick={onClear}>
                Clear
            </Button>
            {files.length > 0 && <VirtualizedList files={files} />}
        </>
    );
}
