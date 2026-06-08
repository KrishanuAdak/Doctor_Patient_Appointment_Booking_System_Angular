export interface Doctor{
  specialization: string;
      id: number;
  name: string;
  specialty: string;
  initials: string;
  rating: number;
  experience: number;
  available: boolean;
  nextSlot: string;
  patientsToday: number;
  fee: number;
  hospital: string;
  color: string;
}
