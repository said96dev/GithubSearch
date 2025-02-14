import { describe } from 'node:test'
import { Repository } from '../lib/types'
import {
  calculateMostForkedRepos,
  calculateMostStarredRepos,
  calculatePopularLanguages,
} from '../utils'
import { expect, test } from 'vitest'
export const mockRepositories: Repository[] = [
  {
    name: 'repo1',
    description: 'test repo 1',
    stargazerCount: 1000,
    forkCount: 500,
    url: 'https://github.com/test/repo1',
    languages: {
      edges: [
        { node: { name: 'javascript' }, size: 1000 },
        { node: { name: 'typescript' }, size: 500 },
      ],
    },
  },
  {
    name: 'repo2',
    description: 'test repo 2',
    stargazerCount: 2000,
    forkCount: 300,
    url: 'https://github.com/test/repo2',
    languages: {
      edges: [
        { node: { name: 'python' }, size: 800 },
        { node: { name: 'javascript' }, size: 400 },
      ],
    },
  },
  {
    name: 'repo3',
    description: 'test repo 3',
    stargazerCount: 3000,
    forkCount: 1000,
    url: 'https://github.com/test/repo3',
    languages: {
      edges: [
        { node: { name: 'typescript' }, size: 1200 },
        { node: { name: 'python' }, size: 300 },
      ],
    },
  },
]

describe('repo claculations', () => {
  test('should return empty Array', () => {
    const result = calculateMostForkedRepos([])
    expect(result).toEqual([])
  })
  test('should return top 5 most forked Repo', () => {
    const result = calculateMostForkedRepos(mockRepositories)
    expect(result).toEqual([
      { repo: 'repo3', count: 1000 },
      { repo: 'repo1', count: 500 },
      { repo: 'repo2', count: 300 },
    ])
  })
  test('should sort repos by fork count in descending order', () => {
    const result = calculateMostForkedRepos(mockRepositories)
    expect(result[0].count).toBeGreaterThanOrEqual(result[1].count)
    expect(result[1].count).toBeGreaterThanOrEqual(result[2].count)
  })
})

describe('clculate most starred repositories', () => {
  test('shuld return Empty Array', () => {
    const result = calculateMostStarredRepos([])
    expect(result).toEqual([])
  })
  test('most top 5 starred repositories ', () => {
    const result = calculateMostStarredRepos(mockRepositories)
    expect(result).toEqual([
      { repo: 'repo3', stars: 3000 },
      { repo: 'repo2', stars: 2000 },
      { repo: 'repo1', stars: 1000 },
    ])
  })
  test('shuld sort repos by stars count in descending order', () => {
    const result = calculateMostStarredRepos(mockRepositories)
    expect(result[0].stars).toBeGreaterThanOrEqual(result[1].stars)
    expect(result[1].stars).toBeGreaterThanOrEqual(result[2].stars)
  })
})

describe('clculatepopular repositories', () => {
  test('should return empty array when no repositories are provided', () => {
    const result = calculatePopularLanguages([])
    expect(result).toEqual([])
  })
  test('should return empty array when no languages are present', () => {
    const repoWithLanguages: Repository[] = [
      {
        ...mockRepositories[0],
        languages: { edges: [] },
      },
    ]
    const result = calculatePopularLanguages(repoWithLanguages)
    expect(result).toEqual([])
  })
  test('should return top 5 most used laguages', () => {
    const result = calculatePopularLanguages(mockRepositories)
    expect(result).toEqual([
      { language: 'javascript', count: 2 },
      { language: 'typescript', count: 2 },
      { language: 'python', count: 2 },
    ])
  })
  test('should count language occurrences correctly', () => {
    const result = calculatePopularLanguages(mockRepositories)
    const jsCount = result.find((lang) => lang.language === 'javascript')?.count
    expect(jsCount).toBe(2)
  })
})
