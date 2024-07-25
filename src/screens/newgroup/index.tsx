import { useState } from "react";
import { Button } from "@components/button";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/header";
import { HightLight } from "@components/hightlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
export function NewGroup() {
  const [groupName, setGroupName] = useState("");
  const navigation = useNavigation();

  function handleCreateGroup() {
    navigation.navigate("players", { group: groupName }); // navega para a tela de jogadores
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
        <Input placeholder="Nome da turma" onChangeText={setGroupName} />
        <Button title="Criar" style={{ marginTop: 20 }}  onPress={handleCreateGroup}/>
      </Content>
    </Container>
  );
}
