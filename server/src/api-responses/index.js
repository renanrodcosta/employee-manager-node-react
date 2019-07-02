const responses = res => {
  const ok = data =>
    data ? res.status(200).json(data) : res.status(200).send()

  const created = location => {
    if (location) res.set('Location', location)

    return res.status(201).send()
  }
  const noContent = () => res.status(204).end()

  const badRequest = err => res.status(400).json(err)
  const notFound = () => res.status(404).end()

  const conflict = err => res.status(409).json(err)

  const internalServer = () => res.status(500).end()

  return {
    ok,
    created,
    noContent,
    badRequest,
    notFound,
    conflict,
    internalServer
  }
}

export default responses
