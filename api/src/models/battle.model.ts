import { Id, RelationMappings, Model } from 'objection';
import Base from './base';
import { Monster } from './monster.model';

export class Battle extends Base {
  id!: Id;
  monsterA!: Monster;
  monsterB!: Monster;
  winner!: Monster;

  static tableName = 'battle';

  static get relationMappings(): RelationMappings {
    return {
      monsterARelation: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Monster',
        join: {
          from: 'battles.MonsterA',
          to: 'monsters.id'
        }
      },
      monsterBRelation: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Monster',
        join: {
          from: 'battles.MonsterB',
          to: 'monsters.id'
        }
      },
      winnerRelation: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'Monster',
        join: {
          from: 'battles.winner',
          to: 'monsters.id'
        }
      }
    };
  }
}
