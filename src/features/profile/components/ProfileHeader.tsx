interface Props {
  username?: string;
}

const ProfileHeader = ({ username }: Props) => (
  <div className="bg-[#0C2143] border border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-center shadow-2xl">
    <h1 className="text-6xl md:text-7xl font-racing text-white uppercase tracking-wide">{username}</h1>
  </div>
);

export default ProfileHeader;