import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const fight = async (monsterA: Monster, monsterB: Monster) => {
  let first, second, winner;

  if (monsterA.speed > monsterB.speed) {
    first = monsterA;
    second = monsterB;
  } else {
    first = monsterB;
    second = monsterA;
  }

  while (true) {
    let damage = Math.max(1, first.attack - second.defense);
    second.hp -= damage;
    if (second.hp <= 0) return first;
    damage = Math.max(1, second.attack - first.defense);
    first.hp -= damage;
    if (first.hp <= 0) return second;
  }
};

const startFight = async (req: Request, res: Response): Promise<Response> => {
  const { monsterA, monsterB } = req.body;

  let responseOutput;

  try {
    const human = await Monster.query().findById(monsterA);
    const machine = await Monster.query().findById(monsterB);
    if (!human || !machine) throw new Error('Monster not found!');

    const winner = await fight(human, machine);
    const battleLog = {
      monsterA: human,
      monsterB: machine,
      winner,
    };
    await Battle.query().insert(battleLog);
    responseOutput = res.status(StatusCodes.OK).json(battleLog);
  } catch (error: any | undefined) {
    responseOutput = res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }

  return responseOutput;
};

export const BattleController = {
  list,
  startFight,
};
