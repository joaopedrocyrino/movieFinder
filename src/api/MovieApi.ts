import { AxiosInstance } from 'axios'
import Api from './Api'

export default class MovieApi extends Api {
  constructor (private readonly api: AxiosInstance) { super() }

  async searchMovies (search: string): Promise<Array<{
    title: string
    releaseDate: string
    rating: number
    imagePath: string
  }>> {
    const response = await this.api.get<{
      results: Array<{
        vote_average: number
        title: string
        release_date: string
        poster_path: string
      }>
    }>('/search/movie', {
      params: {
        api_key: this.getApiKey(),
        language: 'pt-BR',
        query: search
      }
    })

    return response.data.results.map(record => ({
      title: record.title,
      releaseDate: record.release_date,
      rating: record.vote_average,
      imagePath: record.poster_path
    }))
  }
}
