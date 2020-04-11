/* 构造一组竞争条件 */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>


void set(int dir){
 FILE * file = fopen("./a.txt", "r+");
 char c = fgetc(file);
 rewind(file); 
 fprintf(file, "%c", c+dir);
 fclose(file);
}

void main(){

  pid_t pid = fork();
  set(1);
  set(-1);
  if(pid != 0) {
    wait(&pid);
  }

}

