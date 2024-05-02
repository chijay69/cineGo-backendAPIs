
## API Versioning

All endpoints are prefixed with `/api/v1`.

## Authentication and Authorization

- **Middleware:**
  - `authentication`: Middleware to check if the user is authenticated.
  - `authorization(roles: string[])`: Middleware to check if the user has the required role(s) for access.

## AuthController

### `POST /api/v1/auth/signup`

Creates a new user account.

#### Request Body

- `firstName`: string (required) - User's first name.
- `lastName`: string (required) - User's last name.
- `email`: string (required) - User's email address.
- `password`: string (required) - User's password.
- `role`: string (optional) - User's role (e.g., "user", "admin").
- `country`: string (optional) - User's country.
- `referalCode`: string (optional) - Referal code for the user.

#### Response

- `message`: string - Success message.
- `token`: string - JWT token for authentication.
- `userDataResponse`: object - User data.

### `POST /api/v1/auth/signin`

Logs in an existing user.

#### Request Body

- `email`: string (required) - User's email address.
- `password`: string (required) - User's password.

#### Response

- `message`: string - Success message.
- `userDataResponse`: object - User data.
- `token`: string - JWT token for authentication.

## UserController

### `GET /api/v1/profile`

Retrieves the profile of the authenticated user.

#### Response

- `userDataResponse`: object - User data.
- `profileName`: string - Profile name.
- `profileAvatar`: string - Profile avatar URL.
- `Rrating`: string - Profile rating.

### `GET /api/v1/users`

Retrieves a list of all users (admin only).

#### Response

- `usersdata`: array - Array of user objects.

### `PUT /api/v1/users/:id`

Updates a user's information (user or admin).

#### Request Params

- `id`: number (required) - User ID.

#### Request Body

- `firstName`: string - User's new first name.
- `lastName`: string - User's new last name.
- `email`: string - User's new email address.
- `country`: string - User's new country.

#### Response

- `message`: string - Success message.
- `user`: object - Updated user object.

### `DELETE /api/v1/users/:id`

Deletes a user account (admin only).

#### Request Params

- `id`: number (required) - User ID.

#### Response

- `message`: string - Success message.
