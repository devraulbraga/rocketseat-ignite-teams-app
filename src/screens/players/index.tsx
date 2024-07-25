import { Header } from "@components/header";
import { Container, Form, HeaderList, NumbersPlayers } from "./styles";
import { HightLight } from "@components/hightlight";
import { ButtonIcon } from "@components/buttonIcon";
import { Input } from "@components/input";
import { Filter } from "@components/filter";
import { PlayerCard } from "@components/playercard";
import { FlatList } from "react-native";
import { useState } from "react";
import { ListEmpty } from "@components/listempty";
import { Button } from "@components/button";
import { useRoute } from "@react-navigation/native";

type RouteParams = { group: string };

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);

  const route = useRoute(); 
  const { group } = route.params as RouteParams;
  return (
    <Container>
      <Header showBackButton />
      <HightLight
        title={group}
        subTitle="adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersPlayers>{players.length}</NumbersPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
      />
      <Button title="Remover turma" buttonType="SECONDARY" />
    </Container>
  );
}
