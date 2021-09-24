# Serverless

I've created a basic structure using serverless framework which includes individual lambda functions, GitLab CI/CD with different environments, and a basic API Gateway. I've also added some of the reference links for more information.

## Setup

1. Create a `.env.dev` file by taking reference of `env.dev.example`.
2. Install packages using `npm i`.

## Start local server

- Run locally using `npm start` or you can also debug using VSCode (F5).

## Deployment

### First time deployment

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables must be set in GitLab CI/CD variables.
- Add other environments to GitLab CI/CD variables separately for staging and production.

### Update deployment

There are following GitLab pipelines that deploy to AWS whenever we push any changes.

- The `staging` branch is deployed to the staging url.
- The `master` branch is deployed to the production url.

#### Notes:

- It compares hash while deploying. So, it skips deploying of a particular lambda function if it hasn't been changed.
- Any change in env needs to re-deploy all the functions using it.

### Create packages in local

If you want to create packages, use `npm run package`. This will create a `.serverless` folder with all the individual zip files.

## Some Reference Links

- [Deploying AWS Lambda function using GitLab CI/CD | GitLab](https://docs.gitlab.com/ee/user/project/clusters/serverless/aws.html)
- [Serverless Environment Variables - A Comprehensive Guide](https://adamdelong.com/serverless-environment-variables/)
- [gitlab.com/gitlab-org/project-templates/serverless-framework](https://gitlab.com/gitlab-org/project-templates/serverless-framework)
- [aws-secrets-management](https://www.serverless.com/blog/aws-secrets-management/)
