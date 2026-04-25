import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("No DATABASE_URL")
    exit(1)

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE ingredient DROP COLUMN IF EXISTS image_url;"))
        conn.execute(text("ALTER TABLE ingredient ADD COLUMN IF NOT EXISTS description VARCHAR;"))
        
        conn.execute(text("ALTER TABLE product ADD COLUMN IF NOT EXISTS image_url VARCHAR;"))
        conn.execute(text("ALTER TABLE product ADD COLUMN IF NOT EXISTS description VARCHAR;"))

        conn.execute(text("ALTER TABLE category ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES category(id);"))
        
        conn.commit()
        print("Table altered successfully")
    except Exception as e:
        print(f"Error altering table: {e}")
