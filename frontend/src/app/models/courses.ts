export interface Category {
  category: string;
}

export const CATEGORIES: Category[] = [
  { category: '1 Sem' },
  { category: '2 Sem' },
  { category: '3 Sem' },
  { category: '4 Sem' },
  { category: '5 Sem' },
  { category: '6 Sem' },
  { category: 'Thesis' },
  { category: 'Study' },
] 

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
}

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
	module : string;
	moduleUrl: string;
}

export const COURSES: Course[] = [
  {
    courseName: 'Programmierung',
    category: '1 Semester',
    courseId: 1,
		module: 'Praktisch',
		moduleUrl: '../../assets/logos/praktische.svg',
  },
  {    
    courseName: 'Technische Informatik',
    category: '1 Semester',
    courseId: 2,
		module: 'Technisch',
		moduleUrl: '../../assets/logos/technische.svg',
  },
  {
    courseName: 'Diskrete Strukturen',
    category: '1 Semester',
    courseId: 3,
		module: 'Theoretisch',
		moduleUrl: '../../assets/logos/theoretische.svg',
  },
  {    
    courseName: 'Analysis für Informatiker',
    category: '1 Semester',
    courseId: 4,
		module: 'Mathematik',
		moduleUrl: '../../assets/logos/mathematik.svg',
  },
  {    
    courseName: 'Betriebssysteme und Systemsoftware',
    category: '2 Semester',
    courseId: 6,
		module: 'Sonstig',
		moduleUrl: '../../assets/logos/sonstige.svg',
  },
  {    
    courseName: 'Proseminar',
    category: '2 Semester',
    courseId: 9,
		module: 'Wahlpflicht',
		moduleUrl: '../../assets/logos/wahlpflicht.svg',
  }

]
