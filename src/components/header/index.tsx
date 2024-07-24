import { Container, Logo, BackIcon, BackButton } from "./styles";
import LogoImg from '@assets/logo.png'

type Props = {
    showBackButton?: boolean; // se o botão de voltar deve ser exibido
}
export function Header({showBackButton = false}: Props){
    return (
        <Container>
           { 
            showBackButton && // renderiza o botão de voltar caso o parâmetro seja true
            <BackButton>
                <BackIcon/>
            </BackButton>
            }
            <Logo source={LogoImg} />
        </Container>
    )
}