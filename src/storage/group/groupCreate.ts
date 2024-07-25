import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_STORAGE_KEY } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string){
    try {
        const storedGroups = await groupsGetAll();  // Get existing groups from AsyncStorage
        const groupAlreadyExists = storedGroups.includes(newGroup); // Verifica se o grupo já existe
        if (groupAlreadyExists){
            throw new AppError('Já existe um grupo com esse nome.');
        }
        const storage = JSON.stringify([...storedGroups, newGroup]) // Convert array to JSON and add new group
        await AsyncStorage.setItem(GROUP_STORAGE_KEY, storage); // Atualiza AsyncStorage com os novos grupos
    }catch (error) {
        throw error; 
    }
}