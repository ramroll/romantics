/* 创建线程示例 */
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

void main(){
  pid_t pid = fork();
	if(pid == 0) {
    fork();
  	printf("hello im child!\n");
    exit(0);
  }
  printf("hello im parent!\n");
}
