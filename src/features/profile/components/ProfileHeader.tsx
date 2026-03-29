import perfilTest from '@/assets/images/perfilTest.jpg';

interface Props {
  username?: string;
  email?: string;
}

const ProfileHeader = ({ username, email }: Props) => (
  <div className="bg-[#0C2143] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
    <div className="relative">
      <img src={perfilTest} alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#71AB46] object-cover" />
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#71AB46] rounded-full border-4 border-[#0C2143]"></div>
    </div>
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <span className="text-[#71AB46] text-xs font-bold uppercase tracking-[0.3em] mb-1">Perfil de Jugador</span>
      <h1 className="text-4xl md:text-5xl font-racing text-white uppercase">{username}</h1>
      <p className="text-white/40 font-roboto mt-2 text-sm">
        {email !== '...' ? email : 'Sincronizando cuenta...'}
      </p>
    </div>
  </div>
);

export default ProfileHeader;