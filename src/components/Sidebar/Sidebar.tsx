import {
  ArrowLeftOnRectangleIcon,
  BanknotesIcon,
  BookmarkIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChevronDoubleLeftIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  HomeModernIcon,
  InboxArrowDownIcon,
  StarIcon,
  UserCircleIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RoleChecker from '@/utils/auth/RoleChecker';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setIsOpen } from '../../redux/features/navbar/navbarSlice';

export default function Sidebar() {
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.navbar.isOpen);
  const dispatch = useAppDispatch();
  const navigation = [
    {
      id: 13,
      href: '/hesaplar',
      title: 'Hesaplar',
      icon: <UserCircleIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['ADMIN']
    },

    {
      id: 1,
      href: '/isletmeler',
      title: 'İşletmeler',
      icon: <HomeModernIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['ADMIN']
    },

    {
      id: 3,
      href: '/talepler',
      title: 'Talepler ve Mesajlar',
      icon: <InboxArrowDownIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['ADMIN']
    },
    {
      id: 8,
      href: '/kasa',
      title: 'Kasa',
      icon: <BanknotesIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['OPERATOR', 'WORKER'],
      workerPermission: 'KASA'
    },
    {
      id: 4,
      href: '/salonlar',
      title: 'Salonlar',
      icon: (
        <BuildingLibraryIcon className={`w-[22px] min-w-[22px] h-[22px]`} />
      ),
      roles: ['OPERATOR', 'ADMIN']
    },

    {
      id: 7,
      href: '/musteriler',
      title: 'Müşteri',
      icon: <UserCircleIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['OPERATOR', 'WORKER']
    },

    {
      id: 6,
      href: '/takvim',
      title: 'Takvim',
      icon: <CalendarDaysIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['OPERATOR', 'WORKER']
    },
    {
      id: 16,
      href: '/etkinlikler',
      title: 'Etkinlikler',
      icon: <StarIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['OPERATOR', 'ADMIN', 'WORKER']
    },
    {
      id: 10,
      href: '/urun-icerik',
      title: 'Ürün / İçerik',
      icon: <BookmarkIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['OPERATOR', 'WORKER']
    },
    {
      id: 11,
      href: '/raporlar',
      title: 'Raporlar',
      icon: (
        <ClipboardDocumentCheckIcon
          className={`w-[22px] min-w-[22px] h-[22px]`}
        />
      ),
      roles: ['OPERATOR', 'ADMIN', 'WORKER'],
      workerPermission: 'RAPORLAR'
    },
    {
      id: 12,
      href: '/kameralar',
      title: 'Kameralar',
      icon: <VideoCameraIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['OPERATOR', 'WORKER'],
      workerPermission: 'KAMERA'
    },
    {
      id: 5,
      href: '/ayarlar',
      title: 'Ayarlar',
      icon: <Cog6ToothIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['ADMIN', 'OPERATOR', 'WORKER']
    },
    {
      id: 2,
      href: '/odemeler',
      title: 'Ödeme Durumu',
      icon: <CreditCardIcon className={`w-[22px] min-w-[22px] h-[22px]`} />,
      roles: ['ADMIN', 'OPERATOR']
    }
  ];
  const user = useAppSelector((state) => state.user);
  return (
    <>
      {isOpen && (
        <div
          onClick={() => dispatch(setIsOpen(false))}
          className="fixed lg:hidden block top-0 left-0  w-full h-full bg-black bg-opacity-20 z-40"
        />
      )}
      <div
        className={`h-screen  border-r shadow-md transition-all duration-300 bg-white border-gray-300 ${
          isOpen ? 'w-[250px] lg:shadow-none shadow-mobileNavbar' : 'w-[68px]'
        } sticky left-0 z-50 top-0 block`}>
        <div className="pb-5 flex flex-col h-full z-50">
          <div
            className={`flex ${
              isOpen ? 'px-5 justify-between' : 'px-3 justify-center'
            } border-b border-gray-300 h-[62px] items-center mb-5`}>
            {isOpen && (
              <h1 className="text-base whitespace-nowrap truncate select-none font-medium text-brand-black-primary">
                Sosyal Düğün
              </h1>
            )}
            <button
              onClick={() => dispatch(setIsOpen(!isOpen))}
              className="focus:outline-none bg-transparent flex items-center justify-center">
              <ChevronDoubleLeftIcon
                className={`w-[22px] transition duration-300 h-[22px] text-brand-black-primary ${
                  isOpen ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>
          </div>

          <nav
            className={`gap-1.5 flex flex-col ${
              isOpen ? 'px-5' : 'px-3'
            } row-start-1 select-none`}>
            {navigation.map((item) =>
              (
                user.role === 'WORKER'
                  ? item.workerPermission &&
                    user.account?.permissions &&
                    !user.account?.permissions.includes(item.workerPermission)
                  : false
              ) ? null : (
                <RoleChecker key={item.id} roles={item.roles}>
                  <Link
                    className={`${
                      router.pathname.includes(item.href)
                        ? 'text-brand-palette-primary border-brand-palette-primary bg-brand-palette-primaryLight/80'
                        : 'text-brand-black-primary border-transparent hover:border-brand-palette-primary lg:hover:bg-brand-palette-primaryLight lg:hover:text-brand-palette-primary'
                    } flex leading-none border-l-[4px] items-center text-[15px] ${
                      isOpen ? 'px-3 py-2' : 'w-11 h-[38px] justify-center'
                    } whitespace-nowrap rounded`}
                    href={item.href}>
                    {item.icon}
                    {isOpen && (
                      <span className="ml-2 truncate">{item.title}</span>
                    )}
                  </Link>
                </RoleChecker>
              )
            )}
          </nav>

          <div
            className={`mt-auto flex ${isOpen ? 'px-5' : 'px-3'} select-none`}>
            <button
              onClick={async () => {
                await axios.post(`/api/auth/clear`);
                localStorage.clear();
                window.location.href = '/';
              }}
              className={`text-brand-black-primary border-transparent hover:border-brand-palette-primary lg:hover:bg-brand-palette-primaryLight lg:hover:text-brand-palette-primary flex leading-none border-l-[4px] items-center text-[15px] ${
                isOpen ? 'px-3 py-2' : 'w-11 h-[38px] justify-center'
              } whitespace-nowrap w-full rounded`}>
              <ArrowLeftOnRectangleIcon
                className={`w-[22px] min-w-[22px] h-[22px]`}
              />
              {isOpen && <span className="ml-2 truncate">Çıkış Yap</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
