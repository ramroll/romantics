/* 多线程web server */
#define __USE_GNU 1
#define _GNU_SOURCE 1
#include <err.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <unistd.h>
#include <errno.h>
#include <pthread.h>
#include <semaphore.h>
#include <sys/time.h>
#include <time.h>

#define PORT 8080

#define MAXWORKERS 20 
#define MAXPRODUCERS 1


pthread_cond_t condc, condp;
pthread_t tproducers[MAXPRODUCERS];
int works[10000];
int works_counter = 0;
pthread_t tworkers[MAXWORKERS];

const char header[] = "HTTP/1.1 200 OK\r\n"
                      "Content-Type: text/html; charset=UTF-8\r\n\r\n";

char highSpeedCache[10000];
int cache_size = 0;
int request_counter = 1;
pthread_mutex_t mutex;

int c = 0;
void push(int fd) {
  pthread_mutex_lock(&mutex);
  while(works_counter > 0) {
    pthread_cond_wait(&condp, &mutex);
  }
  works[works_counter++] = fd;
  pthread_cond_broadcast(&condc);
  pthread_mutex_unlock(&mutex);
}

int popc = 0;
int pop() {
  int result = -1;
  // printf("call pop %d c=%d\n", ++popc, c);
  pthread_mutex_lock(&mutex);
  while(works_counter == 0) {
    pthread_cond_wait(&condc, &mutex);
  }
  if (works_counter > 0) {
    result = works[--works_counter];
  }
  pthread_cond_signal(&condp);
  pthread_mutex_unlock(&mutex);
  return result;
}

void build_high_speed_cache() {
  FILE *file;
  printf("create high speed cache\n");
  const char *mod = "r";
  const char *filename = "index.html";
  int nread;
  char buf[1024];
  file = fopen(filename, mod);
  if (file) {
    while ((nread = fread(buf, 1, sizeof buf, file)) > 0) {
      char *t = &highSpeedCache[0];
      char *p = t + cache_size;
      memcpy(p, &buf, nread);
      cache_size += nread;
    }
  }
  fclose(file);
}

void *handler(void *void_tid) {

  int tid = *( (int *)void_tid);
  while (1) {
    int work_fd = pop();
    if (work_fd == -1) {
      continue;
    }
    long valread;
    char buffer[30000] = {0};
    valread = read(work_fd, buffer, 30000);
    if(valread <= 0 ) {
      printf("error valread %d errno=%d\n", valread, errno);
      close(work_fd);
      continue;
    }
    c++;
    // printf("[%d]work found fd=%d by @%d\n", c, work_fd, tid);
    write(work_fd, header, sizeof(header) - 1);
    write(work_fd, highSpeedCache, cache_size);
    int r = close(work_fd);
    // printf("work finished %d left:%d %d\n", c, works_counter, r);
  }
}

void * producer(void * tid){
  int server_fd, new_socket;
  struct sockaddr_in address, client_address;
  int addrlen = sizeof(address);

  // Creating socket file descriptor
  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
    perror("In socket");
    exit(EXIT_FAILURE);
  }

  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons(PORT);
  memset(address.sin_zero, '\0', sizeof address.sin_zero);
  struct timeval timeout;
  timeout.tv_sec = 0;
  timeout.tv_usec = 1;

  int one = 1;
  setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &one, sizeof(int));
  // setsockopt(server_fd, SOL_SOCKET, SO_RCVTIMEO, (char *)&timeout, sizeof(timeout));

  if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
    perror("In bind");
    exit(EXIT_FAILURE);
  }

  if (listen(server_fd, 1000) < 0) {
    perror("In listen");
    exit(EXIT_FAILURE);
  }
 
  while (1) {
    int new_work_fd = accept4(server_fd, (struct sockaddr *)&client_address,
                             (socklen_t *)&addrlen, SOCK_NONBLOCK);
    if(new_work_fd == -1 ) {
      usleep(100);
      continue;
    }
    // printf("load work %d left=%d\n", new_work_fd, works_counter);
    push(new_work_fd);
  }
}

int main(int argc, char const *argv[]) {
  pthread_mutex_init(&mutex, 0);
  pthread_cond_init(&condc, 0);
  pthread_cond_init(&condp, 0);
  build_high_speed_cache();


  for (int i = 0; i < MAXWORKERS; i++) {
    pthread_create(&tworkers[i], NULL, handler, &i);
  }

  for (int i = 0; i < MAXPRODUCERS; i++) {
    pthread_create(&tproducers[i], NULL, producer, &i);
  }
  
  while(1){
    printf("tick....%d\n", works_counter);
    sleep(1);
  }
}
