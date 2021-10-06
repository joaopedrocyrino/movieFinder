import { AxiosInstance } from 'axios'
import Api from './Api'

export default class TvShowAPI extends Api {
  constructor (private readonly api: AxiosInstance) { super() }

  async searchTvShow (search: string): Promise<Array<{
    id: number
    name: string
    imagePath: string
  }>> {
    const response = await this.api.get<{
      results: Array<{
        id: number
        name: string
        poster_path: string
      }>
    }>('/search/tv', {
      params: {
        api_key: this.getApiKey(),
        language: 'pt-BR',
        query: search
      }
    })

    return response.data.results.map(record => ({
      id: record.id,
      name: record.name,
      imagePath: record.poster_path
    }))
  }

  async getTvShow (id: number): Promise<{
    name: string
    imagePath: string
    releaseDate: string
    seasons: number
  }> {
    const response = await this.api.get<{
      name: string
      number_of_seasons: number
      poster_path: string
      first_air_date: string
    }>(`/tv/${id}`, {
      params: {
        api_key: this.getApiKey(),
        language: 'pt-BR'
      }
    })

    return {
      name: response.data.name,
      imagePath: response.data.poster_path,
      releaseDate: response.data.first_air_date,
      seasons: response.data.number_of_seasons
    }
  }
}
