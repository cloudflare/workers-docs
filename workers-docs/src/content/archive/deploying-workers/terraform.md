---
title: Terraform
weight: 50
---

[Terraform](https://www.terraform.io/) provides an alternative way to configure Worker scripts and routes. Instead of using the Cloudflare dashboard or API directly, you define scripts and routes in simple, declarative configuration files. Terraform then figures out how to make the API calls for you. This also lets you treat your Worker configuration like your code. You can check your configuration files into version control and integrate them into your normal software development workflow.

For information on integrating your Cloudflare configuration into Terraform, check out [Getting started with Terraform and Cloudflare](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/).

For a step-by-step guide to using Workers with Terraform, check out [Deploy Workers using Terraform](https://blog.cloudflare.com/deploy-workers-using-terraform/).

If you're already using Cloudflare Workers but want to switch to managing them with Terraform, you'll need to import your existing configuration into the Terraform state so that Terraform knows how to apply changes going forward. See the **Importing your existing configuration** section below for more information.

### Providing your zone and credentials

In order to use Terraform to control Cloudflare features, you'll need to provide your Cloudflare credentials. While it's possible to specify the credentials in your Terraform config, we recommend using environment variables instead so that you can check your configuration files into source control without including any private information.

The following environment variables are required:

- Set `CLOUDFLARE_EMAIL` to your email address
- Set `CLOUDFLARE_TOKEN` to your [Cloudflare API key](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
- If you're on an Enterprise plan and want to use multiple scripts, you'll also need to set `CLOUDFLARE_ORG_ID` to your account ID. You can find your account ID by using the [List Accounts API](https://api.cloudflare.com/#accounts-list-accounts)

To define your Terraform configuration, create a file with any name and give it a `.tf` file extension. In this file, you'll need to setup the Cloudflare provider. If you specify your credentials with environment variables, you can simply set up your Cloudflare provider like:

```hcl
provider "cloudflare" {}
```

Instead of environment variables, you can also use [Terraform variables](https://www.terraform.io/docs/configuration/variables.html) to specify your credentials.

```hcl
variable "cloudflare_email" {}
variable "cloudflare_token" {}

# org_id is only required for enterprise (multi-script) accounts
variable "cloudflare_org_id" {}

provider "cloudflare" {
  email = "${var.cloudflare_email}"
  token = "${var.cloudflare_token}"

  # org_id is only required for enterprise (multi-script) accounts
  org_id = "${var.cloudflare_org_id}"
}
```

When using Terraform variables, you'll need to specify the values to use for each variable whenever you run a Terraform command. For example, to run `terraform apply` with variables:

```bash
$ terraform apply -var 'cloudflare_email=myemail@domain.com' -var 'cloudflare_token=mytoken'
```

Many Cloudflare resources take the `zone` as a parameter. While you can specify the value directly, it may be beneficial to use a Terraform variable instead. This way, if you set up a separate staging zone to test your Workers, you can use the same Terraform configuration to deploy to either your staging or production zone. This is a great way to test changes to your Worker script or routes. To declare a `zone` variable, add the following to your Terraform config:

```hcl
variable "zone" {
  default = "example.com"
}
```

### Configuring scripts

Worker scripts are configured via [cloudflare_worker_script](https://www.terraform.io/docs/providers/cloudflare/r/worker_script.html) resources.

If you're on a non-enterprise plan, provide two parameters, `zone` and `content`. You can reference a local script file using the `${file("...")}` syntax:

```hcl
resource "cloudflare_worker_script" "my_script" {
  zone = "${var.zone}"
  content = "${file("worker.js")}"
}
```

If you're on the enterprise plan, instead of providing a `zone`, provide a script `name`.

```hcl
resource "cloudflare_worker_script" "my_script" {
  name = "my_script_name"
  content = "${file("worker.js")}"
}
```

### Configuring routes

Worker routes specify which requests should run the Worker script, so you'll need to define at least one route in order for your script to start processing requests. You can also define multiple routes if you want to implement more advanced routing behavior. If you define multiple routes for the same zone, more-specific routes are evaluated before less-specific routes. Worker routes are configured via [cloudflare_worker_route](https://www.terraform.io/docs/providers/cloudflare/r/worker_route.html) resources.

All `cloudflare_worker_route` resources need to specify the `zone` and a `pattern`. For more information on writing route patterns, see [Route Pattern Matching](../../api/route-matching/).

#### Non-enterprise plans

For non-enterprise plans, you will specify 4 parameters:

- `zone` (string): the zone for the route
- `pattern` (string): the route pattern
- `enabled` (boolean): a flag that controls whether the script should run when a request matches the `pattern`.
- `depends_on` (resource): a reference to a `cloudflare_worker_script` resource

Here's an example:

```hcl
resource "cloudflare_worker_route" "my_route" {
  zone = "${var.zone}"
  pattern = "*${var.zone}/*"
  enabled = true
  depends_on = ["cloudflare_worker_script.my_script"]
}
```

In most common cases, you'll want to set `enabled` to `true`, meaning if a request matches the `pattern`, run the Worker. However, in some cases, you may want to specifically disable Workers for a particular path on your site. For example, you may want to enable Workers for all requests _except_ for requests to your static assets with a URL like `example.com/assets/...`. To achieve that, you would define two routes. One route would match all requests by using a pattern like `*example.com/*` and set `enabled = true`. The other route would have a pattern like `*example.com/assets/*` and set `enabled = false`. Since more-specific routes are evaluated first, this would enable your Worker for all requests _except_ your static assets.

The `depends_on` parameter is a Terraform feature used to let Terraform know that this resource depends on another resource. Normally, Terraform will try to create resources in parallel, but you may get an error if you try to create a route before you have a script. By using the `depends_on` parameter, Terraform will know to create the script first before creating the route.

#### Enterprise (multi-script) plan

For multi-script accounts, some of the parameters will differ. Instead of setting an `enabled` flag, you'll use a `script_name` parameter that specifies the name of the script that should be run when the pattern matches. To skip Workers for a particular route, specify an empty `script_name`, which works the same as setting `enabled = false` for a non-multiscript account.

If you reference a script resource instead of just hard-coding the `script_name`, Terraform will already know that the route depends on the script resource so you can also omit the `depends_on` parameter.

Here's an example:

```hcl
resource "cloudflare_worker_route" "my_route" {
  zone = "${var.zone}"
  pattern = "*${var.zone}/*"
  script_name = "${cloudflare_worker_script.my_script.name}"
}
```

### Deploying your Workers
After you've defined your configuration file, you're ready to deploy your scripts and routes. Make sure you [Install Terraform](https://www.terraform.io/intro/getting-started/install.html) and then run `terraform init` to run the initial setup.

```
$ terraform init

Initializing provider plugins...

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running `terraform plan` to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

To apply your configuration, run `terraform apply`. Terraform will show you a preview of the changes it will make:

```
$ terraform apply

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + cloudflare_worker_route.my_route
      id:           <computed>
      enabled:      "true"
      multi_script: <computed>
      pattern:      "*example.com/*"
      zone:         "example.com"
      zone_id:      <computed>

  + cloudflare_worker_script.my_script
      id:           <computed>
      content:      "...omitted for brevity..."
      zone:         "example.com"
      zone_id:      <computed>

Plan: 2 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value:
```

If everything looks correct, type `yes` and press return to apply the changes.

```
cloudflare_worker_script.my_script: Creating...
  content: "" => "...omitted for brevity..."
  zone:    "" => "example.com"
  zone_id: "" => "<computed>"
cloudflare_worker_script.my_script: Creation complete after 1s (ID: zone:example.com)
cloudflare_worker_route.my_route: Creating...
  enabled:      "" => "true"
  multi_script: "" => "<computed>"
  pattern:      "" => "*example.com/*"
  zone:         "" => "example.com"
  zone_id:      "" => "<computed>"
cloudflare_worker_route.my_route: Creation complete after 0s (ID: af595c1bb7cd4d1698c4d6cbcb364662)

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

Now you can continue to edit your script or Terraform configuration files, and when you're ready to deploy your changes, just run `terraform apply` again.

### Importing existing configuration

If you're already using Cloudflare Workers but want to start managing them via Terraform, you'll need to import your existing configuration into the Terraform state so it knows how to apply changes going forward.

Before you can import a resource, you'll need to declare the resource in your Terraform config file just as you would if you were creating a resource from scratch. You'll also need to run `terraform init` to initialize Terraform. After you've defined the resources, you'll run `terraform import ...` commands one-by-one for each resource you want to import. The `import` command takes 2 arguments:

- The resource identifier you created in your Terraform config file
- An ID that can be used to look up the existing data for that resource

#### Importing a script

If you're not on an enterprise account, the ID will just be the string `zone:` followed by your zone name.

```bash
$ terraform import cloudflare_worker_script.my_script zone:example.com
```

If you're on an enterprise (multi-script) account, the ID will just be the string `name:` followed by your script name.

```bash
$ terraform import cloudflare_worker_script.my_script name:my_script_name
```

#### Importing a route

In order to find the ID of your existing route, you'll have to call the Cloudflare API. For non-enterprise customers, see the [Get Assigned Routes API](../../api/). For enterprise customers, see the [Get Routes API](../../api/config-api-for-enterprise/). Once you find the route you're looking for in the API response, copy the route ID, which should look like `9a7806061c88ada191ed06f989cc3dac`. The ID you'll provide to `terraform import ...` is your zone name followed by a forward slash and then the route ID.

```bash
$ terraform import cloudflare_worker_route.default example.com/9a7806061c88ada191ed06f989cc3dac
```
