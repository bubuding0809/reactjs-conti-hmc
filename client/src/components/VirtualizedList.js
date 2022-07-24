import * as React from "react";
import { FixedSizeList } from "react-window";
import Box from "@mui/material/Box";
import {
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import SourceIcon from "@mui/icons-material/Source";

const ITEMSIZE = 48;

export default function VirtualizedList(props) {
    const listLength = props.files.length;

    function renderRow({ index, style }) {
        const { name } = props.files[index];

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <SourceIcon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <Box bgcolor={"background.paper"}>
            <FixedSizeList
                height={listLength < 5 ? ITEMSIZE * listLength : ITEMSIZE * 5}
                width="100%"
                itemSize={ITEMSIZE}
                itemCount={listLength}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
        </Box>
    );
}
