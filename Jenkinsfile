pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'devops-local-app'
        DOCKER_TAG = "v${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    dir('app') {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    }
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    sh 'docker stop local-app-container || true'
                    sh 'docker rm local-app-container || true'
                    sh "docker run -d -p 3000:3000 --name local-app-container ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
