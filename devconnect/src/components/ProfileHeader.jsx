const ProfileHeader = ({ avatarUrl, name, bio }) => {
  return (
    <div className="flex flex-col items-center gap-3 pb-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shadow-md overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-full" />
        ) : (
          <span className="text-white text-3xl font-bold font-display">{name?.[0] || '?'}</span>
        )}
      </div>
      <h1 className="text-2xl font-bold text-black font-display mt-2">{name}</h1>
      <p className="text-gray-500 text-center max-w-md text-base line-clamp-2">{bio}</p>
    </div>
  );
};

export default ProfileHeader; 