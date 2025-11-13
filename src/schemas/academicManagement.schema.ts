import z from 'zod';

export const academicSemesterSchema = z.object({
  name: z.string({ error: 'Please Select the Name' }),
  year: z.string({ error: 'Please Select the Year' }),
  startMonth: z.string({ error: 'Please Select the Start Month' }),
  endMonth: z.string({ error: 'Please Select the End Month' }),
});
