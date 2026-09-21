export interface RepoDetails {
    id: number;
    name: string;
    full_name: string;
    stargazers_count: number;
    open_issues_count: number;
    pushed_at: string; // Last commit/push date
    html_url: string;
    owner: {
      avatar_url: string;
      login: string;
    };
  }
  
  export interface SearchResponse {
    total_count: number;
    items: RepoDetails[];
  }