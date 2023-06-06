import { BanknotesIcon } from '@heroicons/react/24/outline';

export function Tabs({
  tabsData,
  selectedTab,
  setSelectedTab
}: {
  tabsData: {
    id: number;
    label: string;
  }[];
  selectedTab: number | undefined;
  setSelectedTab: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  return (
    <div className="flex gap-5 border-brand-black-secondaryLight overflow-auto  text-brand-black-primary border-b">
      {tabsData.map((tab) => {
        return (
          <>
            <div className="p-4  shadow-sm rounded-lg  flex flex-row items-center ">
              <BanknotesIcon className="h-8 w-12" />
              <button
                onClick={() => setSelectedTab(tab.id)}
                className={`md:p-2 font-medium  uppercase text-base items-center ${
                  selectedTab === tab.id ? '' : 'opacity-40 hover:opacity-100'
                }`}
                key={tab.id}>
                {tab.label}
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}
