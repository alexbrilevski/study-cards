import { useEffect, useRef, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../bll/store';
import {
  deletePack,
  editPack,
} from '../../../../../features/packList/bll/packListReducer';
import { PATH } from '../../../Main/Pages';
import { updateCardPackName } from '../../../../../features/cardList/bll/cardListReducer';
import { IconSvg } from '../IconSvg/IconSvg';
import menuIcon from '../../../../../assets/icons/three-dots.svg';
import editIcon from '../../../../../assets/icons/edit.svg';
import deleteIcon from '../../../../../assets/icons/trash.svg';
import learnIcon from '../../../../../assets/icons/teacher.svg';
import s from './CardPackMenu.module.css';

type CardsPackMenuProps = {
  cardPackId: string;
  isEmptyPack: boolean;
};

export const CardPackMenu: FC<CardsPackMenuProps> = ({ cardPackId, isEmptyPack }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isExpanded) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isExpanded]);

  const handleExpandMenu = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleEditPack = () => {
    setIsExpanded(false);
    const packName = 'New pack name';
    dispatch(updateCardPackName(packName));
    dispatch(editPack({ _id: cardPackId, name: packName }));
  };

  const handleDeletePack = () => {
    setIsExpanded(false);
    dispatch(deletePack(cardPackId));
    navigate(PATH.PACK_LIST);
  };

  const handleLearnCardPack = () => {
    navigate(`${PATH.LEARN}/${cardPackId}`);
  };

  return (
    <div ref={menuRef} className={s['card-pack-menu']}>
      <button className={s['dropdown-control']} onClick={handleExpandMenu}>
        <IconSvg src={menuIcon} size={24} />
      </button>
      {isExpanded && (
        <div className={s['dropdown']}>
          <ul>
            <li>
              <button onClick={handleEditPack}>
                <IconSvg src={editIcon} size={24} />
                <span>Edit</span>
              </button>
            </li>
            <li>
              <button onClick={handleDeletePack}>
                <IconSvg src={deleteIcon} size={24} />
                <span>Delete</span>
              </button>
            </li>
            {!isEmptyPack && (
              <li>
                <button onClick={handleLearnCardPack}>
                  <IconSvg src={learnIcon} size={24} />
                  <span>Learn</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
