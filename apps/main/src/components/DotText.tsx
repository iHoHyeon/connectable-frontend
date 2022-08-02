import { ReactNode } from 'react';

export default function DotText({ children }: { children: ReactNode }) {
  return (
    <div className="flex mt-2">
      <div className="mr-2">· </div> <div>{children}</div>
    </div>
  );
}
