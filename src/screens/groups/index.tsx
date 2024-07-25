import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Container } from "./styles";
import { Header } from "@components/header";
import { HightLight } from "@components/hightlight";
import { GroupCard } from "@components/groupcard";
import { ListEmpty } from "@components/listempty";
import { Button } from "@components/button";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation(); // hook para lidar com rotas

  function handleNewGroup() {
    navigation.navigate("new"); // navega para a tela de cadastro de turma
  }
  return (
    <Container>
      <Header />
      <HightLight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups} // dados que serão renderizados
        keyExtractor={(item) => item} // gera um id único para cada item
        renderItem={({ item }) => <GroupCard title={item} />} // renderiza um card para cada item
        contentContainerStyle={groups.length === 0 && { flex: 1 }} // renderiza uma lista vazia caso não haja grupos
        ListEmptyComponent={() => ( // renderiza uma mensagem caso não haja grupos
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
