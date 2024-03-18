pipeline {
    agent any

    environment {
        imagename = "realEstateImage"
        registryCredential = 'docker-hub'
        dockerImage = ''
    }

    stages {
        stage('Prepare') {
            steps {
                echo 'Cloning Repository'
                git url: 'git@github.com:real-estate-contract/real-estate-front.git',
                    branch: 'main',
                    credentialsId: 'realEstate'
            }
            post {
                success { 
                    echo 'Successfully Cloned Repository'
                }
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        stage('Build Gradle') {
            steps {
                echo 'Building Gradle'
                dir('.'){
                    sh './gradlew clean build'
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        stage('Build Docker') {
            steps {
                echo 'Building Docker'
                script {
                    dockerImage = docker.build imagename
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        stage('Push Docker') {
            steps {
                echo 'Pushing Docker'
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo 'Pulling Docker Image & Running Docker Image'
                sshagent(credentials: ['ssh']) {
                    sh "ssh -o StrictHostKeyChecking=no front-server@3.34.49.3 'docker pull jenkins/jenkins:lts'"
                    sh "ssh -o StrictHostKeyChecking=no front-server@3.34.49.3 'docker ps -q --filter name=jenkins | grep -q . && docker rm -f \$(docker ps -aq --filter name=jenkins)'"
                    sh "ssh -o StrictHostKeyChecking=no front-server@3.34.49.3 'docker run -d --name jenkins -p 8080:8080 jenkins/jenkins:lts'"
                }
            }
        }
    }
}
