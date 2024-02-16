import BusinessSelector from "./business";
import PiUser from "./pi";

export default function BusinessLayout({ children }) {
  return (
    <PiUser>
      <div className="w-screen h-screen">
        <BusinessSelector>{children}</BusinessSelector>
      </div>
    </PiUser>
  );
}
