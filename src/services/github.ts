import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RepoDetails, SearchResponse } from '../types/github.types';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  tagTypes: ['Repo'], 
  endpoints: (builder) => ({
    searchRepos: builder.query<SearchResponse, string>({
      query: (query) => `search/repositories?q=${encodeURIComponent(query)}&per_page=10`,
    }),
    getRepoDetails: builder.query<RepoDetails, string>({
      query: (fullName) => `repos/${fullName}`,
      providesTags: (_result, _error, fullName) => [{ type: 'Repo', id: fullName }],
    }),
  }),
});

export const { useSearchReposQuery, useGetRepoDetailsQuery, useLazySearchReposQuery } = githubApi;