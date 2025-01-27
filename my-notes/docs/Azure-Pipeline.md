# Azure pipelines
### Pipeline basics
- Pipeline = collection of stages.
- Stages = collection of jobs.
- Jobs = collection of steps.
- Each Job runs on one agent.
- Manual approvals are possible between stages.
- Deployment = Jobs and steps running sequentially.
- Deployment groups = collection of machines for deployment. [run once, rolling, canary].
- Environments are collection of resources where the application is deployed.
- Jobs are collection of steps that run sequentially on the same agent, there can be agentless jobs too.
- Release is versioned set of artifacts specified in a pipeline for a deployment to an environment.
- Run is a single execution of a pipeline.
- Step is a single task that is executed by the agent.
- Script is a sequence of commands that are executed by the agent.
- Task is a pre-packaged script that performs an action in a pipelines.
- Library includes secure files and variable groups. Secure files are a way to store files and share them across pipelines.
### Trigger basics
- Triggers can't use variables in triggers.
- Cannot specify triggers in the template files.
- There are two types of triggers , Build Triggers or CI Triggers and Release Triggers or CD Triggers.

```yaml
name: my-first-azure-pipeline # name of the pipe run not the pipeline
# Pipeline name is picked from the yaml file name
trigger: none
trigger: 
batch: true # Run pipeline in sequence with multiple commits.Address caution.
    branches:
        include:
	      - main
	      - feature/* # Wildcard (* , ** and ?)
		exclude:
          - wip/*
    paths:
	    include:
	      - pipelines/my-first-azure-pipeline*
	    exclude:
	      - README.md
	tags: # This will run when you push a tag. 
		include:
			- v1.*
	    exclude:
	      - v1.0
pr:
 branches:
   include:
      - main
   exclude:
      - wip/*
 paths:
    include:
      - pipelines/my-first-azure-pipeline*
    exclude:
      - README.md
 tags:
   include:
     - v1.*
   exclude:
     - v1.0
resources: # This is redundant here as this is the default behaviour
    - repo: self
```

- To skip a pipeline run, you can include the following in the commit message:
- [skip ci] or [ci skip]
- skip-checks: true or skip-checks:true
- [skip azurepipelines] or [azurepipelines skip]
- [skip azpipelines] or [azpipelines skip]
- [skip azp] or [azp skip]
- NO_CI
- Adding conditions to the pipelines
- condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'))

</details>


<details>
  <summary>Agent pool</summary>

```yaml
pool: # Define selfhosted pool for the pipeline
   name: 'selfhosted'
     
pool: # Define Microsoft hosted pool for the pipeline
    vmImage: 'ubuntu-latest' # you can use 'windows-latest' for Windows and 'macOS-latest' for macOS 

strategy: # Parallel jobs on different OS
    matrix:
      linux:
        imageName: "ubuntu-latest"
     mac:
        imageName: "macOS-latest"
      windows:
        imageName: "windows-latest"
    maxParallel: 3

pool:
    vmImage: $(imageName)
strategy: # Parallel jobs on different JDK versions
    matrix:
      jdk10:
        jdkVersion: "1.10"
      jdk11:
        jdkVersion: "1.11"
    maxParallel: 2

strategy: # Parallel jobs on different OS and JDK versions
    matrix:
      jdk10_linux:
        imageName: "ubuntu-latest"
        jdkVersion: "1.10"
      jdk11_windows:
        imageName: "windows-latest"
        jdkVersion: "1.11"
    maxParallel: 2
 
  pool:
    vmImage: $(imageName)
  pool:
   name: 'selfhosted'
```
</details>


<details>
  <summary>Variables</summary>


```yaml
variables:
  - name: someVariableName
    value: valueOfTheVariable
  - name: pathVersion # dont know what is this for
    value: $[counter(0, 0)]   
  - template: variables/variables-test.yaml # reference variables from seperate variable file
```

</details>

<details>
  <summary>Pipeline structure</summary>


```yaml
stage level
job level

jobs:
- job: job1
   pool:
     vmImage: 'ubuntu-latest'
   variables:
     job_variable1: value1    # Job level variable
   steps:
   - bash: echo $(global_variable)
   - bash: echo $(job_variable1)
   - bash: echo $JOB_VARIABLE1 

- job: job2
   pool:
     vmImage: 'ubuntu-latest'
   variables:
     job_variable2: value2    # this is only available in job2
   steps:
   - bash: echo $(global_variable)
   - bash: echo $(job_variable2)
   - bash: echo $GLOBAL_VARIABLE
```

</details>

<details>
  <summary>Git checkout</summary>

Multi Checkouts in a pipeline
------------------------------
- Use either checkout or uses options to checkout a different repository. If not specified it checks out the current repository.

```yaml
steps:
 - checkout: git://FabrikamFiber/FabrikamTools # Azure Repos Git repository in the same organization
 - script: # Do something with that repo # Or you can reference it with a uses statement in the job
 uses:
   repositories: # List of referenced repositories
   - FabrikamTools # Repository reference to FabrikamTools
```

```yaml
jobs:
  - job: bicep_build
    steps:
      - checkout: self # This step is redundant (pipelines default beheviour in first step)
        persistCredentials: true
        clean: true
        fetchDepth: 0
```

</details>


<details>
  <summary>Tasks</summary>

```yaml
  - task: AzurePowerShell@5
    name: bicepBuildTrigger
    env:
        SYSTEM_ACCESSTOKEN: $(System.AccessToken)
    inputs:
        displayName: 'Triggering bicep build for changed files'
        ScriptType: filePath
        ScriptPath: $(Build.SourceDirectory)/pipelines/scripts/trigger_pipeline.ps1
        failOnStderr: true
        azurePowerShellVersion: "LatestVersion"
        azureSubscription: ${{ variables.azureSubscriptionName}}
        pwsh: true
        ScriptArgument: > # Use this to avoid newline characters in multilines string
            -patchVersion $(patchVersion)
            -pipelineName "build-and-publish-module"
            -bicepVersionFile "metadata.json"
            -bicepFile "main.bicep"

# inline script type
- task: AzurePowerShell@5
  inputs:
    ScriptType: filePath
    ScriptPath: $(Build.SourcesDirectory)/scripts/myscript.ps1
    azureSubscription: $(azureSubscriptionName)
    pwsh: true
    failOnStderr: true


# file type script type
- task: AzurePowerShell@5
  inputs:
    ScriptType: inlineScript
    ScriptInline: |
      Write-Host "Hello, World!"
      Get-AzResourceGroup
    azureSubscription: $(azureSubscriptionName)
    pwsh: true
    failOnStderr: true
```
</details>
