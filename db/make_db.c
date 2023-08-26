#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <db.h>

#define	DATABASE "fqdn_porn.db"


int main(int argc, char *argv[]){
	DB *dbp;
	int ret;
	FILE *fp;
	char chunk[128];
	DBT key, data;
	int salir;


	if ((ret = db_create(&dbp, NULL, 0)) != 0) {
		fprintf(stderr, "db_create: %s\n", db_strerror(ret));
		exit (1);
	}
	ret = dbp->open(dbp,NULL, DATABASE, NULL, DB_BTREE, DB_CREATE, 0664);
	if (ret != 0){
		printf("Error al abrir la DB");
		dbp->err(dbp, ret, "%s", DATABASE);
	}

	fp = fopen("fqdn_porn.txt","r");
	if(fp == NULL) {
		perror("Unable to open file!");
		exit(1);
	}
	
	memset(&key, 0, sizeof(key));
	memset(&data, 0, sizeof(data));

	salir = 0;
	while(fgets(chunk, sizeof(chunk), fp) != NULL && !salir) {
		printf("ENTRO: %s - %lu\n",chunk,strlen(chunk));
		key.data = chunk;
		key.size = strlen(chunk);
		printf("LARGO: %i\n",(int)key.size);
		data.data = "1";
		data.size = sizeof("1");

		if ((ret = dbp->put(dbp, NULL, &key, &data, 0)) == 0)
			printf("db: %s: key stored.\n", (char *)key.data);
		else{
			dbp->err(dbp, ret, "DB->put");
			salir = 1;
		}
	}
	
	fclose(fp);
	
	exit (0);
}
