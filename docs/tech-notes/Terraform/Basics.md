# Terraform

## Terraform Basics
- Plugins = Providers (Helps Terraform to interact with the cloud provider)

- To write terraform code, you need to know the following:
    Scope - Identify the infrastructure for your project.
    Author - Write the configuration for your infrastructure.
    Initialize - Install the plugins Terraform needs to manage the infrastructure.
    Plan - Preview the changes Terraform will make to match your configuration.
    Apply - Make the planned changes.

```hcl
terraform init # Initialize the directory
terraform plan # Plan the changes
terraform apply # Apply the changes
terraform destroy # Destroy the infrastructure
terraform fmt # Format the code
terraform validate # Validate the code
terraform show # Show the state
terraform state list # List the resources
terraform state rm # Remove the resource from the state
terraform state mv # Move the resource in the state
terraform state pull # Pull the state
terraform state push # Push the state
terraform state replace-provider # Replace the provider in the state
```

## HCP Terraform
- Run your Terraform code in the HCP cloud rather than running it locally.

### Workflows
- Organization
    - workspace
        - configuration
        - state

### Three types of workflows are supported
- CLI-driven workflow, Which uses terraform standard cli commands to run your workflows.
- VCS-driven workflow, Which uses a version control system to trigger your workflows.
- API-driven workflow, Which uses the HCP API to trigger your workflows.

#### CLI-driven workflow
- This uses terraforma ephemeral workspace to run your terraform code.
- This stores your statefiles,input and environment variables in the workspace sequerly.

#### VCS-driven workflow
- This uses a version control system to trigger your terraform workflows.
- Your vcs is then associated with a workspace in terraform cloud.
- This then creates the speculative plans when the pull requests are created.

## Private registry

## CDKTF
cdktf init


