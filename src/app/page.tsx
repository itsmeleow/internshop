"use client";
import Image from "next/image";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ExternalLink, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from "react";

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

export interface Job {
  id: string,
  company: string,
  title: string,  
  jobDescription: string,
  location: string,
  externalUrl: string,
  timeType: string,
  timeLeftToApply: string,
}

const companies = {
  NVIDIA: {
    type: "workday",
    baseUrl: "https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite",
    searchUrl: "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/jobs",
    queryKeyword: "intern"
  },
  AIRBUS: {
    type: "workday",
    baseUrl: "https://ag.wd3.myworkdayjobs.com/Airbus",
    searchUrl: "https://ag.wd3.myworkdayjobs.com/wday/cxs/ag/Airbus/jobs",
    queryKeyword: "internship"
  },
};

export default function Home() {
  // const [listings, setListings] = useState<any[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const scrapeInternListings = async () => {
    for (const [key, company] of Object.entries(companies)) {
      const res = await fetch(`/api/scrape/${company.type}`, { 
        method: "POST",
        body: JSON.stringify({
          searchUrl: company.searchUrl,
          queryKeyword: company.queryKeyword,
        })
    });
    const data = await res.json();
    // setListings(prev => [...prev, ...data.jobPostings]);
    for (const jobPosting of data.jobPostings) {
      getJobInfo(jobPosting, key, company);
    }
    }
  };

  const getJobInfo = async(jobPosting: any, key: any, company: any) => {
    const res = await fetch(`/api/scrape/${company.type}/listingInfo`, {
      method: "POST",
      body: JSON.stringify({
        searchUrl: company.searchUrl,
        externalPath: jobPosting.externalPath,
      })
    })
    const data = await res.json();
    const job  = {
      id: data.jobPostingInfo.id,
      company: key,
      title: data.jobPostingInfo.title,
      jobDescription: data.jobPostingInfo.jobDescription,
      location: data.jobPostingInfo.location,
      externalUrl: data.jobPostingInfo.externalUrl,
      timeType: data.jobPostingInfo.timeType,
      timeLeftToApply: data.jobPostingInfo.timeLeftToApply,
    }
    setJobs(prev => [job, ...prev]);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="secondary" onClick={() => scrapeInternListings()}>Fetch Internships</Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full mt-8">
        {jobs.map((job, idx) => (
          <Drawer key={job.id || idx}>
            <DrawerTrigger asChild>
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{job.title || job.externalUrl || "No Title"}</CardTitle>                
                  <div className="text-gray-600 flex items-center">
                    <MapPin className="inline-block mr-1 align-middle" />{job.location || ""}
                  </div>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center gap-3 w-full justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base">
                        {getInitials(job.company)}
                      </span>
                      <span className="text-gray-700 font-medium">{job.company}</span>
                    </div>

                  </div>
                </CardFooter> 
              </Card>
            </DrawerTrigger>
            <DrawerContent className="w-full ml-auto">
              <div className="flex flex-col h-full p-0">
                <div className="p-6 max-h-[70vh] overflow-y-auto flex-1">
                  <div className="text-2xl font-bold mb-2">{job.title || job.externalUrl || "No Title"}</div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      {getInitials(job.company)}
                    </span>
                    <span className="text-base text-gray-700">{job.company}</span>
                  </div>
                  <div className="text-gray-600 mb-2"><MapPin className="inline-block mr-1 align-middle" />{job.location || ""}</div>
                  <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: job.jobDescription || "No description available." }}
                  />
                </div>
                <div className="p-6 border-t">
                  <Button className="w-full flex items-center justify-center gap-2" asChild>
                    <a href={job.externalUrl} target="_blank" rel="noopener noreferrer">
                      Apply ({job.timeLeftToApply || ""}) <ExternalLink className="inline-block" />
                    </a>
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
}
