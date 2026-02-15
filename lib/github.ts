export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;  // ADD THIS LINE
}

export async function fetchUserRepos(accessToken: string): Promise<GitHubRepo[]> {
  const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=50", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  const repos: GitHubRepo[] = await response.json();
  
  // Filter out forks and sort by stars
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export async function fetchRepoLanguages(repoFullName: string, accessToken: string): Promise<string[]> {
  const response = await fetch(`https://api.github.com/repos/${repoFullName}/languages`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    return [];
  }

  const languages = await response.json();
  return Object.keys(languages);
}