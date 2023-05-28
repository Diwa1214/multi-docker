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
              sh 'Docker version'
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



    }
}