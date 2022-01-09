pipeline {
  agent any
  stages {
    stage('Test application') {
      steps {
        echo "Testing"
      }
    }
    stage('Build image') {
      steps {
        echo 'Building docker image..'
      }
    }
    stage('Deploy image') {
      steps {
        echo 'Deploying...'
      }
    }
  }
}
