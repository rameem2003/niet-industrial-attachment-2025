# Ecommerce Project Documentation Day 13

## Industrial Attachment - NIET

## Overview

- How to integrate APIs into normal HTML (Video Upload [Link](https://drive.google.com/file/d/17m-pABkeIwN6v8V6jj1d5jUDWNxzQcN-/view?usp=drive_link))
- Authentication and Authorization
- Password Hashing

### Authentication and Authorization

Authentication and authorization are foundational concepts in security, especially in web applications, APIs, and systems. They work together to ensure users can access resources securely, but they address different aspects of access control.

#### Key Differences

| Aspect             | Authentication                                                                              | Authorization                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Purpose**        | Verifies _who_ the user is (identity).                                                      | Determines _what_ the user can do (permissions).                                                               |
| **Process**        | Challenges the user (e.g., username/password, biometrics).                                  | Checks policies/roles after identity is confirmed.                                                             |
| **Common Methods** | - Passwords<br>- Multi-factor authentication (MFA)<br>- Tokens (JWT, OAuth)<br>- Biometrics | - Role-Based Access Control (RBAC)<br>- Attribute-Based Access Control (ABAC)<br>- ACLs (Access Control Lists) |
| **Example**        | Logging into your email with credentials.                                                   | Once logged in, viewing only your emails, not others'.                                                         |
| **Failure Impact** | Impersonation (e.g., stolen credentials).                                                   | Over-privileging (e.g., admin access without need).                                                            |

- **Authentication Flow**: Typically involves a login endpoint that validates credentials against a stored (hashed) secret. Upon success, it issues a session token or cookie.
- **Authorization Flow**: Inspects the authenticated user's roles/claims (e.g., via middleware in frameworks like Express.js or Spring Security) to grant/deny access to routes or resources.
- **Best Practices**:
  - Use HTTPS to encrypt traffic.
  - Implement rate limiting to prevent brute-force attacks.
  - For APIs, prefer token-based auth (e.g., OAuth 2.0 or OpenID Connect) over sessions for statelessness.
  - Regularly audit and rotate credentials.

In modern systems (as of 2025), zero-trust models emphasize continuous authentication and context-aware authorization, integrating with tools like Keycloak or Auth0.

### Password Hashing

Password hashing is a one-way transformation of passwords into fixed-length strings (hashes) for secure storage. It prevents attackers from reversing the hash to recover plaintext passwords, even if the database is breached.

#### Why Hash Passwords?

- Plaintext storage is risky: A breach exposes all passwords directly.
- Hashing ensures only the hash is stored; during login, the input password is hashed and compared to the stored value.

#### Core Principles

- **One-Way Function**: Easy to compute forward, impossible to reverse.
- **Salt**: A unique random value added to each password before hashing to prevent rainbow table attacks (precomputed hash lookups).
- **Pepper**: An optional secret key (stored server-side, not per-user) for extra protection.
- **Slow and Iterative**: Use algorithms that take time (e.g., 100-500ms per hash) to resist brute-force/dictionary attacks.

#### Recommended Algorithms (2025 Standards)

| Algorithm  | Description                                                                 | Strengths                                                                   | Use Cases                                  | Drawbacks                     |
| ---------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------- |
| **bcrypt** | Adaptive, includes built-in salting and work factor.                        | Resistant to GPU cracking; auto-adjusts difficulty.                         | Web apps (e.g., Node.js, Ruby).            | Slower for very high loads.   |
| **Argon2** | Winner of 2015 Password Hashing Competition. Variants: Argon2id (balanced). | Memory-hard (resists ASIC/GPU); tunable params (time, memory, parallelism). | High-security apps (e.g., crypto wallets). | Higher resource use.          |
| **PBKDF2** | Uses HMAC with iterations (e.g., 310,000+).                                 | Widely supported; FIPS-compliant.                                           | Legacy systems or compliance needs.        | Less memory-hard than Argon2. |
| **scrypt** | Memory-intensive like Argon2.                                               | Good for hardware resistance.                                               | Embedded systems.                          | Less adaptive than bcrypt.    |

- **Avoid**: MD5, SHA-1, SHA-256 (fast but insecure for passwords without massive iterations).
- **Implementation Example (JavaScript with bcrypt)**:

  ```JavaScript
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("B4c0/\/", salt);
  // Store hash in your password DB


  // Load hash from your password DB
  await bcrypt.compare("B4c0/\/", hash); // true
  await bcrypt.compare("not_bacon", hash); // false
  ```

- **Best Practices**:
  - Always salt per-user (never reuse salts).
  - Enforce strong password policies (length, complexity) and encourage password managers.
  - Use libraries: Don't roll your own (e.g., `bcrypt` in Node.js, `passlib` in Python).
  - Monitor for breaches with tools like Have I Been Pwned (via k-anonymity API).
  - Transition to passwordless auth (e.g., WebAuthn with passkeys) where possible for future-proofing.

If you're implementing this in a specific language/framework or need code examples for a scenario, let me know for more tailored advice!

```

```
