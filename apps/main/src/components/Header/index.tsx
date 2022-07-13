import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

import KlipAuth from '~/components/auth/KlipAuth';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

const MarketDescription = <span className="text-base font-semibold ">마켓플레이스 기능은 아직 준비 중이에요.</span>;
const NotificationDescription = <span className="text-base font-semibold ">알림 기능은 아직 준비 중이에요.</span>;
const MenuDescription = <span className="text-base font-semibold ">메뉴 기능은 아직 준비 중이에요.</span>;

export default function Header() {
  const { isLoggedIn } = useUserStore();

  return (
    <header className="sticky top-0 z-10 flex justify-between w-full px-5 bg-transparent backdrop-blur-md">
      <nav className="relative flex justify-between w-full py-6 ">
        <div className="flex flex-col justify-center">
          <Link href="/">
            <div className="text-2xl cursor-pointer ">LOGO</div>
          </Link>
        </div>
        {isLoggedIn ? <LoggedOnIcons /> : <LoggedOffIcons />}
      </nav>
    </header>
  );
}

const LoggedOnIcons = () => {
  const { showModal } = useModalStore();
  const onClickMarketIcon = () => {
    showModal('마켓플레이스', MarketDescription);
  };

  const onClickNotificationIcon = () => {
    showModal('알림', NotificationDescription);
  };

  const onClickMenuIcon = () => {
    showModal(' ', MenuDescription);
  };
  return (
    <div className={`flex justify-between w-[12rem]`}>
      <NavIcon src="/images/market.svg" alt="market" onClick={onClickMarketIcon} />
      <NavIcon src="/images/notification.svg" alt="notification" onClick={onClickNotificationIcon} />
      <NavIcon src="/images/defaultProfile.jpeg" alt="profile" href="/my" />
      <NavIcon src="/images/menu.svg" alt="menu" onClick={onClickMenuIcon} />
    </div>
  );
};

const LoggedOffIcons = () => {
  const { showModal } = useModalStore();

  const onClickLoginIcon = () => {
    showModal('로그인', <KlipAuth />);
  };

  const onClickMenuIcon = () => {
    showModal(' ', MenuDescription);
  };

  return (
    <div className={`flex justify-between w-[5rem]`}>
      <NavIcon src="/images/login.svg" alt="login" onClick={onClickLoginIcon} />
      <NavIcon src="/images/menu.svg" alt="menu" onClick={onClickMenuIcon} />
    </div>
  );
};

interface NavIconButtonProps {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
  onClick?: (e: MouseEvent) => void;
}

const NavIcon = ({ src, alt, href, width = 24, height = 24, onClick }: NavIconButtonProps) => {
  if (!href)
    return (
      <button onClick={onClick}>
        <div className="flex flex-col justify-center transition-all ease-in-out rounded-full cursor-pointer hover:scale-125 ">
          <Image src={src} alt={alt} width={width} height={height} className="p-6" />
        </div>
      </button>
    );
  else
    return (
      <Link href={href}>
        <div className="flex flex-col justify-center transition-all ease-in-out rounded-full cursor-pointer hover:scale-125 ">
          <Image src={src} alt={alt} width={width} height={height} className="rounded-full" />
        </div>
      </Link>
    );
};