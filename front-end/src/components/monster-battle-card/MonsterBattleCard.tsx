import { Monster } from '../../models/interfaces/monster.interface';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  Image,
  Line,
  ProgressBar,
  SelectedBattleMonsterTitle,
  StatusItem,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster?: Monster | null;
  title?: string;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
  const monsterStatus = [
    {
      label: 'HP',
      status: monster?.hp,
    },
    {
      label: 'Attack',
      status: monster?.attack,
    },
    {
      label: 'Defende',
      status: monster?.defense,
    },
    {
      label: 'Speed',
      status: monster?.speed,
    },
  ];
  return (
    <BattleMonsterCard centralized={!monster}>
      {!monster ? (
        <BattleMonsterTitle>{title}</BattleMonsterTitle>
      ) : (
        <>
          <Image src={monster?.imageUrl} />
          <SelectedBattleMonsterTitle>
            {monster?.name}
          </SelectedBattleMonsterTitle>
          <Line />

          {monsterStatus.map(
            (e: { label: string; status: number | undefined }) => (
              <div key={e.label}>
                <StatusItem>{e.label}</StatusItem>
                <ProgressBar variant="determinate" value={e.status} />
              </div>
            ),
          )}
        </>
      )}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
