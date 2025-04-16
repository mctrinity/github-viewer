export function Header() {
    return (
      <header className="w-full py-4 border-b bg-background/75 backdrop-blur sticky top-0 z-10">
        <div className="max-w-xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-xl font-bold">Scidyllics</h1>
          <a
            href="https://www.scidyllics.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Profile ↗
          </a>
        </div>
      </header>
    );
  }
  