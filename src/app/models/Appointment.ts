export interface Appointment {
     id: number;
  patientName: string;
  patientInitials: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
  type: 'in-person' | 'video';
  age: number;
  avatarColor: string;
}