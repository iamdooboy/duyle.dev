import { Time } from "./time"
import { Icons } from "./ui/icons"

export default function Footer() {
  const FOOTER_ELEMENTS = [
    {
      href: "/rss",
      label: "RSS",
      icon: <Icons.rss className="size-4" />
    },
    {
      href: "https://github.com/iamdooboy",
      label: "GitHub",
      icon: <Icons.github className="size-4" />
    },
    {
      href: "mailto:duy.le1017@gmail.com",
      label: "Contact",
      icon: <Icons.mail className="size-5" />
    }
  ]

  return (
    <footer className="mt-8 mb-16 flex justify-between">
      <ul className="flex gap-5 font-sm">
        {FOOTER_ELEMENTS.map((element) => (
          <li key={element.label}>
            <a
              className="flex items-center justify-center text-muted-foreground hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
              href={element.href}
            >
              {element.icon}
              <p className="ml-2">{element.label}</p>
            </a>
          </li>
        ))}
      </ul>
      <Time />
    </footer>
  )
}
