pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18.x' 
    }
    
    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP = 'rg-04082003'
        APP_SERVICE_NAME = 'webapijenkins-04082003'  
        AZURE_CLI_PATH = 'C:/Program Files/Microsoft SDKs/Azure/CLI2/wbin'
        SYSTEM_PATH = 'C:/Windows/System32'
        TERRAFORM_PATH = 'C:/Users/window 10/Downloads/terraform_1.11.3_windows_386'
    }

    stages {
        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    bat '''
                        set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%
                        terraform init
                    '''
                }
            }
        }

        stage('Terraform Plan & Apply') {
            steps {
                dir('terraform') {
                    bat '''
                        set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%
                        terraform plan
                        terraform apply -auto-approve
                    '''
                }
            }
        }

        stage('Build React Application') {
            steps {
                dir('extra-cc') {
                    bat 'npm install'
                    bat 'echo module.exports = {}; > node_modules\\relateurl\\lib\\index.js'
                    bat 'npm run build'
                    bat 'powershell Compress-Archive -Path "build\\*" -DestinationPath "../ReactApp.zip" -Force'
                }
            }
        }

        stage('Deploy to Azure App Service') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    bat 'set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%'
                   bat '''
                        az login --service-principal -u "%AZURE_CLIENT_ID%" -p "%AZURE_CLIENT_SECRET%" --tenant "%AZURE_TENANT_ID%"
                        az account set --subscription "%AZURE_SUBSCRIPTION_ID%"
                        az webapp deployment source config-zip --resource-group %RESOURCE_GROUP% --name %APP_SERVICE_NAME% --src %WORKSPACE%\\ReactApp.zip
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
