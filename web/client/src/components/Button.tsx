import MUIButton from "@mui/material/Button";

function Button(props: any) {
    return <MUIButton {...props}>{props.children}</MUIButton>
}

export default Button