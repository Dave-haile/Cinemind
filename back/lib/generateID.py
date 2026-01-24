import secrets
import string

from models import Movie

def generate_short_id(length=8):
    chars = string.ascii_letters + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))

def generate_unique_public_id():
    while True:
        pid = generate_short_id(8)
        if not Movie.query.filter_by(public_id=pid).first():
            return pid
