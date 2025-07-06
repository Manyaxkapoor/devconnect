const SkillsSection = ({ skills }) => {
  const safeSkills = Array.isArray(skills) ? skills : [];
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-black mb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {safeSkills.map((skill, idx) => (
          <span key={idx} className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-sm shadow-sm border border-gray-200">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection; 