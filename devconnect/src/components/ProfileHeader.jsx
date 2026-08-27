const ProfileHeader = ({ avatarUrl, name, bio }) => {
  return (
    <div className="flex flex-col items-start gap-3 pb-8">
      <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white/10 bg-gray-800">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-full" />
        ) : (
          <span className="text-white text-3xl font-bold font-display">{name?.[0] || '?'}</span>
        )}
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{name}</h1>
      <p className="max-w-md text-base leading-7 text-gray-400">{bio || "Building thoughtful things for the web."}</p>
    </div>
  );
};

export default ProfileHeader;
