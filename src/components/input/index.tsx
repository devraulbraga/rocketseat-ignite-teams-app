import {TextInputProps} from "react-native"
import { Container } from "./styles"
import { useTheme } from "styled-components/native"
export function Input({...rest }: TextInputProps){
    const {COLORS} = useTheme(); //Pegando as cores do tema de forma desestruturada
    return(
        <Container
        placeholderTextColor={COLORS.GRAY_300}
        {...rest}
        />
    )
}