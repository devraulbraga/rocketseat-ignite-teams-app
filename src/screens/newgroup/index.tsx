import { useState } from "react";
import { Button } from "@components/button";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/header";
import { HightLight } from "@components/hightlight";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";
export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleCreateGroup() {
    try {
      if(group.trim() === ""  || group.trim().length < 3  ){
        Alert.alert("Aviso", "O nome da turma deve ter pelo menos 3 caracteres.");
        return;
      }
      await groupCreate(group)  //  chamada para a função que cria a turma no storage
      navigation.navigate("players", { group }); // navega para a tela de jogadores
    }catch(error){
      if(error instanceof AppError){
        Alert.alert("Atenção", error.message);
      }else {
        Alert.alert("Atenção", "Ocorreu um erro ao tentar criar a turma.");
        console.log(error);
      }
    }
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
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }}  onPress={handleCreateGroup}/>
      </Content>
    </Container>
  );
}
