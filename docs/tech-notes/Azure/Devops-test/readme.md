# Azure devops

## Organization
    - Project 1
    - Project 2

### Projects 1
    - Overview
        - Summary (Project summary , readme can be used)
        - Bashboards (add wedgits here)
        - Wiki (Confluence)
    - Boards
        - Work Items(All the tickets created)
        - Boards (Sprint dashboard)
        - Backlogs (Sprint Boards)
        - Sprint (Sprint board)
        - Queries (Filters with charts)
            - Shared Queries
            - My Queries
        - Delivery Plans(Jira plans)
        - Analytics views
    - Repos
    - Pipelines
        - Build pipeline
        - Release pipeline
    - Test Plans
    - Arrifacts

## Workflows
1. Basic 
    - Epic | Issues | Tasks
2. Agile
    - Epic | Feature | User Stories/Bugs/Issues | Tasks | 
3. Scrum
    - Epic | Feature | Backlog Item/Bug | Task 
4. CMMI
    - Epic | Feature | Requirement/Bugs/Change request | Task

## Ticket state
1. New -> Active -> Resolved -> Closed
    -> Removed

## Dashboard
    - Burndown charts (Give the info on how much work was completed by the end of the sprint)
    - Cyle time chart (Time taken to close a work item)
    - Lead time (Time taken to close a work item after it was created)
    - Velocity chart (Teams capacity to deliver work sprint after sprint)

## Permissions
    - Project level 
        - Not set = deny
    - Organization lelve
    - Query permission(This can be only added to the shared queries and not to the my queries)
    - Dashboard permission

## MS teams
    - MS teams can be linked to azure devops
    - You have to give the permission to use oauth from thired party
    - Azure boards app can be installed in the teams after that (@azure boards link)
    - We can subscribe to the events from the azure boards in teams 

# Azure pipelines

<details>
  <summary>Pipeline basics</summary>

- Pipeline is collection of stages, stages are collection of jobs, jobs are collection of steps.
- Each Job runs on one agent.
- Approvals can be added to stages for manual intervention.
- Deployment in yaml referes to deployment jobs and its action of running a sequencial task for one stage .
- Deployment groups are collection of target machines where the application is deployed [Strategies like run once, rolling, and canary can be used for deployment jobs].
- Environments are collection of resources where the application is deployed.
- Jobs are collection of steps that run sequentially on the same agent, there can be agentless jobs too.
- Release is versioned set of artifacts specified in a pipeline for a deployment to an environment.
- Run is a single execution of a pipeline.
- Step is a single task that is executed by the agent.
- Script is a sequence of commands that are executed by the agent.
- Task is a pre-packaged script that performs an action in a pipelines.
- Library includes secure files and variable groups. Secure files are a way to store files and share them across pipelines.
</details>

<details>
  <summary>Trigger basics</summary>

- Triggers can't use variables in triggers.
- Cannot specify triggers in the template files.
- There are two types of triggers , Build Triggers or CI Triggers and Release Triggers or CD Triggers.

```yaml
name: my-first-azure-pipeline # Name of the pipeline

trigger: none # This will not run the pipeline automatically, you have to run it manually.
trigger: # This is a CI or Build trigger, This will run when there is a commit to the branch or if you push specified tags.
batch: true # This will run the pipeline in sequence if multiple commits are pushed. Address caution when using this, as you wont be able to run t
    branches:
        include:
      - main
      - feature/* # Wildcard can include * , ** and ? characters * meaning any number of characters and ? meaning any single character, If you start your pattern with * in a YAML pipeline, you must wrap the pattern in quotes, like "*-releases" can be used on branches and paths.
    exclude:
      - wip/*
  paths:
    include:
      - pipelines/my-first-azure-pipeline*
    exclude:
      - README.md
tags: # This is a tag trigger, This will run when you push a tag that matches the pattern. If you don't specify any tag triggers, then by default, tags will not trigger pipelines.
    include:
      - v1.*
    exclude:
      - v1.0
#Pr Triggers
pr:
 branches:
   include:
#      - main
#    exclude:
#      - wip/*
#  paths:
#    include:
#      - pipelines/my-first-azure-pipeline*
  #   exclude:
  #     - README.md
  # tags:
  #   include:
  #     - v1.*
  #   exclude:
  #     - v1.0

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
