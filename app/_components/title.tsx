export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-1 w-fit rounded-md bg-muted px-1.5 py-1 text-muted-foreground text-xs">
      {children}
    </div>
  )
}
