export function Footer() {
    return (
      <footer className="w-full py-6 mt-12 border-t bg-background/75 backdrop-blur text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Scidyllics. Built with 💻 + 🧠 + ☕.
        </p>
      </footer>
    );
  }
  