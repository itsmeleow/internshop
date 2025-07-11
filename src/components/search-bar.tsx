"use client";

import { useState, useEffect, useCallback } from 'react';
import { Search, Building2, ChevronDown, Filter, ListFilter, Users, Briefcase, Globe, Home } from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

const filterCategories = [
  { key: 'department', label: 'Department', icon: <Briefcase className="w-5 h-5" /> },
  { key: 'workplaceType', label: 'Workplace Type', icon: <Globe className="w-5 h-5" /> },
];

const departments = [
  'Engineering',
  'Marketing',
  'Design',
  'Product',
  'Business',
];
const workplaceTypes = [
  'Remote',
  'Hybrid',
  'Onsite',
];

const jobs = [
  {
    key: '1',
    title: 'Software Engineering Intern',
    company: 'Nvidia',
    location: 'Santa Clara, CA',
    department: 'Engineering',
    workplaceType: 'Onsite',
    description: 'Work on cutting-edge GPU technology and accelerate AI research. Collaborate with world-class engineers.',
  },
  {
    key: '2',
    title: 'Product Design Intern',
    company: 'Airbus',
    location: 'Remote',
    department: 'Design',
    workplaceType: 'Remote',
    description: 'Help design next-generation aircraft interiors. Work closely with product and engineering teams.',
  },
  {
    key: '3',
    title: 'Marketing Analyst Intern',
    company: 'Tesla',
    location: 'Palo Alto, CA',
    department: 'Marketing',
    workplaceType: 'Hybrid',
    description: 'Analyze market trends and support go-to-market strategies for new vehicle launches.',
  },
  {
    key: '4',
    title: 'Business Operations Intern',
    company: 'Stripe',
    location: 'Dublin, Ireland',
    department: 'Business',
    workplaceType: 'Onsite',
    description: 'Support business operations and process improvements in a fast-paced fintech environment.',
  },
  {
    key: '5',
    title: 'UI/UX Design Intern',
    company: 'Spotify',
    location: 'New York, NY',
    department: 'Design',
    workplaceType: 'Hybrid',
    description: 'Design user interfaces and experiences for millions of music lovers worldwide.',
  },
  {
    key: '6',
    title: 'Product Management Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    department: 'Product',
    workplaceType: 'Onsite',
    description: 'Work with cross-functional teams to launch new features and products.',
  },
];

type FilterKey = 'department' | 'workplaceType';

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterKey>(filterCategories[0].key as FilterKey);
  const [filters, setFilters] = useState<{ department: string; workplaceType: string }>({ department: '', workplaceType: '' });

  // Keyboard shortcut: Cmd+K or Ctrl+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Filter jobs by search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = !filters.department || job.department === filters.department;
    const matchesWorkplace = !filters.workplaceType || job.workplaceType === filters.workplaceType;
    return matchesSearch && matchesDepartment && matchesWorkplace;
  });

  // Options for the selected filter category
  const filterOptions = selectedCategory === 'department' ? departments : workplaceTypes;
  const selectedValue = filters[selectedCategory];

  function handleSelectOption(option: string) {
    setFilters(f => ({ ...f, [selectedCategory]: f[selectedCategory] === option ? '' : option }));
  }

  function handleViewResults() {
    // For now, just log the filtered jobs
    console.log('Filtered jobs:', filteredJobs);
  }

  return (
    <>
      <form className="relative w-full" onClick={() => setOpen(true)}>
        <input
          type="text"
          placeholder="Search internships..."
          className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 transition cursor-pointer"
          readOnly
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
      </form>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Filter internships by category and option"
        className="w-[98vw] max-w-[1800px] overflow-visible"
      >
        <div className="min-h-[700px] w-full flex flex-row gap-0 overflow-x-auto">
          {/* Left: Filter categories */}
          <div className="w-[36rem] border-r border-border bg-background/80 flex flex-col">
            <div className="p-4 pb-2 font-semibold text-lg flex items-center gap-2"><Filter className="w-5 h-5" />Filters</div>
            <CommandList className="min-h-[300px]">
              <CommandGroup heading="Categories">
                {filterCategories.map(cat => (
                  <CommandItem
                    key={cat.key}
                    onSelect={() => setSelectedCategory(cat.key as FilterKey)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 cursor-pointer ${selectedCategory === cat.key ? 'bg-blue-500 text-white' : 'hover:bg-muted'} transition-all`}
                    data-selected={selectedCategory === cat.key}
                  >
                    <span>{cat.icon}</span>
                    <span className="font-semibold text-base">{cat.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
          {/* Right: Filter options for selected category */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-start bg-background p-12">
            <div className="w-full">
              <div className="font-semibold text-lg mb-4">Select {filterCategories.find(c => c.key === selectedCategory)?.label}</div>
              <div className="flex flex-wrap gap-3">
                {filterOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`px-5 py-2 rounded-full border text-base font-medium transition-all ${selectedValue === option ? 'bg-blue-500 text-white border-blue-500' : 'bg-muted text-foreground border-input hover:bg-accent'}`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full mt-12">
              <Button className="w-full py-4 text-lg" onClick={handleViewResults}>View Results ({filteredJobs.length})</Button>
              <div className="mt-4 text-base text-muted-foreground">Current filters: {Object.entries(filters).filter(([k,v])=>v).map(([k,v])=>`${filterCategories.find(c=>c.key===k)?.label}: ${v}`).join(', ') || 'None'}</div>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
