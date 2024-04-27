import { MainNavBar } from "@/components/main-navbar";

interface HasNavbarLayoutProps {
  children: React.ReactNode;
}

const HasNavbarLayout = ({ children }: HasNavbarLayoutProps) => {
  return (
    <div className="size-full flex">
      {/* <MainNavBar className="shrink-0" /> */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default HasNavbarLayout;
