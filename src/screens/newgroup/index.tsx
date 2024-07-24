import { Button } from "@components/button";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/header";
import { HightLight } from "@components/hightlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
export function NewGroup() {
  const navigation = useNavigation();

  function handleCreateGroup() {
    navigation.navigate("players", { group: "Rochedo FC" }); // navega para a tela de
  }
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HightLight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" />
        <Button title="Criar" style={{ marginTop: 20 }}  onPress={handleCreateGroup}/>
      </Content>
    </Container>
  );
}
