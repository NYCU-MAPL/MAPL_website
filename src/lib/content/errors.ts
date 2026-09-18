export class ContentValidationError extends Error {
  override readonly name = "ContentValidationError"
  readonly source: string
  readonly record: number | undefined
  readonly field: string
  readonly detail: string

  constructor(
    source: string,
    record: number | undefined,
    field: string,
    detail: string,
  ) {
    const location = record === undefined ? source : `${source}[${record}]`
    super(`${location}.${field}: ${detail}`)
    this.source = source
    this.record = record
    this.field = field
    this.detail = detail
  }
}
