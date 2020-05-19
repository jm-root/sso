const $ = require('./service')

let router = null
beforeAll(async () => {
  await $.onReady()
  router = $.router()
})

let token = null

async function signon () {
  const doc = await router.post('/signon', { id: '1' })
  token = doc.token
  return doc
}

async function verify () {
  return router.get('/verify', { token })
}

async function touch () {
  return router.get('/touch', { token, name: 'jeff', id: '2' })
}

async function signout () {
  return router.get('/signout', { token })
}

test('signon', async () => {
  await signon()
  expect(token).toBeTruthy()
  await verify()
})

test('touch', async () => {
  const doc = await signon()
  const doc2 = await touch()
  expect(doc2.time > doc.time).toBeTruthy()
})

test('signout', async () => {
  await signon()
  const doc = await signout()
  expect(doc).toBeTruthy()
})
