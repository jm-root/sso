const $ = require('./service')

let service = null
beforeAll(async () => {
  await $.onReady()
  service = $
})

let token = null

async function signon () {
  const doc = await service.signon({
    id: 1
  })
  token = doc.token
  return doc
}
test('signon', async () => {
  await signon()
  expect(token).toBeTruthy()
})

test('verify', async () => {
  await signon()
  await service.verify(token)
})

test('touch', async done => {
  await signon()
  await service.touch(token, { expire: 50 })
  setTimeout(() => {
    service.verify(token)
      .then(doc => {
        expect(doc.token).toBeTruthy()
        done()
      })
  },
  1500)
})

test('signout', async () => {
  await signon()
  await service.signout(token)
  try {
    const doc = await service.verify(token)
    expect(doc).toBeFalsy()
  } catch (e) {
  }
})
