export interface University {
  id: string;
  name: string;
  country: string;
}

export const universities: University[] = [
  // United States
  { id: "mit", name: "Massachusetts Institute of Technology", country: "USA" },
  { id: "stanford", name: "Stanford University", country: "USA" },
  { id: "harvard", name: "Harvard University", country: "USA" },
  { id: "caltech", name: "California Institute of Technology", country: "USA" },
  { id: "princeton", name: "Princeton University", country: "USA" },
  { id: "yale", name: "Yale University", country: "USA" },
  { id: "columbia", name: "Columbia University", country: "USA" },
  { id: "uchicago", name: "University of Chicago", country: "USA" },
  { id: "penn", name: "University of Pennsylvania", country: "USA" },
  { id: "cornell", name: "Cornell University", country: "USA" },
  { id: "berkeley", name: "University of California, Berkeley", country: "USA" },
  { id: "ucla", name: "University of California, Los Angeles", country: "USA" },
  { id: "duke", name: "Duke University", country: "USA" },
  { id: "northwestern", name: "Northwestern University", country: "USA" },
  { id: "jhu", name: "Johns Hopkins University", country: "USA" },
  { id: "umich", name: "University of Michigan", country: "USA" },
  { id: "nyu", name: "New York University", country: "USA" },
  { id: "usc", name: "University of Southern California", country: "USA" },
  
  // United Kingdom
  { id: "oxford", name: "University of Oxford", country: "UK" },
  { id: "cambridge", name: "University of Cambridge", country: "UK" },
  { id: "imperial", name: "Imperial College London", country: "UK" },
  { id: "ucl", name: "University College London", country: "UK" },
  { id: "edinburgh", name: "University of Edinburgh", country: "UK" },
  { id: "manchester", name: "University of Manchester", country: "UK" },
  { id: "kcl", name: "King's College London", country: "UK" },
  { id: "lse", name: "London School of Economics", country: "UK" },
  { id: "warwick", name: "University of Warwick", country: "UK" },
  { id: "bristol", name: "University of Bristol", country: "UK" },
  
  // Canada
  { id: "toronto", name: "University of Toronto", country: "Canada" },
  { id: "ubc", name: "University of British Columbia", country: "Canada" },
  { id: "mcgill", name: "McGill University", country: "Canada" },
  { id: "waterloo", name: "University of Waterloo", country: "Canada" },
  { id: "mcmaster", name: "McMaster University", country: "Canada" },
  
  // Australia
  { id: "melbourne", name: "University of Melbourne", country: "Australia" },
  { id: "sydney", name: "University of Sydney", country: "Australia" },
  { id: "anu", name: "Australian National University", country: "Australia" },
  { id: "unsw", name: "University of New South Wales", country: "Australia" },
  { id: "queensland", name: "University of Queensland", country: "Australia" },
  
  // Europe
  { id: "eth", name: "ETH Zurich", country: "Switzerland" },
  { id: "epfl", name: "EPFL", country: "Switzerland" },
  { id: "tum", name: "Technical University of Munich", country: "Germany" },
  { id: "lmu", name: "Ludwig Maximilian University", country: "Germany" },
  { id: "heidelberg", name: "Heidelberg University", country: "Germany" },
  { id: "sorbonne", name: "Sorbonne University", country: "France" },
  { id: "psl", name: "Paris Sciences et Lettres", country: "France" },
  { id: "amsterdam", name: "University of Amsterdam", country: "Netherlands" },
  { id: "delft", name: "Delft University of Technology", country: "Netherlands" },
  { id: "ku", name: "KU Leuven", country: "Belgium" },
  
  // Asia
  { id: "tsinghua", name: "Tsinghua University", country: "China" },
  { id: "peking", name: "Peking University", country: "China" },
  { id: "nus", name: "National University of Singapore", country: "Singapore" },
  { id: "ntu", name: "Nanyang Technological University", country: "Singapore" },
  { id: "tokyo", name: "University of Tokyo", country: "Japan" },
  { id: "kyoto", name: "Kyoto University", country: "Japan" },
  { id: "seoul", name: "Seoul National University", country: "South Korea" },
  { id: "kaist", name: "KAIST", country: "South Korea" },
  { id: "hku", name: "University of Hong Kong", country: "Hong Kong" },
  { id: "iit-bombay", name: "IIT Bombay", country: "India" },
  { id: "iit-delhi", name: "IIT Delhi", country: "India" },
  
  // South America
  { id: "sao-paulo", name: "University of São Paulo", country: "Brazil" },
  { id: "buenos-aires", name: "University of Buenos Aires", country: "Argentina" },
  { id: "chile", name: "University of Chile", country: "Chile" },
  
  // Middle East & Africa
  { id: "technion", name: "Technion", country: "Israel" },
  { id: "hebrew", name: "Hebrew University of Jerusalem", country: "Israel" },
  { id: "cape-town", name: "University of Cape Town", country: "South Africa" },
];
