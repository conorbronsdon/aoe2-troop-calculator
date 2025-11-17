import { useTranslation } from 'react-i18next';
import { useArmy } from '../context/ArmyContext';
import { getCivilizationById } from '../data/civilizations';
import { FaHandshake, FaGift, FaInfoCircle } from 'react-icons/fa';
import { Civilization, TeamBonus } from '../types';

interface TeamBonusInfo {
  civName: string;
  civId: string;
  bonus: TeamBonus;
}

export default function TeamBonusDisplay(): JSX.Element {
  const { t } = useTranslation();
  const { state } = useArmy();
  const { config } = state;

  const selectedCiv = getCivilizationById(config.selectedCiv) as Civilization | undefined;
  const alliedCivs = config.alliedCivs.map((civId) => getCivilizationById(civId)).filter((civ): civ is Civilization => Boolean(civ));

  // Get all team bonuses from allies that apply to us
  const teamBonusesFromAllies: TeamBonusInfo[] = alliedCivs
    .filter((civ) => civ.teamBonus)
    .map((civ) => ({
      civName: civ.name,
      civId: civ.id,
      bonus: civ.teamBonus as TeamBonus,
    }));

  // Get our team bonus that we share with allies
  const ourTeamBonus = selectedCiv?.teamBonus;

  if (config.alliedCivs.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
          <FaHandshake className="w-4 h-4 text-purple-500" />
          {t('teamBonuses.title')}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic flex items-center gap-1">
          <FaInfoCircle className="w-3 h-3" />
          {t('teamBonuses.selectAllies')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-700">
      <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200 flex items-center gap-2 mb-3">
        <FaHandshake className="w-4 h-4" />
        {t('teamBonuses.combinedBonuses')}
      </h4>

      {/* Bonuses we receive from allies */}
      {teamBonusesFromAllies.length > 0 && (
        <div className="mb-3">
          <h5 className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-1">
            <FaGift className="w-3 h-3" />
            {t('teamBonuses.fromAllies')}
          </h5>
          <div className="space-y-2">
            {teamBonusesFromAllies.map(({ civName, civId, bonus }) => (
              <div
                key={civId}
                className="bg-white dark:bg-gray-800 rounded p-2 border border-purple-100 dark:border-purple-800"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    {civName}
                  </span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded">
                    {bonus.type}
                  </span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Our team bonus we share with allies */}
      {ourTeamBonus && config.selectedCiv !== 'generic' && selectedCiv && (
        <div>
          <h5 className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-1">
            <FaGift className="w-3 h-3" />
            {t('teamBonuses.yourBonus')}
          </h5>
          <div className="bg-white dark:bg-gray-800 rounded p-2 border border-indigo-100 dark:border-indigo-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {selectedCiv.name}
              </span>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded">
                {ourTeamBonus.type}
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">{ourTeamBonus.description}</p>
          </div>
        </div>
      )}

      {teamBonusesFromAllies.length === 0 && !ourTeamBonus && (
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          {t('teamBonuses.noTeamBonus')}
        </p>
      )}
    </div>
  );
}
