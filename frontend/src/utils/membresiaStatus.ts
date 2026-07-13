export interface MembresiaStatus {
  label: string;
  variant: 'success' | 'warning' | 'error';
  daysRemaining: number | null;
}

export function getMembresiaStatus(fechaFin: string, activa: boolean): MembresiaStatus {
  if (!activa) {
    return { label: 'Inactiva', variant: 'error', daysRemaining: null };
  }

  const now = new Date();
  const fin = new Date(fechaFin);
  const diffTime = fin.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return { label: 'Vencida', variant: 'error', daysRemaining: 0 };
  }
  if (diffDays <= 3) {
    return { label: 'Por vencer', variant: 'warning', daysRemaining: diffDays };
  }
  return { label: 'Activa', variant: 'success', daysRemaining: diffDays };
}
