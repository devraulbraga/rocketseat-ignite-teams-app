import { Header } from "@components/header";
import { Container, Form, HeaderList, NumbersPlayers } from "./styles";
import { HightLight } from "@components/hightlight";
import { ButtonIcon } from "@components/buttonIcon";
import { Input } from "@components/input";
import { Filter } from "@components/filter";
import { PlayerCard } from "@components/playercard";
import { Alert, FlatList, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import { ListEmpty } from "@components/listempty";
import { Button } from "@components/button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = { group: string }; // Definindo a tipagem dos parâmetros da rota

export function Players() {
  const [newPlayerName, setNewPlayer] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute(); // Obtendo os parâmetros da rota
  const { group } = route.params as RouteParams; // Desestruturando os parâmetros da rota
  const newPlayerRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Atenção", "Por favor, informe o nome do jogador.");
    }
    const newPlayer = {
      name: newPlayerName,
      team, 
    }
    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerRef.current?.blur();
      setNewPlayer('');
      fetchPlayersByTeam();

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert("Atenção", error.message);
      }else {
        console.log(error);
        Alert.alert("Atenção", "Ocorreu um erro ao tentar adicionar o jogador.");
      }
    }
  }
  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao tentar carregar os jogadores.");
    }
  }
  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao tentar remover o jogador.");
    }
  }
  async function groupRemove(){
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups"); // Navega para a tela de turmas
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao tentar remover a turma.");
    }

  }
  async function handleGroupRemove(){
    Alert.alert(
      "Remover turma",
      "Deseja mesmo remover a turma e todos os jogadores?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => groupRemove(),
        },
      ],
      { cancelable: false }
    );
  }
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);
  return (
    <Container>
      <Header showBackButton />
      <HightLight
        title={group} // Título da turma
        subTitle="adicione a galera e separe os times"
      />
      <Form>
        <Input 
        inputRef={newPlayerRef}  // Referência para o input do nome do jogador
        placeholder="Nome da pessoa" 
        autoCorrect={false} 
        onChangeText={setNewPlayer} 
        value={newPlayerName}/>
        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
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
      <Button title="Remover turma" buttonType="SECONDARY" onPress={handleGroupRemove}/>
    </Container>
  );
}
