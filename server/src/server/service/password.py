import bcrypt


def create_hashed_password(password: str) -> str:
    """
    create a hashed password from a plain text password

    args:
        password: str - the plain text password to hash
    returns:
        bytes - the hashed password
    """
    password_bytes = password.encode("utf-8")
    hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode("utf-8")
    return hashed_password


def check_password(password: str, hashed_password: str) -> bool:
    """
    check if a plain text password matches a hashed password

    args:
        password: str - the plain text password to check
        hashed_password: bytes - the hashed password to compare against
    returns:
        bool - True if the password matches, False otherwise
    """
    password_bytes = password.encode("utf-8")
    hashed_password_bytes = hashed_password.encode("utf-8")
    return bcrypt.checkpw(password_bytes, hashed_password_bytes)
