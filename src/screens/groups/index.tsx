import { Container } from "./styles";
import { Header } from "@components/header";
import { HightLight } from "@components/hightlight";
import { GroupCard } from "@components/groupcard";
import { ListEmpty } from "@components/listempty";
import { Button } from "@components/button";
import { useState } from "react";
import { FlatList } from "react-native";
export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  return (
    <Container>
      <Header />
      <HightLight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups} // dados que serão renderizados
        keyExtractor={(item) => item} // gera um id único para cada item
        renderItem={({ item }) => <GroupCard title={item} />} 
        contentContainerStyle={groups.length === 0 && { flex: 1 }} // renderiza uma lista vazia caso não haja grupos
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />
      <Button title="Cadastrar Turma" />
    </Container>
  );
}
