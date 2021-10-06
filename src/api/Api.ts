export default class Api {
  protected getApiKey (): string | undefined {
    return localStorage.getItem('apiKey') ?? undefined
  }
}
