// Multi-Level Government Hierarchy Types (5-10 Levels Deep)

export interface GovernmentLevel {
  id: string;
  level: number;
  name: string;
  jurisdiction: string;
  parentId?: string;
  childrenIds: string[];
  leader: GovernmentOfficial;
  officials: GovernmentOfficial[];
  departments: Department[];
  budget: number;
  population: number;
  authority: AuthorityLevel;
  status: 'active' | 'inactive' | 'suspended';
  establishedDate: number;
  lastElection: number;
  nextElection: number;
}

export interface GovernmentOfficial {
  id: string;
  name: string;
  title: string;
  position: string;
  level: number;
  department?: string;
  appointedDate: number;
  term: number;
  salary: number;
  performance: number;
  qualifications: string[];
  responsibilities: string[];
  reports: string[];
  status: 'active' | 'suspended' | 'retired';
  approval: number;
  digitalId: string;
  securityClearance: SecurityLevel;
}

export interface Department {
  id: string;
  name: string;
  level: number;
  parentDepartment?: string;
  subDepartments: string[];
  head: string; // Official ID
  employees: Employee[];
  budget: number;
  allocatedBudget: number;
  spentBudget: number;
  efficiency: number;
  responsibilities: string[];
  projects: Project[];
  establishedDate: number;
  status: 'active' | 'restructuring' | 'dissolved';
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  level: number;
  department: string;
  supervisor: string;
  salary: number;
  hireDate: number;
  performance: number;
  certifications: string[];
  status: 'active' | 'leave' | 'terminated';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  department: string;
  budget: number;
  timeline: {
    start: number;
    end: number;
    milestones: Milestone[];
  };
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  stakeholders: string[];
  progress: number;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: number;
  status: 'pending' | 'completed' | 'delayed';
  dependencies: string[];
}

export type AuthorityLevel = 
  | 'supreme' // Level 1: Supreme Government
  | 'federal' // Level 2: Federal Ministries
  | 'regional' // Level 3: Regional Governors
  | 'provincial' // Level 4: Provincial Councils
  | 'municipal' // Level 5: Municipal Governments
  | 'district' // Level 6: District Offices
  | 'local' // Level 7: Local Councils
  | 'community' // Level 8: Community Boards
  | 'neighborhood' // Level 9: Neighborhood Committees
  | 'citizen'; // Level 10: Citizen Representatives

export type SecurityLevel = 'public' | 'restricted' | 'confidential' | 'secret' | 'top-secret';

export interface LegislativeBranch {
  parliament: {
    upperHouse: LegislativeBody;
    lowerHouse: LegislativeBody;
  };
  committees: Committee[];
  bills: Bill[];
  laws: Law[];
}

export interface LegislativeBody {
  id: string;
  name: string;
  members: Legislator[];
  speaker: string;
  sessions: Session[];
  rules: string[];
}

export interface Legislator {
  id: string;
  name: string;
  party: string;
  constituency: string;
  term: number;
  votingRecord: VotingRecord[];
  committees: string[];
  performance: number;
}

export interface Committee {
  id: string;
  name: string;
  purpose: string;
  chair: string;
  members: string[];
  jurisdiction: string[];
  meetings: Meeting[];
}

export interface Bill {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  status: 'draft' | 'introduced' | 'committee' | 'floor' | 'passed' | 'rejected' | 'signed' | 'vetoed';
  votes: Vote[];
  amendments: Amendment[];
  introducedDate: number;
  lastAction: number;
}

export interface Law {
  id: string;
  title: string;
  description: string;
  category: string;
  enactedDate: number;
  effectiveDate: number;
  status: 'active' | 'amended' | 'repealed';
  relatedBill: string;
  enforcement: EnforcementData;
}

export interface JudicialBranch {
  courts: Court[];
  judges: Judge[];
  cases: Case[];
  verdicts: Verdict[];
}

export interface Court {
  id: string;
  name: string;
  level: CourtLevel;
  jurisdiction: string;
  judges: string[];
  cases: string[];
  location: string;
}

export type CourtLevel = 'supreme' | 'appellate' | 'district' | 'municipal' | 'specialized';

export interface Judge {
  id: string;
  name: string;
  court: string;
  appointedDate: number;
  term: number;
  specialization: string[];
  cases: string[];
  decisions: Decision[];
}

export interface Case {
  id: string;
  type: string;
  title: string;
  plaintiff: string;
  defendant: string;
  court: string;
  judge: string;
  status: 'filed' | 'hearing' | 'decided' | 'appealed';
  filedDate: number;
  hearingDate?: number;
  verdict?: string;
}

export interface ExecutiveBranch {
  president: GovernmentOfficial;
  vicePresident: GovernmentOfficial;
  cabinet: Cabinet;
  agencies: Agency[];
  advisors: Advisor[];
}

export interface Cabinet {
  id: string;
  members: string[]; // Official IDs
  meetings: Meeting[];
  decisions: Decision[];
}

export interface Agency {
  id: string;
  name: string;
  purpose: string;
  head: string;
  employees: Employee[];
  budget: number;
  jurisdiction: string;
  establishedDate: number;
}

export interface Advisor {
  id: string;
  name: string;
  specialty: string;
  appointed: number;
  clearance: SecurityLevel;
}

// Common interfaces
export interface Meeting {
  id: string;
  title: string;
  date: number;
  attendees: string[];
  agenda: string[];
  minutes: string;
  decisions: string[];
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  date: number;
  maker: string;
  impact: string;
  status: 'pending' | 'implemented' | 'reversed';
}

export interface VotingRecord {
  billId: string;
  vote: 'yes' | 'no' | 'abstain';
  date: number;
}

export interface Vote {
  legislatorId: string;
  vote: 'yes' | 'no' | 'abstain';
  date: number;
}

export interface Amendment {
  id: string;
  description: string;
  sponsor: string;
  status: 'proposed' | 'accepted' | 'rejected';
  date: number;
}

export interface Session {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  bills: string[];
  votes: Vote[];
}

export interface Verdict {
  id: string;
  caseId: string;
  decision: string;
  reasoning: string;
  date: number;
  judge: string;
}

export interface EnforcementData {
  agencies: string[];
  compliance: number;
  violations: number;
  penalties: Penalty[];
}

export interface Penalty {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: number;
}