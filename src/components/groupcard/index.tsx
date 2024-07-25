import { Container, Title, Icon } from "./styles";
import {TouchableOpacityProps} from 'react-native'

/* 
Tipando a função GroupCard para receber props de TouchableOpacity,
 para poder utilizar as props do Touch.
*/
type Props = TouchableOpacityProps & {
    title: string;
}

export function GroupCard({title, ...rest}: Props){
    return (
        // rest passa todas as props para o TouchableOpacity
        <Container {...rest}> 
            <Icon/>
            <Title>{title}</Title>
        </Container>
    )
}