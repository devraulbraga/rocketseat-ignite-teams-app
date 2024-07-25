import {playersGetByGroup} from './playersGetByGroup'

export async function playersGetByGroupAndTeam(group: string, team: string){
    try {
        const storage = await playersGetByGroup(group); // obtem os players do grupo
        const players = storage.filter(player => player.team === team); // filtra os players por equipe
        return players;
    } catch (error) {
        throw error;
    }
}