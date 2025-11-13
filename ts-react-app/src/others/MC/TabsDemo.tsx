import type React from "react";
import { useState } from "react";
import "../styles/Tabs.css"
interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tabs ${activeTab===tab.id?"active":""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab: Tab) => activeTab === tab.id)?.component}</div>
    </div>
  );
};

const TabsDemo = () => {
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      component: <p>DashBoard Component.</p>,
    },
    {
      id: "contact",
      label: "Contact",
      component: <p>Contact Component.</p>,
    },
    {
      id: "profile",
      label: "Profile",
      component: <p>Profile Component.</p>,
    },
  ];

  return <Tabs tabs={tabs} />;
};

export default TabsDemo;
