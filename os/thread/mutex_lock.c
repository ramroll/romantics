#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

#define NUMTHREADS 2

void *handler(void *_tid){
	int tid = *(int*)(_tid);
}

void main() {
	
  pthread_t threads[NUMTHREADS];
	for(int i = 0; i < NUMTHREADS; i++) {
		pthread_create(&threads[i], NULL, handler, &i);
	}

	for(int i = 0; i < NUMTHREADS; i++) {
		pthread_join(threads[i], NULL);
	}

	printf("all threads complete\n");
}