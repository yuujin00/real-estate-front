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

        stage('Deploy Docker') {
            steps {
                echo 'Deploying Docker'
                script {
                    dockerImage.run('-d -p 8080:80 --name real-estate-app ' + imagename)
                }
            }
            post {
                failure {
                    error 'This pipeline stops here...'
                }
            }
        }
    }
}
