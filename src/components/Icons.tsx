
import React from 'react';
import { 
  CheckIcon, 
  DownloadIcon as LucideDownloadIcon,
  ArrowUpIcon, 
  FolderIcon, 
  CheckSquareIcon,
  FileTextIcon,
  Edit
} from 'lucide-react';

// Custom Mix icon since it's not in lucide-react core
export const Mix = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 3v3a2 2 0 0 1-2 2H3" />
    <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
    <path d="M3 16h3a2 2 0 0 1 2 2v3" />
    <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

export const FileUp = ArrowUpIcon;
export const FolderOpen = FolderIcon;
export const Check = CheckSquareIcon;
export const Download = LucideDownloadIcon;
export const FileText = FileTextIcon;
export const EditIcon = Edit;
