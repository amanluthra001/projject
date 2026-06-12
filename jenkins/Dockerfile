FROM jenkins/jenkins:lts
USER root

# Install Docker inside the Jenkins container
RUN curl -fsSL https://get.docker.com | sh

# Drop back to the regular jenkins user
USER jenkins
