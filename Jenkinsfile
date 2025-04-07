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
                    bat 'npm install --global serve'
                    // Ensure compatibility for "relateurl" library issue
                    bat 'echo module.exports = {}; > node_modules\\relateurl\\lib\\index.js'
                    bat 'npm run build'
                    bat 'serve -s build -l 80'
                    
                    // Zip the React build folder
                    bat '''
                        powershell -Command "if (Test-Path ../ReactApp.zip) { Remove-Item ../ReactApp.zip -Force }"
                        powershell Compress-Archive -Path "build/*" -DestinationPath "../ReactApp.zip" -Force
                    '''
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    // Log in to Azure using service principal credentials
                    bat '''
                        az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
                    '''
                    
                    // Compress the build folder into a ZIP file for deployment
                    bat '''
                        powershell -Command "if (Test-Path ./extra-cc/build.zip) { Remove-Item ./extra-cc/build.zip -Force }"
                        powershell Compress-Archive -Path ./extra-cc/build/* -DestinationPath ./extra-cc/build.zip -Force
                    '''

                    // Deploy the ZIP file to Azure App Service
                    bat '''
                        az webapp deploy --resource-group %RESOURCE_GROUP% --name %APP_SERVICE_NAME% --src-path ./extra-cc/build.zip --type zip
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
