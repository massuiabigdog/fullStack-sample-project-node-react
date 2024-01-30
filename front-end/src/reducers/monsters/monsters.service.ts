import { API_URL } from '../../constants/env';
import { Monster } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const fight = async (
  monsterAId: any,
  monsterBId: any,
) =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      monsterA: monsterAId.id,
      monsterB: monsterBId.id,
    }),
  }).then((response) => {
    return response.json()
  });

export const MonsterService = {
  getAll,
  fight,
};
