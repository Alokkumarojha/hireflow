import { MapPin, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function JobSearch() {
  return (
    <div className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border bg-background p-3 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Job Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="text"
            placeholder="Job title, skills, or keywords"
            className="h-12 border-0 pl-10 shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Location */}
        <div className="flex-1">
          <Select>
            <SelectTrigger className="h-12 border-0 shadow-none focus:ring-0">
              <MapPin className="size-4 text-muted-foreground" />
              <SelectValue placeholder="Select location" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button size="lg" className="h-12 px-6">
          <Search className="mr-2 size-4" />
          Search Jobs
        </Button>
      </div>
    </div>
  );
}
