export interface GradientColors {
  from: string;
  to: string;
}

export const getGradientColors = (id: string): GradientColors => {
  const colors: GradientColors[] = [
    { from: 'from-blue-500', to: 'to-purple-500' },
    { from: 'from-purple-500', to: 'to-pink-500' },
    { from: 'from-indigo-500', to: 'to-cyan-500' },
    { from: 'from-emerald-500', to: 'to-blue-500' },
    { from: 'from-rose-500', to: 'to-orange-500' },
  ];
  
  const colorIndex = parseInt(id.split('-')[1]) % colors.length;
  return colors[colorIndex];
};