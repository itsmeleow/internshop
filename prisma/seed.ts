import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const companyData: Prisma.CompanyCreateInput[] = [
  {
    name: "NVIDIA",
    logo: "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/sidebarimage/e64d788b7b8d01e4c34e99996322ec00",
    description:
      "NVIDIA is the world leader in accelerated computing. NVIDIA pioneered accelerated computing to tackle challenges no one else can solve. Our work in AI and digital twins is transforming the world's largest industries and profoundly impacting society. Learn more about NVIDIA.",
    atsType: "workday",
    searchUrl:
      "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/jobs",
    queryKeyword: "intern",
    Job: {
      create: [
        {
          id: "00110000",
          title: "Software Engineer",
          jobDescription: "test",
          location: "San Jose, CA",
          externalUrl: "https://ag.wd3.myworkdayjobs.com/en-US/Airbus/details/Senior-Software-Engineer_JR10324964",
          timeType: "Full time",
          timeLeftToApply: 1,
          
        },
      ],
    },
  },
  {
    name: "AIRBUS",
    logo: "https://ag.wd3.myworkdayjobs.com/wday/cxs/ag/Airbus/sidebarimage/cde161496b9f014793f82fea26021f01",
    description:
      "Airbus pioneers sustainable aerospace for a safe and united world. The Company constantly innovates to provide efficient and technologically-advanced solutions in aerospace, defence, and connected services. In commercial aircraft, Airbus offers modern and fuel-efficient airliners and associated services. Airbus is also a European leader in defence and security and one of the world's leading space businesses. In helicopters, Airbus provides the most efficient civil and military rotorcraft solutions and services worldwide.",
    atsType: "workday",
    searchUrl: "https://ag.wd3.myworkdayjobs.com/wday/cxs/ag/Airbus/jobs",
    queryKeyword: "internship",
    Job: {
      create: [
        {
          id: "00210000",
          title: "Mechanical Systems Design Engineer (Contract)",          
          jobDescription: "test",
          location: "Wichita, KS",
          externalUrl: "https://ag.wd3.myworkdayjobs.com/en-US/Airbus/details/Senior-Software-Engineer_JR10324964",
          timeType: "Full time",
          timeLeftToApply: 2,

        },
      ],
    },
  },
];

export async function main() {
  for (const c of companyData) {
    await prisma.company.create({ data: c });
  }
}

main();
