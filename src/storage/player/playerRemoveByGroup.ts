import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_STORAGE_KEY } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string){
    try {
        const storage = await playersGetByGroup(group); // obtem os players do grupo

        const filtered = storage.filter(player => player.name !== playerName); // encontra o player a ser removido
        const players = JSON.stringify(filtered); // transforma o array em string

        await AsyncStorage.setItem(`${PLAYER_STORAGE_KEY}-${group}`, players); // atualiza o AsyncStorage com os novos players
    } catch (error) {
        throw error;
    }
}