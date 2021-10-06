import development from './development.json'

class Config {
  private readonly apiUrl: string
  private readonly imageUrl: string

  constructor () {
    const config = development

    this.apiUrl = config.apiUrl
    this.imageUrl = config.imageUrl
  }

  getApiUrl (): string {
    return this.apiUrl
  }

  getImageUrl (): string {
    return this.imageUrl
  }
}

export default new Config()
