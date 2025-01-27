### App service (PAAS service)
- Web apps
- Mobile apps
- API apps (RESTful API)
- Function apps (Serverless) 

### App service plan
- App service plan defines what kind of capacity you have for your workloads.
- CICD can be specified in the app service plan.
- Monitoring insights can be defined in the app service plan
- Scale up and Scale out can be done while increasing the app service plan

### Web app
1.Deployment option
- code
- container
- static website
2. Web app runs in an app service plan 
3. Scaling up and out
- manual
- automatic 
    - (based on metrics), add rules for scaling up and down
    - (based on schedule), add rules for scaling up and down
- rule-based
4.Deployment slots
- staging slot
- production slot
- swap slots
- Slots can be used for AB testing where some percentage of traffic can be traversed to the slot to check if everything is ok in production 
5. Handler mappings
- mapping file extensions to handlers like storage
6. Application settings - App config (Baiscally json file)
7. TLS certificate - Custom domain
8. Logs
- Metrics
- App service Logs(Logs stored in local storage accesseble via ftp)
- Application logging
- Web server logging
- Diagnostic logs (Get logs in LAW, storage account, stream to event hub, or send to partners)
- Application logging
- Web server logging
- Detailed error messages
- Failed request tracing
9. Log stream - Real time logs
- Application logging
- Web server logging
10. Interact with the deployed app 
- Development tools
- Kudu
- Console
