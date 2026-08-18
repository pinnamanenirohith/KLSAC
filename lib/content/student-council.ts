export type CouncilRole =
  | 'President'
  | 'Vice President'
  | 'Secretary'
  | 'Joint Secretary'
  | 'Council Member'
  | 'Club Lead'
  | 'Faculty Mentor'
  | 'Faculty In-Charge';

export interface CouncilMember {
  id: string;
  name: string;
  role: CouncilRole;
  photo?: string;        // e.g. '/council/john-doe.jpg'
  year?: string;         // e.g. '3rd Year'
  branch?: string;       // e.g. 'Computer Science Engineering'
  linkedin?: string;     // full URL
  journey?: string;      // their SAC journey paragraph
  achievements?: string[];
  clubs?: string[];      // clubs they are part of
  clubLead?: string;     // for Club Leads: the club name they lead
  isFaculty?: boolean;
  designation?: string;  // for faculty: "Associate Professor, CSE"
}

// ── Add real council data here ───────────────────────────────
// Each member object populates their photo card and profile modal.
// Photo paths are relative to /public (e.g. '/council/name.jpg').
// Leave the array empty and placeholder slots appear automatically.
export const STUDENT_COUNCIL: CouncilMember[] = [];
