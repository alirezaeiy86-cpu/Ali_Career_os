"use client";

import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer 
} from "recharts";

export const SkillRadar = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#27272a" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#71717a', fontSize: 10, fontWeight: 'bold' }} 
        />
        <Radar
          name="Skills"
          dataKey="A"
          stroke="#9333ea"
          fill="#9333ea"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
