import React from "react";
import { Avatar, Button } from "zmp-ui";

interface UserCardProps {
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
  responseRate: string;
  postCount: number;
  yearsActive: number;

}

const SaleCard: React.FC<UserCardProps> = ({
  name,
  avatarUrl,
  role,
  lastActive,
  responseRate,
  postCount,
  yearsActive,

}) => {
  return (
<div className="bg-white border border-gray-300 rounded-lg shadow-lg p-5">
  {/* Avatar and Name */}
  <div className="flex items-center mb-4">
    <Avatar size={50} src={"https://cdn.chotot.com/uac2/18166102"} className="mr-4" />
    <div>
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  </div>

{/* Activity and Details */}
<div className="text-sm text-gray-600 space-y-1 overflow-x-auto max-w-full">
  <p className="flex items-center whitespace-nowrap">
    Hoạt động: <span className="ml-1 text-gray-800">{lastActive}</span>
  </p>

  <p className="whitespace-nowrap">
  đã tham gia {yearsActive} năm &bull; {postCount} tin đăng
  </p>
</div>

{/* Divider */}
<hr className="my-4 border-gray-200" />

{/* Suggested Questions */}
<div className="flex gap-2 overflow-x-auto max-w-full whitespace-nowrap">
  <Button className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full shadow-sm flex-shrink-0">
    Đất này còn không ạ?
  </Button>
  <Button className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full shadow-sm flex-shrink-0">
    Thời hạn thuê tối đa là bao lâu?
  </Button>
</div>

</div>

  );
};

export default SaleCard;
