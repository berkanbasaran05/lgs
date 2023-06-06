import Link from 'next/link';
import { useRouter } from 'next/router';

export function LinkTabs({
  tabsData
}: {
  tabsData: {
    id: number;
    href: string;
    label: string;
  }[];
}) {
  const router = useRouter();
  return (
    <div className="flex gap-5 border-brand-black-secondaryLight text-brand-black-primary border-b">
      {tabsData.map((tab) => {
        return (
          <Link
            className={`py-2 font-medium text-sm ${
              router.asPath === tab.href ? '' : 'opacity-40 hover:opacity-100'
            }`}
            href={tab.href}
            key={tab.id}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
