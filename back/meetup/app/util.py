import bcrypt as bc

def new_password(password):
    bytes = password.encode('utf-8')
    salt = bc.gensalt()
    hash = bc.hashpw(bytes, salt)
    return hash.decode('utf-8')

def check_password(password, stored_hash) -> bool:
    bytes = password.encode('utf-8')
    stored_bytes = stored_hash.encode('utf-8')
    return bc.checkpw(bytes, stored_bytes)