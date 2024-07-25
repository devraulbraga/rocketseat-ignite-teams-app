import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_STORAGE_KEY, PLAYER_STORAGE_KEY } from "@storage/storageConfig";

import { groupsGetAll } from "@storage/group/groupsGetAll";

export async function groupRemoveByName(groupDeleted: string){
    try {
        const storedGroups = await groupsGetAll();
        const groups = storedGroups.filter(group => group !== groupDeleted); // filtra o grupo a ser removido
        await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(groups)); // atualiza o AsyncStorage com os novos grupos
        await AsyncStorage.removeItem(`${PLAYER_STORAGE_KEY}-${groupDeleted}`); // remove os players do grupo
    } catch (error) {
        throw error;
    }
}