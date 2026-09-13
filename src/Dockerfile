# Dockerfile
FROM debian:latest

# Installer SSH
RUN apt-get update && \
    apt-get install -y openssh-server && \
    mkdir /var/run/sshd

# Définir mot de passe root (à changer pour sécurité)
RUN echo 'root:dockerpass' | chpasswd

# Exposer port SSH
EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
