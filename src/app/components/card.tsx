import { PropsWithChildren } from "react";

export default function Card({children}:PropsWithChildren) {

  return (
    <div className='block w-full fixed wrapper block lg unblock'>
      <div className='p-4 flex flex-col'>
        {children}
      </div>
    </div>
  );
}
