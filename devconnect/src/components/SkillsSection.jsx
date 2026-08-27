const SkillsSection = ({ skills }) => {
  return (
    <div className="border-t border-white/10 pt-7">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gray-500">Toolkit</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-medium text-gray-200">
            {skill}
          </span>
        ))}
        {skills.length === 0 && <span className="text-sm text-gray-500">Add the tools you work with.</span>}
      </div>
    </div>
  );
};

export default SkillsSection;
