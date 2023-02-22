import { ConsultDetail } from './consultDetail';
import { Medic } from './medic';
import { Patient } from './patient';
import { Specialty } from './specialty';
export class consult{
  idConsult: number;
  patient: Patient;
  medic: Medic;
  specialty: Specialty;
  consultDate: string;
  consultDatails: ConsultDetail[];

}
