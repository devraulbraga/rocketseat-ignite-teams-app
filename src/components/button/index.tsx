import { Container, Title, ButtonTypeStyleProps } from "./styles";
import { TouchableOpacityProps } from "react-native";


type Props = TouchableOpacityProps & {
    title: string;
    buttonType?: ButtonTypeStyleProps; //Opcional prop to change button style
}

export function Button({ title, buttonType = 'PRIMARY',  ...rest }: Props) {
    return (
        <Container
        type={buttonType}
        {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}