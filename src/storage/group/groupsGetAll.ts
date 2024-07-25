import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_STORAGE_KEY } from "../storageConfig";

export async function groupsGetAll(){
    try {
        const storage = await AsyncStorage.getItem(GROUP_STORAGE_KEY); // Pega os dados do AsyncStorage
        const groups: string[] = storage ? JSON.parse(storage) : []; // Converte JSON para array
        return groups;
    }catch (error){
        throw error;
    }
}