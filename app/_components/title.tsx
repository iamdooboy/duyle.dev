export const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted w-fit px-1.5 py-1 rounded-md text-xs text-muted-foreground mb-1">
      {children}
    </div>
  )
}
