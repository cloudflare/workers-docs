---
title: Secret
weight: 4
new: true
---

### `put`

Interactive command to create or replace a secret

  ```bash
  wrangler secret create <name> --env ENVIRONMENT_NAME
  Enter the secret text you'd like assigned to the variable name on the script named my-worker-ENVIRONMENT_NAME:
  ```

  - `name`: the variable name to be accessible in the script
  - `--env`: (optional) binds the secret to the script of the specific environment

### `delete`

Interactive command to delete a secret from a specific script

```bash
  wrangler secret delete <name> --env ENVIRONMENT_NAME
```

- `name`: the variable name to be accessible in the script
- `--env`: (optional) binds the secret to the script of the specific environment

### `list`

List all the secret names bound to a specific script

```bash
  wrangler list --env ENVIRONMENT_NAME
```

- `--env`: (optional) environment of the script of the specific environment

