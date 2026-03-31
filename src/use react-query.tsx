import { useQuery, useMutation } from "@tanstack/react-query";
import { prisma } from "@/lib/prisma"; // your Prisma client

// Fetch services
export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => prisma.service.findMany(),
  });

// Submit application
export const useSubmitApplication = () =>
  useMutation({
    mutationFn: async (data: { applicantName: string; reliefType: string }) =>
      prisma.reliefApplication.create({
        data: {
          applicantName: data.applicantName,
          reliefType: data.reliefType,
        },
      }),
  });

// Fetch guidance
export const useGuidance = (query: string) =>
  useQuery({
    queryKey: ["guidance", query],
    queryFn: async () =>
      prisma.guidanceResponse.findFirst({
        where: { query },
        orderBy: { createdAt: "desc" },
      }),
    enabled: !!query,
  });
