export function Header() {
    return (
        <header className="sticky z-40 border-b bg-background container mx-auto">
            <div className="flex items-center justify-between py-4">
                <a className='flex items-center space-x-2' href='/'>
                    <div className='flex flex-col space-y-1 text-sm leading-none'>
                        <span className='text-lg font-bold'>Duy Le</span>
                        <span>Full Stack Developer</span>
                    </div>
                </a>
            </div>
        </header>
    )
}