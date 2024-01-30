import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import { fetchMonstersData } from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
  WinnerSection,
} from './BattleOfMonsters.styled';
import { Monster } from '../../models/interfaces/monster.interface';
import { MonsterService } from '../../reducers/monsters/monsters.service';

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);

  const [computerMonster, setComputerMonster] = useState<Monster>();
  const [winnerName, setWinnerName] = useState('');

  const getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, [dispatch]);

  useEffect(() => {
    setWinnerName('');
    if (!selectedMonster) setComputerMonster(undefined);
    const randomNumber = getRandomNumber(1, monsters.length - 1);
    setComputerMonster(monsters[randomNumber]);
  }, [selectedMonster]);

  const handleStartBattleClick = async () => {
    if (!selectedMonster || !computerMonster) return;
    const battleResult = await MonsterService.fight(
      selectedMonster,
      computerMonster,
    );
    setWinnerName(battleResult.winner.name);
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {winnerName && <WinnerSection>{winnerName} Wins!</WinnerSection>}
      <BattleSection>
        <MonsterBattleCard
          monster={selectedMonster}
          title={selectedMonster?.name || 'Player'}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          monster={computerMonster && computerMonster}
          title={'Computer'}></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
