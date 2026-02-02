from app.extensions import jwt_denylist
from flask_jwt_extended import JWTManager

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in jwt_denylist
