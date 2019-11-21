'use strict';
const knex = require('knex');
const ArticlesService = require('../src/articles-service');

describe('Articles service object', function () {
    let db;
    let testArticles = [
        {
            id: 1,
            date_published: new Date(),
            title: 'Title 1',
            content: 'foo bar baz fake content'
        },
        {
            id: 2,
            date_published: new Date(),
            title: 'Title 2',
            content: 'foo bar baz fake content'
        },
        {
            id: 3,
            date_published: new Date(),
            title: 'Title 3',
            content: 'foo bar baz fake content'
        },
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        });
    });

    before(() => db('blogful_articles').truncate());
    afterEach(() => db('blogful_articles').truncate());
    after(() => db.destroy());
    before(() => {
        return db
            .into('blogful_articles')
            .insert(testArticles)
    })

    context('When Articles table has data', () => {
        beforeEach(() => {
            return db('blogful_articles').into('blogful_articles').insert(testArticles)
        })
    })

    it(`resolves all articles form 'blogful_articles' table`, () => {
        return ArticlesService.getAllArticles(db)
            .then(actual => {
                expect(actual).to.eql(testArticles)
            })
    })

    context(`given 'blogful_articles' has no data`, () => {
        it(`getAllArticles() resolves an empty array`, () => {
            return ArticlesService.getAllArticles(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })
    })

    it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
        const newArticle = {
            title: 'Test new title',
            content: 'Test new content',
            date_published: new Date('2020-01-01T00:00:00.000Z'),
        }
        return (ArticlesService.insertArticle(db, newArticle))
            .then(actual => {
                expect(actual).to.eql({
                    id: 1,
                    title: newArticle.title,
                    content: newArticle.content,
                    date_published: newArticle.date_published,
                })
            })
    })

    it('getById() returns article by id', () => {
        const article = testArticles[2];
        return ArticlesService.getById(db, article.id)
            .then(result => {
                expect(result).to.eql(article);
            });
    });

    it(`deleteArticle() removes an article by id from 'blogful_articles' table`, () => {
        const articleId = 3
        return ArticlesService.deleteArticle(db, articleId)
            .then(() => ArticlesService.getAllArticles(db))
            .then(allArticles => {
                // copy the test articles array without the "deleted" article
                const expected = testArticles.filter(article => article.id !== articleId)
                expect(allArticles).to.eql(expected)
            })
    })

    it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
        const idOfArticleToUpdate = 3
        const newArticleData = {
            title: 'updated title',
            content: 'updated content',
            date_published: new Date(),
        }
        return ArticlesService.updateArticle(db, idOfArticleToUpdate, newArticleData)
            .then(() => ArticlesService.getById(db, idOfArticleToUpdate))
            .then(article => {
                expect(article).to.eql({
                    id: idOfArticleToUpdate,
                    ...newArticleData,
                })
            })
    })

});

