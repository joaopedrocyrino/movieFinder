import { AxiosInstance } from 'axios'
import moment from 'moment'
import Api from './Api'

export default class PersonAPI extends Api {
  constructor (private readonly api: AxiosInstance) { super() }

  async searchPerson (search: string): Promise<Array<{
    id: number
    name: string
    imagePath: string
  }>> {
    const response = await this.api.get<{
      results: Array<{
        id: number
        name: string
        profile_path: string
      }>
    }>('/search/person', {
      params: {
        api_key: this.getApiKey(),
        language: 'pt-BR',
        query: search
      }
    })

    return response.data.results.map(record => ({
      id: record.id,
      name: record.name,
      imagePath: record.profile_path
    }))
  }

  async getPerson (id: number): Promise<{
    name: string
    age: number
    imagePath: string
    lastMovie: string
  }> {
    const response = await this.api.get<{
      name: string
      birthday: string
      profile_path: string
      movie_credits: {
        cast: Array<{
          title: string
          release_date: string
        }>
      }
    }>(`/person/${id}`, {
      params: {
        api_key: this.getApiKey(),
        language: 'pt-BR',
        append_to_response: 'movie_credits'
      }
    })

    const birthDate = moment(response.data.birthday)

    const lastMovie = response.data.movie_credits.cast
      .filter(movie => movie.release_date)
      .sort((a, b) => {
        if (moment(a.release_date).isAfter(b.release_date)) {
          return -1
        } else if (moment(a.release_date).isBefore(b.release_date)) {
          return 1
        }
        return 0
      })[0].title

    return ({
      name: response.data.name,
      age: moment().diff(birthDate, 'year'),
      imagePath: response.data.profile_path,
      lastMovie
    })
  }
}
