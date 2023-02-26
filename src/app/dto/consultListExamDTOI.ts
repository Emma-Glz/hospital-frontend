import { Consult } from '../Model/consult';
import { Exam } from '../Model/exam';

export interface ConsultListExamDTOI {
  consult: Consult;
  lstExam: Exam[];

}
