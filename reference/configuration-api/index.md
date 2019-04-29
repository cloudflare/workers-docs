# Configuration API

## Make Requests

All requests to this API must

* be sent over HTTPS
* Send a JSON body (unless otherwise indicated)
* contain valid identification headers:
	* `X-Auth-Email` - the email address attached to your profile in the Cloudflare dashboard.
	* `X-Auth-Key` - the Global API key attached to your profile in the Cloudflare dashboard.

### Find your Auth Email - TODO

### Find your Auth Key - TODO

### Errors

TODO: document the shape of an error object.

#### Error Codes

##### Worker Runtime

10001	Unsupported or unexpected Content Type
10002	Unexpected internal server error
10003	Missing required URL parameter
10004	Malformed URL parameter
10006	Unparseable script body
10007	Resource not found (similar to HTTP 404)
10014	Internal error while attempting authorization checks
10015	The current account is not authorized to use workers
10018	Attempted to update a script where the e-tag does not match
10020	Attempted to create a route for a pattern that already exists
10021	Script content failed validation checks, but was otherwise parseable
10022	Route pattern was invalid
10023	Unauthorized access attempt
10026	Route pattern was unparseable
10027	Script body was too large

##### Cloudflare API

TODO: some errors can come back from the API gateway (specifically issues with account/zone). Link to documentation about these errors.
