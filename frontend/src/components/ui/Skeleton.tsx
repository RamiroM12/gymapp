interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'table' | 'text' | 'avatar';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text' 
}) => {
  const baseClasses = 'animate-pulse rounded-md';
  
  const variantClasses = {
    card: 'h-32 w-full',
    table: 'h-12 w-full',
    text: 'h-4 w-full',
    avatar: 'h-10 w-10 rounded-full',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    />
  );
};

// Skeleton Card for lists
export const SkeletonCard: React.FC = () => {
  return (
    <div 
      className="rounded-xl p-6 transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)'
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <Skeleton variant="text" className="w-2/3 h-6" />
        <Skeleton variant="text" className="w-16 h-6" />
      </div>
      <Skeleton variant="text" className="w-1/2 h-4 mb-2" />
      <Skeleton variant="text" className="w-1/3 h-4 mb-4" />
      <Skeleton variant="text" className="w-full h-10" />
    </div>
  );
};

// Skeleton Table Row
export const SkeletonTableRow: React.FC = () => {
  return (
    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
      <td className="px-4 py-3"><Skeleton variant="text" className="w-24" /></td>
      <td className="px-4 py-3"><Skeleton variant="text" className="w-32" /></td>
      <td className="px-4 py-3"><Skeleton variant="text" className="w-28" /></td>
      <td className="px-4 py-3"><Skeleton variant="text" className="w-20" /></td>
      <td className="px-4 py-3"><Skeleton variant="text" className="w-24" /></td>
      <td className="px-4 py-3"><Skeleton variant="text" className="w-16" /></td>
    </tr>
  );
};

// Skeleton for form
export const SkeletonForm: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton variant="text" className="w-24 h-4 mb-2" />
        <Skeleton variant="text" className="w-full h-10" />
      </div>
      <div>
        <Skeleton variant="text" className="w-24 h-4 mb-2" />
        <Skeleton variant="text" className="w-full h-10" />
      </div>
      <div>
        <Skeleton variant="text" className="w-24 h-4 mb-2" />
        <Skeleton variant="text" className="w-full h-10" />
      </div>
      <Skeleton variant="text" className="w-32 h-10 mt-6" />
    </div>
  );
};
