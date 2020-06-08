export interface Result {
  url: string;
  icon_url: string;
  docid: string;
  name: string;
}

export interface SearchResult {
  matches: number;
  facets: any;
  search_time: string;
  results: Result[];
}
