import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import { MonsterService } from './monsters.service';

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  MonsterService.getAll,
);

export const triggerFight =  async (monsterAId: Monster, monsterB: Monster) =>
  createAsyncThunk<any>(
    'monsters/triggerFight',
    await MonsterService.fight(monsterAId, monsterB),
  );

export const setSelectedMonster = createAction<Monster | null>(
  'monsters/setSelectedMonster',
);
