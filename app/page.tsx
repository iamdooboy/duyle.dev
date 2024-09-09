import { More } from "./_components/more"
import { RecentPosts } from "./_components/recent-posts"
import { Title } from "./_components/title"

export default function Page() {
  return (
    <>
      <section className="h-full">
        <h1 className="mb-8 font-semibold text-2xl tracking-tighter">
          My Portfolio
        </h1>
        <p className="mb-4">
          {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
        </p>
        <div className="my-8">
          <Title>Recent posts</Title>
          <RecentPosts />
          <More href="/blog">More posts</More>
        </div>
        <div className="my-8">
          <Title>Recent projects</Title>
          <RecentPosts />
          <More href="/projects">More projects</More>
        </div>
      </section>
    </>
  )
}
