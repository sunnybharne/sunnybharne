# Terraform

### Intro to Terraform (https://developer.hashicorp.com/terraform/intro/phases ) 0
1. Iac for cloud and onprem infra
2. Terraform -> Providers -> Target API's
3. Providers are stored in terraform registry.
4. Terraform stages.
   -  Write (main.tf, statefile)
   -  Plan (terraform plan , equelent to whatif equivalent)
   -  Apply (terraform apply , deploy the infra)

--
### usecases
1. Multicloud depoyments.
2. Multi tier application scaling.
3. Self service clusters. ie. landing zone deployments
4. Policy compliance and management
5. Paas application setup.
6. Software defined networking.
7. Kubernates management.
8. Parallel environments. (Quickly spinup and destroy the resources as needed for testing)
9. Software demos.

### Terraform community edition.
Normal terraform

### HCP Terraform
1. Run terraform on cloud.
2. State files on terraform cloud and much more.

### Terraform enterprice plan
1. Self hosted HCP terraform.

### Terraform workflow
1. Create main.tf file 
2. terraform init -> Downloads the necessary files
3. updated the main.tf 
4. terraform plan -> Checks for any erros
5. terraform apply -> whatif and run the deployment

### HCP terraform
1. More fancy way of doing things 

### Ignoring below files
1. terraform.tfstafe
2. secure values
3. credentials

### Modules
1. Create modules for reusable code 

### Secrets 
2. Use Hashicorp valut for storing secrets

### Remotestate backend
1. Remote state storage should be used for seemless colaboration
2. saving state file in HCP terraform 
3. state locking , prevents concurrent terraform operation on one state file.
4. Executing terraform in HCP cloud

### Policy as code for governance

## Tutorials

### Fundamentals 0

### Azure 

### Docker 0

### HCP Terraform

### Documentation
