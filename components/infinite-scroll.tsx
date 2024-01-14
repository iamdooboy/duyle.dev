import { Children, cloneElement, ReactNode } from 'react'

export const InfiniteCarousel = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  return (
    <div className='flex w-full overflow-x-hidden [--duration:10s] [--gap:3rem]'>
      <div className='animate-infinite-scroll flex w-max gap-4 [animation-play-state:paused] hover:[animation-play-state:running]'>
        {children}
        {Children.map(children, (child) => cloneElement(child as any))}
      </div>
    </div>
  )
}
