import { useEffect, useRef, useState, type FC } from 'react';
import { NavLink } from 'react-router-dom';
import type { User } from '../../../../types/user';
import { useAppDispatch } from '../../../../bll/store';
import { logout } from '../../../../../features/auth/Login/bll/loginReducer';
import { PATH } from '../../../Main/Pages';
import { IconSvg } from '../IconSvg/IconSvg';
import defaultUserAvatar from '../../../../../assets/images/default-avatar.svg';
import userIcon from '../../../../../assets/icons/user.svg';
import logoutIcon from '../../../../../assets/icons/logout.svg';
import s from './UserMenu.module.css';

type UserMenuProps = {
  user: User;
};

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleDropdownControlClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div ref={menuRef} className={s['user-menu']}>
      <button className={s['dropdown-control']} onClick={handleDropdownControlClick}>
        <span className={s['user-name']}>{user.name}</span>
        <img
          className={s['user-avatar']}
          src={user.avatar || defaultUserAvatar}
          width="36"
          height="36"
          alt=""
        />
      </button>
      {isExpanded && (
        <div className={s['dropdown']}>
          <ul>
            <li>
              <NavLink to={PATH.PROFILE}>
                <IconSvg src={userIcon} size={16} />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogoutClick}>
                <IconSvg src={logoutIcon} size={16} />
                <span>Log out</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
