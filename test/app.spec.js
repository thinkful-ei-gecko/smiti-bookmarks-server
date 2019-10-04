const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });

  it('GET /bookmarks responds with 200 and all of the bookmark', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(200, testBookmarks)
    // TODO: add more assertions about the body
  })


  it('GET /bookmarks/:bookmark_id responds with 200 and the specified bookmark', () => {
    const bookmarkId = 2
    const expectedBookmark = testBookmarks[bookmarkId - 1]
    return supertest(app)
      .get(`/bookmarks/${bookmarkId}`)
      .expect(200, expectedBookmark)
  })
});