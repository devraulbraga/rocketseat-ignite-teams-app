import { Container, Logo, BackIcon, BackButton } from "./styles";
import LogoImg from '@assets/logo.png'
import { useNavigation } from "@react-navigation/native";
type Props = {
    showBackButton?: boolean; // se o botão de voltar deve ser exibido
}
export function Header({showBackButton = false}: Props){
    const navigation = useNavigation(); // utilizando a hook do react-navigation para navegação
    function handleBack(){
        navigation.navigate("groups"); // navega para a tela de grupos
    }
    return (
        <Container>
           { 
            showBackButton && // renderiza o botão de voltar caso o parâmetro seja true
            <BackButton onPress={handleBack}>
                <BackIcon/>
            </BackButton>
            }
            <Logo source={LogoImg} />
        </Container>
    )
}