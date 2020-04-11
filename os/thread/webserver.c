/* 带有高速缓存的webserver */
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>
#include <err.h>
#include <sys/wait.h>
#include <sys/time.h>
#include <errno.h>
#include <time.h>

#define PORT 8080

const char header[] = "HTTP/1.1 200 OK\r\n"
                      "Content-Type: text/html; charset=UTF-8\r\n\r\n";


char highSpeedCache[10000];
int cache_size = 0;
int request_counter = 1;
void handleRequest(int fd) {
  printf("request %d---- fd:%d\n", request_counter++, fd);
  long valread;
  char buffer[30000] = {0};
  valread = read(fd, buffer, 30000);
  // printf("%s\n", buffer);
  char buf[1024];
  FILE * file;
  size_t nread;

  // Write HTTP Header
  write(fd, header, sizeof(header) - 1);

  if(cache_size == 0) {
  // if(1) {
    // cache_size = 0;
    printf("create high speed cache\n");
    const char *mod = "r";
    const char *filename = "index.html";
    file = fopen(filename, mod);
    if (file) {
      while ((nread = fread(buf, 1, sizeof buf, file)) > 0) {
        char * t = &highSpeedCache[0];
        char * p = t + cache_size; 
        memcpy(p, &buf, nread);
        cache_size += nread;
      }
    }
    fclose(file);
  }else {
    printf("use high speed cache\n");
  }
  printf("before write %d\n", cache_size);

  write(fd, highSpeedCache, cache_size);
  
  close(fd);
}

int main(int argc, char const *argv[]) {
  pid_t pid = fork();
  if(pid != 0) {
    int status;
    waitpid(pid, &status, 0);
    if ( WIFEXITED(status) ) 
    { 
        int exit_status = WEXITSTATUS(status);         
        printf("Exit status of the child was %d\n",  
                                     exit_status); 
    } 
    printf("status %d %d\n", status, errno);
    exit(0);
  }
  int server_fd, new_socket;
  struct sockaddr_in address;
  int addrlen = sizeof(address);

  char *hello = "Hello from server";

  // Creating socket file descriptor
  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
    perror("In socket");
    exit(EXIT_FAILURE);
  }

  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons(PORT);

  int one = 1;
  struct timeval timeout;
  timeout.tv_sec = 0;
  timeout.tv_usec = 1000;
  setsockopt(server_fd, SOL_SOCKET, SO_RCVTIMEO, (char *)&timeout, sizeof(timeout));
  setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &one, sizeof(int));
  memset(address.sin_zero, '\0', sizeof address.sin_zero);

  if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
    perror("In bind");
    exit(EXIT_FAILURE);
  }
  if (listen(server_fd, 3) < 0) {
    perror("In listen");
    exit(EXIT_FAILURE);
  }
  while (1) {
    int newfd =
        accept(server_fd, (struct sockaddr *)&address, (socklen_t *)&addrlen);
    if(newfd == -1) {
      continue;
    }

    printf("init request %d\n", newfd);
    handleRequest(newfd);
  }
  printf("before exit");
  return 0;
}
