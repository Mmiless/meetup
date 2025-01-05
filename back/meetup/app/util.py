import bcrypt as bc
import json
from asgiref.sync import sync_to_async

def new_password(password):
    bytes = password.encode('utf-8')
    salt = bc.gensalt()
    hash = bc.hashpw(bytes, salt)
    return hash.decode('utf-8')

def check_password(password, stored_hash) -> bool:
    bytes = password.encode('utf-8')
    stored_bytes = stored_hash.encode('utf-8')
    return bc.checkpw(bytes, stored_bytes)

@sync_to_async
def validate_user(event_hash, username, password):
    from .event import Event
    event = Event.objects.get(hash=event_hash)
    participants = event.participants or {}

    if username in participants:
        if check_password(password, participants[username]['password']):
            return participants[username]
        else:
            return None
    else:
        participants[username] = {'password': new_password(password), 'times': {}}
        event.participants = json.dumps(participants)
        event.save()
        return participants[username]