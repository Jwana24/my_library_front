export const generateQueryParameter = (selectedGenre: string, selectedStatus: string, searchTitle: string, selectedType: string) => {
  let queryParam = '?';
  if (selectedType) {
    queryParam += `&filter[type]=${selectedType}`;
  }
  if (selectedGenre) {
    queryParam += `&filter[genre]=${selectedGenre}`;
  }
  if (selectedStatus) {
    queryParam += `&filter[status]=${selectedStatus}`;
  }
  if (searchTitle) {
    queryParam += `&filter[title]=${searchTitle}`;
  }
  return queryParam;
};