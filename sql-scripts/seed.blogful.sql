INSERT INTO blogful_articles(title, date_published, content)
VALUES
    ('How to sell your cat online', now() - '21 days'::INTERVAL, 'You need to sell that cat, larry'),
    ('How to sell your brother online', '2016-05-01 15:00:00', 'You need to sell that cat, larry'),
    ('How to sell your Mom online', '2017-04-23 15:00:00', 'You need to sell that cat, larry'),
    ('How to sell your Dog online', now() - '21 days'::INTERVAL, 'You need to sell that cat, larry'),
    ('How to sell your Sanity online', now() - '21 days'::INTERVAL, 'You need to sell that cat, larry')

;