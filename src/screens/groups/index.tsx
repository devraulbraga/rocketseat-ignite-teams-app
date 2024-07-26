import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert, FlatList } from "react-native";
import { Container } from "./styles";
import { Header } from "@components/header";
import { HightLight } from "@components/hightlight";
import { GroupCard } from "@components/groupcard";
import { ListEmpty } from "@components/listempty";
import { Button } from "@components/button";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation(); // hook para lidar com rotas

  function handleNewGroup() {
    navigation.navigate("new"); // navega para a tela de cadastro de turma
  }
  async function loadGroups() {
    try {
      const data = await groupsGetAll(); // chama a função que retorna as turmas salvas no storage
      setGroups(data); // seta os dados na variável groups
    }catch(error){
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao tentar carregar");
    }
  }
  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group }); // navega para a tela de jogadores
  }
  useFocusEffect(useCallback(() => {
    loadGroups();
  }, []));
  return (
    <Container>
      <Header />
      <HightLight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups} // dados que serão renderizados
        keyExtractor={(item) => item} // gera um id único para cada item
        renderItem={({ item }) => <GroupCard title={item} onPress={() => handleOpenGroup(item)}/>} // renderiza um card para cada item
        contentContainerStyle={groups.length === 0 && { flex: 1 }} // renderiza uma lista vazia caso não haja grupos
        ListEmptyComponent={() => ( // renderiza uma mensagem caso não haja grupos
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
