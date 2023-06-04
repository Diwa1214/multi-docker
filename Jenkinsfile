pipeline {
    agent any

    stages{

        stage('ENV'){
          steps{
             sh 'printenv'
          }
        }

        stage('Docker Exista'){
           steps{
              sh 'docker version'
           }
        }

        stage('PUBLISH DOCKER HUB'){
           steps{
              withEnv ([ 'DOCKER_LOGIN_ID = ${env.DOCKER_LOGIN_ID}', 'DOCKER_PASSWORD = ${env.DOCKER_PASSWORD}' ]){
                 sh 'docker login -u $DOCKER_LOGIN_ID -p $DOCKER_PASSWORD'

                 sh 'docker build -t diwa1214/dev:multi-client ./front-end'

                 sh 'docker build -t diwa1214/dev:multi-ngnix ./nginx'

                 sh 'docker build -t diwa1214/dev:multi-server ./server'

                 sh 'docker build -t diwa1214/dev:multi-workers ./workers'

                 sh 'docker push diwa1214/dev:multi-client'

                 sh 'docker push diwa1214/dev:multi-ngnix'

                 sh 'docker push diwa1214/dev:multi-server'

                 sh 'docker push diwa1214/dev:multi-workers'

              }
           }
        }

        stage('Upload to S3'){
           steps{
              withEnv ([ 'AWS_ACCESS_KEY_ID = ${env.AWS_ACCESS_KEY_ID}', 'AWS_SECRET_ACCESS_KEY = ${env.AWS_SECRET_ACCESS_KEY}' ]){
                     
                    // Set AWS credentials for the aws command
                    sh 'export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID'
                    sh 'export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY'
                    
                    // Upload the Dockerrun.aws.json file to S3
                    sh "aws s3 cp Dockerrun.aws.json s3://elasticbeanstalk-us-east-1-862399869074/docker-multi"
               
              }
           }
        }



    }
}