DROP TYPE IF EXISTS category;
CREATE TYPE category as ENUM (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast' 
    -- no comma needed after last 
);


CREATE TABLE IF NOT EXISTS shopping_list(
    grocery_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    grocery_name TEXT NOT NULL,
    price decimal(10,2) NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL,
    checked BOOLEAN DEFAULT false,
    -- boolean doesn't need not null if defaulted
    category TEXT NOT NULL
);

