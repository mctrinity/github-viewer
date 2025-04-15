"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { ThemeToggle } from "./components/ThemeToggle";
import { Spinner } from "./components/ui/spinner";
import { motion } from "framer-motion";

export default function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAllTop, setShowAllTop] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [searchQueryTop, setSearchQueryTop] = useState("");
  const [searchQueryRecent, setSearchQueryRecent] = useState("");

  const topRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);

  const fetchProfile = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos?per_page=100`),
      ]);

      const repos = reposRes.data;

      const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
      const recentRepos = [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

      setProfile({
        ...userRes.data,
        topRepos,
        recentRepos,
      });
    } catch (err) {
      setProfile(null);
      alert("User not found 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12">
      <ThemeToggle />
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-center">
          🔍 GitHub Profile Viewer
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchProfile();
          }}
          className="flex gap-2 items-center"
        >
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 min-w-[90px]"
          >
            {loading ? (
              <>
                <Spinner />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              "Search"
            )}
          </Button>
        </form>

        {profile && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <img
                    src={profile.avatar_url}
                    alt="avatar"
                    className="rounded-full w-28 h-28 mb-4 border"
                  />
                  <h2 className="text-2xl font-semibold">
                    {profile.name || profile.login}
                  </h2>
                  <p className="text-sm text-muted-foreground">{profile.bio}</p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    📦 {profile.public_repos} Repos | 👥 {profile.followers} Followers
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {profile.topRepos?.length > 0 && (
              <motion.div
                ref={topRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-lg font-semibold mb-2 text-left">Top Repositories</h3>

                {showAllTop && (
                  <Input
                    placeholder="Filter by language..."
                    value={searchQueryTop}
                    onChange={(e) => setSearchQueryTop(e.target.value)}
                    className="mb-4"
                  />
                )}

                <ul className="grid gap-2">
                  {(showAllTop
                    ? profile.topRepos.filter((repo) =>
                        repo.language?.toLowerCase().includes(searchQueryTop.toLowerCase())
                      )
                    : profile.topRepos.slice(0, 5)
                  ).map((repo: any) => (
                    <li
                      key={repo.id}
                      className="border rounded-lg p-4 bg-muted text-left transition hover:bg-accent hover:ring-1 hover:ring-ring"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold flex items-center gap-2 hover:underline"
                      >
                        🔗 {repo.name}
                      </a>
                      {repo.description && (
                        <p className="text-sm text-muted-foreground">{repo.description}</p>
                      )}
                      <div className="text-xs mt-1">⭐ {repo.stargazers_count}</div>
                      {repo.language && (
                        <div className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />
                          {repo.language}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setShowAllTop((prev) => {
                      const next = !prev;
                      setTimeout(() => {
                        if (next) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                      return next;
                    });
                  }}
                >
                  {showAllTop ? "Show Less" : "View All"}
                </Button>
              </motion.div>
            )}

            {profile.recentRepos?.length > 0 && (
              <motion.div
                ref={recentRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-lg font-semibold mt-8 mb-2 text-left">Recently Updated</h3>

                {showAllRecent && (
                  <Input
                    placeholder="Filter by language..."
                    value={searchQueryRecent}
                    onChange={(e) => setSearchQueryRecent(e.target.value)}
                    className="mb-4"
                  />
                )}

                <ul className="grid gap-2">
                  {(showAllRecent
                    ? profile.recentRepos.filter((repo) =>
                        repo.language?.toLowerCase().includes(searchQueryRecent.toLowerCase())
                      )
                    : profile.recentRepos.slice(0, 5)
                  ).map((repo: any) => (
                    <li
                      key={repo.id}
                      className="border rounded-lg p-4 bg-muted text-left transition hover:bg-accent hover:ring-1 hover:ring-ring"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold flex items-center gap-2 hover:underline"
                      >
                        🔗 {repo.name}
                      </a>
                      <div className="text-xs text-muted-foreground mt-1">
                        🕒 Last updated: {new Date(repo.pushed_at).toLocaleDateString()}
                      </div>
                      {repo.language && (
                        <div className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500" />
                          {repo.language}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setShowAllRecent((prev) => {
                      const next = !prev;
                      setTimeout(() => {
                        if (next) recentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                      return next;
                    });
                  }}
                >
                  {showAllRecent ? "Show Less" : "View All"}
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

